# Reflect First Website — Implementation Plan

## Overview

Build a fast, editorial, institutional marketing site for **Reflect First**, a platform for interactive case-study modules on AI governance and the future of work. The site positions Reflect First as a serious modular education platform — not an app or SaaS tool.

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js 14 (App Router)** | Static/hybrid rendering, fast, great DX |
| Styling | **Tailwind CSS** | Utility-first, precise typography/spacing control |
| Content | **MDX + local JSON/YAML** | Easy to edit, no external CMS dependency for V1 |
| Forms | **React Hook Form + server action or API route** | Lightweight, accessible |
| Analytics | **Plausible or Google Analytics snippet** | Minimal, privacy-friendly |
| Deployment | **Netlify or Vercel** | Zero-config, fast CDN |
| Email (forms)| **Resend or Nodemailer** | Simple transactional email for form submissions |

**Why not a headless CMS?** V1 prioritizes speed-to-launch. Content lives in structured MDX/JSON files — easy to edit, version-controlled, and trivially migrated to a CMS later.

---

## Project Structure

```
reflect-first/
├── public/
│   ├── fonts/                    # Self-hosted typefaces
│   ├── images/                   # Logo, OG images, icons
│   └── downloads/                # Sample scenario PDF
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout (header, footer, fonts, metadata)
│   │   ├── page.tsx              # Home
│   │   ├── modules/
│   │   │   └── page.tsx          # Modules listing
│   │   ├── how-it-works/
│   │   │   └── page.tsx          # How It Works
│   │   ├── certification/
│   │   │   └── page.tsx          # Certification
│   │   ├── for-universities/
│   │   │   └── page.tsx          # For Universities
│   │   ├── for-schools/
│   │   │   └── page.tsx          # For Schools
│   │   ├── pricing/
│   │   │   └── page.tsx          # Pricing
│   │   ├── resources/
│   │   │   └── page.tsx          # Resources listing
│   │   ├── contact/
│   │   │   └── page.tsx          # Contact
│   │   ├── sample/
│   │   │   └── page.tsx          # Sample scenario download form
│   │   ├── book-pilot/
│   │   │   └── page.tsx          # Book pilot / request pricing form
│   │   ├── privacy/
│   │   │   └── page.tsx          # Privacy Policy
│   │   ├── terms/
│   │   │   └── page.tsx          # Terms
│   │   └── api/
│   │       ├── contact/
│   │       │   └── route.ts      # Contact form handler
│   │       ├── sample/
│   │       │   └── route.ts      # Sample download form handler
│   │       └── book-pilot/
│   │           └── route.ts      # Pilot inquiry form handler
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── SectionIntro.tsx
│   │   │   ├── StepsComponent.tsx
│   │   │   ├── FeatureList.tsx
│   │   │   ├── MetadataStrip.tsx
│   │   │   ├── TagList.tsx
│   │   │   ├── CTABand.tsx
│   │   │   ├── FAQAccordion.tsx
│   │   │   └── PricingBlock.tsx
│   │   ├── modules/
│   │   │   └── ModuleCard.tsx
│   │   ├── resources/
│   │   │   └── ResourceCard.tsx
│   │   └── forms/
│   │       ├── ContactForm.tsx
│   │       ├── SampleDownloadForm.tsx
│   │       └── PilotInquiryForm.tsx
│   ├── content/
│   │   ├── modules.json          # Module data (titles, descriptions, scenarios)
│   │   ├── pricing.json          # Pricing tiers and details
│   │   ├── resources.json        # Resource entries
│   │   ├── site.json             # Site-wide settings (CTAs, contact info, tagline)
│   │   └── faqs.json             # FAQ entries (for later use)
│   ├── lib/
│   │   ├── email.ts              # Email sending utility
│   │   └── validation.ts         # Form validation schemas (zod)
│   └── styles/
│       └── globals.css           # Tailwind base + custom typography
├── tailwind.config.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Design System

### Color Palette (Tailwind custom theme)

```
background:    #FAF9F7  (warm white)
foreground:    #1A1A2E  (deep navy / near-black)
muted:         #64748B  (slate gray)
accent:        #9B3A2B  (oxblood / muted rust)
accent-light:  #C4644A  (lighter rust for hover states)
border:        #E2E0DC  (warm gray for rules/dividers)
surface:       #F3F1ED  (slightly darker warm white for cards)
```

### Typography

```
Headings:    "Newsreader" or "Source Serif 4" (elegant serif)
Body:        "Inter" or "IBM Plex Sans" (clean sans-serif)
Labels/Meta: "IBM Plex Mono" or "JetBrains Mono" (monospaced, used sparingly)
```

Heading scale (desktop):
- H1: 3rem / 48px, tight tracking
- H2: 2.25rem / 36px
- H3: 1.5rem / 24px
- H4: 1.125rem / 18px
- Body: 1rem / 16px, 1.7 line-height
- Small/Label: 0.75rem / 12px, uppercase, tracked

### Spacing

- Section padding: 6rem (96px) vertical
- Content max-width: 72rem (1152px)
- Generous whitespace between all elements
- Thin 1px borders as dividers (border color)

### Component Design Language

- **Cards**: Subtle border, no shadow or very faint shadow; metadata labels at top; clean hierarchy
- **CTAs**: Solid accent background with white text (primary); bordered with accent text (secondary)
- **Rules**: Thin horizontal rules between sections
- **Labels**: Small uppercase monospaced tags for metadata (audience, format, etc.)

---

## Build Phases

### Phase 1: Foundation (Steps 1–4)

| Step | Task | Details |
|------|------|---------|
| 1 | **Project setup** | Initialize Next.js 14, Tailwind, TypeScript, folder structure |
| 2 | **Design tokens & globals** | Configure Tailwind theme (colors, fonts, spacing), global CSS, font loading |
| 3 | **Core UI components** | Button, Card, SectionIntro, MetadataStrip, TagList, CTABand |
| 4 | **Layout components** | Header (wordmark + nav + CTA), Footer (nav + links), responsive mobile menu |

### Phase 2: Homepage (Steps 5–8)

| Step | Task | Details |
|------|------|---------|
| 5 | **Hero section** | Eyebrow, H1, paragraph, 2 CTAs, trust strip |
| 6 | **What / Why / Modules sections** | "What Reflect First is" (2-col), "Why it works" (4-card grid), Modules preview (2 large cards) |
| 7 | **Included / How / Who sections** | "What's included" (6-item grid), "How it works" (4-step), "Who it's for" (audience chips) |
| 8 | **Remaining homepage sections** | Certification snippet, pricing snapshot, resources preview (3 cards), final CTA band |

### Phase 3: Core Pages (Steps 9–14)

| Step | Task | Details |
|------|------|---------|
| 9 | **Modules page** | Page intro, 2 module detail sections (AI Governance, Future of Work), bundle section |
| 10 | **How It Works page** | 5-section walkthrough (format → package → deliver → measure → stay current) |
| 11 | **Certification page** | Hero, intro, why/who/what/process/renewal/quality sections, CTA |
| 12 | **For Universities page** | Headline, why/departments/delivery/what-received/use-cases/procurement sections |
| 13 | **For Schools page** | Headline, why/75-min format/adaptation/career/teacher support sections |
| 14 | **Pricing page** | 4 tier cards (University, School, Bundle, Direct Delivery), certification add-on, procurement section |

### Phase 4: Supporting Pages & Forms (Steps 15–19)

| Step | Task | Details |
|------|------|---------|
| 15 | **Contact page + form** | Intro, form (Name, Institution, Role, Email, Interest type, Module interest, Audience type, Message), API route |
| 16 | **Sample Scenario download page + form** | Form (Name, Email, Institution, Role, Audience type, Module of interest), post-submit thank-you, API route |
| 17 | **Book Pilot page + form** | Form (Name, Institution, Role, Email, Audience level, Module, Group size, Timing, Notes), API route |
| 18 | **Resources page** | Resource listing with cards, CTAs on each resource, filterable later |
| 19 | **Privacy & Terms pages** | Placeholder content structure, clean typography |

### Phase 5: Polish & Launch Readiness (Steps 20–23)

| Step | Task | Details |
|------|------|---------|
| 20 | **SEO metadata** | Per-page titles, descriptions, OG tags, structured data, sitemap.xml, robots.txt |
| 21 | **Responsive polish** | Mobile nav, touch targets, form usability, typography scaling |
| 22 | **Accessibility audit** | Semantic HTML, ARIA labels, keyboard navigation, focus states, color contrast |
| 23 | **Analytics & conversion tracking** | Analytics snippet, form submission events, download tracking |

---

## Content Files Schema

### `site.json`
```json
{
  "name": "Reflect First",
  "tagline": "Interactive case studies for technology policy education",
  "contactEmail": "...",
  "ctas": {
    "primaryLabel": "Download a Sample Scenario",
    "primaryHref": "/sample",
    "secondaryLabel": "Book a Pilot Session",
    "secondaryHref": "/book-pilot"
  }
}
```

### `modules.json`
```json
[
  {
    "slug": "ai-governance",
    "title": "AI Governance",
    "positioning": "A case-based module on how governments, institutions, and organizations should respond to the risks and tradeoffs of AI.",
    "audiences": ["Political Science", "Law", "Public Policy", "Senior Secondary"],
    "formats": ["3-hour", "75-minute"],
    "scenarios": ["Deepfakes", "Autonomous Weapons", "Algorithmic Decision-Making", "Public Sector AI"],
    "included": ["Scenario briefs", "Facilitator guide", "Slide deck", "Evaluation rubric", "Pre/post assessments", "Student feedback tools"]
  },
  {
    "slug": "future-of-work",
    "title": "Future of Work",
    "positioning": "A case-based module on automation, surveillance, credentialing, labour markets, and the political economy of AI-driven workplace change.",
    "audiences": ["Business", "Economics", "Sociology", "Policy", "Career-oriented school programs"],
    "formats": ["3-hour", "75-minute"],
    "scenarios": ["Automation Clause", "Portfolio Career", "Remote Monitor", "Junior Associate", "UBI Pilot"],
    "included": ["Scenario briefs", "Facilitator guide", "Slide deck", "Evaluation rubric", "Pre/post assessments", "Student feedback tools"]
  }
]
```

### `pricing.json`
```json
[
  {
    "title": "University License",
    "description": "Annual institutional license with full teaching package for repeated use.",
    "features": ["Full teaching package", "Facilitator guide", "Assessment tools", "Quarterly updates"],
    "cta": "Contact for Pricing"
  },
  {
    "title": "School License",
    "description": "Annual school license with adapted shorter-format materials and teacher-ready support.",
    "features": ["Adapted 75-min materials", "Teacher guidance", "Assessment tools", "Quarterly updates"],
    "cta": "Contact for Pricing"
  },
  {
    "title": "Module Bundle",
    "description": "License AI Governance + Future of Work together at a discounted rate.",
    "features": ["Both modules", "Volume discount", "Unified teaching system"],
    "cta": "Contact for Pricing"
  },
  {
    "title": "Direct Delivery / Pilot",
    "description": "Live delivery by Reflect First. Ideal for first-time institutions.",
    "features": ["Expert facilitation", "Full materials", "Post-session report"],
    "cta": "Book a Pilot"
  }
]
```

### `resources.json`
```json
[
  {
    "title": "Sample Scenario",
    "type": "download",
    "description": "Try a complete Reflect First scenario brief.",
    "href": "/sample"
  },
  {
    "title": "How to Teach Difficult Technology-Policy Debates",
    "type": "article",
    "description": "A guide to structured discussion on contested technology issues.",
    "href": "/resources/teach-difficult-debates"
  },
  {
    "title": "Why AI Governance Belongs in the Classroom",
    "type": "article",
    "description": "The case for integrating AI governance into higher education curricula.",
    "href": "/resources/ai-governance-classroom"
  },
  {
    "title": "Teaching the Future of Work Without Reducing It to Tools",
    "type": "article",
    "description": "Moving beyond tool-training to structural and political questions about work.",
    "href": "/resources/future-of-work-teaching"
  }
]
```

---

## Form Specifications

### Contact Form
| Field | Type | Required |
|-------|------|----------|
| Name | text | yes |
| Institution / Organization | text | yes |
| Role | text | yes |
| Email | email | yes |
| Interest Type | select (University license, School license, Pilot session, Certification, Speaking/workshop, General inquiry) | yes |
| Module Interest | select (AI Governance, Future of Work, Both, Not sure yet) | yes |
| Audience Type | select (University, School, Organization, Other) | no |
| Message | textarea | no |

### Sample Scenario Download Form
| Field | Type | Required |
|-------|------|----------|
| Name | text | yes |
| Email | email | yes |
| Institution | text | yes |
| Role | text | yes |
| Audience Type | select | no |
| Module of Interest | select | no |

**Post-submit**: Thank-you message + immediate PDF download link.

### Book Pilot / Request Pricing Form
| Field | Type | Required |
|-------|------|----------|
| Name | text | yes |
| Institution | text | yes |
| Role | text | yes |
| Email | email | yes |
| Audience Level | select (University, School, Organization) | yes |
| Desired Module | select | yes |
| Estimated Group Size | text | no |
| Timing | text | no |
| Notes | textarea | no |

---

## SEO Configuration

### Page Titles & Descriptions

| Page | Title | Description |
|------|-------|-------------|
| Home | Reflect First \| Interactive Case Studies for Technology Policy Education | Reflect First provides interactive case-study modules, facilitator support, and institutional licensing for teaching AI governance, the future of work, and related technology-policy issues. |
| Modules | Modules \| Reflect First | Explore Reflect First's case-based teaching modules on AI governance and the future of work. Each module includes scenario briefs, facilitator guides, and assessment tools. |
| How It Works | How It Works \| Reflect First | Learn how to adopt Reflect First — from choosing a module and format to delivering sessions and measuring outcomes. |
| Certification | Facilitator Certification \| Reflect First | Reflect First certification ensures consistent, high-quality classroom delivery. Built for educators, facilitators, and institutional partners. |
| For Universities | Reflect First for Universities | Case-based teaching modules for political science, law, public policy, business, and economics programs at the university level. |
| For Schools | Reflect First for Schools | Guided classroom discussion modules on technology, work, and public life — adapted for shorter delivery and supported by practical teacher guidance. |
| Pricing | Licensing and Pricing \| Reflect First | Institutional licensing, pilot delivery, and facilitator certification options for Reflect First modules. |
| Resources | Resources \| Reflect First | Articles, sample scenarios, and teaching guides for technology policy education. |
| Contact | Contact \| Reflect First | Get in touch about licensing, pilot sessions, certification, or general inquiries. |

### Technical SEO
- `sitemap.xml` auto-generated via Next.js
- `robots.txt` allowing all crawlers
- Open Graph + Twitter Card meta tags per page
- Canonical URLs
- Semantic HTML (proper heading hierarchy, landmarks)

---

## Content the Client Must Supply

Before launch, the following assets are needed from the client:

- [ ] Final logo / wordmark (SVG preferred)
- [ ] Final tagline selection
- [ ] Final homepage hero headline
- [ ] Final module descriptions (review drafts above)
- [ ] Final pricing language / ranges
- [ ] Sample scenario PDF file
- [ ] Contact email address
- [ ] Privacy policy text
- [ ] Terms of use text
- [ ] Any institutional references or proof points
- [ ] Headshots / bio content (if About page added later)

---

## What Is Explicitly Out of Scope for V1

- Login / authentication
- Course portal or student dashboard
- Facilitator dashboard
- Scheduling system
- CRM backend
- Elaborate animations or parallax
- Stock photography overload
- Blog / news system
- Advanced resource filtering
- Email automation sequences
- Gated content system with lead tracking

---

## Estimated File Count

- ~9 page files
- ~3 API route files
- ~15 component files
- ~5 content JSON files
- ~5 config/utility files
- **Total: ~37 files**
