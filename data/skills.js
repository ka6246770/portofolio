// ============================================================
// SKILLS DATA
// Two categories, each a list of skills with a one-line note about
// how I actually use it. Depth is described in plain words — no
// invented percentage bars.
// ============================================================

const skills = [
  {
    id: 'foundation',
    title: 'Foundation',
    tagline: 'The core languages that power every interface I ship.',
    items: [
      {
        name: 'JavaScript / TypeScript',
        depth: 'Every day',
        note: 'ES2023+ and TypeScript for types that catch mistakes before runtime.',
      },
      {
        name: 'HTML & CSS',
        depth: 'Every day',
        note: 'Hand-written CSS when a utility class stops being enough: grid, container queries, cascade layers.',
      },
      {
        name: 'Responsive design',
        depth: 'Every day',
        note: 'Built from the 320px phone up, then scaled to wide desktops — never patched afterwards.',
      },
      {
        name: 'Accessibility & semantics',
        depth: 'Default',
        note: 'Landmarks, labels, focus order, keyboard paths, and screen-reader announcements checked by hand.',
      },
      {
        name: 'Performance budgets',
        depth: 'Regularly',
        note: 'Core Web Vitals tracked on real devices, with a bundle ceiling that CI enforces.',
      },
    ],
  },
  {
    id: 'toolkit',
    title: 'Toolkit',
    tagline: 'The stack I reach for to build fast, animated products.',
    items: [
      {
        name: 'Next.js',
        depth: 'Every day',
        note: 'App Router, server components, route handlers, metadata, streaming, and ISR.',
      },
      {
        name: 'React',
        depth: 'Every day',
        note: 'Hooks, composition, and state kept as local as it can possibly be.',
      },
      {
        name: 'Tailwind CSS',
        depth: 'Every day',
        note: 'CSS-first v4 config with my own tokens instead of the default palette.',
      },
      {
        name: 'Framer Motion',
        depth: 'Regularly',
        note: 'Variant-driven choreography, layout animations, and AnimatePresence route transitions.',
      },
      {
        name: 'Git & workflow',
        depth: 'Every day',
        note: 'Small branches, real commit messages, review-friendly PRs, preview deploys.',
      },
    ],
  },
]

// Supporting tools I am productive in but do not claim as core.
export const alsoComfortable = [
  'Node.js route handlers',
  'Nodemailer & SMTP',
  'REST & GraphQL data fetching',
  'Vite',
  'Firebase Auth',
  'Supabase',
  'Stripe checkout',
  'Sanity CMS',
  'Framer Motion gestures',
  'Playwright smoke tests',
  'Vitest',
  'ESLint & Oxlint',
]

// What I am actively going deeper on right now.
export const learning = [
  { name: 'React Server Components patterns', note: 'Pushing more work to the server without losing interactivity.' },
  { name: 'Container queries & :has()', note: 'Components that respond to their own box, not the viewport.' },
  { name: 'View Transitions API', note: 'Native page transitions alongside Framer Motion.' },
  { name: 'TypeScript generics', note: 'Typing component APIs so misuse is impossible.' },
]

export default skills
