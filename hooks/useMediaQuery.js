import { useEffect, useState } from 'react'

// SSR-safe media query matcher. Always renders `false` during the first
// pass (server + initial client render) so the HTML hydrates without a
// mismatch, then resolves to the real value right after mount in an
// effect. Components that branch on this value update a tick later.
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}

// Is the primary pointer a fine pointer (mouse)? False on touch devices.
export function useFinePointer() {
  return useMediaQuery('(pointer: fine)')
}

// Is the viewport wide enough for the full desktop nav (with all links
// + the "hire me" CTA in a single row)? Below this the hamburger shows.
export function useDesktop() {
  return useMediaQuery('(min-width: 1024px)')
}

export default useMediaQuery