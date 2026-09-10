# TradeStatus

TradeStatus is a public utility for two questions:

1. What is disrupting international trade infrastructure now?
2. What known disruption or maintenance window is coming next?

The MVP normalizes authoritative public customs, border and port notices into one event lifecycle: upcoming -> active -> resolved.

## Architecture

- Static, dependency-light frontend in `public/`
- Netlify Functions in `netlify/functions/`
- Netlify Database / Postgres with migrations in `netlify/database/migrations/`
- Scheduled source polling every 30 minutes
- JSON status API at `/api/status`
- iCalendar feed at `/calendar.ics`
- Static launch dataset fallback if the database/API is unavailable

## Trust model

`operational` means an authoritative status source explicitly reports no current issue. `clear` means no active advisory is present on the monitored bulletin/schedule; it is not treated as proof that a service is healthy. Third-party operational sources are labelled `reported` rather than `official`.

## Initial coverage

- United Kingdom — HMRC Customs Declaration Service (CDS)
- Singapore — TradeNet
- Germany — ATLAS / IAA-Plus
- Australia — DAFF biosecurity import systems
- Ireland — Automated Import System (AIS)
- Netherlands — Port of Rotterdam operational notices
- Belgium — iDMS/CERTEX (secondary operational source)
