// ============================================================
// SITE DATA
// Global, reusable content. Everything that might change for a
// real deployment lives here so the components stay clean.
// ============================================================

const site = {
  name: 'Khaled Waleed',
  shortName: 'KW',
  // Canonical URL — used for metadata, sitemap, robots, and structured
  // data. Override at build/run time with NEXT_PUBLIC_SITE_URL.
  url: 'https://portfolio-omega-three-yttj829m1j.vercel.app',
  email: 'ka6246770@gmail.com',
  phone: '01021243483',
  intro:
    'I design and build fast, accessible, and delightful user interfaces — turning complex problems into clean, animated Next.js products.',
  roles: ['Frontend Developer', 'Next.js Developer', 'UI Engineer'],

  // Substitution speed (ms) used by the Hero typing effect.
  typingSpeed: 80,
  typingPause: 1600,

  social: {
    github: 'https://github.com/ka6246770',
    linkedin: 'https://linkedin.com/in/khaledwaleed',
    twitter: 'https://twitter.com/khaledwaleed',
  },

  // ---------------------------------------------------------
  // ROUTES — the single source of truth for navigation.
  // `path`  : the URL segment (what Next serves on Vercel)
  // `label` : the mono nav text, lowercase (matches "// label")
  // `primary`: shown in the desktop nav row (keep to 5 so the
  //            row + CTA still fit at the 1024px breakpoint)
  // `blurb` : one line, used as the mobile menu subtitle
  // ---------------------------------------------------------
  routes: [
    {
      path: '/',
      label: 'home',
      primary: false,
      blurb: 'Who I am and what I build',
    },
    {
      path: '/services',
      label: 'services',
      primary: true,
      blurb: 'Six ways I add value',
    },
    {
      path: '/skills',
      label: 'skills',
      primary: true,
      blurb: 'The stack and the toolkit',
    },
    {
      path: '/projects',
      label: 'projects',
      primary: true,
      blurb: 'Selected work, shipped live',
    },
    {
      path: '/about',
      label: 'about',
      primary: true,
      blurb: 'Experience, process, standards',
    },
    {
      path: '/contact',
      label: 'contact',
      primary: true,
      blurb: 'Start a project or say hello',
    },
  ],

  // FAQ content — rendered on the Contact page and mirrored as FAQPage
  // JSON-LD in the root layout for AI/search engine visibility.
  faq: [
    {
      question: 'What technologies do you work with?',
      answer:
        'I build with React and Next.js on a deliberately small stack: JavaScript/TypeScript, Tailwind CSS, and Framer Motion — focusing on performance, accessibility, and polished micro-interactions.',
    },
    {
      question: 'Are you available for freelance or full-time work?',
      answer:
        'Yes. I currently work as a freelance frontend developer on client projects across e-commerce, SaaS, and real estate, and I am open to full-time frontend engineering roles.',
    },
    {
      question: 'How can I contact you?',
      answer:
        'The fastest way is the contact form on this page — it emails me directly — or email me at ka6246770@gmail.com. I usually reply within a day.',
    },
    {
      question: 'Do you build responsive, accessible websites?',
      answer:
        'Always. Every interface I ship is mobile-first, works with keyboards and screen readers, respects prefers-reduced-motion, and meets performance budgets on real devices.',
    },
  ],
}

export default site

// Canonical URL without a trailing slash — shared by page metadata,
// sitemap, robots, and the root layout. NEXT_PUBLIC_* is inlined at
// build time, so this is safe in both server and client components.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(
  /\/+$/,
  '',
)

// Helper used by the nav, footer, sitemap, and the 404 page.
export const navRoutes = site.routes.filter((r) => r.primary)
export const allRoutes = site.routes
