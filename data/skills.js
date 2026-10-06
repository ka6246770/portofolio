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
    tagline: 'The core skills underneath every product I ship, front and back.',
    items: [
      {
        name: 'JavaScript / TypeScript',
        depth: 'Every day',
        note: 'ES2023+ on both sides of the stack, with TypeScript where types catch mistakes before runtime.',
      },
      {
        name: 'SQL & data modeling',
        depth: 'Every day',
        note: 'Relational schemas, joins, constraints, and queries designed around how the app actually reads data.',
      },
      {
        name: 'REST API design',
        depth: 'Every day',
        note: 'Consistent resources, status codes, validation, and error responses a frontend can rely on.',
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
        note: 'Landmarks, labels, focus order, and keyboard paths checked by hand.',
      },
    ],
  },
  {
    id: 'toolkit',
    title: 'Toolkit',
    tagline: 'The stack I reach for to build complete products, database to interface.',
    items: [
      {
        name: 'Next.js',
        depth: 'Every day',
        note: 'App Router, server components, route handlers, metadata, and ISR.',
      },
      {
        name: 'Node.js & Express',
        depth: 'Every day',
        note: 'REST APIs, middleware, validation, authentication, and error handling.',
      },
      {
        name: 'PostgreSQL',
        depth: 'Every day',
        note: 'Schema design, migrations, indexes, and query tuning for real workloads.',
      },
      {
        name: 'React',
        depth: 'Every day',
        note: 'Hooks, composition, and state kept as local as it can possibly be — including Arabic RTL interfaces.',
      },
      {
        name: 'Tailwind CSS',
        depth: 'Every day',
        note: 'CSS-first v4 config with my own tokens instead of the default palette.',
      },
      {
        name: 'Framer Motion',
        depth: 'Regularly',
        note: 'Variant-driven choreography, layout animations, and route transitions.',
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
  'SQLite',
  'Database migrations',
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
  { name: 'Query tuning & indexing', note: 'Reading query plans so PostgreSQL stays fast as tables grow.' },
  { name: 'API testing', note: 'Automated tests around endpoints so refactors do not break clients.' },
  { name: 'TypeScript generics', note: 'Typing component APIs so misuse is impossible.' },
]

export default skills
