export const fallbackGateway = {
  schema_version: 1,
  systems: [
    {
      id: "mx-vucem", name: "Ventanilla Única de Comercio Exterior Mexicana", short_name: "VUCEM",
      country_code: "MX", country_name: "Mexico", region: "Americas", authority: "VUCEM / SAT",
      system_type: "customs", status: "clear", status_label: "No current bulletin flagged",
      status_detail: "The official VUCEM information-sheet index is monitored for maintenance, contingency, suspension and restoration notices. This is bulletin monitoring, not a heartbeat.",
      signal_basis: "official_bulletin", confidence: "official", timezone: "America/Mexico_City",
      official_url: "https://www.ventanillaunica.gob.mx/vucem/hojasinformativas.html",
      last_checked_at: "2026-09-10T05:55:00Z", last_changed_at: "2026-08-01T00:00:00Z", freshness_minutes: 1440
    },
    {
      id: "eu-ics2", name: "Import Control System 2", short_name: "ICS2",
      country_code: "EU", country_name: "European Union", region: "Europe", authority: "European Commission DG TAXUD",
      system_type: "customs", status: "clear", status_label: "No current central incident bulletin",
      status_detail: "The European Commission ICS2 page is monitored for central technical and availability notices. It is not a live component-status heartbeat.",
      signal_basis: "official_bulletin", confidence: "official", timezone: "Europe/Brussels",
      official_url: "https://taxation-customs.ec.europa.eu/customs/customs-security/import-control-system-2_en",
      last_checked_at: "2026-09-10T05:55:00Z", last_changed_at: "2026-07-01T00:00:00Z", freshness_minutes: 2880
    }
  ],
  events: [],
  sources: [
    { id:"mx-vucem-notices",system_id:"mx-vucem",name:"VUCEM information sheets",url:"https://www.ventanillaunica.gob.mx/vucem/hojasinformativas.html",adapter:"mx_vucem",source_tier:1,poll_interval_minutes:60,parser_version:"1",monitoring_mode:"bulletin" },
    { id:"eu-ics2-news",system_id:"eu-ics2",name:"European Commission ICS2 latest news",url:"https://taxation-customs.ec.europa.eu/customs/customs-security/import-control-system-2_en",adapter:"eu_ics2",source_tier:1,poll_interval_minutes:120,parser_version:"1",monitoring_mode:"bulletin" }
  ]
} as const;
