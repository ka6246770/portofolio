import { useEffect, useState } from 'react'

// Compares whether a CSS media query currently matches.
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}

// Is the primary pointer a fine pointer (mouse)? False on touch devices.
export function useFinePointer() {
  return useMediaQuery('(pointer: fine)')
}

// Is the viewport at least desktop width? Used to gate heavy effects.
export function useDesktop() {
  return useMediaQuery('(min-width: 768px)')
}

export default useMediaQuery
