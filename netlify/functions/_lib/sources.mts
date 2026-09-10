export type SourceDefinition = {
  id: string;
  system: string;
  adapter: string;
  url: string;
  pollMinutes: number;
  parserVersion: string;
  monitoringMode: "heartbeat" | "bulletin" | "schedule" | "operations" | "secondary";
};

export const SOURCES: SourceDefinition[] = [
  { id: "us-cbp-ace", system: "us-ace", adapter: "us_ace", url: "https://trade.cbp.dhs.gov/ace/dashboard/public/", pollMinutes: 15, parserVersion: "2", monitoringMode: "heartbeat" },
  { id: "hmrc-cds", system: "uk-cds", adapter: "hmrc_cds", url: "https://www.gov.uk/guidance/customs-declaration-service-service-availability-and-issues", pollMinutes: 30, parserVersion: "2", monitoringMode: "heartbeat" },
  { id: "sg-customs-tradenet", system: "sg-tradenet", adapter: "sg_tradenet", url: "https://www.customs.gov.sg/doing-business/quick-links-for-traders/tradenet/what-you-need-to-know-about-tradenet/", pollMinutes: 360, parserVersion: "2", monitoringMode: "schedule" },
  { id: "de-zoll-iaa", system: "de-atlas", adapter: "de_atlas", url: "https://www.iaap.zoll-portal.de/iaap/intro.do", pollMinutes: 30, parserVersion: "2", monitoringMode: "bulletin" },
  { id: "au-daff-notices", system: "au-daff-import", adapter: "au_daff", url: "https://www.agriculture.gov.au/biosecurity-trade/import/online-services/system-notifications/2026", pollMinutes: 60, parserVersion: "2", monitoringMode: "bulletin" },
  { id: "ie-revenue-ais", system: "ie-ais", adapter: "ie_ais", url: "https://www.revenue.ie/en/customs/businesses/electronic-systems/ais/annex-b-cci/index.aspx", pollMinutes: 360, parserVersion: "2", monitoringMode: "bulletin" },
  { id: "nl-rotterdam-pin", system: "nl-rotterdam", adapter: "rotterdam_pin", url: "https://pin.portofrotterdam.com/node/", pollMinutes: 30, parserVersion: "2", monitoringMode: "operations" },
  { id: "nl-portbase-status", system: "nl-portbase-pcs", adapter: "portbase_status", url: "https://status.portbase.com/", pollMinutes: 15, parserVersion: "1", monitoringMode: "heartbeat" },
  { id: "pa-canal-advisories", system: "pa-panama-canal", adapter: "panama_canal", url: "https://pancanal.com/en/maritime-services/advisory-to-shipping/", pollMinutes: 60, parserVersion: "1", monitoringMode: "operations" },
  { id: "jp-naccs-news", system: "jp-naccs", adapter: "jp_naccs", url: "https://www.naccs.jp/news/news.html", pollMinutes: 60, parserVersion: "1", monitoringMode: "bulletin" },
  { id: "kr-unipass-notices", system: "kr-unipass", adapter: "kr_unipass", url: "https://tunipass.customs.go.kr/rip/", pollMinutes: 60, parserVersion: "1", monitoringMode: "bulletin" },
  { id: "in-icegate-home", system: "in-icegate", adapter: "in_icegate", url: "https://www.icegate.gov.in/", pollMinutes: 30, parserVersion: "1", monitoringMode: "bulletin" },
  { id: "c4t-status", system: "be-idms", adapter: "c4t_status", url: "https://status.customs4trade.com/", pollMinutes: 30, parserVersion: "2", monitoringMode: "secondary" }
];

export const BULLETIN_SOURCES: SourceDefinition[] = [
  { id: "br-siscomex-systems", system: "br-siscomex", adapter: "br_siscomex", url: "https://www.gov.br/siscomex/pt-br/noticias/noticias-siscomex-sistemas", pollMinutes: 60, parserVersion: "1", monitoringMode: "bulletin" },
  { id: "za-sars-customs", system: "za-sars-customs", adapter: "za_sars", url: "https://www.sars.gov.za/whats-new-at-sars/", pollMinutes: 60, parserVersion: "1", monitoringMode: "bulletin" }
];

export const ALL_SOURCES: SourceDefinition[] = [...SOURCES, ...BULLETIN_SOURCES];
