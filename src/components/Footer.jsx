import { motion } from 'framer-motion'
import { Fade } from './Text'
import { Chars } from './Motion'

const EMAIL = 'Engineertecher@gmail.com'
const PHONE_DISPLAY = '+91 63833 14975'
const PHONE_TEL = '+916383314975'
const WHATSAPP = 'https://wa.me/916383314975'
const MAPS = 'https://share.google/LOQ9ZRIlwLWk3OG3t'

const contacts = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'Phone', value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
  { label: 'WhatsApp', value: PHONE_DISPLAY, href: WHATSAPP },
  { label: 'Location', value: 'Open in Google Maps', href: MAPS },
]

export function Cta() {
  return (
    <section id="contact" className="px-5 pb-24 pt-6 md:px-6 md:pb-32">
      <div className="relative mx-auto max-w-[1840px] overflow-hidden rounded-3xl bg-sky px-6 py-20 text-center md:py-28">
        <div className="relative">
          <Chars text="Connect with *us*" className="shimmer text-[clamp(2.6rem,6vw,5rem)]" />
          <Fade delay={0.1} className="mx-auto mb-9 mt-5 max-w-[52ch] text-ink">
            Tell us what you need to build — a web app, a mobile app, an electronic board, or all three — or join the Pulse waitlist.
          </Fade>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.12, delayChildren: 0.2 }}
            className="mx-auto mt-12 grid max-w-[1080px] gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
              {contacts.map((c) => (
                <motion.li
                  key={c.label}
                  variants={{ hidden: { opacity: 0, y: 28, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group block rounded-2xl border border-ink/10 bg-paper/70 px-5 py-4 text-left transition-colors hover:bg-paper"
                  >
                    <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-olive">{c.label}</span>
                    <span className="mt-1 block whitespace-nowrap text-[14px] font-medium text-ink group-hover:text-olive">{c.value} <span aria-hidden>↗</span></span>
                  </a>
                </motion.li>
              ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

export function Footer({ subPage = false }) {
  return (
    <footer className="border-t border-line py-9">
      <div className="mx-auto flex max-w-[1840px] flex-wrap items-end justify-between gap-6 px-5 md:px-6 xl:px-8">
        <div className="flex items-end gap-10">
          <a href={subPage ? '/#top' : '#top'} className="inline-flex items-center gap-2 font-semibold" aria-label="Engineer Tech home">
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-2 rounded-full bg-white/80 blur-md dark:bg-white/40" />
              <img src="/logo.png" alt="Engineer Tech logo" className="relative h-7 w-auto object-contain" />
            </div>
            Engineer Tech
          </a>
          <nav className="flex gap-6 text-[13px] font-medium" aria-label="Footer">
            {['About', 'Services', 'Pulse', 'Bovest', 'Approach', 'Contact Us', 'Privacy Policy'].map((l) => (
              <a key={l} href={l === 'Privacy Policy' ? '/privacy-policy' : l === 'Contact Us' ? '/contact-us' : `${subPage ? '/' : ''}#${l.toLowerCase()}`} className="hover:text-olive">{l}</a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-ink3 sm:flex-row sm:gap-8">
          <span>© Engineer Tech, 2026</span>
          <span>Rajapalayam · Virudhunagar · Tamil Nadu</span>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
}
