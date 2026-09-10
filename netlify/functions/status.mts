import type { Config } from "@netlify/functions";
import { loadDashboard } from "./_lib/data.mts";
import { jsonResponse } from "./_lib/http.mts";

export default async () => {
  const data = await loadDashboard();
  return jsonResponse(data);
};

export const config: Config = {
  path: "/api/status"
};
