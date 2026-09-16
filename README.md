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

- Site → http://localhost:8080 (API lives under `/api/*` on the same server)

### 4. Production build

```bash
npm run build && npm start
```

The production server serves the app **and** the API on one port (default
`8080`, override with `PORT`).

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
  Twitter card tags (see `app/layout.jsx`).
- **JSON-LD structured data** — `Person`, `WebSite`, and `FAQPage` schemas
  emitted server-side for rich results and AI answer engines.
- **`/sitemap.xml`** and **`/robots.txt`** — auto-generated from the canonical
  URL (overridable via `NEXT_PUBLIC_SITE_URL`).
- **`/opengraph-image`** — a generated 1200×630 social preview image.
- **`/llms.txt`** — a plain-text fact sheet (llmstxt.org) for AI crawlers
  (ChatGPT, Perplexity, Gemini, Claude) describing the owner, skills,
  experience, projects, and contact details.

## Project structure

```
app/
  layout.jsx              Root layout (fonts, metadata, JSON-LD, reduced-motion config)
  page.jsx                Home page (client component composing all sections)
  globals.css             Tailwind v4 CSS-first tokens + global styles
  sitemap.js              /sitemap.xml
  robots.js               /robots.txt
  opengraph-image.jsx     Generated 1200×630 social preview image
  llms.txt/route.js       /llms.txt — plain-text facts for AI crawlers (GEO)
  api/
    contact/route.js      POST /api/contact (validation + Nodemailer)
    health/route.js       GET  /api/health
components/               One client component per section/piece
  Navbar, Hero, About, Experience, Skills, Projects, ProjectCard,
  FAQ, Contact, Footer, Loader, CustomCursor, BackToTop, HeroIllustrations
hooks/                    useMediaQuery (fine-pointer / desktop detection)
data/                     site.js, projects.js, skills.js, experience.js
lib/mail.js               SMTP config + contact validation/helpers
public/                   Images and favicon
```

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