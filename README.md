# Khaled Waleed — Portfolio

A production-ready portfolio site for a frontend React developer, built with
**React 18 + Vite + Tailwind CSS + Framer Motion**, plus an **Express + Nodemailer**
backend that emails contact-form submissions.

## Stack

- **Frontend:** React 18, Vite, Tailwind CSS v4, Framer Motion, lucide-react
- **Backend:** Node.js, Express 5, Nodemailer (Gmail SMTP)
- **Animations:** All sections implement scroll-triggered (whileInView) entrance
  choreography; heavy effects (custom cursor, 3D tilt, animated mesh) degrade
  gracefully on small/touch screens.

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

- `SMTP_USER` → your full Gmail address (`ka6246770@gmail.com`)
- `SMTP_PASS` → a **16-character Google App Password**, not your normal password

To create an App Password:

1. Turn on **2-Step Verification** on your Google account.
2. Go to your [Google Account](https://myaccount.google.com/) → **Security** →
   **App passwords**.
3. Create a password for **Mail**. Copy the 16-character code into `SMTP_PASS`.

The server still starts without credentials, but `/api/contact` will return a
clear "not configured" error until they're set.

> `.env` contains secrets and is gitignored — never commit it.

### 3. Run in development (web + API together)

```bash
npm run dev
```

- Frontend → http://localhost:5173
- Backend  → http://localhost:3001 (health check: `/api/health`)
- Vite proxies `/api/*` to the backend automatically.

### 4. Production build

```bash
npm run build && npm start
```

The Express server serves the built frontend from `dist/` **and** the API on
one port (default `3001`, override with `PORT`).

## API

### `POST /api/contact`

Accepts `{ name, email, message }`, validates them, and emails the message to
`CONTACT_TO_EMAIL` via Gmail SMTP.

- `200 { success: true }` — sent
- `400 { success: false, errors: {...} }` — validation failed
- `500 { success: false, message }` — server/send error (e.g. credentials unset)

## Project structure

```
server.js                 Express entry point (API + static serving)
server/
  config.js               Env-driven configuration
  routes/contact.js       POST /api/contact (validation + Nodemailer)
src/
  components/             One file per section/piece
  data/                   site.js, projects.js, skills.js (swap in real data)
  hooks/                  useMediaQuery
public/images/             Placeholder before/after images
```
