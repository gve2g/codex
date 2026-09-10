import { getDatabase } from "@netlify/database";
import { fetchText, htmlToText } from "./http.mts";

const SOURCES = [
  { id: "hmrc-cds", system: "uk-cds", adapter: "hmrc_cds", url: "https://www.gov.uk/guidance/customs-declaration-service-service-availability-and-issues" },
  { id: "sg-customs-tradenet", system: "sg-tradenet", adapter: "sg_tradenet", url: "https://www.customs.gov.sg/doing-business/quick-links-for-traders/tradenet/what-you-need-to-know-about-tradenet/" },
  { id: "de-zoll-iaa", system: "de-atlas", adapter: "de_atlas", url: "https://www.iaap.zoll-portal.de/iaap/intro.do" },
  { id: "au-daff-notices", system: "au-daff-import", adapter: "au_daff", url: "https://www.agriculture.gov.au/biosecurity-trade/import/online-services/system-notifications/2026" },
  { id: "ie-revenue-ais", system: "ie-ais", adapter: "ie_ais", url: "https://www.revenue.ie/en/customs/businesses/electronic-systems/ais/annex-b-cci/index.aspx" },
  { id: "nl-rotterdam-pin", system: "nl-rotterdam", adapter: "rotterdam_pin", url: "https://pin.portofrotterdam.com/node/" },
  { id: "c4t-status", system: "be-idms", adapter: "c4t_status", url: "https://status.customs4trade.com/" }
] as const;

async function markSource(db: any, source: typeof SOURCES[number], ok: boolean, hash?: string, error?: string) {
  if (ok) {
    await db.sql`
      UPDATE sources
      SET last_checked_at = NOW(), last_success_at = NOW(), health = 'healthy', failure_count = 0,
          last_hash = ${hash || null}, last_error = NULL,
          last_changed_at = CASE WHEN last_hash IS DISTINCT FROM ${hash || null} THEN NOW() ELSE last_changed_at END
      WHERE id = ${source.id}
    `;
  } else {
    await db.sql`
      UPDATE sources
      SET last_checked_at = NOW(), health = CASE WHEN failure_count >= 2 THEN 'failing' ELSE 'degraded' END,
          failure_count = failure_count + 1, last_error = ${error || "Unknown fetch error"}
      WHERE id = ${source.id}
    `;
  }
}

async function updateSystem(db: any, id: string, status: string, label: string, detail: string) {
  await db.sql`
    UPDATE systems
    SET status = ${status}, status_label = ${label}, status_detail = ${detail}, last_checked_at = NOW()
    WHERE id = ${id}
  `;
}

async function verifyEvent(db: any, id: string) {
  await db.sql`UPDATE events SET last_verified_at = NOW(), updated_at = NOW() WHERE id = ${id}`;
}

async function resolveEvent(db: any, id: string) {
  await db.sql`
    UPDATE events
    SET resolved_at = COALESCE(resolved_at, NOW()), status = 'resolved', updated_at = NOW(), last_verified_at = NOW()
    WHERE id = ${id} AND resolved_at IS NULL
  `;
}

function singaporeMaintenanceActive(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Singapore", weekday: "short", hour: "2-digit", hourCycle: "h23"
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value;
  const hour = Number(parts.find((p) => p.type === "hour")?.value || -1);
  return weekday === "Sun" && hour >= 4 && hour < 8;
}

