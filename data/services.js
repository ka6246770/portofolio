// ============================================================
// SERVICES DATA
// "What you can hire me for" — six full stack offers. The compact grid on
// the Home page uses `title` + `description`; the full Services
// page also renders `deliverables`, `stack`, and `outcome`.
// ============================================================

const services = [
  {
    title: 'Full Stack Web Apps',
    description:
      'Complete products from one developer: the interface, the API, and the database — designed together so they fit.',
    deliverables: [
      'Architecture and folder structure across frontend, API, and database',
      'Screens built in React or Next.js, wired to a real backend from day one',
      'Auth, forms, and admin flows that work end to end, not just on the happy path',
      'Deployment with preview builds and a handover you can maintain',
    ],
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    outcome: 'One working product, one owner, no hand-off gaps between frontend and backend.',
  },
  {
    title: 'REST APIs with Node.js',
    description:
      'Clean, documented Express APIs that your web or mobile app can rely on.',
    deliverables: [
      'Resource-based endpoints with consistent status codes and error shapes',
      'Server-side validation on every input, never trusting the client',
      'Pagination, filtering, and search where lists get long',
      'A Postman collection or written docs so anyone can call it',
    ],
    stack: ['Node.js', 'Express', 'REST', 'Postman'],
    outcome: 'An API that is predictable to consume and easy to extend.',
  },
  {
    title: 'PostgreSQL Database Design',
    description:
      'Relational schemas that model your business properly and stay fast as the data grows.',
    deliverables: [
      'Schema design with proper keys, relations, and constraints',
      'Migrations and seed data so every environment can be rebuilt',
      'Indexes and query review for the screens that matter most',
      'Backups and environment setup guidance',
    ],
    stack: ['PostgreSQL', 'SQL', 'Migrations'],
    outcome: 'Data you can trust, structured so new features do not mean rewrites.',
  },
  {
    title: 'Authentication & Security',
    description:
      'Login, roles, and protected routes done carefully — because this is where shortcuts hurt most.',
    deliverables: [
      'Signup, login, and session or token handling',
      'Role-based access for admins versus customers',
      'Hashed passwords, input sanitising, and rate limiting on sensitive routes',
      'Secrets kept in environment variables, never in the repo',
    ],
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Environment config'],
    outcome: 'Users only see what they should, and the basics are covered.',
  },
  {
    title: 'Frontend & UI',
    description:
      'Fast, responsive React and Next.js interfaces — including Arabic RTL layouts — with motion that serves the product.',
    deliverables: [
      'Pages and reusable components built from your Figma or a rough sketch',
      'Mobile-first layouts that hold up from a 320px phone to wide desktops',
      'Full RTL Arabic support with a mirrored English version when needed',
      'Subtle animation with reduced-motion fallbacks',
    ],
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    outcome: 'Interfaces that look considered and stay quick on real phones.',
  },
  {
    title: 'Deployment & Handover',
    description:
      'Getting the whole stack live, configured properly, and documented so you are not stuck with it.',
    deliverables: [
      'Frontend on Vercel, API and database hosted and connected',
      'Environment variables and production settings sorted out',
      'A README covering setup, scripts, and how to deploy changes',
      'A walkthrough so you or your next developer can take over',
    ],
    stack: ['Vercel', 'Git & GitHub', 'Node.js', 'PostgreSQL'],
    outcome: 'A live product and a repo someone else can actually read.',
  },
]

// Engagement shapes for the Services page — described in time and
// scope, never in currency, so they hold up whatever the rate is.
export const engagements = [
  {
    id: 'audit',
    name: 'Audit',
    cadence: '3–5 days',
    summary:
      'I read your existing frontend and backend and hand back a prioritised list of what to fix first.',
    includes: [
      'Performance, security, and code-quality pass across the whole stack',
      'Written findings ordered by effort versus impact',
      'A 45-minute walkthrough call',
    ],
    bestFor: 'A product that works but feels slow, fragile, or hard to extend.',
  },
  {
    id: 'sprint',
    name: 'Feature sprint',
    cadence: '1–3 weeks',
    summary:
      'One clearly bounded feature, built end to end and shipped to production.',
    includes: [
      'Scope agreed before the first commit',
      'Daily progress on a branch you can watch',
      'PRs reviewed by you, deployed with a rollback plan',
    ],
    bestFor: 'A known piece of work with a deadline attached.',
  },
  {
    id: 'build',
    name: 'Full build',
    cadence: '1–3 months',
    summary:
      'From empty repo to live product: database, API, screens, and launch.',
    includes: [
      'Database schema and API contract agreed before the screens',
      'Weekly demos instead of status reports',
      'Handover docs plus two weeks of post-launch support',
    ],
    bestFor: 'A new product that needs the frontend, backend, and database built together.',
  },
  {
    id: 'retainer',
    name: 'Ongoing retainer',
    cadence: 'Monthly',
    summary:
      'A standing allocation of days each month for improvements, fixes, and new screens.',
    includes: [
      'Rolling backlog you reprioritise each month',
      'Same-week response for production issues',
      'A monthly note on what changed and what it cost',
    ],
    bestFor: 'A live product that needs a developer on call.',
  },
]

export default services