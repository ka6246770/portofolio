'use client'

import { motion } from 'framer-motion'
import process from '../data/process'
import { useReveal } from '../hooks/useReveal'

const stepVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

function StepRow({ step, i }) {
  const [ref, inView] = useReveal({ amount: 0.2 })
  const num = String(i + 1).padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      className="group relative border-t border-surface-light px-6 py-8 sm:px-8 lg:border-t-0 lg:px-5 lg:py-0 lg:pt-10"
      variants={stepVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {/* Dot on the connector rail (desktop only) */}
      <div className="hidden lg:block">
        <span className="absolute -top-[3px] left-5 h-[5px] w-[5px] rounded-full bg-accent" />
      </div>

      <div className="flex items-start gap-6 lg:flex-col lg:gap-6">
        <span className="num-ghost font-display text-6xl leading-none lg:text-8xl">
          {num}
        </span>
        <div className="min-w-0 pt-1 lg:pt-0">
          <h3 className="font-display text-xl text-text transition-colors group-hover:text-accent">
            {step.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted">
            {step.description}
          </p>
        </div>
      </div>

      {/* Procedural underline sweeping left → right on hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100 lg:hidden" />
    </motion.div>
  )
}

export default function Process() {
  const [headingRef, headingIn] = useReveal()
  const [railRef, railIn] = useReveal({ amount: 0.05 })

  return (
    <section id="process" className="relative w-full border-t border-surface-light">
      <div className="px-6 pt-24 sm:px-8 lg:px-16">
        <motion.div
          ref={headingRef}
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={headingIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">04 · process</p>
          <h2 className="text-display font-display text-text">
            From kickoff{' '}
            <span className="text-accent">to shipped</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            A repeatable five-step loop — the same shape on every engagement,
            big or small.
          </p>
        </motion.div>
      </div>

      {/* Horizontal rail (desktop) with ghost-numeral steps */}
      <motion.div
        ref={railRef}
        className="relative mt-14 hidden w-full px-10 lg:block lg:px-16"
        initial={{ opacity: 0 }}
        animate={railIn ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        aria-hidden="true"
      >
        <div className="h-[2px] w-full bg-surface-light" />
      </motion.div>

      <div className="relative mt-0 pb-6">
        <div className="grid w-full grid-cols-1 lg:mt-4 lg:grid-cols-5">
          {process.map((step, i) => (
            <StepRow key={step.title} step={step} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}