import { useEffect, useRef, useState } from 'react'
import { Fade } from './Text'

/**
 * A live external site shown inside a browser-style card that links out to it.
 * Shared by Pulse and Bovest so both product spotlights look and behave the
 * same way — an Android-Chrome-style address bar, a fallback preview while
 * the real page loads, and a hover affordance that it's a link, not embedded
 * content pretending to be part of this page.
 */
export default function LiveFrame({ url, domain, fallback, ratio = '1280 / 860' }) {
  const box = useRef(null)
  const [scale, setScale] = useState(0.5)
  const [ready, setReady] = useState(false)
  const [w, h] = ratio.split('/').map((n) => parseFloat(n))

  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / w))
    ro.observe(el)
    return () => ro.disconnect()
  }, [w])

  return (
    <Fade className="w-full">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${domain} in a new tab`}
        className="group relative block overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_30px_60px_-20px_rgba(17,19,16,0.28)] transition-transform duration-500 ease-out-expo hover:-translate-y-1"
      >
        {/* Android Chrome style address bar: rounded omnibox + tab-count square + overflow menu */}
        <div className="flex items-center gap-2.5 border-b border-line bg-panel px-3 py-2.5">
          <span className="min-w-0 flex-1 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-[inset_0_0_0_1px_rgba(17,19,16,0.06)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7c8274" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <span className="truncate font-mono text-[11px] text-ink3">{domain}</span>
          </span>
          <span className="hidden items-center gap-1 rounded font-mono text-[10px] font-semibold text-ink2 sm:flex" aria-hidden="true">
            <span className="grid h-5 w-5 place-items-center rounded border border-ink3/50">1</span>
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-ink3" aria-hidden="true">
            <circle cx="12" cy="5.5" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="12" cy="18.5" r="1.7" />
          </svg>
        </div>
        <div ref={box} className="relative w-full overflow-hidden bg-[#f7f8f3]" style={{ aspectRatio: ratio }}>
          <div className={`absolute inset-0 grid place-items-center p-3 [&_svg]:max-h-full [&_svg]:w-auto transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}>
            {fallback}
          </div>
          <iframe
            src={url}
            title={`${domain} preview`}
            loading="lazy"
            tabIndex={-1}
            onLoad={() => setReady(true)}
            className={`pointer-events-none absolute left-0 top-0 border-0 transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
            style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: 'top left' }}
          />
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/35 via-transparent to-transparent pb-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink shadow-lg">Open ↗</span>
          </div>
        </div>
      </a>
    </Fade>
  )
}
