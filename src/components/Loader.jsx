import { useEffect } from 'react'
import { motion } from 'framer-motion'
import site from '../data/site'

// Branded intro loader. The name scales/letter-spaces in, then after a
// short delay `onComplete` is called so the parent can unmount it with
// an exit fade. Total visible time is ~1.3s.
export default function Loader({ onComplete }) {
  const letters = site.shortName.split('')

  useEffect(() => {
    const t = setTimeout(onComplete, 1300)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      aria-hidden="true"
    >
      {/* Soft accent glow behind the logo */}
      <motion.div
        className="absolute h-40 w-40 rounded-full bg-accent/20 blur-3xl"
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative flex items-center overflow-hidden font-mono text-3xl font-bold tracking-widest text-text"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { y: 28, opacity: 0, rotateX: -90 },
              visible: {
                y: 0,
                opacity: 1,
                rotateX: 0,
                transition: { duration: 0.5, ease: 'easeOut' },
              },
            }}
          >
            <span className="text-accent">{letter}</span>
          </motion.span>
        ))}
      </motion.div>

      {/* Thin underline that draws left→right */}
      <motion.div
        className="absolute bottom-[38%] h-px w-24 bg-gradient-to-r from-accent to-accent-dark"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  )
}
