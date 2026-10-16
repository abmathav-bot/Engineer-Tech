import { useEffect } from 'react'

/**
 * Sections like Services/Pulse/Bovest/Approach are lazy-mounted (see
 * LazyMount) and don't exist in the DOM until scrolled near. Jumping to one
 * of their ids before that has to force the section to mount first, then
 * scroll to it — a plain `#id` anchor silently does nothing if the element
 * isn't there yet, and the section's JS chunk may still be downloading, not
 * just waiting on a render, so this keeps polling for several seconds
 * rather than giving up after a couple of frames.
 */
export function goToHashSection(id) {
  window.dispatchEvent(new Event('et:force-mount'))
  history.pushState(null, '', `#${id}`)

  const deadline = Date.now() + 8000
  const attempt = () => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (Date.now() < deadline) {
      setTimeout(attempt, 60)
    }
  }
  attempt()
}

/** Handles a hash already present when the page loads (e.g. navigating in from /contact-us to /#services). */
export default function useHashNavFix() {
  useEffect(() => {
    if (window.location.hash) {
      goToHashSection(window.location.hash.slice(1))
    }
  }, [])
}
