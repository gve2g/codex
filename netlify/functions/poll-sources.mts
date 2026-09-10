import type { Config } from "@netlify/functions";
import { refreshAllSources } from "./_lib/refresh-core.mts";
import { refreshExpansionSources } from "./_lib/refresh-expansion.mts";
import { refreshAsiaSources } from "./_lib/asia-refresh.mts";
import { refreshCalendarSources } from "./_lib/refresh-calendar.mts";

export default async () => {
  const [core, expansion, asia, calendar] = await Promise.all([
    refreshAllSources(),
    refreshExpansionSources(),
    refreshAsiaSources(),
    refreshCalendarSources()
  ]);
  console.log(JSON.stringify({ event: "trade-status-source-poll", core, expansion, asia, calendar }));
};

export const config: Config = { schedule: "*/15 * * * *" };
