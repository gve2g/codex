import type { Config } from "@netlify/functions";
import { refreshAsiaSources } from "./_lib/asia-refresh.mts";

export default async () => {
  const result = await refreshAsiaSources(false);
  console.log("TradeStatus Asia refresh", JSON.stringify(result));
};

export const config: Config = { schedule: "23,53 * * * *" };
