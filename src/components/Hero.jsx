import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown, Sparkles, Terminal } from 'lucide-react'
import site from '../data/site'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 1.2 } },
}

const item = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

// Cycles through the list of job titles with a typewriter effect.
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
      // Word fully deleted — pause briefly, then start typing the next one.
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
  const scrollRef = useRef(null)

  const goTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section id="hero" ref={scrollRef} className="relative flex min-h-screen items-center overflow-hidden">
      {/* Animated mesh background — pure CSS, GPU friendly */}
      <div className="mesh-bg" aria-hidden="true">
        <div className="mesh-blob mesh-blob--1" />
        <div className="mesh-blob mesh-blob--2" />
        <div className="mesh-blob mesh-blob--3" />
      </div>

      {/* Subtle grid overlay for an agency feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Availability badge */}
          <motion.div
            variants={item}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-accent"
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-accent"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <Sparkles size={14} />
            Available for work
          </motion.div>

          {/* Eyebrow line */}
          <motion.p
            variants={item}
            className="mb-3 flex items-center gap-2 font-mono text-sm text-muted"
          >
            <Terminal size={15} className="text-accent" />
            <span className="text-accent">$</span> npm create developer --name
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            {site.name.split(' ')[0]}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-bright to-accent-dark">
              {site.name.split(' ').slice(1).join(' ')}
            </span>
          </motion.h1>

          {/* Typing role line */}
          <motion.div
            variants={item}
            className="mt-5 flex h-9 items-center font-mono text-xl text-text sm:text-2xl"
          >
            <span className="mr-3 text-accent">▸</span>
            <span className="relative">
              {typed}
              <motion.span
                className="ml-0.5 inline-block w-[2px] bg-accent"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                &nbsp;
              </motion.span>
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted"
          >
            {site.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <motion.button
              onClick={() => goTo('projects')}
              className="group flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-semibold text-background transition-colors hover:bg-accent-bright"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              View Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              onClick={() => goTo('contact')}
              className="rounded-full border border-text/25 px-7 py-3 font-semibold text-text transition-colors hover:border-accent hover:text-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => goTo('about')}
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent sm:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.span
          className="flex flex-col items-center gap-1 text-xs uppercase tracking-widest"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Scroll
          <ArrowDown size={18} />
        </motion.span>
      </motion.button>
    </section>
  )
}
