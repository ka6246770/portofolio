'use client'

import { motion } from 'framer-motion'
import standards from '../data/standards'
import { useReveal } from '../hooks/useReveal'

const rowVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Standards() {
  const [headingRef, headingIn] = useReveal()
  const [listRef, listIn] = useReveal({ amount: 0.1 })

  return (
    <section id="standards" className="w-full border-t border-surface-light bg-surface/15">
      <div className="w-full px-6 py-24 sm:px-8 lg:px-16">
        <div className="mb-14 grid w-full gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
          <motion.div
            ref={headingRef}
            className="min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={headingIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">05 · standards</p>
            <h2 className="text-display font-display text-text">
              The bar I <span className="text-accent">hold</span>
            </h2>
          </motion.div>

          <motion.p
            className="max-w-xl self-end text-lg leading-relaxed text-muted md:justify-self-end"
            initial={{ opacity: 0, y: 20 }}
            animate={headingIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Five rules I never negotiate against when taking on work —
            written down so they stay true.
          </motion.p>
        </div>

        <motion.div
          ref={listRef}
          className="flex w-full flex-col"
          initial="hidden"
          animate={listIn ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {standards.map((s, i) => (
            <motion.div
              key={s.statement}
              className="group grid w-full grid-cols-1 items-baseline gap-3 border-t border-surface-light py-7 transition-colors hover:bg-background sm:grid-cols-[auto_1fr] sm:gap-10"
              variants={rowVariants}
            >
              <span className="font-mono text-sm text-accent">
                /{String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p className="font-display text-2xl leading-snug text-soft transition-transform duration-300 group-hover:translate-x-1 group-hover:text-text sm:text-3xl">
                  {s.statement}
                </p>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">
                  {s.note}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}