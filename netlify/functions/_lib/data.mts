import { getDatabase } from "@netlify/database";
import { fallbackData } from "./fallback.mts";
import { fallbackExpansion } from "./fallback-expansion.mts";

function mergeById(base: readonly any[], extra: readonly any[]) {
  const map = new Map<string, any>();
  for (const item of [...base, ...extra]) map.set(item.id, item);
  return [...map.values()];
}

function mergedFallback() {
  const systems = mergeById(fallbackData.systems as readonly any[], fallbackExpansion.systems as readonly any[]);
  const events = mergeById(fallbackData.events as readonly any[], fallbackExpansion.events as readonly any[]);
  const sources = mergeById((fallbackData.sources || []) as readonly any[], fallbackExpansion.sources as readonly any[]);
  return {
    ...fallbackData,
    coverage: {
      economies: new Set(systems.map((s: any) => s.country_code)).size,
      systems: systems.length,
      sources: sources.length
    },
    systems, events, sources
  };
}

const SEVERITY_RANK: Record<string, number> = { major: 4, moderate: 3, limited: 2, info: 1 };

function iso(value: unknown): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  const d = new Date(String(value));
  return Number.isNaN(d.valueOf()) ? String(value) : d.toISOString();
}

export function lifecycle(event: any, now = new Date()): "active" | "upcoming" | "resolved" {
  if (event.resolved_at) return "resolved";
  const start = new Date(event.starts_at);
  const end = event.ends_at ? new Date(event.ends_at) : null;
  if (start > now) return "upcoming";
  if (end && end <= now) return "resolved";
  return "active";
}

function normalizeEvent(row: any, now: Date) {
  return {
    ...row,
    starts_at: iso(row.starts_at),
    ends_at: iso(row.ends_at),
    resolved_at: iso(row.resolved_at),
    last_verified_at: iso(row.last_verified_at),
    status: lifecycle(row, now),
    all_day: Boolean(row.all_day)
  };
}

function normalizeSystem(row: any) {
  return {
    ...row,
    last_checked_at: iso(row.last_checked_at),
    last_changed_at: iso(row.last_changed_at),
    freshness_minutes: Number(row.freshness_minutes || 1440)
  };
}

function expandRecurringEvents(events: any[], now: Date) {
  const floor = now.getTime() - 21 * 86400000;
  const ceiling = now.getTime() + 60 * 86400000;
  const output: any[] = [];
  for (const event of events) {
    if (event.recurrence !== "FREQ=WEEKLY;BYDAY=SU") { output.push(event); continue; }
    const baseStart = new Date(event.starts_at).getTime();
    const duration = event.ends_at ? new Date(event.ends_at).getTime() - baseStart : 0;
    for (let start = baseStart, n = 0; start <= ceiling; start += 7 * 86400000, n += 1) {
      const end = duration ? start + duration : null;
      if ((end || start) < floor) continue;
      output.push({ ...event, id: `${event.id}-r${n}`, starts_at: new Date(start).toISOString(), ends_at: end ? new Date(end).toISOString() : null, resolved_at: null, recurrence: null, recurrence_source: event.id });
    }
  }
  return output;
}

function deriveSystemStatus(system: any, events: any[], now: Date) {
  const checked = system.last_checked_at ? new Date(system.last_checked_at).getTime() : 0;
  const freshnessMs = Number(system.freshness_minutes || 1440) * 60000;
  if (!checked || now.getTime() - checked > freshnessMs) return { ...system, status: "unknown", status_label: "Status unavailable", status_detail: "The monitored source is stale or outside its freshness window." };
  const active = events.filter((event) => {
    if (event.system_id !== system.id || lifecycle(event, now) !== "active") return false;
    if (!event.last_verified_at) return true;
    return now.getTime() - new Date(event.last_verified_at).getTime() <= freshnessMs;
  });
  if (!active.length) return system;
  active.sort((a, b) => (SEVERITY_RANK[b.severity] || 0) - (SEVERITY_RANK[a.severity] || 0));
  const top = active[0];
  if (top.event_type === "scheduled_maintenance") return { ...system, status: "maintenance", status_label: "Maintenance", status_detail: top.summary };
  if (top.severity === "major") return { ...system, status: "outage", status_label: "Major disruption", status_detail: top.summary };
  return { ...system, status: "degraded", status_label: "Operational constraint", status_detail: top.summary };
}

function summarize(systems: any[], events: any[], now: Date) {
  const active = events.filter((e) => lifecycle(e, now) === "active");
  const seven = new Date(now.getTime() + 7 * 86400000);
  const upcoming7 = events.filter((e) => { const start = new Date(e.starts_at); return lifecycle(e, now) === "upcoming" && start <= seven; });
  return { active_major: active.filter((e) => e.severity === "major").length, active_constraints: active.length, upcoming_7d: upcoming7.length, monitored_systems: systems.length };
}

export async function loadDashboard() {
  const now = new Date();
  try {
    const db = getDatabase();
    const [systemsRows, eventRows, sourceRows] = await Promise.all([
      db.sql`SELECT * FROM systems WHERE active = TRUE ORDER BY region, country_name, name`,
      db.sql`SELECT * FROM events WHERE starts_at >= NOW() - INTERVAL '21 days' OR resolved_at IS NULL ORDER BY starts_at ASC`,
      db.sql`SELECT id, system_id, name, url, source_tier, poll_interval_minutes, parser_version, monitoring_mode, last_checked_at, last_success_at, failure_count, health, last_error FROM sources ORDER BY source_tier, name`
    ]);
    if (!systemsRows.length) throw new Error("Database contains no systems");
    const events = expandRecurringEvents(eventRows.map((row: any) => normalizeEvent(row, now)), now).map((event: any) => ({ ...event, status: lifecycle(event, now) }));
    const systems = systemsRows.map(normalizeSystem).map((s: any) => deriveSystemStatus(s, events, now));
    const sources = sourceRows.map((row: any) => ({ ...row, last_checked_at: iso(row.last_checked_at), last_success_at: iso(row.last_success_at), failure_count: Number(row.failure_count || 0), poll_interval_minutes: Number(row.poll_interval_minutes || 60), source_tier: Number(row.source_tier || 1) }));
    return { schema_version: 1, generated_at: now.toISOString(), mode: "live", coverage: { economies: new Set(systems.map((s: any) => s.country_code)).size, systems: systems.length, sources: sources.length }, summary: summarize(systems, events, now), systems, events, sources };
  } catch (error) {
    const fallback = mergedFallback();
    const events = expandRecurringEvents(fallback.events.map((event: any) => normalizeEvent({ ...event }, now)), now).map((event: any) => ({ ...event, status: lifecycle(event, now) }));
    const systems = fallback.systems.map((system: any) => deriveSystemStatus({ ...system }, events, now));
    return { ...fallback, generated_at: now.toISOString(), mode: "launch_dataset", summary: summarize(systems, events, now), systems, events, diagnostic: error instanceof Error ? error.message : "Database unavailable" };
  }
}
