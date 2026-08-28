// ============================================================
// SITE DATA
// Global, reusable content. Everything that might change for a
// real deployment lives here so the components stay clean.
//
// TODO: Replace placeholder values below with the real name,
// bio, links, and contact info for the person being featured.
// ============================================================

const site = {
  name: 'Khaled Waleed',
  shortName: 'KW',
  email: 'ka6246770@gmail.com',
  phone: '01021243483',
  tagline: 'I design and build fast, accessible, and delightful user interfaces.',
  roles: ['Frontend Developer', 'React Specialist', 'UI Engineer'],

  // Substitution speed (ms) used by the Hero typing effect.
  typingSpeed: 80,
  typingPause: 1600,

  social: {
    github: 'https://github.com/ka6246770',
    linkedin: 'https://linkedin.com/in/khaledwaleed',
    twitter: 'https://twitter.com/khaledwaleed',
  },

  // Linked sections for anchors / smooth scroll.
  sections: [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ],
}

export default site
