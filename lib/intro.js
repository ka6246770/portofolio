// ============================================================
// INTRO STATE HELPERS
// Session-scoped memory for the branded loader. Kept as plain
// functions: nothing touches `window`, `document`, or storage at
// module level, so this file is safe to import from server
// components and during SSR. Every access is wrapped in try/catch
// because private browsing modes and embedded frames can throw on
// BOTH read and write.
// ============================================================

// Namespaced so it can never collide with another app on the origin.
const INTRO_KEY = 'kw-portfolio-intro-complete'

export function readIntroDone() {
  try {
    return window.sessionStorage.getItem(INTRO_KEY) === '1'
  } catch {
    return false
  }
}

export function writeIntroDone() {
  try {
    window.sessionStorage.setItem(INTRO_KEY, '1')
  } catch {
    // Storage unavailable — the loader just replays on the next load.
  }
}

export function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}
