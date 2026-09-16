'use client'

import { motion } from 'framer-motion'
import stats from '../data/stats'
import { useReveal } from '../hooks/useReveal'

export default function Stats() {
  const [ref, inView] = useReveal({ amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      className="w-full border-y border-surface-light"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="grid w-full grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col gap-1 px-6 py-8 sm:px-8 lg:px-10 ${
              i % 2 === 1 ? 'border-l border-surface-light' : ''
            } ${i >= 2 ? 'border-t border-surface-light lg:border-t-0' : ''} ${
              i === 2 ? 'lg:border-l lg:border-l-surface-light' : ''
            }`}
          >
            <span className="font-display text-5xl leading-none text-accent sm:text-6xl">
              {s.value}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}