// ============================================================
// PROJECTS DATA
// Rendered as cards in the Work section.
//
// `category`   – 'Web' | 'Mobile' (drives the All/Web/Mobile filter).
// `device`     – 'laptop' | 'phone' (chooses the mockup frame in ProjectCard).
// `screenshot` – a path to an image in /public/images/.
// ============================================================

const projects = [
  {
    id: 1,
    title: 'Prestige Realty',
    category: 'Web',
    device: 'laptop',
    blurb: 'Real-estate platform',
    description:
      'A premium real-estate platform for browsing and showcasing properties — a polished, responsive app built with React.',
    tech: ['React', 'Tailwind', 'Vite'],
    live: 'https://real-estate-app-five-mauve.vercel.app/',
    github: 'https://github.com/ka6246770',
    screenshot: '/images/real-estate.PNG',
  },
  {
    id: 2,
    title: 'La2ta — Reels Portfolio',
    category: 'Web',
    device: 'laptop',
    blurb: 'Bilingual portfolio',
    description:
      'A bilingual Arabic/English portfolio for a reels & video editor. Fast-scrolling showcase with a strong first-impression hero.',
    tech: ['React', 'Vite', 'CSS'],
    live: 'https://la2ta-portfolio.vercel.app/',
    github: 'https://github.com/ka6246770',
    screenshot: '/images/la2ta.PNG',
  },
  {
    id: 3,
    title: 'Personal Portfolio',
    category: 'Web',
    device: 'laptop',
    blurb: 'Front-end engineer site',
    description:
      'This very site — a dark, animated one-pager built with Next.js, Tailwind, and Framer Motion.',
    tech: ['Next.js', 'Tailwind', 'Framer Motion'],
    live: 'https://portfolio-omega-three-yttj829m1j.vercel.app/',
    github: 'https://github.com/ka6246770',
    screenshot: '/images/Capture.PNG',
  },
]

export default projects