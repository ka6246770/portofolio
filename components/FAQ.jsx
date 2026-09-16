'use client'

import { motion } from 'framer-motion'
import site from '../data/site'

export default function FAQ() {
  return (
    <section id="faq" className="w-full border-t border-surface-light">
      <motion.div
        className="grid w-full gap-10 px-6 py-24 sm:px-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16 lg:px-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div>
          <p className="eyebrow mb-4">09 · faq</p>
          <h2 className="text-display font-display text-text">
            Quick <span className="text-accent">answers</span>
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
            The questions I get asked most — answered straight.
          </p>
        </div>

        <div className="flex flex-col min-w-0">
          {site.faq.map((item, i) => (
            <motion.div
              key={item.question}
              className="border-t border-surface-light py-6 last:border-b"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <h3 className="flex items-baseline gap-4 text-lg font-semibold text-text">
                <span className="shrink-0 font-mono text-sm text-accent">
                  Q{i + 1}
                </span>
                {item.question}
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                {item.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}