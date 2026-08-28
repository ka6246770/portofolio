import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import site from '../data/site'
import { useDesktop } from '../hooks/useMediaQuery'

const NAV_HEIGHT = 72

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const isDesktop = useDesktop()
  const menuRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

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
    const ids = ['hero', 'work', 'experience', 'contact']
    const entries = ids
      .map((id) => document.getElementById(id))
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
      {/* Neon scroll-progress line */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
      >
        <div
          className={`flex h-[72px] w-full items-center justify-between px-6 transition-all duration-300 sm:px-8 lg:px-16 ${
            scrolled ? 'bg-background/85 backdrop-blur-md' : 'bg-transparent'
          }`}
        >
          {/* Logo / name mark */}
          <button
            onClick={() => handleNav('hero')}
            className="flex items-center font-display text-xl text-text"
          >
            {site.shortName}
            <span className="text-accent">_</span>
          </button>

          {/* Desktop links — developer-coded "//" style, neon prefixes */}
          {isDesktop ? (
            <nav className="flex items-center gap-7">
              {site.sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleNav(s.id)}
                  className="font-mono text-sm transition-colors"
                >
                  <span className={active === s.id ? 'text-text' : 'text-muted hover:text-text'}>
                    <span className="text-accent">// </span>
                    {s.label}
                  </span>
                </button>
              ))}
              {/* Outlined CTA — accent border + text, never a bg fill */}
              <motion.button
                onClick={() => handleNav('contact')}
                className="group flex items-center gap-1.5 border border-accent px-5 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-background"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                hire me
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            </nav>
          ) : (
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
              className="w-full border-t border-surface-light bg-background/95 backdrop-blur-md"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {site.sections.map((s, i) => (
                  <motion.button
                    key={s.id}
                    onClick={() => handleNav(s.id)}
                    className="flex items-center gap-2 rounded-md px-3 py-3 text-left font-mono text-sm text-text transition-colors hover:bg-surface"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="text-accent">//</span>
                    {s.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => handleNav('contact')}
                  className="mt-2 flex items-center justify-center gap-1.5 rounded-md border border-accent px-4 py-2.5 font-mono text-sm text-accent"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: site.sections.length * 0.05 }}
                >
                  hire me <ArrowUpRight size={15} />
                </motion.button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
