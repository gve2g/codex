ALTER TABLE sources ADD COLUMN IF NOT EXISTS parser_version TEXT NOT NULL DEFAULT '1';
ALTER TABLE sources ADD COLUMN IF NOT EXISTS monitoring_mode TEXT NOT NULL DEFAULT 'bulletin';

INSERT INTO systems (id,name,short_name,country_code,country_name,region,authority,system_type,status,status_label,status_detail,signal_basis,confidence,timezone,official_url,last_checked_at,last_changed_at,freshness_minutes)
VALUES ('nl-portbase-pcs','Port Community System','Portbase PCS','NL','Netherlands','Europe','Portbase','customs','unknown','Awaiting live check','Portbase publishes real-time availability and scheduled maintenance for its Port Community System.','official_status','official','Europe/Amsterdam','https://status.portbase.com/',NULL,NULL,60)
ON CONFLICT (id) DO NOTHING;

INSERT INTO systems (id,name,short_name,country_code,country_name,region,authority,system_type,status,status_label,status_detail,signal_basis,confidence,timezone,official_url,last_checked_at,last_changed_at,freshness_minutes)
VALUES ('jp-naccs','Nippon Automated Cargo and Port Consolidated System','NACCS','JP','Japan','Asia-Pacific','NACCS Center','customs','clear','No active advisory','Official NACCS notices are monitored for system disruption and recovery bulletins; the public feed is not a continuous heartbeat.','official_bulletin','official','Asia/Tokyo','https://www.naccs.jp/news/news.html','2026-09-10T04:30:00Z','2026-03-04T00:00:00Z',1440)
ON CONFLICT (id) DO NOTHING;

INSERT INTO systems (id,name,short_name,country_code,country_name,region,authority,system_type,status,status_label,status_detail,signal_basis,confidence,timezone,official_url,last_checked_at,last_changed_at,freshness_minutes)
VALUES ('kr-unipass','UNI-PASS','UNI-PASS','KR','South Korea','Asia-Pacific','Korea Customs Service','customs','clear','No recent advisory','The public UNI-PASS related-agencies portal is monitored for electronic customs service interruption notices.','official_bulletin','official','Asia/Seoul','https://tunipass.customs.go.kr/rip/','2026-09-10T04:30:00Z','2026-01-26T00:00:00Z',1440)
ON CONFLICT (id) DO NOTHING;

INSERT INTO systems (id,name,short_name,country_code,country_name,region,authority,system_type,status,status_label,status_detail,signal_basis,confidence,timezone,official_url,last_checked_at,last_changed_at,freshness_minutes)
VALUES ('in-icegate','Indian Customs Electronic Gateway','ICEGATE','IN','India','Asia-Pacific','Central Board of Indirect Taxes and Customs','customs','clear','No active advisory','ICEGATE homepage updates are monitored for published maintenance windows and service disruption advisories.','official_bulletin','official','Asia/Kolkata','https://www.icegate.gov.in/','2026-09-10T04:30:00Z','2026-07-08T00:00:00Z',360)
ON CONFLICT (id) DO NOTHING;

INSERT INTO sources (id,system_id,name,url,adapter,source_tier,poll_interval_minutes,parser_version,monitoring_mode)
VALUES ('nl-portbase-status','nl-portbase-pcs','Portbase official status','https://status.portbase.com/','portbase_status',1,15,'1','heartbeat')
ON CONFLICT (id) DO UPDATE SET parser_version=EXCLUDED.parser_version, monitoring_mode=EXCLUDED.monitoring_mode, poll_interval_minutes=EXCLUDED.poll_interval_minutes;

INSERT INTO sources (id,system_id,name,url,adapter,source_tier,poll_interval_minutes,parser_version,monitoring_mode)
VALUES ('jp-naccs-news','jp-naccs','NACCS official notices','https://www.naccs.jp/news/news.html','jp_naccs',1,60,'1','bulletin')
ON CONFLICT (id) DO UPDATE SET parser_version=EXCLUDED.parser_version, monitoring_mode=EXCLUDED.monitoring_mode, poll_interval_minutes=EXCLUDED.poll_interval_minutes;

INSERT INTO sources (id,system_id,name,url,adapter,source_tier,poll_interval_minutes,parser_version,monitoring_mode)
VALUES ('kr-unipass-notices','kr-unipass','UNI-PASS related-agencies notices','https://tunipass.customs.go.kr/rip/','kr_unipass',1,60,'1','bulletin')
ON CONFLICT (id) DO UPDATE SET parser_version=EXCLUDED.parser_version, monitoring_mode=EXCLUDED.monitoring_mode, poll_interval_minutes=EXCLUDED.poll_interval_minutes;

INSERT INTO sources (id,system_id,name,url,adapter,source_tier,poll_interval_minutes,parser_version,monitoring_mode)
VALUES ('in-icegate-home','in-icegate','ICEGATE latest updates','https://www.icegate.gov.in/','in_icegate',1,30,'1','bulletin')
ON CONFLICT (id) DO UPDATE SET parser_version=EXCLUDED.parser_version, monitoring_mode=EXCLUDED.monitoring_mode, poll_interval_minutes=EXCLUDED.poll_interval_minutes;

UPDATE sources SET parser_version='2', monitoring_mode='heartbeat' WHERE id IN ('us-cbp-ace','hmrc-cds');
UPDATE sources SET parser_version='2', monitoring_mode='schedule' WHERE id='sg-customs-tradenet';
UPDATE sources SET parser_version='2', monitoring_mode='bulletin' WHERE id IN ('de-zoll-iaa','au-daff-notices','ie-revenue-ais');
UPDATE sources SET parser_version='2', monitoring_mode='operations' WHERE id='nl-rotterdam-pin';
UPDATE sources SET parser_version='2', monitoring_mode='secondary' WHERE id='c4t-status';
