# TradeStatus

TradeStatus is a free public monitor for global trade infrastructure: customs systems, port operations, canal constraints and scheduled disruptions.

## Current V0.2 scope

- 17 economies / 18 monitored systems in the fallback launch dataset
- Explicit distinction between live heartbeat, bulletin, schedule, operations and secondary sources
- Per-source polling cadence, parser version and stale-source detection
- Current incident board and 7/30-day forward calendar
- System, region and infrastructure filtering
- Evidence/provenance links for every event
- Source-health console at `/health.html`
- JSON status endpoint at `/api/status`
- Source-health endpoint at `/api/health`
- iCal feed at `/calendar.ics`
- Netlify Database schema and migrations
- Scheduled source polling with due-source skipping

## Monitoring rule

TradeStatus never interprets silence as proof of availability. `Operational` is reserved for explicit health signals. Bulletin-only sources are shown as `No active advisory` or `No recent advisory`, and stale sources become `Status unavailable`.

## Source families currently wired

- U.S. CBP ACE availability
- UK HMRC CDS availability
- Singapore TradeNet schedule
- German Customs ATLAS / IAA-Plus notices
- Australia DAFF import-system notifications
- Ireland AIS notices
- Port of Rotterdam operational notices
- Portbase PCS status
- Japan NACCS notices
- South Korea UNI-PASS notices
- India ICEGATE latest updates
- Brazil Portal Único Siscomex notices
- South Africa SARS Customs Digital Platform maintenance
- New Zealand Trade Single Window live status and maintenance
- France DELTA IE import anomaly journal
- Hong Kong Trade Single Window system notices
- Panama Canal advisories to shipping
- Belgium iDMS/CERTEX via a secondary operational-status source

## Local development

Install dependencies and run with Netlify Dev so scheduled functions and Netlify Database are emulated.

```bash
npm install
netlify dev
```
