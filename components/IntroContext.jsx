'use client'

import { createContext, useContext } from 'react'

// ============================================================
// INTRO CONTEXT
// The intro phase of the one-time branded loader:
//   'pending' → server render + first client pass, undecided.
//   'playing' → the loader is covering the viewport.
//   'done'    → nothing is covering the page; animate freely.
//
// Above-the-fold entrance choreography reads this so content waits
// for the loader to lift on a first visit, and starts immediately on
// every later navigation where the loader is skipped. Without it,
// the hero would animate in behind the overlay (wasted) or flash
// before the loader is even mounted.
//
// 'pending' is the default so server HTML and the first client render
// always agree — no hydration mismatch.
// ============================================================
export const INTRO_PENDING = 'pending'
export const INTRO_PLAYING = 'playing'
export const INTRO_DONE = 'done'

const IntroContext = createContext(INTRO_PENDING)

export function IntroProvider({ phase, children }) {
  return <IntroContext.Provider value={phase}>{children}</IntroContext.Provider>
}

export function useIntroPhase() {
  return useContext(IntroContext)
}

export default IntroContext
