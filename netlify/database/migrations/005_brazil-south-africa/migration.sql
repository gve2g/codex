INSERT INTO systems (id,name,short_name,country_code,country_name,region,authority,system_type,status,status_label,status_detail,signal_basis,confidence,timezone,official_url,last_checked_at,last_changed_at,freshness_minutes)
VALUES ('br-siscomex','Portal Único Siscomex','Siscomex','BR','Brazil','Americas','Receita Federal / SECEX','customs','clear','No recent advisory','Official Siscomex Systems notices are monitored for outages, instability and scheduled maintenance. This is bulletin monitoring, not a continuous heartbeat.','official_bulletin','official','America/Sao_Paulo','https://www.gov.br/siscomex/pt-br/noticias/noticias-siscomex-sistemas','2026-09-10T04:50:00Z','2026-07-23T16:59:00Z',1440)
ON CONFLICT (id) DO NOTHING;

INSERT INTO systems (id,name,short_name,country_code,country_name,region,authority,system_type,status,status_label,status_detail,signal_basis,confidence,timezone,official_url,last_checked_at,last_changed_at,freshness_minutes)
VALUES ('za-sars-customs','SARS Customs Digital Platforms','SARS Customs','ZA','South Africa','Africa','South African Revenue Service','customs','clear','No active advisory','SARS publishes scheduled digital-platform maintenance that may interrupt Customs Digital Platforms. The latest monitored window ended on 6 September 2026.','official_bulletin','official','Africa/Johannesburg','https://www.sars.gov.za/whats-new-at-sars/','2026-09-10T04:50:00Z','2026-09-06T23:30:00Z',1440)
ON CONFLICT (id) DO NOTHING;

INSERT INTO sources (id,system_id,name,url,adapter,source_tier,poll_interval_minutes,parser_version,monitoring_mode)
VALUES ('br-siscomex-systems','br-siscomex','Siscomex Systems notices','https://www.gov.br/siscomex/pt-br/noticias/noticias-siscomex-sistemas','br_siscomex',1,60,'1','bulletin')
ON CONFLICT (id) DO UPDATE SET parser_version=EXCLUDED.parser_version, monitoring_mode=EXCLUDED.monitoring_mode, poll_interval_minutes=EXCLUDED.poll_interval_minutes;

INSERT INTO sources (id,system_id,name,url,adapter,source_tier,poll_interval_minutes,parser_version,monitoring_mode)
VALUES ('za-sars-customs','za-sars-customs','SARS What''s New — digital platform notices','https://www.sars.gov.za/whats-new-at-sars/','za_sars',1,60,'1','bulletin')
ON CONFLICT (id) DO UPDATE SET parser_version=EXCLUDED.parser_version, monitoring_mode=EXCLUDED.monitoring_mode, poll_interval_minutes=EXCLUDED.poll_interval_minutes;
