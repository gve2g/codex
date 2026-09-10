import type { Config } from "@netlify/functions";
import { refreshAllSources } from "./_lib/refresh-core.mts";
import { refreshExpansionSources } from "./_lib/refresh-expansion.mts";
import { refreshCalendarSources } from "./_lib/refresh-calendar.mts";

export default async () => {
  const [core, expansion, calendar] = await Promise.all([
    refreshAllSources(),
    refreshExpansionSources(),
    refreshCalendarSources()
  ]);
  console.log(JSON.stringify({ event: "trade-status-source-poll", core, expansion, calendar }));
};

export const config: Config = { schedule: "*/15 * * * *" };
