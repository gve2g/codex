import { getDatabase } from "@netlify/database";
import { fetchText, htmlToText } from "./http.mts";
import { SOURCES, type SourceDefinition } from "./sources.mts";

async function markSource(db: any, source: SourceDefinition, ok: boolean, hash?: string, error?: string) {
  if (ok) {
    await db.sql`
      UPDATE sources
      SET last_checked_at = NOW(), last_success_at = NOW(), health = 'healthy', failure_count = 0,
          last_hash = ${hash || null}, last_error = NULL, parser_version = ${source.parserVersion},
          monitoring_mode = ${source.monitoringMode},
          last_changed_at = CASE WHEN last_hash IS DISTINCT FROM ${hash || null} THEN NOW() ELSE last_changed_at END
      WHERE id = ${source.id}
    `;
  } else {
    await db.sql`
      UPDATE sources
      SET last_checked_at = NOW(), health = CASE WHEN failure_count >= 2 THEN 'failing' ELSE 'degraded' END,
          failure_count = failure_count + 1, last_error = ${error || "Unknown fetch error"},
          parser_version = ${source.parserVersion}, monitoring_mode = ${source.monitoringMode}
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

async function upsertEvent(db: any, event: {
  id: string; systemId: string; countryCode: string; countryName: string; region: string;
  eventType: string; severity: string; confidence: string; title: string; summary: string;
  impact?: string | null; workaround?: string | null; startsAt: string; endsAt?: string | null;
  sourceName: string; sourceUrl: string; sourceTier?: number;
}) {
  await db.sql`
    INSERT INTO events (
      id,system_id,country_code,country_name,region,event_type,status,severity,confidence,title,summary,
      operational_impact,workaround,starts_at,ends_at,all_day,source_name,source_url,source_tier,last_verified_at,fingerprint
    ) VALUES (
      ${event.id},${event.systemId},${event.countryCode},${event.countryName},${event.region},${event.eventType},'upcoming',
      ${event.severity},${event.confidence},${event.title},${event.summary},${event.impact || null},${event.workaround || null},
      ${event.startsAt},${event.endsAt || null},FALSE,${event.sourceName},${event.sourceUrl},${event.sourceTier || 1},NOW(),${event.id}
    )
    ON CONFLICT (id) DO UPDATE SET
      title=EXCLUDED.title, summary=EXCLUDED.summary, operational_impact=EXCLUDED.operational_impact,
      workaround=EXCLUDED.workaround, starts_at=EXCLUDED.starts_at, ends_at=EXCLUDED.ends_at,
      last_verified_at=NOW(), updated_at=NOW(), resolved_at=NULL
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

function dateAgeDays(date: Date, now = new Date()) {
  return Math.floor((now.getTime() - date.getTime()) / 86400000);
}

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
};

function indiaMaintenanceWindow(plain: string): { start: Date; end: Date; scope: string } | null {
  const latest = plain.split(/Latest Updates/i)[1]?.slice(0, 5000) || plain.slice(0, 5000);

  let m = latest.match(/scheduled maintenance activity from\s*(\d{1,2})-([A-Za-z]{3})-(\d{4})\s+(\d{1,2}):(\d{2})\s*(?:Hrs)?\s*to\s*(\d{1,2})-([A-Za-z]{3})-(\d{4})\s+(\d{1,2}):(\d{2})/i);
  if (m) {
    const start = new Date(Date.UTC(+m[3], MONTHS[m[2].toLowerCase()], +m[1], +m[4], +m[5]) - 330 * 60000);
    const end = new Date(Date.UTC(+m[8], MONTHS[m[7].toLowerCase()], +m[6], +m[9], +m[10]) - 330 * 60000);
    return { start, end, scope: "ICEGATE services" };
  }

  m = latest.match(/ICEGATE Login services will be unavailable today,?\s*(\d{1,2})-([A-Za-z]{3})-(\d{4})\s+from\s+(\d{1,2}):(\d{2})\s*(AM|PM)\s+to\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (m) {
    const hour = (h: number, ap: string) => ap.toUpperCase() === "PM" ? (h % 12) + 12 : h % 12;
    const start = new Date(Date.UTC(+m[3], MONTHS[m[2].toLowerCase()], +m[1], hour(+m[4], m[6]), +m[5]) - 330 * 60000);
    const end = new Date(Date.UTC(+m[3], MONTHS[m[2].toLowerCase()], +m[1], hour(+m[7], m[9]), +m[8]) - 330 * 60000);
    return { start, end, scope: "ICEGATE Login services" };
  }

  return null;
}

function ymdCompact(d: Date) {
  return d.toISOString().slice(0, 16).replace(/[-:T]/g, "");
}

async function runAdapter(db: any, source: SourceDefinition, text: string) {
  const plain = htmlToText(text);

  if (source.adapter === "us_ace") {
    const normal = /ACE applications are operating normally\.?/i.test(plain);
    const availabilitySection = plain.match(/System Availability Messages([\s\S]{0,900})Cargo Systems Messaging Service/i)?.[1] || "";
    const warning = /unavailable|outage|degraded|slow/i.test(availabilitySection) && !normal;
    if (normal) await updateSystem(db, source.system, "operational", "Operational", "CBP's public ACE Availability Dashboard states that ACE applications are operating normally.");
    else if (warning) await updateSystem(db, source.system, "degraded", "Check official status", "CBP's ACE Availability Dashboard contains a current availability warning. Open the source for component details.");
    else await updateSystem(db, source.system, "unknown", "Status needs review", "The ACE dashboard loaded, but TradeStatus could not confidently parse its current system-availability message.");
    return;
  }

  if (source.adapter === "hmrc_cds") {
    const plannedNone = /Planned downtime\s+None\.?/i.test(plain);
    const issuesNone = /Service issues\s+None\.?/i.test(plain);
    if (issuesNone && plannedNone) await updateSystem(db, source.system, "operational", "Operational", "HMRC reports no planned downtime and no current service issues.");
    else if (issuesNone) await updateSystem(db, source.system, "clear", "Upcoming notice", "No current CDS service issue is reported; an official planned-downtime notice is present.");
    else await updateSystem(db, source.system, "degraded", "Check official status", "HMRC's service page contains a current issue notice. Open the source for details.");
    return;
  }

  if (source.adapter === "sg_tradenet") {
    const scheduleFound = /unavailable on Sundays from 4am to 8am/i.test(plain);
    if (!scheduleFound) throw new Error("TradeNet maintenance wording not found; parser review required");
    if (singaporeMaintenanceActive()) await updateSystem(db, source.system, "maintenance", "Maintenance", "TradeNet is within its published Sunday 04:00–08:00 SGT maintenance window.");
    else await updateSystem(db, source.system, "clear", "No active advisory", "Published recurring maintenance is Sunday 04:00–08:00 SGT; no heartbeat status is inferred outside that window.");
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
    if (pilot || tugs) await updateSystem(db, source.system, "degraded", "Operational constraint", `${pilot ? "Amended pilot service" : ""}${pilot && tugs ? " and " : ""}${tugs ? "tugboat capacity arrangement" : ""} active until further notice.`);
    else await updateSystem(db, source.system, "clear", "No active advisory", "No currently parsed until-further-notice constraint is active in the Port Information Notices feed.");
    return;
  }

  if (source.adapter === "portbase_status") {
    if (/All Systems Operational/i.test(plain)) {
      await updateSystem(db, source.system, "operational", "Operational", "Portbase's official status service reports all monitored Port Community System services operational.");
    } else if (/Major (System )?Outage|major outage/i.test(plain)) {
      await updateSystem(db, source.system, "outage", "Major disruption", "Portbase's official status service reports a major outage. Open the source for affected services and updates.");
    } else if (/Partial (System )?Outage|Degraded Performance|degraded|partial outage/i.test(plain)) {
      await updateSystem(db, source.system, "degraded", "Degraded", "Portbase's official status service reports degraded or partially unavailable service. Open the source for component details.");
    } else if (/Under Maintenance|maintenance/i.test(plain)) {
      await updateSystem(db, source.system, "maintenance", "Maintenance", "Portbase's official status service contains an active maintenance notice.");
    } else {
      await updateSystem(db, source.system, "unknown", "Status needs review", "The Portbase status page loaded, but its current operational state could not be parsed confidently.");
    }
    return;
  }

  if (source.adapter === "panama_canal") {
    const a29 = plain.indexOf("A-29-2026 Additional Measures to Address Reduced Precipitation in the Canal Watershed");
    if (a29 < 0) throw new Error("Panama Canal A-29-2026 advisory not found; parser review required");
    const newer = plain.slice(0, a29);
    const possibleReversal = /(?:increase|restoration|restore)[^]{0,90}(?:slot|transit|capacity)/i.test(newer);
    if (possibleReversal) {
      await updateSystem(db, source.system, "unknown", "Status needs review", "A newer Panama Canal advisory may modify the capacity restrictions tracked from A-29-2026. TradeStatus is withholding a definitive state pending parser review.");
    } else {
      await verifyEvent(db, "pa-canal-capacity-20260903");
      await verifyEvent(db, "pa-canal-capacity-20260915");
      await updateSystem(db, source.system, "degraded", "Transit capacity restricted", "Panama Canal Authority restrictions remain in the monitored advisory sequence: nine Neopanamax slots and reduced Panamax capacity, tightening further on 15 September.");
    }
    return;
  }

  if (source.adapter === "jp_naccs") {
    if (!/2026年掲載情報/.test(plain) || !/NACCS/.test(plain)) throw new Error("NACCS news page structure not recognized");
    const entries = [...plain.matchAll(/(2026)年(\d{1,2})月(\d{1,2})日\s+(.{0,180}?)(?=(?:2026年\d{1,2}月\d{1,2}日)|$)/g)]
      .map((m) => ({ date: new Date(`${m[1]}-${String(+m[2]).padStart(2,"0")}-${String(+m[3]).padStart(2,"0")}T00:00:00+09:00`), title: m[4] }));
    const incident = entries.find((e) => /NACCS/.test(e.title) && /(利用不可|システム障害|アクセスがしづらい|遅延)/.test(e.title));
    if (incident && !/(復旧|改善)/.test(incident.title) && dateAgeDays(incident.date) <= 14) {
      await upsertEvent(db, {
        id: "jp-naccs-current-incident", systemId: source.system, countryCode: "JP", countryName: "Japan", region: "Asia-Pacific",
        eventType: "system_incident", severity: "moderate", confidence: "official", title: "NACCS service disruption bulletin",
        summary: "NACCS has published a recent service disruption notice without a newer recovery notice in the monitored bulletin feed.",
        impact: "Electronic import/export and port-related processing may be affected depending on the component named by NACCS.",
        workaround: "Check the official NACCS notice for affected functions and recovery instructions.", startsAt: incident.date.toISOString(),
        sourceName: "NACCS Center — official notices", sourceUrl: source.url
      });
      await updateSystem(db, source.system, "degraded", "Recent disruption bulletin", "A recent NACCS disruption notice is the latest matching system bulletin; check the official source for current scope.");
    } else {
      await resolveEvent(db, "jp-naccs-current-incident");
      await updateSystem(db, source.system, "clear", "No active advisory", "The latest matching NACCS disruption bulletin is resolved or outside the current incident window. This is bulletin monitoring, not a heartbeat check.");
    }
    return;
  }

  if (source.adapter === "kr_unipass") {
    if (!/UNI-PASS|전자통관/i.test(plain)) throw new Error("UNI-PASS portal structure not recognized");
    const notices = [...plain.matchAll(/([^\[]*서비스 중단 안내)\s*\[(\d{4}-\d{2}-\d{2})\]/g)]
      .map((m) => ({ title: m[1].trim(), date: new Date(`${m[2]}T00:00:00+09:00`) }))
      .sort((a,b) => b.date.getTime() - a.date.getTime());
    const recent = notices[0];
    if (recent && dateAgeDays(recent.date) <= 14) {
      await updateSystem(db, source.system, "clear", "Recent maintenance notice", `UNI-PASS has a service-interruption notice published ${recent.date.toISOString().slice(0,10)}. The public portal does not expose a continuous heartbeat; check the notice for its maintenance window.`);
    } else {
      await updateSystem(db, source.system, "clear", "No recent advisory", "No recent service-interruption notice is parsed from the official UNI-PASS related-agencies portal. This is bulletin monitoring, not a heartbeat check.");
    }
    return;
  }

  if (source.adapter === "in_icegate") {
    if (!/ICEGATE|Indian Customs National Trade Portal/i.test(plain)) throw new Error("ICEGATE homepage structure not recognized");
    const window = indiaMaintenanceWindow(plain);
    const now = new Date();
    if (window && window.end.getTime() > now.getTime() && window.start.getTime() < now.getTime() + 60 * 86400000) {
      const id = `in-icegate-maint-${ymdCompact(window.start)}`;
      await upsertEvent(db, {
        id, systemId: source.system, countryCode: "IN", countryName: "India", region: "Asia-Pacific",
        eventType: "scheduled_maintenance", severity: "moderate", confidence: "official", title: `${window.scope} scheduled maintenance`,
        summary: `${window.scope} are scheduled to be unavailable during the published ICEGATE maintenance window.`,
        impact: "Electronic customs filing or login may be unavailable for the affected ICEGATE scope during the window.",
        workaround: "Plan time-sensitive customs submissions outside the published maintenance period.", startsAt: window.start.toISOString(), endsAt: window.end.toISOString(),
        sourceName: "ICEGATE — Indian Customs National Trade Portal", sourceUrl: source.url
      });
      const active = window.start <= now && now < window.end;
      await updateSystem(db, source.system, active ? "maintenance" : "clear", active ? "Maintenance" : "Upcoming maintenance", `${window.scope} maintenance is published for ${window.start.toISOString()} to ${window.end.toISOString()}.`);
    } else {
      await updateSystem(db, source.system, "clear", "No active advisory", "No active or future ICEGATE maintenance window is parsed from the latest public homepage updates. This is bulletin monitoring, not a full heartbeat check.");
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
    return;
  }

  throw new Error(`Unknown adapter: ${source.adapter}`);
}

async function dueSources(db: any, force = false) {
  if (force) return SOURCES;
  const rows = await db.sql`SELECT id, last_checked_at, poll_interval_minutes FROM sources`;
  const byId = new Map(rows.map((row: any) => [row.id, row]));
  const now = Date.now();
  return SOURCES.filter((source) => {
    const row: any = byId.get(source.id);
    if (!row?.last_checked_at) return true;
    const interval = Number(row.poll_interval_minutes || source.pollMinutes) * 60000;
    return now - new Date(row.last_checked_at).getTime() >= interval * 0.9;
  });
}

export async function refreshAllSources(force = false) {
  const db = getDatabase();
  const due = await dueSources(db, force);
  if (!due.length) return [{ source: "scheduler", ok: true, skipped: true, reason: "No sources due" }];

  const results = await Promise.allSettled(due.map(async (source) => {
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
    : { source: due[index].id, ok: false, error: result.reason instanceof Error ? result.reason.message : String(result.reason) });
}