async function runAdapter(db: any, source: typeof SOURCES[number], text: string) {
  const plain = htmlToText(text);

  if (source.adapter === "hmrc_cds") {
    const plannedNone = /Planned downtime\s+None\.?/i.test(plain);
    const issuesNone = /Service issues\s+None\.?/i.test(plain);
    if (issuesNone && plannedNone) {
      await updateSystem(db, source.system, "operational", "Operational", "HMRC reports no planned downtime and no current service issues.");
    } else if (issuesNone) {
      await updateSystem(db, source.system, "clear", "Upcoming notice", "No current CDS service issue is reported; an official planned-downtime notice is present.");
    } else {
      await updateSystem(db, source.system, "degraded", "Check official status", "HMRC's service page contains a current issue notice. Open the source for details.");
    }
    return;
  }

  if (source.adapter === "sg_tradenet") {
    const scheduleFound = /unavailable on Sundays from 4am to 8am/i.test(plain);
    if (!scheduleFound) throw new Error("TradeNet maintenance wording not found; parser review required");
    if (singaporeMaintenanceActive()) {
      await updateSystem(db, source.system, "maintenance", "Maintenance", "TradeNet is within its published Sunday 04:00–08:00 SGT maintenance window.");
    } else {
      await updateSystem(db, source.system, "clear", "No active advisory", "Published recurring maintenance is Sunday 04:00–08:00 SGT; no heartbeat status is inferred outside that window.");
    }
    await verifyEvent(db, "sg-tradenet-maint-20260913");
    return;
  }

  if (source.adapter === "de_atlas") {
    const scheduled = /12\.09\.2026[\s\S]{0,180}13:45[\s\S]{0,120}23:59/i.test(plain);
    if (scheduled) await verifyEvent(db, "de-atlas-maint-20260912");
    await updateSystem(db, source.system, "clear", "No active advisory", scheduled ? "Official maintenance is scheduled for 12 September; no current outage is stated." : "No currently parsed maintenance notice. Source remains under monitoring.");
    return;
  }

  if (source.adapter === "au_daff") {
    const restored = /Services Restored[^.]{0,120}03 September 2026[^.]{0,120}BICON/i.test(plain);
    if (!/Import system notifications 2026/i.test(plain)) throw new Error("DAFF notifications page structure not recognized");
    await updateSystem(db, source.system, restored ? "clear" : "unknown", restored ? "No active advisory" : "Status needs review", restored ? "Latest BICON disruption has a services-restored notice; no newer active advisory is parsed." : "Official bulletin fetched, but current state could not be determined automatically.");
    return;
  }

  if (source.adapter === "ie_ais") {
    const cutover = /15 September 2026/i.test(plain) && /AIS V2/i.test(plain);
    if (!cutover) throw new Error("AIS V2 go-live wording not found; parser review required");
    await verifyEvent(db, "ie-ais-v2-20260915");
    await updateSystem(db, source.system, "clear", "No active advisory", "AIS V2 Stage 2 is scheduled to go live on 15 September 2026.");
    return;
  }

  if (source.adapter === "rotterdam_pin") {
    const pilot = /until further notice\s+Amended Pilot Service for small vessels\s+-\s+Activate/i.test(plain);
    const tugs = /until further notice\s+Capacity Arrangement Boluda Tugboats\s+-\s+Activate/i.test(plain);
    if (pilot) await verifyEvent(db, "nl-rotterdam-pilot-20260909"); else await resolveEvent(db, "nl-rotterdam-pilot-20260909");
    if (tugs) await verifyEvent(db, "nl-rotterdam-tugs-20260908"); else await resolveEvent(db, "nl-rotterdam-tugs-20260908");
    if (pilot || tugs) {
      await updateSystem(db, source.system, "degraded", "Operational constraint", `${pilot ? "Amended pilot service" : ""}${pilot && tugs ? " and " : ""}${tugs ? "tugboat capacity arrangement" : ""} active until further notice.`);
    } else {
      await updateSystem(db, source.system, "clear", "No active advisory", "No currently parsed until-further-notice constraint is active in the Port Information Notices feed.");
    }
    return;
  }

  if (source.adapter === "c4t_status") {
    const incident = /BE\s*-\s*iDMS Imports[^]{0,150}CERTEX Connection Issue/i.test(plain);
    const degraded = /Belgium\s+Degraded Performance/i.test(plain);
    if (incident && degraded) {
      await verifyEvent(db, "be-idms-certex-20260904");
      await updateSystem(db, source.system, "degraded", "Degraded", "Customs4trade reports the Belgian iDMS/CERTEX issue remains in monitoring status. This is a secondary operational source.");
    } else {
      await resolveEvent(db, "be-idms-certex-20260904");
      await updateSystem(db, source.system, "clear", "No active reported issue", "No active Belgian iDMS/CERTEX issue is currently parsed from the secondary status source.");
    }
  }
}

export async function refreshAllSources() {
  const db = getDatabase();
  const results = await Promise.allSettled(SOURCES.map(async (source) => {
    try {
      const { text, hash } = await fetchText(source.url);
      await runAdapter(db, source, text);
      await markSource(db, source, true, hash);
      return { source: source.id, ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await markSource(db, source, false, undefined, message);
      throw new Error(`${source.id}: ${message}`);
    }
  }));

  return results.map((result, index) => result.status === "fulfilled"
    ? result.value
    : { source: SOURCES[index].id, ok: false, error: result.reason instanceof Error ? result.reason.message : String(result.reason) });
}
