'use client'

import { motion } from 'framer-motion'
import {
  SquareCode,
  GitBranch,
  PenTool,
  Triangle,
  Network,
  Server,
  Package,
  Bug,
  Zap,
  Send,
  TestTube,
  NotebookText,
} from 'lucide-react'
import tools from '../data/tools'
import { useReveal } from '../hooks/useReveal'

const icons = {
  'VS Code': SquareCode,
  'Git & GitHub': GitBranch,
  Figma: PenTool,
  Vercel: Triangle,
  Netlify: Network,
  'Node.js': Server,
  'npm & yarn': Package,
  'Chrome DevTools': Bug,
  Vite: Zap,
  Postman: Send,
  Playwright: TestTube,
  Notion: NotebookText,
}

export default function Tools() {
  const [headingRef, headingIn] = useReveal()
  const [wallRef, wallIn] = useReveal({ amount: 0.15 })

  return (
    <section id="tools" className="w-full border-t border-surface-light">
      <div className="w-full px-6 py-24 sm:px-8 lg:px-16">
        <div className="mb-12 grid w-full gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
          <motion.div
            ref={headingRef}
            className="min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={headingIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">07 · tools</p>
            <h2 className="text-display font-display text-text">
              Everyday <span className="text-accent">toolkit</span>
            </h2>
          </motion.div>

          <motion.p
            className="max-w-xl self-end text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={headingIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The software I actually open on a normal day. Unromantic,
            battle-tested picks — tooling is a means, not a religion.
          </motion.p>
        </div>

        <motion.div
          ref={wallRef}
          className="flex w-full flex-wrap gap-3"
          initial="hidden"
          animate={wallIn ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04 } },
          }}
        >
          {tools.map((tool) => {
            const Icon = icons[tool]
            return (
              <motion.span
                key={tool}
                className="flex items-center gap-2 border border-surface-light px-4 py-2 font-mono text-sm text-soft transition-colors duration-300 hover:border-accent hover:text-accent"
                variants={{
                  hidden: { opacity: 0, scale: 0.92 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.3, ease: 'easeOut' },
                  },
                }}
              >
                {Icon && (
                  <Icon size={15} className="shrink-0 text-accent" />
                )}
                {tool}
              </motion.span>
            )
          })}
        </motion.div>

        <motion.p
          className="mt-10 font-mono text-sm text-muted"
          initial={{ opacity: 0 }}
          animate={wallIn ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-accent">//</span> the tools change — the
          thinking doesn&apos;t.
        </motion.p>
      </div>
    </section>
  )
}