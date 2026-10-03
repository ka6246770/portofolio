'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { navRoutes } from '../data/site'

// Full-design 404: keeps the site's voice, offers a way out.
export default function NotFoundView({ requestedPath }) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="w-full px-6 pb-24 pt-40 sm:px-8 lg:px-16 lg:pt-48">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="eyebrow mb-6">// 404 · route not found</p>

          <h1 className="font-display leading-[0.85] text-text" style={{ fontSize: 'clamp(4rem, 1.2rem + 12vw, 12rem)' }}>
            4<span className="text-accent">04</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            Nothing lives at{' '}
            <span className="break-all font-mono text-soft">
              {requestedPath || 'this address'}
            </span>
            . The page may have moved — every section of the site is still one
            click away below.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/"
                className="group flex items-center gap-2 border border-accent px-7 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-background"
              >
                back home
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <Link
              href="/contact"
              className="border border-surface-light px-7 py-3 font-mono text-sm text-text transition-colors hover:border-accent hover:text-accent"
            >
              report a broken link
            </Link>
          </div>
        </motion.div>

        {/* Route index — makes an empty page actionable */}
        <motion.nav
          aria-label="All pages"
          className="mt-16 grid w-full grid-cols-1 gap-px border border-surface-light bg-surface-light sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          {navRoutes.map((r) => (
            <Link
              key={r.path}
              href={r.path}
              className="group flex flex-col justify-between gap-4 bg-surface p-6 transition-colors hover:bg-background"
            >
              <span className="font-mono text-xs text-accent">~{r.path}</span>
              <span>
                <span className="block font-display text-2xl leading-tight text-text">
                  {r.label}
                </span>
                <span className="mt-2 block text-sm text-muted">{r.blurb}</span>
              </span>
              <span className="h-[2px] w-8 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </motion.nav>
      </div>
    </section>
  )
}
