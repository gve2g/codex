import type { Config } from "@netlify/functions";
import { refreshAllSources } from "./_lib/refresh-core.mts";

export default async () => {
  const results = await refreshAllSources();
  console.log(JSON.stringify({ event: "trade-status-source-poll", results }));
};

export const config: Config = {
  schedule: "*/15 * * * *"
};
