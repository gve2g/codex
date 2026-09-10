import type { Config } from "@netlify/functions";
import { loadDashboard } from "./_lib/data.mts";

function esc(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function icsDate(iso: string, allDay = false) {
  const d = new Date(iso);
  if (allDay) return d.toISOString().slice(0, 10).replace(/-/g, "");
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export default async () => {
  const data: any = await loadDashboard();
  const now = new Date();
  const horizon = new Date(now.getTime() + 45 * 86400000);
  const events = data.events.filter((event: any) => {
    const start = new Date(event.starts_at);
    return event.status !== "resolved" && start <= horizon;
  });

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TradeStatus//Global Trade Disruption Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:TradeStatus — Global Trade Disruptions",
    "X-WR-CALDESC:Confirmed trade infrastructure incidents and scheduled disruptions."
  ];

  for (const event of events) {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${esc(event.id)}@tradestatus-global.netlify.app`);
    lines.push(`DTSTAMP:${icsDate(data.generated_at)}`);
    lines.push(event.all_day ? `DTSTART;VALUE=DATE:${icsDate(event.starts_at, true)}` : `DTSTART:${icsDate(event.starts_at)}`);
    if (event.ends_at) lines.push(event.all_day ? `DTEND;VALUE=DATE:${icsDate(event.ends_at, true)}` : `DTEND:${icsDate(event.ends_at)}`);
    lines.push(`SUMMARY:${esc(`${event.country_name}: ${event.title}`)}`);
    lines.push(`DESCRIPTION:${esc(`${event.summary}\nImpact: ${event.operational_impact || "See source"}\nVerification: ${event.confidence}`)}`);
    lines.push(`URL:${event.source_url}`);
    if (event.recurrence) lines.push(`RRULE:${event.recurrence}`);
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");

  return new Response(lines.join("\r\n") + "\r\n", {
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": "inline; filename=tradestatus.ics",
      "cache-control": "public, max-age=300"
    }
  });
};

export const config: Config = {
  path: "/calendar.ics"
};
