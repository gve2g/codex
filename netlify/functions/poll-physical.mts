import type { Config } from "@netlify/functions";
import { refreshPhysicalSources } from "./_lib/physical-refresh.mts";

export default async () => {
  const result = await refreshPhysicalSources(false);
  console.log("TradeStatus physical refresh", JSON.stringify(result));
};

export const config: Config = { schedule: "11,26,41,56 * * * *" };
