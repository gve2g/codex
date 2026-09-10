import type { Config } from "@netlify/functions";
import { refreshPortWatchSources } from "./_lib/portwatch-refresh.mts";
export default async()=>{const result=await refreshPortWatchSources(false);console.log("TradeStatus PortWatch refresh",JSON.stringify(result));};
export const config:Config={schedule:"17 */6 * * *"};
