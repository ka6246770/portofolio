'use client'

import { motion } from 'framer-motion'
import { summary, paragraphs, facts, beliefs } from '../data/about'
import { useReveal } from '../hooks/useReveal'

const highlights = [
  'Motion & micro-interactions',
  'Accessible, semantic markup',
  'Performance-first mindset',
  'Design-system thinking',
]

// ============================================================
// ABOUT
// `detailed` (default) renders the full page: the intro, the three
// story paragraphs, the fact rail, and the beliefs list.
// The Home page passes detailed={false} to get the compact version.
// ============================================================
export default function About({ detailed = true }) {
  const [leftRef, leftIn] = useReveal({ amount: 0.25 })
  const [rightRef, rightIn] = useReveal({ amount: 0.25 })

  return (
    <section id="about" aria-label="About" className="w-full border-t border-surface-light">
      <div className="w-full px-6 py-24 sm:px-8 lg:px-16">
        <div className="grid w-full gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Story */}
          <motion.div
            ref={leftRef}
            className="min-w-0"
            initial={{ x: -40, opacity: 0 }}
            animate={leftIn ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="eyebrow mb-4">// who is behind the keyboard</p>
            <h2 className="text-display font-display text-text">
              Interfaces that feel <span className="text-accent">effortless</span>
            </h2>

            <motion.p
              className="mt-8 max-w-2xl text-lg leading-relaxed text-soft"
              initial={{ opacity: 0, y: 20 }}
              animate={leftIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {summary}
            </motion.p>

            {detailed &&
              paragraphs.map((p, i) => (
                <motion.div
                  key={p.heading}
                  className="mt-10 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={leftIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.16 + i * 0.08 }}
                >
                  <h3 className="font-display text-2xl leading-tight text-text">
                    {p.heading}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-muted">{p.body}</p>
                </motion.div>
              ))}
          </motion.div>

          {/* Side rail */}
          <motion.div
            ref={rightRef}
            className="border border-surface-light bg-surface p-8"
            initial={{ x: 40, opacity: 0 }}
            animate={rightIn ? { x: 0, opacity: 1 } : { x: 40, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">
              focus areas
            </p>
            <div className="flex flex-col">
              {highlights.map((h, i) => (
                <motion.div
                  key={h}
                  className="flex items-center gap-3 border-t border-surface-light py-4 text-text"
                  initial={{ opacity: 0, x: 12 }}
                  animate={rightIn ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                >
                  <span className="font-mono text-sm text-accent">/0{i + 1}</span>
                  <span className="font-medium">{h}</span>
                </motion.div>
              ))}
            </div>

            {detailed && (
              <>
                <p className="mt-10 mb-4 font-mono text-xs uppercase tracking-widest text-muted">
                  the short version
                </p>
                <dl className="flex flex-col">
                  {facts.map((f, i) => (
                    <div
                      key={f.label}
                      className={`grid grid-cols-[7.5rem_1fr] gap-4 py-3 ${
                        i === 0 ? '' : 'border-t border-surface-light'
                      }`}
                    >
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                        {f.label}
                      </dt>
                      <dd className="min-w-0 text-sm leading-relaxed text-soft">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </motion.div>
        </div>

        {/* Beliefs — full page only */}
        {detailed && (
          <div className="mt-20">
            <p className="eyebrow mb-8">// working principles</p>
            <ul className="grid w-full grid-cols-1 gap-px border border-surface-light bg-surface-light md:grid-cols-2">
              {beliefs.map((b, i) => (
                <motion.li
                  key={b}
                  className="flex items-start gap-4 bg-surface p-6 transition-colors hover:bg-background"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <span className="mt-1 shrink-0 font-mono text-xs text-accent">
                    /{String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 text-base leading-relaxed text-soft">{b}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
