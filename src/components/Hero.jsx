import { Suspense, lazy, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
const Board3D = lazy(() => import('./Board3D'))
import { Button } from './Text'
import { Chars, LineReveal, RiseWords } from './Motion'
import HeroBackdrop from './HeroBackdrop'

const ease = [0.16, 1, 0.3, 1]
const fadeUp = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }
const BOARD_PLACEHOLDER = <div className="aspect-[4/3] w-full sm:aspect-[16/10] xl:aspect-[16/9]" />

function Stage() {
  // The 3D scene does a chunk of synchronous work the instant it mounts
  // (building an environment map, painting several canvas textures) — right
  // when the hero's letter-by-letter headline is mid-animation. That
  // contention is what made the text stall and then jump: this delays
  // starting the 3D scene until just after the text has finished, so the two
  // never compete for the main thread at the same time. Same end state,
  // board still appears in the same place — it just doesn't fight the text.
  const [start, setStart] = useState(false)
  useEffect(() => {
    // After the text settles, wait for an idle browser moment before starting
    // the scene, so its setup never lands on a busy frame during page load.
    let idleId
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) idleId = requestIdleCallback(() => setStart(true), { timeout: 1500 })
      else setStart(true)
    }, 1500)
    return () => { clearTimeout(timer); if (idleId) cancelIdleCallback(idleId) }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, ease, delay: 0.9 }}
      className="relative mx-auto mt-14 max-w-[1840px] px-5 md:mt-20 md:px-6"
    >
      <div className="absolute inset-x-5 bottom-0 top-[6%] rounded-md bg-sky md:inset-x-10" />
      <div className="relative">
        {start ? <Suspense fallback={BOARD_PLACEHOLDER}><Board3D /></Suspense> : BOARD_PLACEHOLDER}
      </div>
    </motion.div>
  )
}

/** A small drawn circuit glyph — two nodes joined by a trace that traces itself in once */
function BadgeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" className="shrink-0">
      <motion.path
        d="M2 11 L5 11 L7 4 L9 11 L13 11"
        stroke="currentColor"
        className="text-olive"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
      />
      <motion.circle
        cx="2" cy="11" r="1.6" fill="currentColor" className="text-volt"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 320, damping: 16 }}
      />
      <motion.circle
        cx="13" cy="11" r="1.6" fill="currentColor" className="text-olive"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.0, type: 'spring', stiffness: 320, damping: 16 }}
      />
    </svg>
  )
}

/** Top, centered "header" block — plain text directly on the page, no pill/card */
function Eyebrow() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.12, delayChildren: 0.2 }}
      className="mx-auto max-w-[52ch] text-center"
    >
      <motion.div variants={fadeUp} className="mb-3 flex items-center justify-center gap-2.5">
        <BadgeIcon />
        <span className="h-px w-9 bg-line" aria-hidden="true" />
        <span className="soft-ping h-[6px] w-[6px] rounded-full bg-volt" aria-hidden="true" />
      </motion.div>
      <motion.p variants={fadeUp} className="font-mono text-[12px] uppercase tracking-[0.14em] text-olive">
        Engineered From Scratch
      </motion.p>
      <motion.p variants={fadeUp} className="mt-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-ink3">
        Built For Impact
      </motion.p>
      {/* Manifesto line, in place of a plain tagline — its own font (Space
          Grotesk, not used anywhere else on the page) and its own reveal: a
          scanner-style wipe instead of the fade-up used just above it. */}
      <motion.div variants={fadeUp} className="mx-auto mt-7">
        <LineReveal
          as="p"
          immediate
          delay={0.65}
          duration={0.85}
          className="font-slogan text-[clamp(17px,2vw,21px)] font-medium leading-snug text-ink2"
          text="We are real engineers—not just engineering graduates."
        />
        <LineReveal
          as="p"
          immediate
          delay={0.82}
          duration={0.85}
          className="font-slogan mt-1 text-[clamp(17px,2vw,21px)] font-medium leading-snug text-ink2"
          text="We don't just earn a degree; we build, create, and shape the future."
        />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative px-5 pb-0 pt-14 md:px-6 md:pt-24" id="top">
      <HeroBackdrop />

      <div className="relative mx-auto max-w-[1840px]">
        <Eyebrow />

        {/* Below the eyebrow: headline on the left, supporting copy + actions on the right.
            Headline is first in the DOM so mobile still reads headline → copy → buttons;
            xl:col-start places it on the left without touching that mobile order.
            This split needs real width to breathe (each side ends up ~500-600px) —
            triggering it as early as md: (768px) left tablets and small laptops with
            both columns squeezed into ~350px, wrapping the headline onto four cramped
            lines. xl: (1280px) is the point where there's actually room for it; every
            width below that gets the same clean stacked, centered column mobile uses. */}
        <div className="mt-16 md:mt-20 xl:grid xl:grid-cols-2 xl:items-center xl:gap-14">
          <div className="relative mx-auto w-fit text-center xl:col-start-1 xl:mx-0 xl:mr-auto xl:text-left">
            <Chars
              as="h1"
              immediate
              delay={0.15}
              stagger={0.09}
              charStagger={0.024}
              className="mx-auto max-w-[16ch] text-[clamp(2.6rem,6.6vw,6.4rem)] xl:mx-0"
              text="From Raw Code & Hardware to *Real-World* Solutions."
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              style={{ mixBlendMode: 'overlay' }}
              initial={{ x: '-120%', opacity: 0 }}
              animate={{ x: '120%', opacity: [0, 1, 0] }}
              transition={{ duration: 1.1, ease: 'easeInOut', delay: 1.15 }}
            />
          </div>

          <div className="mt-10 text-center xl:col-start-2 xl:row-start-1 xl:mt-0 xl:ml-auto xl:max-w-[46ch] xl:text-right">
            <RiseWords
              delay={1.0}
              stagger={0.03}
              className="mx-auto text-[clamp(16px,1.6vw,19px)] text-ink2 xl:mx-0"
              text="We are an independent, engineer-led startup leveraging our deep technical expertise to build proprietary products and deliver specialized engineering services tailored to your exact operational needs."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 1.6 }}
              className="mt-9 flex flex-wrap justify-center gap-3 xl:justify-end"
            >
              <Button href="#services">Explore Services</Button>
              <Button href="#innovations" variant="ghost">Our Innovations</Button>
            </motion.div>
          </div>
        </div>
      </div>

      <Stage />
    </section>
  )
}
