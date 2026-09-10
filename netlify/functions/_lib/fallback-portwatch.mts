const shared = {
  authority: "International Monetary Fund — PortWatch",
  system_type: "chokepoint",
  status: "unknown",
  status_label: "Awaiting traffic check",
  signal_basis: "derived_traffic",
  confidence: "derived",
  official_url: "https://portwatch.imf.org/",
  last_checked_at: null,
  last_changed_at: null,
  freshness_minutes: 20160
} as const;

export const fallbackPortWatch = {
  schema_version: 1,
  systems: [
    { ...shared, id:"int-bab-el-mandeb",name:"Bab el-Mandeb Strait",short_name:"Bab el-Mandeb",country_code:"INT",country_name:"Yemen / Djibouti",region:"Middle East & Africa",timezone:"Africa/Djibouti",status_detail:"AIS-derived vessel traffic from IMF PortWatch. The metric is a lagged traffic signal and does not by itself establish whether passage is legally or physically closed." },
    { ...shared, id:"int-malacca",name:"Strait of Malacca",short_name:"Malacca",country_code:"INT",country_name:"Malaysia / Singapore / Indonesia",region:"Asia-Pacific",timezone:"Asia/Singapore",status_detail:"AIS-derived vessel traffic from IMF PortWatch. The metric is a lagged traffic signal and does not by itself establish passage availability." },
    { ...shared, id:"int-hormuz",name:"Strait of Hormuz",short_name:"Hormuz",country_code:"INT",country_name:"Iran / Oman",region:"Middle East & Africa",timezone:"Asia/Muscat",status_detail:"AIS-derived vessel traffic from IMF PortWatch. AIS gaps, spoofing and vessels going dark can affect interpretation during conflict." },
    { ...shared, id:"za-cape-good-hope",name:"Cape of Good Hope",short_name:"Cape of Good Hope",country_code:"ZA",country_name:"South Africa",region:"Middle East & Africa",timezone:"Africa/Johannesburg",status_detail:"AIS-derived vessel traffic from IMF PortWatch. Elevated traffic can be a useful rerouting signal when Suez or Bab el-Mandeb traffic falls." }
  ],
  events: [],
  sources: [
    { id:"imf-pw-suez",system_id:"eg-suez-canal",name:"IMF PortWatch — Suez Canal",url:"https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Daily_Chokepoints_Data/FeatureServer/0/query?where=portid%3D%27chokepoint1%27%20AND%20date%3E%3DDATE%20%272025-01-01%27&outFields=date,portid,portname,n_total,n_tanker,n_cargo,capacity&orderByFields=date%20ASC&resultRecordCount=1000&f=json",adapter:"portwatch_chokepoint",source_tier:1,poll_interval_minutes:360,parser_version:"2",monitoring_mode:"operations" },
    { id:"imf-pw-panama",system_id:"pa-panama-canal",name:"IMF PortWatch — Panama Canal",url:"https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Daily_Chokepoints_Data/FeatureServer/0/query?where=portid%3D%27chokepoint2%27%20AND%20date%3E%3DDATE%20%272025-01-01%27&outFields=date,portid,portname,n_total,n_tanker,n_cargo,capacity&orderByFields=date%20ASC&resultRecordCount=1000&f=json",adapter:"portwatch_chokepoint",source_tier:1,poll_interval_minutes:360,parser_version:"2",monitoring_mode:"operations" },
    { id:"imf-pw-bosphorus",system_id:"tr-turkish-straits",name:"IMF PortWatch — Bosporus Strait",url:"https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Daily_Chokepoints_Data/FeatureServer/0/query?where=portid%3D%27chokepoint3%27%20AND%20date%3E%3DDATE%20%272025-01-01%27&outFields=date,portid,portname,n_total,n_tanker,n_cargo,capacity&orderByFields=date%20ASC&resultRecordCount=1000&f=json",adapter:"portwatch_chokepoint",source_tier:1,poll_interval_minutes:360,parser_version:"2",monitoring_mode:"operations" },
    { id:"imf-pw-bab-el-mandeb",system_id:"int-bab-el-mandeb",name:"IMF PortWatch — Bab el-Mandeb Strait",url:"https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Daily_Chokepoints_Data/FeatureServer/0/query?where=portid%3D%27chokepoint4%27%20AND%20date%3E%3DDATE%20%272025-01-01%27&outFields=date,portid,portname,n_total,n_tanker,n_cargo,capacity&orderByFields=date%20ASC&resultRecordCount=1000&f=json",adapter:"portwatch_chokepoint",source_tier:1,poll_interval_minutes:360,parser_version:"2",monitoring_mode:"operations" },
    { id:"imf-pw-malacca",system_id:"int-malacca",name:"IMF PortWatch — Strait of Malacca",url:"https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Daily_Chokepoints_Data/FeatureServer/0/query?where=portid%3D%27chokepoint5%27%20AND%20date%3E%3DDATE%20%272025-01-01%27&outFields=date,portid,portname,n_total,n_tanker,n_cargo,capacity&orderByFields=date%20ASC&resultRecordCount=1000&f=json",adapter:"portwatch_chokepoint",source_tier:1,poll_interval_minutes:360,parser_version:"2",monitoring_mode:"operations" },
    { id:"imf-pw-hormuz",system_id:"int-hormuz",name:"IMF PortWatch — Strait of Hormuz",url:"https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Daily_Chokepoints_Data/FeatureServer/0/query?where=portid%3D%27chokepoint6%27%20AND%20date%3E%3DDATE%20%272025-01-01%27&outFields=date,portid,portname,n_total,n_tanker,n_cargo,capacity&orderByFields=date%20ASC&resultRecordCount=1000&f=json",adapter:"portwatch_chokepoint",source_tier:1,poll_interval_minutes:360,parser_version:"2",monitoring_mode:"operations" },
    { id:"imf-pw-cape-good-hope",system_id:"za-cape-good-hope",name:"IMF PortWatch — Cape of Good Hope",url:"https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Daily_Chokepoints_Data/FeatureServer/0/query?where=portid%3D%27chokepoint7%27%20AND%20date%3E%3DDATE%20%272025-01-01%27&outFields=date,portid,portname,n_total,n_tanker,n_cargo,capacity&orderByFields=date%20ASC&resultRecordCount=1000&f=json",adapter:"portwatch_chokepoint",source_tier:1,poll_interval_minutes:360,parser_version:"2",monitoring_mode:"operations" }
  ],
  metrics: []
} as const;
