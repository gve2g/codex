const MONTH_INDEX: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
};

export type BulletinNotice = {
  number: string;
  title: string;
  publishedAt: Date;
};

export type MaintenanceWindow = {
  startsAt: Date;
  endsAt: Date;
};

export function parseBrazilSystemNotices(plain: string): BulletinNotice[] {
  const notices: BulletinNotice[] = [];
  const pattern = /Sistemas\s+n[º°o]?\s*(\d{3})\/2026\s+(.+?)\s+publicado\s+(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2})h(\d{2})\s+Notícia/giu;
  for (const match of plain.matchAll(pattern)) {
    const [, number, title, day, month, year, hour, minute] = match;
    notices.push({
      number,
      title: title.replace(/\s+/g, " ").trim(),
      // Published times on gov.br are Brasília time (UTC-3).
      publishedAt: new Date(Date.UTC(+year, +month - 1, +day, +hour + 3, +minute))
    });
  }
  return notices.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

function localJohannesburgDate(day: number, month: string, year: number, hour: number, minute: number) {
  // South Africa is UTC+2 year-round.
  return new Date(Date.UTC(year, MONTH_INDEX[month.toLowerCase()], day, hour - 2, minute));
}

export function parseSarsMaintenanceWindows(plain: string): MaintenanceWindow[] {
  const first = plain.search(/SARS Digital platform upgrades on/i);
  if (first < 0) return [];
  // Limit parsing to the latest maintenance article excerpt on the listing page.
  const segment = plain.slice(first, first + 4500);
  const windows: MaintenanceWindow[] = [];
  const pattern = /(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s*(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\s+from\s+(\d{1,2})h(\d{2})\s+to\s+(\d{1,2})h(\d{2})(?:\s+(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s*(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4}))?/gi;

  for (const match of segment.matchAll(pattern)) {
    const [, sDay, sMonth, sYear, sHour, sMinute, eHour, eMinute, eDayRaw, eMonthRaw, eYearRaw] = match;
    const start = localJohannesburgDate(+sDay, sMonth, +sYear, +sHour, +sMinute);
    let end: Date;
    if (eDayRaw && eMonthRaw && eYearRaw) {
      end = localJohannesburgDate(+eDayRaw, eMonthRaw, +eYearRaw, +eHour, +eMinute);
    } else {
      end = localJohannesburgDate(+sDay, sMonth, +sYear, +eHour, +eMinute);
      if (end <= start) end = new Date(end.getTime() + 86400000);
    }
    windows.push({ startsAt: start, endsAt: end });
  }
  return windows.sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
}

export function findBrazilNoticeUrl(html: string, number: string, baseUrl: string): string | null {
  const normalized = number.replace(/^0+/, "") || "0";
  const patterns = [
    new RegExp(`href=["']([^"']*sistemas-no-2026-0*${normalized}[^"']*)["']`, "i"),
    new RegExp(`href=["']([^"']*)["'][^>]*>[^<]*Sistemas\\s+n[º°o]?\\s*0*${normalized}\\/2026`, "i")
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      try { return new URL(match[1], baseUrl).toString(); } catch { return null; }
    }
  }
  return null;
}

function brasiliaDate(day: number, month: number, year: number, hour: number, minute: number) {
  // Brasília is UTC-3 in 2026.
  return new Date(Date.UTC(year, month - 1, day, hour + 3, minute));
}

export function parseBrazilMaintenanceWindow(plain: string): MaintenanceWindow | null {
  const dateMatch = plain.match(/(?:dia|em)\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/i);
  if (!dateMatch) return null;
  const [, dayRaw, monthRaw, yearRaw] = dateMatch;
  const day = +dayRaw, month = +monthRaw, year = +yearRaw;

  const ranges = [
    /entre\s+(\d{1,2})h(?:(\d{2}))?\s+e\s+(\d{1,2})h(?:(\d{2}))?/i,
    /de\s+(\d{1,2}):?(\d{2})?\s+(?:até|a)\s+(\d{1,2}):?(\d{2})?/i,
    /das?\s+(\d{1,2})h(?:(\d{2}))?\s+(?:às|a)\s+(\d{1,2})h(?:(\d{2}))?/i
  ];
  for (const pattern of ranges) {
    const m = plain.match(pattern);
    if (!m) continue;
    const start = brasiliaDate(day, month, year, +m[1], +(m[2] || 0));
    let end = brasiliaDate(day, month, year, +m[3], +(m[4] || 0));
    if (end <= start) end = new Date(end.getTime() + 86400000);
    return { startsAt: start, endsAt: end };
  }
  return null;
}
