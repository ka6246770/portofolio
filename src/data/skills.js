// ============================================================
// SKILLS DATA
// Rendered in the Skills section as TWO categories, each with a
// short punchy description and a list of core skills.
// ============================================================

const skills = [
  {
    id: 'foundation',
    title: 'Foundation',
    tagline: 'The core languages that power every interface I ship.',
    items: [
      { name: 'JavaScript / TypeScript' },
      { name: 'HTML & CSS' },
      { name: 'Responsive design' },
      { name: 'Accessibility & semantics' },
      { name: 'Performance budgets' },
    ],
  },
  {
    id: 'toolkit',
    title: 'Toolkit',
    tagline: 'The stack I reach for to build fast, animated products.',
    items: [
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'Framer Motion' },
      { name: 'Vite' },
      { name: 'Git & workflow' },
    ],
  },
]

export default skills
