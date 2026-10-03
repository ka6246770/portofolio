'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, RotateCcw } from 'lucide-react'

// ============================================================
// ERROR SCREEN
// The shared fallback UI used by both the React ErrorBoundary
// around the routed pages and Next's per-segment error.jsx.
// Copy explains what happened and what to do — it never just
// says "something went wrong".
// ============================================================
export default function ErrorScreen({
  code = '// runtime error',
  title = 'This page hit an',
  accent = 'error',
  detail,
  onRetry,
  retryLabel = 'try again',
}) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="w-full px-6 pb-24 pt-40 sm:px-8 lg:px-16 lg:pt-48">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="eyebrow mb-6">{code}</p>

          <h1 className="text-display font-display text-text">
            {title} <span className="text-accent">{accent}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {detail ||
              'The rest of the site still works. You can retry this page, or head back and reach me through another route.'}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {onRetry && (
              <motion.button
                onClick={onRetry}
                className="group flex items-center gap-2 border border-accent px-7 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-background"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <RotateCcw size={16} /> {retryLabel}
              </motion.button>
            )}
            <Link
              href="/"
              className="group flex items-center gap-2 border border-surface-light px-7 py-3 font-mono text-sm text-text transition-colors hover:border-accent hover:text-accent"
            >
              back home
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="font-mono text-sm text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              // contact me
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
