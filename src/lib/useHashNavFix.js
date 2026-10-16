import { useEffect } from 'react'

function scrollToId(id) {
  let tries = 0
  const attempt = () => {
    const el = document.getElementById(id)
    tries += 1
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (tries < 30) {
      requestAnimationFrame(attempt)
    }
  }
  requestAnimationFrame(attempt)
}

/**
 * Sections like Services/Pulse/Bovest/Approach are lazy-mounted (see
 * LazyMount) and don't exist in the DOM until scrolled near. A hash link
 * clicked before that — the nav, "Explore Services", footer links — targets
 * an id that isn't there yet, so the browser's native anchor jump silently
 * does nothing. This intercepts those clicks (and a hash already present on
 * load, e.g. navigating in from /contact-us) to force the section to mount
 * first, then scrolls to it once it exists.
 */
export default function useHashNavFix() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1)
      window.dispatchEvent(new Event('et:force-mount'))
      scrollToId(id)
    }

    const onClick = (e) => {
      const a = e.target.closest('a')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || !href.startsWith('#') || href === '#') return
      const id = href.slice(1)
      if (document.getElementById(id)) return
      e.preventDefault()
      window.dispatchEvent(new Event('et:force-mount'))
      scrollToId(id)
      history.pushState(null, '', `#${id}`)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
