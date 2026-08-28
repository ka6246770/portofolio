import { motion } from 'framer-motion'

// Custom minimal illustration accents scattered near the hero.
// Hand-drawn inline SVG line-art — deliberately NOT stock icons.
// Only neon green #39FF14 + grays (per the strict palette).

function MiniCodeEditor() {
  return (
    <motion.svg
      width="150"
      height="120"
      viewBox="0 0 150 120"
      fill="none"
      className="overflow-visible"
      aria-hidden="true"
      animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x="8" y="16" width="134" height="96" rx="10" stroke="rgba(232,232,232,0.28)" strokeWidth="1.5" fill="#1a1a1a" />
      <circle cx="24" cy="32" r="3.5" fill="#39ff14" opacity="0.9" />
      <circle cx="38" cy="32" r="3.5" fill="rgba(232,232,232,0.35)" />
      <circle cx="52" cy="32" r="3.5" fill="rgba(232,232,232,0.35)" />
      <path d="M22 52 H72" stroke="#39ff14" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
      <path d="M22 68 H58" stroke="rgba(232,232,232,0.45)" strokeWidth="5" strokeLinecap="round" />
      <path d="M22 84 H96" stroke="rgba(232,232,232,0.45)" strokeWidth="5" strokeLinecap="round" />
    </motion.svg>
  )
}

function CursorArrow() {
  return (
    <motion.svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="overflow-visible"
      aria-hidden="true"
      animate={{ x: [0, 8, 0], y: [0, -6, 0], rotate: [-4, 2, -4] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M20 12 L52 56 L38 50 L30 60 L24 44 L8 38 Z" fill="#39ff14" opacity="0.92" />
      <path d="M20 12 L52 56" stroke="#0a0a0a" strokeWidth="2" />
    </motion.svg>
  )
}

function SparkleCluster() {
  return (
    <motion.svg
      width="110"
      height="110"
      viewBox="0 0 110 110"
      fill="none"
      className="overflow-visible"
      aria-hidden="true"
      animate={{ rotate: [0, 12, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M55 12 L62 46 L96 55 L62 64 L55 98 L48 64 L14 55 L48 46 Z" fill="#39ff14" opacity="0.2" />
      <path d="M55 12 L62 46 L96 55 L62 64 L55 98 L48 64 L14 55 L48 46 Z" stroke="#39ff14" strokeWidth="1.5" />
      <circle cx="90" cy="18" r="3" fill="#39ff14" opacity="0.6" />
      <circle cx="16" cy="82" r="2.5" fill="rgba(232,232,232,0.5)" />
    </motion.svg>
  )
}

export default function HeroIllustrations() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
      <motion.div
        className="absolute right-[8%] top-[16%] hidden lg:block"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <MiniCodeEditor />
      </motion.div>

      <motion.div
        className="absolute right-[24%] bottom-[20%] hidden lg:block"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.7 }}
      >
        <CursorArrow />
      </motion.div>

      <motion.div
        className="absolute left-[3%] bottom-[18%] hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <SparkleCluster />
      </motion.div>
    </div>
  )
}
