import { getDatabase } from "@netlify/database";
import { fetchText, htmlToText } from "./http.mts";
import { BULLETIN_SOURCES, type SourceDefinition } from "./sources.mts";
import { parseBrazilSystemNotices, parseBrazilMaintenanceWindow, findBrazilNoticeUrl, parseSarsMaintenanceWindows } from "./bulletin-parsers.mts";

async function markSource(db: any, source: SourceDefinition, ok: boolean, hash?: string, error?: string) {
  if (ok) {
    await db.sql`
      UPDATE sources SET last_checked_at=NOW(), last_success_at=NOW(), health='healthy', failure_count=0,
        last_hash=${hash || null}, last_error=NULL, parser_version=${source.parserVersion}, monitoring_mode=${source.monitoringMode},
        last_changed_at=CASE WHEN last_hash IS DISTINCT FROM ${hash || null} THEN NOW() ELSE last_changed_at END
      WHERE id=${source.id}`;
  } else {
    await db.sql`
      UPDATE sources SET last_checked_at=NOW(), failure_count=failure_count+1,
        health=CASE WHEN failure_count >= 2 THEN 'failing' ELSE 'degraded' END,
        last_error=${error || "Unknown fetch error"}, parser_version=${source.parserVersion}, monitoring_mode=${source.monitoringMode}
      WHERE id=${source.id}`;
  }
}

async function updateSystem(db: any, id: string, status: string, label: string, detail: string) {
  await db.sql`UPDATE systems SET status=${status}, status_label=${label}, status_detail=${detail}, last_checked_at=NOW() WHERE id=${id}`;
}

async function upsertEvent(db: any, event: {
  id: string; systemId: string; countryCode: string; countryName: string; region: string;
  eventType: string; severity: string; title: string; summary: string; impact: string; workaround: string;
  startsAt: string; endsAt: string; sourceName: string; sourceUrl: string;
}) {
  await db.sql`
    INSERT INTO events (id,system_id,country_code,country_name,region,event_type,status,severity,confidence,title,summary,
      operational_impact,workaround,starts_at,ends_at,all_day,source_name,source_url,source_tier,last_verified_at,fingerprint)
    VALUES (${event.id},${event.systemId},${event.countryCode},${event.countryName},${event.region},${event.eventType},'upcoming',${event.severity},'official',
      ${event.title},${event.summary},${event.impact},${event.workaround},${event.startsAt},${event.endsAt},FALSE,${event.sourceName},${event.sourceUrl},1,NOW(),${event.id})
    ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, summary=EXCLUDED.summary, operational_impact=EXCLUDED.operational_impact,
      workaround=EXCLUDED.workaround, starts_at=EXCLUDED.starts_at, ends_at=EXCLUDED.ends_at, last_verified_at=NOW(), updated_at=NOW(), resolved_at=NULL`;
}

function ageDays(date: Date, now = new Date()) {
  return Math.floor((now.getTime() - date.getTime()) / 86400000);
}

function idTime(date: Date) {
  return date.toISOString().slice(0,16).replace(/[-:T]/g, "");
}

async function refreshBrazil(db: any, source: SourceDefinition, html: string) {
  const plain = htmlToText(html);
  if (!/Notícias Siscomex Sistemas/i.test(plain)) throw new Error("Siscomex Systems listing structure not recognized");
  const notices = parseBrazilSystemNotices(plain);
  if (!notices.length) throw new Error("No Siscomex Systems notices parsed");
  const relevant = notices.find((n) => /(parada programada|manutenção programada|indispon|impactad|ocorrências|falha|instabilidade)/i.test(n.title));
  const now = new Date();

  if (relevant && /(parada programada|manutenção programada)/i.test(relevant.title) && ageDays(relevant.publishedAt, now) <= 60) {
    const detailUrl = findBrazilNoticeUrl(html, relevant.number, source.url);
    if (detailUrl) {
      const detail = await fetchText(detailUrl);
      const window = parseBrazilMaintenanceWindow(htmlToText(detail.text));
      if (window && window.endsAt > now && window.startsAt.getTime() < now.getTime() + 60 * 86400000) {
        await upsertEvent(db, {
          id:`br-siscomex-maint-${idTime(window.startsAt)}`, systemId:source.system, countryCode:"BR", countryName:"Brazil", region:"Americas",
          eventType:"scheduled_maintenance", severity:"moderate", title:"Siscomex scheduled maintenance",
          summary:"Portal Único Siscomex has a published maintenance or system-stop window.",
          impact:"Electronic foreign-trade processing may be unavailable or unstable during the published maintenance window.",
          workaround:"Plan time-sensitive declarations outside the official maintenance window and check the linked Siscomex notice for affected modules.",
          startsAt:window.startsAt.toISOString(), endsAt:window.endsAt.toISOString(), sourceName:`Siscomex Systems notice ${relevant.number}/2026`, sourceUrl:detailUrl
        });
        const active = window.startsAt <= now && now < window.endsAt;
        await updateSystem(db, source.system, active ? "maintenance" : "clear", active ? "Maintenance" : "Upcoming maintenance",
          `Official Siscomex notice ${relevant.number}/2026 contains a maintenance window from ${window.startsAt.toISOString()} to ${window.endsAt.toISOString()}.`);
        return;
      }
    }
  }

  const recentIncident = relevant && ageDays(relevant.publishedAt, now) <= 14 && /(indispon|impactad|ocorrências|falha|instabilidade)/i.test(relevant.title);
  if (recentIncident && !/(correções implementadas|normaliza|restabelec|solucionad)/i.test(relevant.title)) {
    await updateSystem(db, source.system, "clear", "Recent system bulletin",
      `Siscomex published a recent systems notice (${relevant.number}/2026): ${relevant.title}. The bulletin listing alone is not treated as proof of a continuing outage.`);
  } else {
    await updateSystem(db, source.system, "clear", "No recent advisory",
      "No recent unresolved outage or future maintenance window is parsed from the official Siscomex Systems bulletin stream. This is bulletin monitoring, not a heartbeat check.");
  }
}

