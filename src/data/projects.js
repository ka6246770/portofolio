// ============================================================
// PROJECTS DATA
// Rendered as cards in the Projects section.
//
// `screenshot` – a path to an image in /public/images/.
// `beforeAfter` – optional, shows the image comparison slider.
// ============================================================

const projects = [
  {
    id: 1,
    title: 'Prestige Realty',
    description:
      'A premium real-estate platform for browsing and showcasing properties — a polished, responsive app built with React.',
    tech: ['React', 'Tailwind', 'Vite'],
    live: 'https://real-estate-app-five-mauve.vercel.app/',
    // TODO: update to the exact repo URL once it's pushed to the new account
    github: 'https://github.com/ka6246770',
    screenshot: '/images/real-estate.PNG',
  },
  {
    id: 2,
    title: 'La2ta — Reels Portfolio',
    description:
      'A bilingual Arabic/English portfolio for a reels & video editor. Fast-scrolling showcase with a strong first-impression hero.',
    tech: ['React', 'Vite', 'CSS'],
    live: 'https://la2ta-portfolio.vercel.app/',
    // TODO: update to the exact repo URL once it's pushed to the new account
    github: 'https://github.com/ka6246770',
    screenshot: '/images/la2ta.PNG',
  },
  {
    id: 3,
    title: 'Front-End Portfolio',
    description:
      'My personal front-end engineer portfolio — a dark, animated one-pager built with React, Tailwind, and Framer Motion.',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    live: 'https://portfolio-omega-three-yttj829m1j.vercel.app/',
    // TODO: update to the exact repo URL once it's pushed to the new account
    github: 'https://github.com/ka6246770',
    screenshot: '/images/Capture.PNG',
  },
]

export default projects
