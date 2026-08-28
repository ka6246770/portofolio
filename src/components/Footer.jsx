import { motion } from 'framer-motion'
import { Heart, ArrowUp } from 'lucide-react'
import site from '../data/site'

// Simple footer with a "back to top" button and copyright line.
export default function Footer() {
  return (
    <footer className="relative border-t border-surface-light bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <motion.p
          className="flex items-center gap-1.5 text-sm text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          © {new Date().getFullYear()} {site.name}. Built with
          <Heart size={14} className="fill-accent text-accent" />
          and React.
        </motion.p>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="flex items-center gap-2 rounded-full border border-text/25 px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          Back to top <ArrowUp size={15} />
        </motion.button>
      </div>
    </footer>
  )
}
