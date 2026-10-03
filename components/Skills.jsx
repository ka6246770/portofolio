'use client'

import { motion } from 'framer-motion'
import {
  FileCode2,
  Code,
  MonitorSmartphone,
  Accessibility,
  Gauge,
  Rocket,
  Atom,
  Wind,
  Sparkles,
  GitBranch,
  Braces,
  Server,
  Zap,
  Triangle,
  Send,
  Network,
  PenTool,
  Bug,
  Package,
  TestTube,
  SquareCode,
} from 'lucide-react'
import skills, { alsoComfortable, learning } from '../data/skills'
import { useReveal } from '../hooks/useReveal'

const iconMap = {
  'JavaScript / TypeScript': FileCode2,
  'HTML & CSS': Code,
  'Responsive design': MonitorSmartphone,
  'Accessibility & semantics': Accessibility,
  'Performance budgets': Gauge,
  'Next.js': Rocket,
  React: Atom,
  'Tailwind CSS': Wind,
  'Framer Motion': Sparkles,
  'Git & workflow': GitBranch,
}

const chipIcons = {
  'Node.js route handlers': Server,
  'Nodemailer & SMTP': Send,
  'REST & GraphQL data fetching': Network,
  Vite: Zap,
  'Firebase Auth': Braces,
  Supabase: Triangle,
  'Stripe checkout': Package,
  'Sanity CMS': PenTool,
  'Framer Motion gestures': Sparkles,
  'Playwright smoke tests': TestTube,
  Vitest: Bug,
  'ESLint & Oxlint': SquareCode,
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// ============================================================
// SKILLS
// The original two-column split, upgraded with a one-line note and
// a usage frequency per skill. `showHeading` lets the Home preview
// reuse the same visual language at a smaller scale.
// ============================================================
export default function Skills({ showHeading = true, limit, viewAll }) {
  const [headRef, headIn] = useReveal()

  const categories = limit
    ? skills.map((cat) => ({ ...cat, items: cat.items.slice(0, limit) }))
    : skills

  return (
    <section
      id="skills"
      aria-label="Skills"
      className="w-full border-t border-surface-light"
    >
      <div className="w-full px-6 py-24 sm:px-8 lg:px-16">
        {showHeading && (
          <div className="mb-16">
            <motion.p
              ref={headRef}
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={headIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              // what I use every day
            </motion.p>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <motion.h2
                className="text-display font-display text-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                The stack, <span className="text-accent">honestly</span>
              </motion.h2>
              <div className="flex flex-col items-start gap-5 md:items-end">
                <motion.p
                  className="max-w-sm text-lg leading-relaxed text-muted md:pb-2 md:text-right"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.12 }}
                >
                  Two buckets: the fundamentals underneath everything, and the
                  toolkit I reach for to ship it.
                </motion.p>
                {viewAll}
              </div>
            </div>
          </div>
        )}

        {/* Two categories — full-width split */}
        <div className="grid w-full border-t border-surface-light md:grid-cols-2">
          {categories.map((cat) => (
            <motion.article
              key={cat.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className={`group flex flex-col py-10 md:py-14 md:px-8 ${
                limit
                  ? 'first:border-b first:border-surface-light md:border-b-0 md:pr-12 last:md:border-l last:md:border-surface-light'
                  : 'first:md:pr-12 last:md:border-l last:md:border-surface-light'
              }`}
            >
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-soft">
                  {cat.title}
                </h3>
                <span className="font-mono text-xs text-accent">
                  {cat.id === 'foundation' ? '01' : '02'}
                </span>
              </div>
              <p className="mb-8 max-w-md text-muted">{cat.tagline}</p>
              <ul className="flex flex-col">
                {cat.items.map((item, i) => {
                  const Icon = iconMap[item.name]
                  return (
                    <motion.li
                      key={item.name}
                      className="flex items-center gap-3 border-t border-surface-light py-3 text-text"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                    >
                      {Icon && (
                        <Icon size={16} className="shrink-0 text-accent" />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="text-lg font-medium">{item.name}</span>
                        {item.note && (
                          <span className="mt-1 block text-sm leading-relaxed text-muted">
                            {item.note}
                          </span>
                        )}
                      </span>
                      {item.depth && (
                        <span className="hidden shrink-0 font-mono text-xs text-accent sm:block">
                          {item.depth}
                        </span>
                      )}
                    </motion.li>
                  )
                })}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Only the full page renders these */}
        {!limit && (
          <>
            {/* Comfortable with — chip wall */}
            <div className="mt-20">
              <p className="eyebrow mb-6">// also comfortable with</p>
              <div className="flex w-full flex-wrap gap-3">
                {alsoComfortable.map((tool, i) => {
                  const Icon = chipIcons[tool]
                  return (
                    <motion.span
                      key={tool}
                      className="flex items-center gap-2 border border-surface-light px-4 py-2 font-mono text-sm text-soft transition-colors duration-300 hover:border-accent hover:text-accent"
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.03, ease: 'easeOut' }}
                    >
                      {Icon && <Icon size={15} className="shrink-0 text-accent" />}
                      {tool}
                    </motion.span>
                  )
                })}
              </div>
            </div>

            {/* Learning — proof the stack is still growing */}
            <div className="mt-20">
              <p className="eyebrow mb-6">// going deeper right now</p>
              <div className="grid w-full grid-cols-1 gap-px border border-surface-light bg-surface-light sm:grid-cols-2">
                {learning.map((l, i) => (
                  <motion.div
                    key={l.name}
                    className="bg-surface p-6 transition-colors hover:bg-background"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                  >
                    <h4 className="font-display text-xl text-text">{l.name}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{l.note}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