async function refreshSouthAfrica(db: any, source: SourceDefinition, html: string) {
  const plain = htmlToText(html);
  if (!/SARS Digital platform upgrades on/i.test(plain)) throw new Error("SARS digital-platform maintenance feed not found");
  const windows = parseSarsMaintenanceWindows(plain);
  if (!windows.length) throw new Error("SARS maintenance notice found but no maintenance windows parsed");
  const now = new Date();
  const relevant = windows.filter((w) => w.endsAt > now && w.startsAt.getTime() < now.getTime() + 60 * 86400000);

  for (const window of relevant) {
    await upsertEvent(db, {
      id:`za-sars-maint-${idTime(window.startsAt)}`, systemId:source.system, countryCode:"ZA", countryName:"South Africa", region:"Africa",
      eventType:"scheduled_maintenance", severity:"moderate", title:"SARS Customs Digital Platforms maintenance",
      summary:"SARS has scheduled digital-platform maintenance that may cause intermittent interruption to Customs Digital Platforms.",
      impact:"Electronic customs services may be intermittently unavailable during the published maintenance window.",
      workaround:"Submit time-sensitive customs transactions before the maintenance period where practical and consult the official SARS notice for any specific border-processing instructions.",
      startsAt:window.startsAt.toISOString(), endsAt:window.endsAt.toISOString(), sourceName:"South African Revenue Service — digital platform maintenance", sourceUrl:source.url
    });
  }

  const active = relevant.find((w) => w.startsAt <= now && now < w.endsAt);
  const future = relevant.find((w) => w.startsAt > now);
  if (active) await updateSystem(db, source.system, "maintenance", "Maintenance", "SARS Customs Digital Platforms are within a published digital-platform maintenance window; intermittent interruption may occur.");
  else if (future) await updateSystem(db, source.system, "clear", "Upcoming maintenance", `SARS has published Customs Digital Platform maintenance beginning ${future.startsAt.toISOString()}.`);
  else await updateSystem(db, source.system, "clear", "No active advisory", "The latest published SARS digital-platform maintenance window has ended. This source is a bulletin stream, not a continuous heartbeat.");
}

async function due(db: any, force: boolean) {
  if (force) return BULLETIN_SOURCES;
  const rows = await db.sql`SELECT id,last_checked_at,poll_interval_minutes FROM sources WHERE id IN ('br-siscomex-systems','za-sars-customs')`;
  const byId = new Map(rows.map((r:any)=>[r.id,r]));
  const now = Date.now();
  return BULLETIN_SOURCES.filter((s) => {
    const row:any = byId.get(s.id);
    if (!row?.last_checked_at) return true;
    return now - new Date(row.last_checked_at).getTime() >= Number(row.poll_interval_minutes || s.pollMinutes) * 60000 * 0.9;
  });
}

export async function refreshBulletinSources(force=false) {
  const db = getDatabase();
  const sources = await due(db, force);
  if (!sources.length) return [{source:"bulletin-scheduler",ok:true,skipped:true}];
  const results = await Promise.allSettled(sources.map(async (source) => {
    try {
      const {text,hash}=await fetchText(source.url, 12000);
      if (source.adapter === "br_siscomex") await refreshBrazil(db,source,text);
      else if (source.adapter === "za_sars") await refreshSouthAfrica(db,source,text);
      else throw new Error(`Unknown bulletin adapter: ${source.adapter}`);
      await markSource(db,source,true,hash);
      return {source:source.id,ok:true};
    } catch (error) {
      const message=error instanceof Error?error.message:String(error);
      await markSource(db,source,false,undefined,message);
      throw new Error(`${source.id}: ${message}`);
    }
  }));
  return results.map((r,i)=>r.status==="fulfilled"?r.value:{source:sources[i].id,ok:false,error:r.reason instanceof Error?r.reason.message:String(r.reason)});
}
