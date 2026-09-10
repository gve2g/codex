import type { Config } from "@netlify/functions";
import { refreshAllSources } from "./_lib/refresh-core.mts";
import { refreshExpansionSources } from "./_lib/refresh-expansion.mts";

export default async () => {
  const [core, expansion] = await Promise.all([
    refreshAllSources(),
    refreshExpansionSources()
  ]);
  console.log(JSON.stringify({ event: "trade-status-source-poll", core, expansion }));
};

export const config: Config = {
  schedule: "*/15 * * * *"
};
