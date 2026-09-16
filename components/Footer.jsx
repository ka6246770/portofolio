'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import site from '../data/site'

// Full-width footer — back to top + copyright.
export default function Footer() {
  // Rendered empty on the server + first client pass so the year is set
  // only in an effect — avoids an SSR/client hydration mismatch.
  const [year, setYear] = useState('')

  useEffect(() => {
    setYear(String(new Date().getFullYear()))
  }, [])

  return (
    <footer className="w-full border-t border-surface-light">
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