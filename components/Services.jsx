'use client'

import { motion } from 'framer-motion'
import { Code2, Layers, Sparkles, Gauge, Accessibility, Plug } from 'lucide-react'
import services from '../data/services'
import { useReveal } from '../hooks/useReveal'

const icons = [Code2, Layers, Sparkles, Gauge, Accessibility, Plug]

export default function Services() {
  const [gridRef, gridIn] = useReveal({ amount: 0.1 })
  const [headingRef, headingIn] = useReveal()

  return (
    <section id="services" className="w-full border-t border-surface-light bg-surface/30">
      <div className="w-full px-6 py-24 sm:px-8 lg:px-16">
        <motion.div
          ref={headingRef}
          className="mb-14 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={headingIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">03 · services</p>
          <h2 className="text-display font-display text-text">
            Stuff I can{' '}
            <span className="text-accent">build for you</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Six concrete ways I add value to a product — each one a narrow
            scope I can own end to end.
          </p>
        </motion.div>

        <motion.div
          ref={gridRef}
          className="grid w-full grid-cols-1 gap-px border border-surface-light bg-surface-light sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={gridIn ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {services.map((service, i) => {
            const Icon = icons[i]
            return (
              <motion.article
                key={service.title}
                className="group relative flex min-h-44 flex-col justify-between gap-6 bg-surface p-6 transition-colors hover:bg-background"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: 'easeOut' },
                  },
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon size={22} className="text-accent" />
                  <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
                    /0{i + 1}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-2xl leading-tight text-text">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
                <div className="h-[2px] w-8 bg-accent transition-all duration-300 group-hover:w-full" />
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}