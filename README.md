# TradeStatus

TradeStatus is a free public monitor for global trade infrastructure: customs systems, port operations, border delays, canal and strait constraints, and scheduled disruptions.

## Current V0.2 scope

The current baseline monitors 24 systems across 22 economies using 24 public sources. Coverage includes customs and trade IT systems, Port of Rotterdam/Portbase operations, Panama Canal restrictions, Turkish Straits directional traffic windows, Suez Canal navigation bulletins, and U.S. commercial border wait times.

## Product questions

1. What is disrupting international trade infrastructure now?
2. What known disruption or maintenance window is coming next?

The platform normalizes public notices into one lifecycle: upcoming -> active -> resolved -> historical.

## Architecture

- Static dependency-light frontend in `public/`
- Netlify Functions in `netlify/functions/`
- Netlify Database / Postgres migrations in `netlify/database/migrations/`
- Scheduled source polling with source-specific cadence
- JSON status API at `/api/status`
- source health API at `/api/health`
- iCalendar feed at `/calendar.ics`
- static fallback layers if the database/API is unavailable
- regression tests in `tests/`

## Trust model

`operational` is reserved for an authoritative source that explicitly reports normal operation. `clear` means no active advisory is present in the monitored bulletin, schedule, or operations feed; it is not treated as proof that a service is healthy. `unknown` is used whenever freshness or parser confidence is insufficient. Secondary sources are labelled `reported` rather than `official`.

A source failure cannot silently turn a monitored system green. Source polling stores parser version, monitoring mode, last check, last success and failure count; stale data is surfaced as unavailable.

## Source modes

- `heartbeat`: explicit current service health
- `bulletin`: official incident/maintenance announcements; silence is not operational proof
- `schedule`: future or recurring downtime windows
- `operations`: live movement/operational constraints
- `secondary`: trusted non-authority reporting used only when clearly labelled

## Current source families

Core: U.S. ACE, UK CDS, Singapore TradeNet, German ATLAS/IAA+, Australian biosecurity systems, Irish AIS, Rotterdam notices, Portbase PCS, Panama Canal, Japan NACCS, Korea UNI-PASS, India ICEGATE and Belgium iDMS/CERTEX.

Expansion: Brazil Siscomex, South Africa SARS customs platforms, New Zealand TSW, France DELTA IE, Hong Kong TSW, Taiwan Customs, Philippines E2M and Canada CBSA commercial systems/calendar.

Physical layer: Panama Canal, Turkish Straits, Suez Canal and U.S. commercial border wait times.

## Local development

```bash
npm install
npm test
npm run typecheck
npx netlify dev
```

Production polling is designed for published Netlify deploys. Never infer an operational state merely because a bulletin source has no recent notice.
