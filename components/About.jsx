'use client'

import { motion } from 'framer-motion'

const highlights = [
  'Motion & micro-interactions',
  'Accessible, semantic markup',
  'Performance-first mindset',
  'Design-system thinking',
]

export default function About() {
  return (
    <section id="about" className="w-full px-6 py-24 sm:px-8 lg:px-16">
      <div className="grid w-full gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <motion.div
          className="min-w-0"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="eyebrow mb-4">01 · about</p>
          <h2 className="text-display font-display text-text">
            Interfaces that feel <span className="text-accent">effortless</span>
          </h2>

          <motion.p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-soft"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            I&apos;m a frontend developer who obsesses over the details that make a
            product feel alive — the micro-interactions, the motion, the
            accessibility, the performance. I turn complex problems into clean,
            intuitive interfaces using modern React and a design-system mindset.
          </motion.p>
          <motion.p
            className="mt-4 max-w-2xl text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I care about building interfaces that are as delightful to use as
            they are to build — shipping things that load fast, respond
            instantly, and behave predictably on every screen.
          </motion.p>
        </motion.div>

        {/* Focus areas — offset panel */}
        <motion.div
          className="border border-surface-light bg-surface p-8"
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
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
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              >
                <span className="font-mono text-sm text-accent">0{i + 1}</span>
                <span className="font-medium">{h}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}