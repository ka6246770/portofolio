'use client'

import { useIntroPhase, INTRO_PLAYING } from '../components/IntroContext'

// ============================================================
// useEntranceDelay
// Returns how long above-the-fold content should wait before its
// entrance animation starts.
//
//   • Loader covering the screen → wait for it to lift (~1.9s).
//   • Loader skipped (repeat visit / reduced motion) → start now.
//
// Reading context inside a hook call keeps components declarative and
// avoids a fixed, wasted delay on every visit after the first.
// ============================================================
export function useEntranceDelay(base = 0.15, introHold = 1.9) {
  const phase = useIntroPhase()
  return phase === INTRO_PLAYING ? introHold : base
}

export default useEntranceDelay
