import type { Config } from "@netlify/functions";
import { refreshGatewaySources } from "./_lib/gateway-refresh.mts";
export default async()=>{const result=await refreshGatewaySources(false);console.log("TradeStatus gateway refresh",JSON.stringify(result));};
export const config:Config={schedule:"11 * * * *"};
