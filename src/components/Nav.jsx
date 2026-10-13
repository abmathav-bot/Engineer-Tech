import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from './Text'
import ThemeToggle from './ThemeToggle'

const links = [
  ['About', '#about'],
  ['Services', '#services'],
  ['Pulse', '#pulse'],
  ['Bovest', '#bovest'],
  ['Approach', '#approach'],
  ['Privacy Policy', '/privacy-policy'],
]

export default function Nav({ privacyPage = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const apply = () => { setScrolled(window.scrollY > 8); ticking = false }
    const on = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 will-change-transform ${
        scrolled ? 'border-line bg-paper/80' : 'border-transparent bg-paper/60'
      }`}
    >
      <div className="mx-auto grid max-w-[1880px] grid-cols-[1fr_auto] items-center px-5 py-3.5 md:grid-cols-[1fr_auto_1fr] md:px-6">
        <a href={privacyPage ? '/#top' : '#top'} className="inline-flex items-center gap-2 font-semibold" aria-label="Engineer Tech home">
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-2 rounded-full bg-white/80 blur-md dark:bg-white/40" />
            <img src="/logo.png" alt="" className="relative h-7 w-auto object-contain" />
          </div>
          Engineer Tech
        </a>

        <nav className="hidden gap-8 text-[13px] font-medium md:flex" aria-label="Primary">
          {links.map(([l, h]) => (
            <a key={l} href={privacyPage && h.startsWith('#') ? `/${h}` : h} className="group relative py-1">
              {l}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-3">
          <ThemeToggle />
          <div className="hidden md:block"><Button href="#contact" size="sm">Get Started</Button></div>
          <button
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`h-px w-5 bg-ink transition ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-5 bg-ink transition ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-paper md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map(([l, h]) => (
                <a key={l} href={privacyPage && h.startsWith('#') ? `/${h}` : h} onClick={() => setOpen(false)} className="py-2 font-serif text-3xl">{l}</a>
              ))}
              <div className="pt-3"><Button href="#contact">Get Started</Button></div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
