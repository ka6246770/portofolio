'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

// ============================================================
// PAGE TRANSITION
//
// How Next.js actually behaves, verified against
// next/dist/client/components/layout-router.js: on every navigation
// ScrollAndFocusHandler runs *after* the new page is committed to the
// DOM, scrolls the document to the top, and focuses the new content.
// There is no supported opt-out for that.
//
// Which decides the shape here:
//   • The page gets a keyed fade + slide ENTER. Holding the previous
//     page alive to play an exit animation would leave it on screen
//     while Next yanks the document to the top — the old page visibly
//     jumps before fading. So the exit is not worth the jank.
//   • The route-change gesture that DOES have an exit lives in
//     AnimatePresence below: a single neon hairline that draws across
//     the viewport and dissolves, replacing the old page's exit.
//   • Next's own scroll-to-top covers the "scroll to top on route
//     change" requirement, and hash deep-links (e.g. /projects#2)
//     still work through the scroll-margin on each card.
// ============================================================

const pageVariants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0 },
}

export default function PageTransition({ children }) {
  const pathname = usePathname()

  return (
    <>
      {/* AnimatePresence + exit on the route-change sweep */}
      <AnimatePresence>
        <motion.div
          key={pathname}
          className="pointer-events-none fixed left-0 top-[71px] z-[55] h-[2px] w-full origin-left bg-accent"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      </AnimatePresence>

      <motion.main
        key={pathname}
        variants={pageVariants}
        initial="enter"
        animate="center"
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </>
  )
}
