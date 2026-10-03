'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import site, { navRoutes } from '../data/site'
import { useDesktop } from '../hooks/useMediaQuery'
import { useEntranceDelay } from '../hooks/useEntranceDelay'

// Active state for a route link. "/" is only active on the exact
// home path; every other path must match itself or a child of it.
function isActive(pathname, path) {
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`)
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const isDesktop = useDesktop()
  const pathname = usePathname()
  const menuRef = useRef(null)
  // Slide in after the one-time loader on a first visit; immediately
  // on every return visit.
  const entranceDelay = useEntranceDelay(0.15, 1.7)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Any completed navigation closes the mobile menu — covers links,
  // browser back/forward, and programmatic redirects.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

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
        transition={{ delay: entranceDelay, duration: 0.6, ease: 'easeOut' }}
      >
        <div
          className={`flex h-[72px] w-full items-center justify-between px-6 transition-all duration-300 sm:px-8 lg:px-16 ${
            scrolled ? 'bg-background/85 backdrop-blur-md' : 'bg-transparent'
          }`}
        >
          {/* Logo / name mark → home */}
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="flex items-center font-display text-xl text-text"
          >
            {site.shortName}
            <span className="text-accent">_</span>
          </Link>

          {/* Desktop links — developer-coded "//" style, neon prefixes */}
          {isDesktop ? (
            <nav className="flex items-center gap-7" aria-label="Main">
              {navRoutes.map((s) => {
                const active = isActive(pathname, s.path)
                return (
                  <Link
                    key={s.path}
                    href={s.path}
                    aria-current={active ? 'page' : undefined}
                    className="group font-mono text-sm"
                  >
                    <span
                      className={
                        active
                          ? 'text-text'
                          : 'text-muted transition-colors group-hover:text-text'
                      }
                    >
                      <span className="text-accent">// </span>
                      {s.label}
                    </span>
                  </Link>
                )
              })}

              {/* Outlined CTA — accent border + text, never a bg fill */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="group flex items-center gap-1.5 border border-accent px-5 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-background"
                >
                  hire me
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </motion.div>
            </nav>
          ) : (
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="rounded-md p-2.5 text-text transition-colors hover:bg-surface"
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
              aria-label="Mobile menu"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {navRoutes.map((s, i) => {
                  const active = isActive(pathname, s.path)
                  return (
                    <motion.div
                      key={s.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={s.path}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={`flex flex-col gap-0.5 rounded-md px-3 py-3 font-mono text-sm transition-colors hover:bg-surface ${
                          active ? 'text-text' : 'text-soft'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-accent">//</span>
                          {s.label}
                        </span>
                        <span className="pl-5 text-xs text-muted">{s.blurb}</span>
                      </Link>
                    </motion.div>
                  )
                })}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navRoutes.length * 0.05 }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="mt-2 flex items-center justify-center gap-1.5 rounded-md border border-accent px-4 py-2.5 font-mono text-sm text-accent"
                  >
                    hire me <ArrowUpRight size={15} />
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
