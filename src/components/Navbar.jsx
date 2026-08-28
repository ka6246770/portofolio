import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import site from '../data/site'
import { useDesktop } from '../hooks/useMediaQuery'

const NAV_HEIGHT = 80

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const isDesktop = useDesktop()
  const menuRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Close mobile menu on outside click
  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  // Track the section currently in view to highlight the nav link.
  useEffect(() => {
    const entries = site.sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (els) => {
        els.forEach((el) => {
          if (el.isIntersecting) setActive(el.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    entries.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleNav = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll progress bar pinned to the very top */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent via-accent-bright to-accent-dark"
        style={{ scaleX: progress }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-5 py-4 transition-all duration-300 ${
            scrolled ? 'bg-background/80 shadow-lg shadow-black/40 backdrop-blur-md' : ''
          } sm:px-8`}
        >
          {/* Logo */}
          <button
            onClick={() => handleNav('hero')}
            className="group flex items-center gap-2 font-mono text-lg font-bold tracking-widest"
          >
            <span className="text-accent">&lt;</span>
            <span className="text-text">
              {site.shortName}
              <span className="text-accent">/</span>
            </span>
            <span className="text-accent">&gt;</span>
            <motion.span
              className="ml-1 h-1.5 w-1.5 rounded-full bg-accent"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          </button>

          {/* Desktop links */}
          {isDesktop ? (
            <nav className="flex items-center gap-8">
              {site.sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleNav(s.id)}
                  className="group relative text-sm font-medium text-muted transition-colors hover:text-text"
                >
                  {s.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-accent transition-all duration-300 ${
                      active === s.id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              ))}
              {/* "Hire me" accent CTA */}
              <motion.button
                onClick={() => handleNav('contact')}
                className="rounded-full border border-accent/50 px-4 py-1.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-background"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Hire me
              </motion.button>
            </nav>
          ) : (
            /* Mobile hamburger */
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="rounded-md p-2 text-text transition-colors hover:bg-surface"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {open && !isDesktop && (
            <motion.nav
              ref={menuRef}
              className="border-t border-surface-light bg-background/95 backdrop-blur-md"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex flex-col gap-1 px-5 py-3">
                {site.sections.map((s, i) => (
                  <motion.button
                    key={s.id}
                    onClick={() => handleNav(s.id)}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-text transition-colors hover:bg-surface"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {s.label}
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => handleNav('contact')}
                  className="mt-2 rounded-full border border-accent/50 px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-background"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: site.sections.length * 0.05 }}
                >
                  Hire me
                </motion.button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
