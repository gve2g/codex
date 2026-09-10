import type { Config } from "@netlify/functions";
import { refreshBulletinSources } from "./_lib/bulletin-refresh.mts";

export default async () => {
  const result = await refreshBulletinSources(false);
  console.log("TradeStatus bulletin refresh", JSON.stringify(result));
};

export const config: Config = { schedule: "17 * * * *" };
