'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { engagements } from '../data/services'
import { useReveal } from '../hooks/useReveal'

// ============================================================
// ENGAGEMENTS
// How the work is bought, not what is bought. Four columns with a
// cadence line instead of prices — they stay true at any rate.
// ============================================================
export default function Engagements() {
  const [listRef, listIn] = useReveal({ amount: 0.1 })

  return (
    <section
      aria-labelledby="engagements-heading"
      className="w-full border-t border-surface-light bg-surface/15"
    >
      <div className="w-full px-6 py-24 sm:px-8 lg:px-16">
        <div className="mb-14 grid w-full gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
          <div className="min-w-0">
            <p className="eyebrow mb-4">// ways to work together</p>
            <h2 id="engagements-heading" className="text-display font-display text-text">
              Pick a <span className="text-accent">shape</span>
            </h2>
          </div>
          <p className="max-w-xl self-end text-lg leading-relaxed text-muted">
            The same care either way — the difference is how much is on my plate
            and how long I get to stay with it.
          </p>
        </div>

        <motion.div
          ref={listRef}
          className="grid w-full grid-cols-1 gap-px border border-surface-light bg-surface-light sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate={listIn ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {engagements.map((e, i) => (
            <motion.div
              key={e.id}
              className="group flex min-h-64 flex-col justify-between gap-6 bg-surface p-6 transition-colors hover:bg-background"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
              }}
            >
              <div className="min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl leading-tight text-text">
                    {e.name}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-1 font-mono text-sm text-muted">{e.cadence}</p>
                <p className="mt-4 text-base leading-relaxed text-muted">{e.summary}</p>
              </div>

              <div className="min-w-0">
                <ul className="flex flex-col gap-2">
                  {e.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-soft">
                      <Check size={15} className="mt-1 shrink-0 text-accent" />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-surface-light pt-3 text-sm leading-relaxed text-muted">
                  <span className="font-mono text-xs text-accent">best for · </span>
                  {e.bestFor}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 flex flex-wrap items-center gap-2 font-mono text-sm text-muted">
          <span className="text-accent">//</span>
          Not sure which fits? Describe the problem and I will tell you —
          <Link href="/contact" className="text-accent underline-offset-4 hover:underline">
            contact form
          </Link>
          takes a minute.
        </p>
      </div>
    </section>
  )
}

