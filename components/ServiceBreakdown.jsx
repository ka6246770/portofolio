'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import services from '../data/services'
import { useReveal } from '../hooks/useReveal'

// ============================================================
// SERVICE BREAKDOWN
// One editorial row per service: what it is, exactly what you get,
// the tools it runs on, and the outcome in one line. This is the
// detail the old single-page grid could not carry.
// ============================================================

const rowVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

function BreakdownRow({ service }) {
  const [ref, inView] = useReveal({ amount: 0.25 })

  return (
    <motion.article
      ref={ref}
      variants={rowVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="grid w-full grid-cols-1 gap-8 border-t border-surface-light py-10 lg:grid-cols-12 lg:gap-10 lg:py-12"
    >
      {/* Title + outcome */}
      <div className="min-w-0 lg:col-span-4">
        <h3 className="font-display text-2xl leading-tight text-text lg:text-3xl">
          {service.title}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          {service.description}
        </p>
        <p className="mt-6 font-mono text-sm leading-relaxed text-accent">
          {service.outcome}
        </p>
      </div>

      {/* Deliverables */}
      <div className="min-w-0 lg:col-span-5">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
          What you get
        </p>
        <ul className="flex flex-col gap-3">
          {service.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-3 text-base leading-relaxed text-soft">
              <Check size={17} className="mt-1 shrink-0 text-accent" />
              <span className="min-w-0">{d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stack */}
      <div className="min-w-0 lg:col-span-3">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
          Runs on
        </p>
        <ul className="flex flex-wrap gap-2">
          {service.stack.map((t) => (
            <li
              key={t}
              className="border border-surface-light px-3 py-1 font-mono text-xs text-soft"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export default function ServiceBreakdown() {
  const [headingRef, headingIn] = useReveal()

  return (
    <section
      aria-labelledby="breakdown-heading"
      className="w-full border-t border-surface-light"
    >
      <div className="w-full px-6 py-24 sm:px-8 lg:px-16">
        <motion.div
          ref={headingRef}
          className="mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={headingIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">// in detail</p>
          <h2 id="breakdown-heading" className="text-display font-display text-text">
            What each one{' '}
            <span className="text-accent">actually includes</span>
          </h2>
        </motion.div>

        <div className="w-full">
          {services.map((service) => (
            <BreakdownRow key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
