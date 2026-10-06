// ============================================================
// ABOUT DATA
// Long-form content for the About page. The Home page only uses
// `summary`. Keep the voice plain and specific — no filler.
// ============================================================

export const summary =
  'I am a full stack developer who builds the whole product: the PostgreSQL database, the Node.js API, and the React and Next.js interface on top. I care about the details at every layer — clean schemas, predictable APIs, fast screens, and interfaces that are accessible and feel alive.'

export const paragraphs = [
  {
    heading: 'Where I started',
    body: 'I began by rebuilding interfaces I admired, one section at a time. Then I kept going down the stack, because a screen is only as good as the API and data behind it. That became three years of shipping real client work: e-commerce storefronts, a real-estate platform, a bilingual portfolio for a video editor, and this site.',
  },
  {
    heading: 'How I work now',
    body: 'I keep the stack small and known — React, Next.js, Node.js, Express, PostgreSQL, Tailwind — so the effort goes into the product instead of into tooling. I agree the data model and API shape first, then build the screens against them, and test the keyboard path before the pretty hover state.',
  },
  {
    heading: 'What I am after',
    body: 'Full stack roles and freelance projects where one developer owns a feature from the database to the interface. I work comfortably with designers who hand over intent instead of pixels, and with founders who need someone to own the product end to end.',
  },
]

export const facts = [
  { label: 'Based in', value: 'Egypt · remote-friendly' },
  { label: 'Experience', value: '3+ years building for the web' },
  { label: 'Focus', value: 'Next.js · Node.js · PostgreSQL' },
  { label: 'Languages', value: 'Arabic (native) · English' },
  { label: 'Availability', value: 'Freelance and full-time' },
  { label: 'Reply time', value: 'Usually within a day' },
]

// Small beliefs, rendered as a two-column list on the About page.
export const beliefs = [
  'Ship the boring, tested version first — cleverness can come in iteration two.',
  'A screen that is hard to explain is usually hard to build, too.',
  'A good API is boring: predictable names, honest status codes, clear errors.',
  'If it cannot be reached with a keyboard, it is not finished.',
  'Model the data properly first — screens are easy to change, bad schemas are not.',
  'Hand over a repo someone else can read, or the work is not done.',
]
