// ============================================================
// SERVICES DATA
// "What you can hire me for" — six offers. The compact grid on
// the Home page uses `title` + `description`; the full Services
// page also renders `deliverables`, `stack`, and `outcome`.
// ============================================================

const services = [
  {
    title: 'Frontend Development',
    description:
      'React and Next.js applications that load fast, feel responsive, and survive real-world traffic.',
    deliverables: [
      'App architecture and folder structure you can hand over',
      'Page and component build-out from your Figma or a rough sketch',
      'State, routing, and data fetching wired to your API',
      'Deployment on Vercel with preview builds per pull request',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    outcome: 'A working product you can keep building on, not a prototype.',
  },
  {
    title: 'Design Systems & UI',
    description:
      'Reusable components, tokens, and shared primitives — not one-off pages that rot.',
    deliverables: [
      'Token layer: colour, type scale, spacing, radius, elevation',
      'A documented component set with states and variants',
      'Dark/light theming driven by CSS custom properties',
      'Usage rules so the next page looks like the first one',
    ],
    stack: ['Tailwind v4', 'CSS custom properties', 'Storybook', 'Figma'],
    outcome: 'One source of truth the whole team builds against.',
  },
  {
    title: 'Motion & Interaction',
    description:
      'Micro-interactions and page choreography that make interfaces feel considered, not showy.',
    deliverables: [
      'A motion spec: durations, easings, and where each is allowed',
      'Entrance choreography, page transitions, and layout animations',
      'Hover, focus, and press feedback on every interactive element',
      'Full `prefers-reduced-motion` fallbacks, tested',
    ],
    stack: ['Framer Motion', 'CSS transitions', 'SVG'],
    outcome: 'Interfaces that respond — without getting in the way.',
  },
  {
    title: 'Performance Engineering',
    description:
      'Auditing and tightening bundles, paint times, CLS, and everything users actually notice.',
    deliverables: [
      'Lighthouse and Web Vitals baseline on real devices',
      'Bundle and dependency audit with a cut list',
      'Image, font, and caching fixes with next/image and headers',
      'A budget you can enforce in CI so it does not drift back',
    ],
    stack: ['Web Vitals', 'Lighthouse', 'Chrome DevTools', 'next/image'],
    outcome: 'Numbers you can prove, on a page that still looks the same.',
  },
  {
    title: 'Accessibility & SEO',
    description:
      'Semantic, keyboard-friendly markup that ranks well and reads well for every visitor.',
    deliverables: [
      'Landmark, heading, and label pass with keyboard-only testing',
      'Contrast and focus-visibility fixes against WCAG AA',
      'Metadata, Open Graph, canonical, and structured data',
      'Sitemap, robots, and a screen-reader walkthrough',
    ],
    stack: ['ARIA', 'WCAG 2.2 AA', 'JSON-LD', 'Next Metadata API'],
    outcome: 'Reachable by people and by search engines alike.',
  },
  {
    title: 'API & Headless Integration',
    description:
      'Wiring components to backends, CMSs, and payment flows without the glue turning to sludge.',
    deliverables: [
      'Typed data layer with loading, error, and empty states',
      'CMS models mapped to components, editors included',
      'Form and checkout flows with server-side validation',
      'Auth-aware rendering and cache/revalidation rules',
    ],
    stack: ['REST & GraphQL', 'Node route handlers', 'Stripe', 'Sanity'],
    outcome: 'Dynamic screens that fail politely when the network does.',
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
      'I read your existing frontend and hand back a prioritised list of what to fix first.',
    includes: [
      'Performance, accessibility, and code-quality pass',
      'Written findings ordered by effort versus impact',
      'A 45-minute walkthrough call',
    ],
    bestFor: 'A product that works but feels slow or hard to extend.',
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
      'From empty repo to live product: architecture, UI system, screens, and launch.',
    includes: [
      'Design tokens and component set established first',
      'Weekly demos instead of status reports',
      'Handover docs plus two weeks of post-launch support',
    ],
    bestFor: 'A new product where the frontend is the product.',
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
    bestFor: 'A live site that needs a frontend owner on call.',
  },
]

export default services