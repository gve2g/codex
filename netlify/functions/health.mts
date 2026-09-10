import type { Config } from "@netlify/functions";
import { getDatabase } from "@netlify/database";
import { jsonResponse } from "./_lib/http.mts";

function iso(value: unknown): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  const d = new Date(String(value));
  return Number.isNaN(d.valueOf()) ? String(value) : d.toISOString();
}

export default async () => {
  const now = new Date();
  try {
    const db = getDatabase();
    const rows = await db.sql`
      SELECT
        s.id, s.system_id, s.name, s.url, s.source_tier, s.poll_interval_minutes,
        s.last_checked_at, s.last_success_at, s.last_changed_at,
        s.failure_count, s.health, s.last_error, s.parser_version, s.monitoring_mode,
        y.short_name AS system_name, y.country_name, y.region
      FROM sources s
      JOIN systems y ON y.id = s.system_id
      WHERE y.active = TRUE
      ORDER BY s.source_tier, y.region, y.country_name, s.name
    `;

    const sources = rows.map((row: any) => {
      const lastSuccess = row.last_success_at ? new Date(row.last_success_at) : null;
      const ageMinutes = lastSuccess ? Math.max(0, Math.floor((now.getTime() - lastSuccess.getTime()) / 60000)) : null;
      const expected = Math.max(5, Number(row.poll_interval_minutes || 60));
      const stale = ageMinutes === null || ageMinutes > expected * 3;
      const effectiveHealth = row.failure_count >= 3 ? "failing" : stale ? "stale" : row.health;
      return {
        ...row,
        source_tier: Number(row.source_tier || 1),
        poll_interval_minutes: expected,
        failure_count: Number(row.failure_count || 0),
        last_checked_at: iso(row.last_checked_at),
        last_success_at: iso(row.last_success_at),
        last_changed_at: iso(row.last_changed_at),
        age_minutes: ageMinutes,
        stale,
        effective_health: effectiveHealth
      };
    });

    return jsonResponse({
      generated_at: now.toISOString(),
      summary: {
        total: sources.length,
        healthy: sources.filter((s: any) => s.effective_health === "healthy").length,
        degraded: sources.filter((s: any) => s.effective_health === "degraded").length,
        stale: sources.filter((s: any) => s.effective_health === "stale").length,
        failing: sources.filter((s: any) => s.effective_health === "failing").length,
        pending: sources.filter((s: any) => s.effective_health === "pending").length
      },
      sources
    });
  } catch (error) {
    return jsonResponse({
      generated_at: now.toISOString(),
      error: "Source-health database unavailable",
      diagnostic: error instanceof Error ? error.message : String(error),
      summary: { total: 0, healthy: 0, degraded: 0, stale: 0, failing: 0, pending: 0 },
      sources: []
    }, 503);
  }
};

export const config: Config = { path: "/api/health" };
