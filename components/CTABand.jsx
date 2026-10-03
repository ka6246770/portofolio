'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

// ============================================================
// CTA BAND
// Bottom-of-page call to action. Outlined accent treatment only —
// the palette rule says the neon never becomes a background fill.
// ============================================================
export default function CTABand({
  label = '// next step',
  title = 'Have something',
  accent = 'to build?',
  text = 'Send the brief, the half-formed idea, or the link that needs fixing. I read every message myself and reply within a day.',
  primary = { label: 'contact me', href: '/contact' },
  secondary,
}) {
  return (
    <section className="w-full border-t border-surface-light bg-surface/30">
      <div className="w-full px-6 py-20 sm:px-8 lg:px-16 lg:py-24">
        <motion.div
          className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="min-w-0">
            <p className="eyebrow mb-5">{label}</p>
            <h2 className="text-display font-display text-text">
              {title} <span className="text-accent">{accent}</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{text}</p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={primary.href}
                className="group flex items-center gap-2 border border-accent px-7 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-background"
              >
                {primary.label}
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            {secondary && (
              <motion.a
                href={secondary.href}
                target={secondary.external ? '_blank' : undefined}
                rel={secondary.external ? 'noreferrer' : undefined}
                className="flex items-center gap-1.5 border border-surface-light px-7 py-3 font-mono text-sm text-text transition-colors hover:border-accent hover:text-accent"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {secondary.label}
                <ArrowUpRight size={16} />
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
