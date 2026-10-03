'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CustomCursor from '../../components/CustomCursor'
import BackToTop from '../../components/BackToTop'
import Loader from '../../components/Loader'
import PageTransition from '../../components/PageTransition'
import ErrorBoundary from '../../components/ErrorBoundary'
import { IntroProvider, INTRO_PENDING, INTRO_PLAYING, INTRO_DONE } from '../../components/IntroContext'
import { readIntroDone, writeIntroDone, prefersReducedMotion } from '../../lib/intro'

// ============================================================
// SHARED LAYOUT for every routed page — the Next.js equivalent of a
// <Layout> + <Outlet />. Navbar, Footer, cursor, and back-to-top
// mount once here and survive route changes; only the children swap,
// animated (see PageTransition).
//
// The intro loader is an OVERLAY, deliberately not a wrapper around
// the chrome: animating `opacity` on an ancestor creates a containing
// block for `position: fixed`, which would trap the fixed navbar and
// cursor inside it.
//
// Scroll-to-top on route change is handled by Next itself (its
// ScrollAndFocusHandler runs after the new page is committed) — see
// the note in components/PageTransition.jsx before adding a scroller.
// ============================================================
export default function SiteLayout({ children }) {
  // 'pending' = server render + first client pass, no decision made yet.
  const [phase, setPhase] = useState(INTRO_PENDING)

  useEffect(() => {
    // sessionStorage/matchMedia can only be read here, after mount.
    if (prefersReducedMotion() || readIntroDone()) setPhase(INTRO_DONE)
    else setPhase(INTRO_PLAYING)
  }, [])

  const finishIntro = useCallback(() => {
    writeIntroDone()
    setPhase(INTRO_DONE)
  }, [])

  // The loader only plays once per browser session; from then on the
  // first page is ready immediately.
  return (
    <IntroProvider phase={phase}>
      <div className="relative min-h-screen bg-background text-text">
        <CustomCursor />

        <AnimatePresence>
          {phase === INTRO_PLAYING && <Loader key="loader" onComplete={finishIntro} />}
        </AnimatePresence>

        <Navbar />

        <ErrorBoundary>
          <PageTransition>{children}</PageTransition>
        </ErrorBoundary>

        <Footer />
        <BackToTop />
      </div>
    </IntroProvider>
  )
}
