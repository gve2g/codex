import type { Config } from "@netlify/functions";
import { refreshRegionalSources } from "./_lib/regional-refresh.mts";

export default async () => {
  const result = await refreshRegionalSources(false);
  console.log("TradeStatus regional refresh", JSON.stringify(result));
};

export const config: Config = { schedule: "7,37 * * * *" };
