import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

/**
 * Letter-by-letter reveal, cheap to render and safe for italics: the clip
 * mask sits once per WORD (sized by the browser to the word's own layout, so
 * it never crops a glyph's overhang — the bug behind a serif letter like "W"
 * getting a corner clipped when each character got its own tight mask).
 * Inside that safe mask, individual letters still cascade in on translateY +
 * rotateX only (no filters), so it stays smooth under load. Wrap a word in
 * *asterisks* for the italic accent.
 */
export function Chars({ text, as: Tag = 'h2', className = '', delay = 0, stagger = 0.055, charStagger = 0.022, immediate = false }) {
  const words = text.split(' ')
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.6 } }
  return (
    <Tag className={`headline ${className}`} aria-label={text.replaceAll('*', '')}>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        {...trigger}
        style={{ perspective: 400 }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((w, wi) => {
          const accent = w.startsWith('*')
          const clean = w.replaceAll('*', '')
          const letterVariant = {
            hidden: { y: '65%', rotateX: -60, opacity: 0 },
            show: { y: 0, rotateX: 0, opacity: 1 },
          }
          // Accent words render as one animated unit — an <em> whose own transform
          // reveals it. Splitting it into per-letter spans (as below) would put a
          // transformed descendant between the <em> and its text, which breaks the
          // "shimmer" gradient-text trick (background-clip: text needs the <em> to
          // own its text directly, not through a transformed child).
          const body = accent ? (
            <motion.em
              className="inline-block will-change-transform"
              variants={letterVariant}
              transition={{ duration: 0.5, ease }}
              style={{ transformOrigin: '50% 100%' }}
            >
              {clean}
            </motion.em>
          ) : (
            <motion.span className="inline-block" variants={{ hidden: {}, show: { transition: { staggerChildren: charStagger } } }}>
              {[...clean].map((c, ci) => (
                <motion.span
                  key={ci}
                  className="inline-block will-change-transform"
                  variants={letterVariant}
                  transition={{ duration: 0.5, ease }}
                  style={{ transformOrigin: '50% 100%' }}
                >
                  {c}
                </motion.span>
              ))}
            </motion.span>
          )
          return (
            <span key={wi} className="inline-block whitespace-nowrap">
              <span className="inline-block overflow-hidden py-[0.18em] -my-[0.18em] align-bottom">{body}</span>
              {wi < words.length - 1 && ' '}
            </span>
          )
        })}
      </motion.span>
    </Tag>
  )
}

/** Word-by-word fade + rise, played immediately (not scroll-linked) — for copy that's on screen from the first frame, like the hero. */
export function RiseWords({ text, as: Tag = 'p', className = '', delay = 0, stagger = 0.035 }) {
  const words = text.split(' ')
  return (
    <Tag className={className}>
      <motion.span initial="hidden" animate="show" transition={{ staggerChildren: stagger, delayChildren: delay }}>
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}

/**
 * Reveals a whole line at once, sliding up out from behind its own mask —
 * the same safe word-level masking technique as Chars/Words, just applied
 * to an entire sentence as a single unit instead of letter by letter. Calm
 * and legible, for one-off statement lines like the hero's slogan.
 */
export function LineReveal({ text, as: Tag = 'p', className = '', delay = 0, duration = 0.85, immediate = false }) {
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.6 } }
  return (
    <Tag className={`overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial="hidden"
        {...trigger}
        variants={{
          hidden: { y: '100%', opacity: 0 },
          show: { y: 0, opacity: 1, transition: { duration, delay, ease } },
        }}
      >
        {text}
      </motion.span>
    </Tag>
  )
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}#$%&*+-='

/** Decoding / scramble effect — text resolves left to right out of random glyphs */
export function Scramble({ text, duration = 1000 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const reduced = useReducedMotion()
  const [out, setOut] = useState(() => (reduced ? text : text.replace(/\S/g, ' ')))

  useEffect(() => {
    if (!inView || reduced) return
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      const done = Math.floor(p * text.length)
      setOut([...text].map((c, i) => (i < done || c === ' ' ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(''))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setOut(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, text, duration])

  return (
    <span ref={ref} style={{ whiteSpace: 'pre' }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  )
}

/** Types itself out with a blinking caret; reserves its final width so nothing shifts */
export function Typewriter({ text, delay = 500, speed = 34 }) {
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? text.length : 0)

  useEffect(() => {
    if (reduced) return
    let id
    const start = setTimeout(() => {
      id = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(id), v) : v + 1)), speed)
    }, delay)
    return () => { clearTimeout(start); clearInterval(id) }
  }, [text, delay, speed, reduced])

  return (
    <span className="relative inline-block">
      <span className="invisible">{text}</span>
      <span className="absolute inset-0 whitespace-nowrap" aria-hidden="true">
        {text.slice(0, n)}
        {n < text.length && <span className="caret ml-px">▍</span>}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}

function Word({ w, p, a, b }) {
  const opacity = useTransform(p, [a, b], [0.16, 1])
  return <motion.span style={{ opacity }}>{w} </motion.span>
}

/** Paragraph whose words light up from faint to full ink as you scroll through it */
export function ScrollReveal({ text, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.55'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) =>
        reduced ? <span key={i}>{w} </span> : <Word key={i} w={w} p={scrollYProgress} a={i / words.length} b={Math.min(1, (i + 4) / words.length)} />,
      )}
    </p>
  )
}

/**
 * Endless ticker of capabilities. The CSS animation itself is cheap (a single
 * transform), but it never stops — so it kept compositing right through the
 * transition zone just below the 3D hero scene, where the canvas is also
 * still rendering. Pausing it via IntersectionObserver once it's off-screen
 * removes that overlap without changing anything about how it looks or moves
 * while visible.
 */
export function Marquee({ items }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '200px' })
  const [heavyPause, setHeavyPause] = useState(false)

  useEffect(() => {
    let id
    const onPause = (e) => {
      setHeavyPause(true)
      clearTimeout(id)
      id = setTimeout(() => setHeavyPause(false), e?.detail?.ms ?? 400)
    }
    window.addEventListener('et:heavy-pause', onPause)
    return () => { window.removeEventListener('et:heavy-pause', onPause); clearTimeout(id) }
  }, [])

  const row = (k) => (
    <div key={k} className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={k > 0}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-8 whitespace-nowrap">
          <span
            className={
              i % 3 === 1
                ? 'font-serif text-[clamp(1.7rem,3vw,2.7rem)] italic tracking-tight text-olive'
                : i % 3 === 2
                  ? 'font-mono text-[clamp(0.9rem,1.3vw,1.15rem)] uppercase tracking-[0.18em] text-ink2'
                  : 'font-serif text-[clamp(1.7rem,3vw,2.7rem)] tracking-tight text-ink'
            }
          >
            {t}
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="text-volt">
            <path d="M7 0 8.6 5.4 14 7 8.6 8.6 7 14 5.4 8.6 0 7 5.4 5.4Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  )
  return (
    <div ref={ref} className="marquee-wrap overflow-hidden border-y border-line py-5" role="presentation">
      <div className="marquee flex w-max will-change-transform" style={{ animationPlayState: inView && !heavyPause ? 'running' : 'paused' }}>
        {row(0)}{row(1)}
      </div>
    </div>
  )
}
