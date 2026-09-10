import { createHash } from "node:crypto";

export async function fetchText(url: string, timeoutMs = 8000): Promise<{ text: string; hash: string; status: number }> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(timeoutMs),
    headers: {
      "user-agent": "TradeStatus/0.1 (+https://tradestatus-global.netlify.app; public-source monitor)",
      "accept": "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8"
    }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} from ${url}`);
  const text = await response.text();
  return {
    text,
    hash: createHash("sha256").update(text).digest("hex"),
    status: response.status
  };
}

export function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&ndash;|&#8211;/gi, "–")
    .replace(/&mdash;|&#8212;/gi, "—")
    .replace(/\s+/g, " ")
    .trim();
}

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}
