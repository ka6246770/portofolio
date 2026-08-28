import { useCallback, useEffect, useRef, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'

// Draggable before/after image comparison slider.
// Implemented with plain React state + pointer events (mouse + touch) —
// no external slider library. The `before` image is shown clipped from
// the left up to a draggable divider; the `after` image sits underneath.
export default function BeforeAfterSlider({ before, after, alt = '' }) {
  const containerRef = useRef(null)
  const [pos, setPos] = useState(50) // divider position (0-100)
  const [dragging, setDragging] = useState(false)
  const [width, setWidth] = useState(0)

  // Keep the measured container width in sync with layout so the inner
  // before-image can stretch across the full (unclipped) width.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined
    const measure = () => setWidth(el.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Given a clientX, compute the divider position relative to the container.
  const updateFromClientX = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = clientX - rect.left
    const pct = (x / rect.width) * 100
    setPos(Math.min(100, Math.max(0, pct)))
  }, [])

  const onPointerDown = (e) => {
    setDragging(true)
    updateFromClientX(e.clientX)
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!dragging) return
    updateFromClientX(e.clientX)
  }

  const onPointerUp = () => setDragging(false)

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full touch-none overflow-hidden select-none rounded-t-xl"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* AFTER image — shown fully underneath */}
      <img
        src={after}
        alt={alt}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* BEFORE image — clipped from the left up to the divider */}
      <div
        className="absolute inset-0 h-full overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={before}
          alt={`${alt} (before)`}
          draggable={false}
          className="absolute inset-0 max-w-none object-cover"
          style={{ width }}
        />
      </div>

      {/* Labels */}
      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
        Before
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
        After
      </span>

      {/* Divider handle */}
      <div
        className="absolute inset-y-0 z-10 flex items-center justify-center"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/80" />
        <div
          className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-accent text-background shadow-lg transition-transform ${
            dragging ? 'scale-110' : ''
          }`}
        >
          <MoveHorizontal size={18} />
        </div>
      </div>
    </div>
  )
}
