# Khaled Waleed — Portfolio

A production-ready portfolio site for a frontend developer, built with
**Next.js (App Router) + Tailwind CSS v4 + Framer Motion**, with a
**Nodemailer** API route that emails contact-form submissions.

Fully responsive: fluid display type scales with the viewport, the
layout collapses to a mobile nav + stacked sections on phones, and
heavy effects (custom cursor, entrance choreography) degrade gracefully
on small/touch screens.

## Stack

- **Framework:** Next.js 15 (App Router), React 19
- **Styling:** Tailwind CSS v4 (CSS-first config), Google Fonts
- **Animation:** Framer Motion (scroll-triggered whileInView entrance
  choreography; respects `prefers-reduced-motion`)
- **Backend:** Next.js Route Handlers + Nodemailer (Gmail SMTP)
- **Lint:** Oxlint

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure email credentials

Copy the example env file and fill in your Gmail details:

```bash
cp .env.example .env
```

Edit `.env`:

- `NEXT_PUBLIC_SITE_URL` → your production URL (powers the canonical tag,
  sitemap, robots.txt, and JSON-LD structured data). Leave it out to use
  the default in `data/site.js`.
- `SMTP_USER` → your full Gmail address (`ka6246770@gmail.com`)
- `SMTP_PASS` → a **16-character Google App Password**, not your normal password

To create an App Password:

