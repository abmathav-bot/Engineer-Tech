import { useEffect, useRef, useState } from 'react'

/**
 * Wrapping a lazy-loaded section in <Suspense> only controls what's SHOWN
 * while its chunk loads — React still calls that chunk's import() the moment
 * the <Suspense> boundary itself renders, which was happening for Services,
 * Pulse and Approach all at once on the very first paint (since they sat in
 * the tree unconditionally from the start). That's three network fetches and
 * three chunks of JS parsing/executing on the main thread at the exact moment
 * the hero's letter-by-letter entrance animation is trying to run its own
 * requestAnimationFrame loop — the animation stalls waiting for the thread,
 * then jumps to catch up once it's free (framer-motion is time-based, so a
 * stalled animation snaps forward rather than losing time smoothly).
 *
 * This defers the import() itself until the section is actually about to
 * scroll into view, so that work is spread out over the scroll instead of
 * dumped on the page all at once.
 */
export default function LazyMount({ children, minHeight = 500, margin = '600px' }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) return
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShow(true)
      return
    }
    // A hash link (nav item, "Explore Services" button, etc.) can target an id
    // that only exists once this section mounts. Jumping to it has to force an
    // immediate mount instead of waiting for the user to scroll near it.
    const forceShow = () => setShow(true)
    window.addEventListener('et:force-mount', forceShow)
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => { io.disconnect(); window.removeEventListener('et:force-mount', forceShow) }
  }, [show, margin])

  return <div ref={ref} style={show ? undefined : { minHeight }}>{show ? children : null}</div>
}
