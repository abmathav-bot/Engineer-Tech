import { useState } from 'react'
import { Fade, Tag } from './Text'

const EMAIL = 'Engineertecher@gmail.com'
const PHONE_DISPLAY = '+91 63833 14975'
const PHONE_TEL = '+916383314975'
const WHATSAPP = 'https://wa.me/916383314975'
const MAPS = 'https://share.google/LOQ9ZRIlwLWk3OG3t'

const details = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'Phone', value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
  { label: 'WhatsApp', value: PHONE_DISPLAY, href: WHATSAPP },
  { label: 'Location', value: 'Rajapalayam, Virudhunagar, Tamil Nadu', href: MAPS },
]

const serviceOptions = [
  'Web Development',
  'Mobile App Development',
  'Hardware / Custom PCB Design',
  'Pulse',
  'Bovest',
  'Q-caller System',
  'Other',
]

const fieldClass =
  'w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-ink3 outline-none transition-colors focus:border-olive'

const EMPTY_FORM = { name: '', email: '', phone: '', services: [], message: '' }

export default function ContactUs() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const toggleService = (service) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }))
  }

  const openMailto = () => {
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Services: ${form.services.join(', ') || 'Not specified'}`,
      '',
      'Message:',
      form.message,
    ].join('\n')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`New enquiry from ${form.name || 'website'}`)}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const apiUrl = import.meta.env.VITE_CONTACT_API_URL
    if (!apiUrl) {
      openMailto()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      setForm(EMPTY_FORM)
    } catch {
      setStatus('failed')
    }
  }

  return (
    <main id="top" className="px-5 pb-24 pt-16 md:px-6 md:pb-32 md:pt-24">
      <div className="mx-auto max-w-[1100px]">
        <Tag className="mb-5">Get In Touch</Tag>
        <h1 className="headline text-[clamp(3rem,7.5vw,6rem)]">Contact Us</h1>
        <p className="mt-7 max-w-[70ch] text-lg text-ink2">
          Tell us about your project — a web app, a mobile app, custom hardware, or anything in between. We're an engineer-led team based in Rajapalayam, serving clients across Virudhunagar and beyond.
        </p>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Fade>
            <h2 className="mb-6 font-mono text-[12px] uppercase tracking-[0.14em] text-olive">Contact Details</h2>
            <ul className="space-y-4">
              {details.map((d) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    target={d.href.startsWith('http') ? '_blank' : undefined}
                    rel={d.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group block rounded-2xl border border-line bg-panel/60 px-5 py-4 transition-colors hover:border-olive"
                  >
                    <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-olive">{d.label}</span>
                    <span className="mt-1 block text-[15px] font-medium text-ink group-hover:text-olive">{d.value} <span aria-hidden>↗</span></span>
                  </a>
                </li>
              ))}
            </ul>
          </Fade>

          <Fade delay={0.1}>
            <h2 className="mb-6 font-mono text-[12px] uppercase tracking-[0.14em] text-olive">Send a Message</h2>
            {status === 'sent' && (
              <p className="mb-5 rounded-xl border border-olive/40 bg-mint/40 px-4 py-3 text-[14px] text-olive">
                Thanks! Your message has been sent — we'll get back to you soon.
              </p>
            )}
            {status === 'failed' && (
              <p className="mb-5 rounded-xl border border-red-400/40 bg-red-50 px-4 py-3 text-[14px] text-red-700">
                Something went wrong sending your message.{' '}
                <button type="button" onClick={openMailto} className="underline underline-offset-2">
                  Click here to email us instead
                </button>.
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="ct-name" className="mb-1.5 block text-[13px] font-medium text-ink2">Name *</label>
                  <input id="ct-name" required type="text" value={form.name} onChange={update('name')} className={fieldClass} placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="ct-email" className="mb-1.5 block text-[13px] font-medium text-ink2">Email *</label>
                  <input id="ct-email" required type="email" value={form.email} onChange={update('email')} className={fieldClass} placeholder="you@example.com" />
                </div>
              </div>

              <div>
                <label htmlFor="ct-phone" className="mb-1.5 block text-[13px] font-medium text-ink2">Phone</label>
                <input id="ct-phone" type="tel" value={form.phone} onChange={update('phone')} className={fieldClass} placeholder="+91 00000 00000" />
              </div>

              <div>
                <span className="mb-2 block text-[13px] font-medium text-ink2">Services you're interested in</span>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((s) => {
                    const active = form.services.includes(s)
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        aria-pressed={active}
                        className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                          active ? 'border-olive bg-olive text-[#f4f7e8]' : 'border-line text-ink2 hover:border-olive'
                        }`}
                      >
                        {s}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="ct-message" className="mb-1.5 block text-[13px] font-medium text-ink2">Message / Other details</label>
                <textarea id="ct-message" rows={5} value={form.message} onChange={update('message')} className={`${fieldClass} resize-none`} placeholder="Tell us more about what you need..." />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex items-center gap-2 rounded-full border border-olive bg-olive px-6 py-3.5 text-sm font-medium text-[#f4f7e8] transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-olive2 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">›</span>
              </button>
            </form>
          </Fade>
        </div>
      </div>
    </main>
  )
}
