
CREATE TABLE IF NOT EXISTS systems (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  country_code TEXT NOT NULL,
  country_name TEXT NOT NULL,
  region TEXT NOT NULL,
  authority TEXT NOT NULL,
  system_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unknown',
  status_label TEXT NOT NULL DEFAULT 'Status unavailable',
  status_detail TEXT,
  signal_basis TEXT,
  confidence TEXT NOT NULL DEFAULT 'official',
  timezone TEXT NOT NULL DEFAULT 'UTC',
  official_url TEXT NOT NULL,
  last_checked_at TIMESTAMPTZ,
  last_changed_at TIMESTAMPTZ,
  freshness_minutes INTEGER NOT NULL DEFAULT 1440,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  system_id TEXT REFERENCES systems(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  adapter TEXT NOT NULL,
  source_tier INTEGER NOT NULL DEFAULT 1,
  poll_interval_minutes INTEGER NOT NULL DEFAULT 60,
  last_checked_at TIMESTAMPTZ,
  last_success_at TIMESTAMPTZ,
  last_changed_at TIMESTAMPTZ,
  last_hash TEXT,
  failure_count INTEGER NOT NULL DEFAULT 0,
  health TEXT NOT NULL DEFAULT 'pending',
  last_error TEXT
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  system_id TEXT REFERENCES systems(id) ON DELETE CASCADE,
  country_code TEXT NOT NULL,
  country_name TEXT NOT NULL,
  region TEXT NOT NULL,
  event_type TEXT NOT NULL,
  status TEXT NOT NULL,
  severity TEXT NOT NULL,
  confidence TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  operational_impact TEXT,
  workaround TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  all_day BOOLEAN NOT NULL DEFAULT FALSE,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_tier INTEGER NOT NULL DEFAULT 1,
  last_verified_at TIMESTAMPTZ,
  recurrence TEXT,
  fingerprint TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_starts_at ON events(starts_at);
CREATE INDEX IF NOT EXISTS idx_events_system_id ON events(system_id);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_systems_region ON systems(region);

INSERT INTO systems (id,name,short_name,country_code,country_name,region,authority,system_type,status,status_label,status_detail,signal_basis,confidence,timezone,official_url,last_checked_at,last_changed_at,freshness_minutes) VALUES ('uk-cds','Customs Declaration Service','CDS','GB','United Kingdom','Europe','HM Revenue & Customs','customs','operational','Operational','HMRC reports no planned downtime and no current service issues.','official_status','official','Europe/London','https://www.gov.uk/guidance/customs-declaration-service-service-availability-and-issues','2026-09-10T03:20:00Z','2026-07-09T00:00:00Z',1440) ON CONFLICT (id) DO NOTHING;

INSERT INTO systems (id,name,short_name,country_code,country_name,region,authority,system_type,status,status_label,status_detail,signal_basis,confidence,timezone,official_url,last_checked_at,last_changed_at,freshness_minutes) VALUES ('sg-tradenet','TradeNet','TradeNet','SG','Singapore','Asia-Pacific','Singapore Customs','customs','clear','No active advisory','Singapore Customs publishes a recurring maintenance window every Sunday from 04:00 to 08:00 SGT.','published_schedule','official','Asia/Singapore','https://www.customs.gov.sg/doing-business/quick-links-for-traders/tradenet/what-you-need-to-know-about-tradenet/','2026-09-10T03:20:00Z','2026-08-01T00:00:00Z',10080) ON CONFLICT (id) DO NOTHING;

INSERT INTO systems (id,name,short_name,country_code,country_name,region,authority,system_type,status,status_label,status_detail,signal_basis,confidence,timezone,official_url,last_checked_at,last_changed_at,freshness_minutes) VALUES ('de-atlas','ATLAS / IAA-Plus','ATLAS','DE','Germany','Europe','German Customs (Zoll)','customs','clear','No active advisory','IAA-Plus is available now; an official maintenance window is scheduled for 12 September.','official_notice','official','Europe/Berlin','https://www.iaap.zoll-portal.de/iaap/intro.do','2026-09-10T03:20:00Z','2026-09-02T07:29:00Z',1440) ON CONFLICT (id) DO NOTHING;

INSERT INTO systems (id,name,short_name,country_code,country_name,region,authority,system_type,status,status_label,status_detail,signal_basis,confidence,timezone,official_url,last_checked_at,last_changed_at,freshness_minutes) VALUES ('au-daff-import','Biosecurity import systems','DAFF Import','AU','Australia','Asia-Pacific','Department of Agriculture, Fisheries and Forestry','biosecurity','clear','No active advisory','The latest official notices show BICON restored and the 6–7 September multi-system maintenance window completed.','official_bulletin','official','Australia/Sydney','https://www.agriculture.gov.au/biosecurity-trade/import/online-services/system-notifications/2026','2026-09-10T03:20:00Z','2026-09-03T00:00:00Z',1440) ON CONFLICT (id) DO NOTHING;

INSERT INTO systems (id,name,short_name,country_code,country_name,region,authority,system_type,status,status_label,status_detail,signal_basis,confidence,timezone,official_url,last_checked_at,last_changed_at,freshness_minutes) VALUES ('ie-ais','Automated Import System','AIS','IE','Ireland','Europe','Revenue Ireland','customs','clear','No active advisory','AIS V2 Stage 2 is scheduled to go live on 15 September 2026, with a three-month migration window.','official_notice','official','Europe/Dublin','https://www.revenue.ie/en/customs/businesses/electronic-systems/ais/annex-b-cci/index.aspx','2026-09-10T03:20:00Z','2026-06-16T00:00:00Z',10080) ON CONFLICT (id) DO NOTHING;

INSERT INTO systems (id,name,short_name,country_code,country_name,region,authority,system_type,status,status_label,status_detail,signal_basis,confidence,timezone,official_url,last_checked_at,last_changed_at,freshness_minutes) VALUES ('nl-rotterdam','Port of Rotterdam operations','Rotterdam','NL','Netherlands','Europe','Port of Rotterdam Authority','port','degraded','Operational constraint','Official Port Information Notices show amended pilot service for small vessels and a tugboat capacity arrangement active until further notice.','official_operations','official','Europe/Amsterdam','https://pin.portofrotterdam.com/node/','2026-09-10T03:20:00Z','2026-09-09T03:06:00Z',180) ON CONFLICT (id) DO NOTHING;

INSERT INTO systems (id,name,short_name,country_code,country_name,region,authority,system_type,status,status_label,status_detail,signal_basis,confidence,timezone,official_url,last_checked_at,last_changed_at,freshness_minutes) VALUES ('be-idms','iDMS Imports / CERTEX','iDMS','BE','Belgium','Europe','Belgian customs system (status relayed by Customs4trade)','customs','degraded','Degraded','A CERTEX connection issue remains in monitoring status and the emergency procedure is reported active.','secondary_status','reported','Europe/Brussels','https://status.customs4trade.com/','2026-09-10T03:20:00Z','2026-09-04T18:51:00Z',180) ON CONFLICT (id) DO NOTHING;

INSERT INTO sources (id,system_id,name,url,adapter,source_tier,poll_interval_minutes) VALUES ('hmrc-cds','uk-cds','HMRC CDS availability','https://www.gov.uk/guidance/customs-declaration-service-service-availability-and-issues','hmrc_cds',1,30) ON CONFLICT (id) DO NOTHING;

INSERT INTO sources (id,system_id,name,url,adapter,source_tier,poll_interval_minutes) VALUES ('sg-customs-tradenet','sg-tradenet','Singapore Customs TradeNet guide','https://www.customs.gov.sg/doing-business/quick-links-for-traders/tradenet/what-you-need-to-know-about-tradenet/','sg_tradenet',1,360) ON CONFLICT (id) DO NOTHING;

INSERT INTO sources (id,system_id,name,url,adapter,source_tier,poll_interval_minutes) VALUES ('de-zoll-iaa','de-atlas','German Customs IAA-Plus','https://www.iaap.zoll-portal.de/iaap/intro.do','de_atlas',1,30) ON CONFLICT (id) DO NOTHING;

INSERT INTO sources (id,system_id,name,url,adapter,source_tier,poll_interval_minutes) VALUES ('au-daff-notices','au-daff-import','DAFF import system notifications','https://www.agriculture.gov.au/biosecurity-trade/import/online-services/system-notifications/2026','au_daff',1,60) ON CONFLICT (id) DO NOTHING;

INSERT INTO sources (id,system_id,name,url,adapter,source_tier,poll_interval_minutes) VALUES ('ie-revenue-ais','ie-ais','Revenue AIS V2','https://www.revenue.ie/en/customs/businesses/electronic-systems/ais/annex-b-cci/index.aspx','ie_ais',1,360) ON CONFLICT (id) DO NOTHING;

INSERT INTO sources (id,system_id,name,url,adapter,source_tier,poll_interval_minutes) VALUES ('nl-rotterdam-pin','nl-rotterdam','Port of Rotterdam PIN','https://pin.portofrotterdam.com/node/','rotterdam_pin',1,30) ON CONFLICT (id) DO NOTHING;

INSERT INTO sources (id,system_id,name,url,adapter,source_tier,poll_interval_minutes) VALUES ('c4t-status','be-idms','Customs4trade status','https://status.customs4trade.com/','c4t_status',3,30) ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id,system_id,country_code,country_name,region,event_type,status,severity,confidence,title,summary,operational_impact,workaround,starts_at,ends_at,resolved_at,all_day,source_name,source_url,source_tier,last_verified_at,recurrence,fingerprint) VALUES ('be-idms-certex-20260904','be-idms','BE','Belgium','Europe','system_incident','active','moderate','reported','iDMS imports — CERTEX connection issue','A CERTEX connection issue is affecting iDMS imports. The emergency procedure is reported active for urgent shipments.','Import declarations that depend on the CERTEX connection may require the Belgian customs emergency procedure.','For urgent shipments, follow the emergency procedure and reference codes published in the source notice.','2026-09-04T14:00:00Z',NULL,NULL,FALSE,'Customs4trade status (relaying customs-authority information)','https://status.customs4trade.com/',3,'2026-09-10T03:20:00Z',NULL,'be-idms-certex-20260904') ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id,system_id,country_code,country_name,region,event_type,status,severity,confidence,title,summary,operational_impact,workaround,starts_at,ends_at,resolved_at,all_day,source_name,source_url,source_tier,last_verified_at,recurrence,fingerprint) VALUES ('nl-rotterdam-pilot-20260909','nl-rotterdam','NL','Netherlands','Europe','port_constraint','active','moderate','official','Amended pilot service for small vessels','The Port of Rotterdam has an amended pilot service for small vessels active until further notice.','Pilotage arrangements for affected small vessels may differ from normal operations.','Check the current Port Information Notice before arrival or departure planning.','2026-09-09T03:06:00Z',NULL,NULL,FALSE,'Port of Rotterdam Authority — Port Information Notices','https://pin.portofrotterdam.com/node/',1,'2026-09-10T03:20:00Z',NULL,'nl-rotterdam-pilot-20260909') ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id,system_id,country_code,country_name,region,event_type,status,severity,confidence,title,summary,operational_impact,workaround,starts_at,ends_at,resolved_at,all_day,source_name,source_url,source_tier,last_verified_at,recurrence,fingerprint) VALUES ('nl-rotterdam-tugs-20260908','nl-rotterdam','NL','Netherlands','Europe','port_constraint','active','limited','official','Boluda tugboat capacity arrangement','A capacity arrangement for Boluda tugboats is active at Rotterdam until further notice.','Tug availability or operating arrangements may be constrained for some vessel movements.','Consult the current Port Information Notice and local agent for operational requirements.','2026-09-08T15:52:00Z',NULL,NULL,FALSE,'Port of Rotterdam Authority — Port Information Notices','https://pin.portofrotterdam.com/node/',1,'2026-09-10T03:20:00Z',NULL,'nl-rotterdam-tugs-20260908') ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id,system_id,country_code,country_name,region,event_type,status,severity,confidence,title,summary,operational_impact,workaround,starts_at,ends_at,resolved_at,all_day,source_name,source_url,source_tier,last_verified_at,recurrence,fingerprint) VALUES ('de-atlas-maint-20260912','de-atlas','DE','Germany','Europe','scheduled_maintenance','upcoming','moderate','official','ATLAS / IAA-Plus scheduled maintenance','German Customs says IAA-Plus will be unavailable on 12 September from 13:45 to 23:59 local time.','Internet export declarations through IAA-Plus will be unavailable during the maintenance window.','Submit time-sensitive export declarations before the maintenance window where practical.','2026-09-12T11:45:00Z','2026-09-12T21:59:00Z',NULL,FALSE,'German Customs (Zoll) — IAA-Plus','https://www.iaap.zoll-portal.de/iaap/intro.do',1,'2026-09-10T03:20:00Z',NULL,'de-atlas-maint-20260912') ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id,system_id,country_code,country_name,region,event_type,status,severity,confidence,title,summary,operational_impact,workaround,starts_at,ends_at,resolved_at,all_day,source_name,source_url,source_tier,last_verified_at,recurrence,fingerprint) VALUES ('sg-tradenet-maint-20260913','sg-tradenet','SG','Singapore','Asia-Pacific','scheduled_maintenance','upcoming','moderate','official','TradeNet recurring maintenance','TradeNet is unavailable every Sunday from 04:00 to 08:00 SGT for maintenance.','TradeNet permit applications and other transactions cannot be processed through the system during the published window.','Plan permit submissions around the Sunday maintenance window.','2026-09-12T20:00:00Z','2026-09-13T00:00:00Z',NULL,FALSE,'Singapore Customs — TradeNet','https://www.customs.gov.sg/doing-business/quick-links-for-traders/tradenet/what-you-need-to-know-about-tradenet/',1,'2026-09-10T03:20:00Z','FREQ=WEEKLY;BYDAY=SU','sg-tradenet-maint-20260913') ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id,system_id,country_code,country_name,region,event_type,status,severity,confidence,title,summary,operational_impact,workaround,starts_at,ends_at,resolved_at,all_day,source_name,source_url,source_tier,last_verified_at,recurrence,fingerprint) VALUES ('ie-ais-v2-20260915','ie-ais','IE','Ireland','Europe','system_cutover','upcoming','info','official','AIS V2 Stage 2 goes live','Revenue Ireland will deploy AIS V2 Stage 2 on 15 September 2026, introducing a new data set and message structure.','Importers, customs agents and software providers need to support the revised AIS V2 data set and messages during the migration period.','Confirm software readiness and migration plans; AIS V1 remains available during the three-month migration window.','2026-09-15T00:00:00Z','2026-09-16T00:00:00Z',NULL,TRUE,'Revenue Ireland — AIS V2','https://www.revenue.ie/en/customs/businesses/electronic-systems/ais/annex-b-cci/index.aspx',1,'2026-09-10T03:20:00Z',NULL,'ie-ais-v2-20260915') ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id,system_id,country_code,country_name,region,event_type,status,severity,confidence,title,summary,operational_impact,workaround,starts_at,ends_at,resolved_at,all_day,source_name,source_url,source_tier,last_verified_at,recurrence,fingerprint) VALUES ('au-multi-maint-20260906','au-daff-import','AU','Australia','Asia-Pacific','scheduled_maintenance','resolved','moderate','official','DAFF multiple-system service disruption','Australia''s agriculture department scheduled a multi-system service disruption from 6 to 7 September.','Multiple biosecurity import systems were affected during the maintenance window.',NULL,'2026-09-06T00:00:00Z','2026-09-07T23:59:00Z','2026-09-07T23:59:00Z',TRUE,'Australian DAFF — Import system notifications','https://www.agriculture.gov.au/biosecurity-trade/import/online-services/system-notifications/2026',1,'2026-09-10T03:20:00Z',NULL,'au-multi-maint-20260906') ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id,system_id,country_code,country_name,region,event_type,status,severity,confidence,title,summary,operational_impact,workaround,starts_at,ends_at,resolved_at,all_day,source_name,source_url,source_tier,last_verified_at,recurrence,fingerprint) VALUES ('au-bicon-20260903','au-daff-import','AU','Australia','Asia-Pacific','system_incident','resolved','moderate','official','BICON unplanned service disruption','An unplanned BICON service disruption was reported and a services-restored notice was published the same day.','Biosecurity import condition lookups were temporarily affected.',NULL,'2026-09-03T00:00:00Z','2026-09-03T23:59:00Z','2026-09-03T23:59:00Z',TRUE,'Australian DAFF — Import system notifications','https://www.agriculture.gov.au/biosecurity-trade/import/online-services/system-notifications/2026',1,'2026-09-10T03:20:00Z',NULL,'au-bicon-20260903') ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id,system_id,country_code,country_name,region,event_type,status,severity,confidence,title,summary,operational_impact,workaround,starts_at,ends_at,resolved_at,all_day,source_name,source_url,source_tier,last_verified_at,recurrence,fingerprint) VALUES ('nl-rotterdam-lock-20260907','nl-rotterdam','NL','Netherlands','Europe','port_constraint','resolved','moderate','official','Rozenburg Lock disruption','A Rozenburg Lock navigation disruption was activated and subsequently deactivated on 7 September.','Navigation through the affected lock was temporarily disrupted.',NULL,'2026-09-07T10:51:00Z','2026-09-07T12:37:00Z','2026-09-07T12:37:00Z',FALSE,'Port of Rotterdam Authority — Port Information Notices','https://pin.portofrotterdam.com/node/',1,'2026-09-10T03:20:00Z',NULL,'nl-rotterdam-lock-20260907') ON CONFLICT (id) DO NOTHING;
