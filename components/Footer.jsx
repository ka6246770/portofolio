'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import site, { navRoutes } from '../data/site'

const socialLinks = [
  { label: 'GitHub', href: site.social.github },
  { label: 'LinkedIn', href: site.social.linkedin },
  { label: 'Twitter', href: site.social.twitter },
]

// Full-width footer: page navigation + contact column + back to top.
export default function Footer() {
  // Rendered empty on the server + first client pass so the year is set
  // only in an effect — avoids an SSR/client hydration mismatch.
  const [year, setYear] = useState('')

  useEffect(() => {
    setYear(String(new Date().getFullYear()))
  }, [])

  return (
    <footer className="w-full border-t border-surface-light">
      {/* Navigation columns */}
      <div className="grid w-full gap-10 border-b border-surface-light px-6 py-14 sm:px-8 md:grid-cols-3 lg:px-16">
        <div className="min-w-0">
          <Link href="/" className="flex items-center font-display text-2xl text-text">
            {site.shortName}
            <span className="text-accent">_</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.roles.join(' · ')}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
            Pages
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {navRoutes.map((r) => (
              <li key={r.path}>
                <Link
                  href={r.path}
                  className="font-mono text-sm text-soft transition-colors hover:text-accent"
                >
                  <span className="text-accent">/</span> {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
            Elsewhere
          </p>
          <ul className="flex flex-col gap-2">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1.5 font-mono text-sm text-soft transition-colors hover:text-accent"
                >
                  {s.label}
                  <ArrowUpRight
                    size={14}
                    className="text-muted transition-colors group-hover:text-accent"
                  />
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="break-all font-mono text-sm text-soft transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex w-full flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center sm:px-8">
        <motion.p
          className="font-mono text-sm text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent">// </span>
          © {year} {site.name}. Built with Next.js &amp; Framer Motion.
        </motion.p>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="flex items-center gap-2 border border-surface-light px-4 py-2 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-accent"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          back to top <ArrowUp size={15} />
        </motion.button>
      </div>
    </footer>
  )
}
