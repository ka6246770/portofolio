'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// ============================================================
// VIEW ALL LINK
// The affordance that sends a Home visitor from a preview to the
// dedicated page. Same outlined accent language as every other
// button, but sized down for inline use next to a section heading.
// ============================================================
export default function ViewAllLink({ href, children = 'view all', className = '' }) {
  return (
    <motion.div className={className} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
      <Link
        href={href}
        className="group flex items-center gap-2 border border-accent px-5 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-background"
      >
        {children}
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  )
}