1. Turn on **2-Step Verification** on your Google account.
2. Go to your [Google Account](https://myaccount.google.com/) → **Security** →
   **App passwords**.
3. Create a password for **Mail**. Copy the 16-character code into `SMTP_PASS`.

The server still starts without credentials, but `POST /api/contact` will
return a clear "not configured" error until they're set.

> `.env` contains secrets and is gitignored — never commit it.

### 3. Run in development

```bash
npm run dev
```

- Site → http://localhost:3001 (API lives under `/api/*` on the same server)

> The dev port is pinned to `3001` by the `-p 3001` flag in `package.json`.
> `PORT` in `.env` only applies to `npm start`.

### 4. Production build

```bash
npm run build && npm start
```

The production server serves the app **and** the API on one port
(`8080` by default, override with `PORT`).

## API

### `GET /api/health`

Health check — returns `{ status: 'ok' }`.

### `POST /api/contact`

Accepts `{ name, email, message }`, validates them, and emails the message to
`CONTACT_TO_EMAIL` via Gmail SMTP.

- `200 { success: true }` — sent
- `400 { success: false, errors: {...} }` — validation failed
- `500 { success: false, message }` — server/send error (e.g. credentials unset)

## SEO & GEO

The site ships with search-engine and AI-engine friendly output:

- **Metadata** — keyword-rich title/description, canonical, Open Graph, and
  Twitter card tags in the root layout, plus a per-page `metadata` export on
  every route (each overrides the root `alternates.canonical`).
- **JSON-LD structured data** — `Person` and `WebSite` schemas are emitted
  server-side by the root layout on every route. `FAQPage` is emitted **only**
  by `/contact`, the single route that renders the visible FAQ — structured
  data that has no matching on-page content does not qualify for rich results.
- **`/sitemap.xml`** — generated from `allRoutes` in `data/site.js`, so adding
  a route there automatically adds a sitemap entry. No `lastModified` is
  emitted on purpose: the file is evaluated once at build time, so a date
  would stamp every URL with the same build timestamp and misrepresent which
  pages actually changed.
- **`/robots.txt`** — auto-generated from the canonical URL (overridable via
  `NEXT_PUBLIC_SITE_URL`), with `/api/` disallowed.
- **`/opengraph-image`** — a generated 1200×630 social preview image.
- **`/llms.txt`** — a plain-text fact sheet (llmstxt.org) for AI crawlers
  (ChatGPT, Perplexity, Gemini, Claude) describing the owner, skills,
  experience, projects, and contact details.

## Routing

Six routes, each with its own metadata and a `PageHeader`. Navigation is
driven by a single source of truth — the `routes` array in `data/site.js`:

| Route | Nav label | Sections it owns |
| --- | --- | --- |
| `/` | home | Hero, Stats, previews of services/skills/projects, CTA |
| `/services` | services | Services, ServiceBreakdown, Engagements |
| `/skills` | skills | Skills, Tools |
| `/projects` | projects | Projects (filters + case studies) |
| `/about` | about | About, Experience, Process, Standards |
| `/contact` | contact | Contact form, FAQ |

`routes[].primary` marks what appears in the desktop nav row; the home route
is `primary: false` because the logo mark links there. Components like
`Services`, `Skills`, and `Projects` accept `limit` / `viewAll` props so the
home page can render a short preview and hand off to the dedicated route.

## Project structure

```
app/
  layout.jsx              Root layout (fonts, global metadata, Person + WebSite
                          JSON-LD, MotionConfig reduced-motion="user")
  (site)/                 Route group: shared chrome for the 6 content routes.
    layout.jsx            Client shell — Navbar, Footer, cursor, back-to-top,
                          one-time Loader overlay, ErrorBoundary, PageTransition
    page.jsx              Home
    about/page.jsx        About page
    contact/page.jsx      Contact page + FAQPage JSON-LD
    projects/page.jsx     Projects page
    services/page.jsx     Services page
    skills/page.jsx       Skills page
  error.jsx               Segment error route (outer safety net)
  not-found.jsx           404, rendered through StandaloneShell
  globals.css             Tailwind v4 CSS-first tokens + global styles
  sitemap.js              /sitemap.xml — built from data/site.js routes
  robots.js               /robots.txt
  opengraph-image.jsx     Generated 1200×630 social preview image
  llms.txt/route.js       /llms.txt — plain-text facts for AI crawlers
  api/
    contact/route.js      POST /api/contact (validation + Nodemailer)
    health/route.js       GET  /api/health

components/
  Chrome                  Navbar, Footer, CustomCursor, BackToTop, Loader
  Layout                  PageTransition, PageHeader, StandaloneShell
  Fallbacks               ErrorBoundary, ErrorScreen, NotFoundView
  Sections                Hero, HeroIllustrations, Stats, About, Experience,
                          Process, Standards, Skills, Tools, Services,
                          ServiceBreakdown, Engagements, Projects,
                          ProjectCard, FAQ, Contact, CTABand, ViewAllLink
  IntroContext            Intro phase context + IntroProvider/useIntroPhase

hooks/
  useMediaQuery.js        SSR-safe matchMedia (useFinePointer, useDesktop)
  useReveal.js            Scroll reveal with a fallback that cannot leave
                          content invisible
  useEntranceDelay.js     Reads the intro phase so above-the-fold content
                          waits for the loader on a first visit only

data/                     site, about, projects, services, skills, experience,
                          process, standards, stats, tools
lib/
  mail.js                 SMTP config, validation, HTML escaping
  intro.js                Session-scoped loader memory (SSR-safe)

public/                   Images, favicon, icons
```

### How the intro loader interacts with routing

`app/(site)/layout.jsx` owns a one-time branded loader, played at most once
per browser session (`lib/intro.js`, `sessionStorage`). It is rendered as an
**overlay**, not a wrapper around the chrome — animating `opacity` on an
ancestor creates a containing block for `position: fixed`, which would trap
the fixed navbar and cursor inside it.

The phase is published through `IntroContext`; `useEntranceDelay` reads it so
hero content waits for the loader on a first visit and starts immediately on
every later navigation. `prefers-reduced-motion` skips the loader entirely.

Scroll-to-top on route change is handled by Next.js itself — its
`ScrollAndFocusHandler` runs after the new page is committed. Because of that,
`PageTransition` deliberately does **not** hold the outgoing page alive for an
exit animation (it would visibly jump as Next scrolls); instead a single neon
hairline sweeps across the viewport as the route-change gesture. See the
comment at the top of `components/PageTransition.jsx` before changing this.

## Responsiveness notes

- Display headings use a fluid `clamp()` `text-display` token (about
  `2.75rem → 6rem`), so long accent words such as "effortless" never
  overflow a 320px phone yet stay bold on large monitors.
- Desktop nav switches to a hamburger menu below `1024px` so every link +
  CTA fits a single row on laptops.
- The hero name uses `clamp(3.5rem → 17rem)` with `overflow-wrap` safe
  fallbacks, and the hero fold uses `100svh` (with `100vh` fallback) so
  mobile browsers don't squash it.
- `min-w-0` guards were added to grid/flex children so long unbroken
  strings (e.g. the email address button) wrap instead of stretching
  the page horizontally on narrow screens.
- `useMediaQuery` returns `false` on the server and the first client pass,
  then resolves after mount, so SSR and hydration always agree.

## Linting

```bash
npm run lint
```

Oxlint is configured in `.oxlintrc.json`. Two rule groups warn by design and
should not be "fixed":

- `react/only-export-components` fires on files that export a Next.js
  `metadata` object alongside a default component.
- `react/set-state-in-effect` fires on the deliberate post-mount effects in
  `useMediaQuery` and the intro phase, which must wait for `window`.