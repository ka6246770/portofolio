import { useEffect, useRef, useState } from 'react'

// Scroll-triggered reveal that can NEVER leave content invisible.
//
// Uses IntersectionObserver for normal entrance choreography, plus a
// passive scroll/resize fallback: if the observer quietly fails to fire
// (older phones, layout shifts while fonts load, reduced-motion quirks),
// content still reveals the moment it enters the viewport — so section
// text always shows.
export function useReveal({ amount = 0.2 } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScreen = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      return rect.top < vh && rect.bottom > 0
    }

    let io = null
    let scrolling = false

    const detachFallback = () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      scrolling = false
    }

    const onScroll = () => {
      if (!scrolling) return
      if (onScreen()) {
        scrolling = false
        setInView(true)
        if (io) io.disconnect()
        detachFallback()
      }
    }

    if (typeof IntersectionObserver === 'undefined') {
      if (onScreen()) {
        setInView(true)
      } else {
        scrolling = true
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll, { passive: true })
      }
      return () => detachFallback()
    }

    if (onScreen()) {
      setInView(true)
      return
    }

    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            io.disconnect()
            detachFallback()
          }
        }
      },
      { threshold: amount, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)

    // Safety net while the observer is armed.
    scrolling = true
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (io) io.disconnect()
      detachFallback()
    }
  }, [amount])

  return [ref, inView]
}

export default useReveal