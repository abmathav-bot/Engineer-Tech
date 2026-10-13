import { useEffect, useState } from 'react'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('et-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggle = () => {
    // Flipping data-theme re-themes the whole page in one go (every element
    // reading a --color-* token gets restyled), which is a real, if brief,
    // synchronous style-recalc + repaint pass. If that lands on the same
    // frame as the 3D scene rendering or the marquee animating, they compete
    // for the main thread and it stutters — the same collision pattern as
    // the hero/lazy-chunk one, just triggered by a click instead of a mount.
    // This tells both of them to sit out briefly so the recalc has the main
    // thread to itself.
    window.dispatchEvent(new CustomEvent('et:heavy-pause', { detail: { ms: 400 } }))
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      localStorage.setItem('et-theme', next)
      return next
    })
  }

  const dark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-panel ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`absolute transition-all duration-300 ${dark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}>
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
      </svg>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`absolute transition-all duration-300 ${dark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'}`}>
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  )
}
