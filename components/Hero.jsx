'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import site from '../data/site'
import HeroIllustrations from './HeroIllustrations'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 1.25 } },
}

const item = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

// Cycles through job titles with a typewriter effect.
function useTypewriter(words, typeSpeed, pause) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      timeout = setTimeout(() => {
        setDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      }, 120)
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1),
          )
        },
        deleting ? typeSpeed / 2 : typeSpeed,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typeSpeed, pause])

  return text
}

export default function Hero() {
  const typed = useTypewriter(site.roles, site.typingSpeed, site.typingPause)

  const goTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const [first, ...rest] = site.name.split(' ')
  const lastName = rest.join(' ')

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-end overflow-hidden pb-16 pt-24"
    >
      {/* Custom illustrations near the hero */}
      <HeroIllustrations />

      {/* Full-width container — touches screen edges */}
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16">
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Mono intro line */}
          <motion.p variants={item} className="mb-6 font-mono text-sm text-muted">
            <span className="text-accent">$</span> build --name {site.shortName} --role frontend
          </motion.p>

          {/* Oversized, left-aligned display name — the visual anchor */}
          <motion.h1
            variants={item}
            className="font-display leading-[0.85] text-text"
            style={{
              fontSize: 'clamp(3.5rem, 1.5rem + 8vw, 17rem)',
              overflowWrap: 'anywhere',
            }}
          >
            {first}
            <span className="block text-accent">{lastName}</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-10 flex max-w-xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6"
          >
            {/* Role (typewriter) */}
            <div className="flex items-center gap-3 font-mono text-lg text-soft sm:text-xl">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
              <span>
                {typed}
                <motion.span
                  className="ml-1 inline-block h-5 w-[2px] bg-accent align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </span>
            </div>
          </motion.div>

          {/* Short intro */}
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {site.intro}
          </motion.p>

          {/* CTA — outlined (accent border + text, no bg fill) */}
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <motion.button
              onClick={() => goTo('contact')}
              className="group flex items-center gap-2 border border-accent px-7 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-background"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              let&apos;s talk
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              onClick={() => goTo('work')}
              className="border border-surface-light px-7 py-3 font-mono text-sm text-text transition-colors hover:border-accent hover:text-accent"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              view work
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => goTo('about')}
        aria-label="Scroll down"
        className="absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-1 text-muted transition-colors hover:text-accent lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.span
          className="flex flex-col items-center gap-1 text-xs uppercase tracking-widest"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          scroll
          <ArrowDown size={18} />
        </motion.span>
      </motion.button>
    </section>
  )
}