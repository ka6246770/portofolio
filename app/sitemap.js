import site, { allRoutes } from '../data/site'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/+$/, '')

// Every page is now its own route, so each one gets a sitemap entry.
//
// No `lastModified` is emitted on purpose. This file is evaluated once at
// build time, so `new Date()` would stamp EVERY url with the same build
// timestamp and claim pages changed when they did not. Search engines treat
// an inaccurate lastModified as a soft signal to distrust the whole sitemap —
// omitting it is more honest than inventing a date.
export default function sitemap() {
  return allRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.path === '/projects' ? 'monthly' : 'weekly',
    priority: r.path === '/' ? 1 : 0.8,
  }))
}
