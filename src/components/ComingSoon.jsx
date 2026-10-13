import { motion } from 'framer-motion'
import { Fade } from './Text'
import { PartTile } from './Parts'

/**
 * Placeholder for the hospital token-calling device (queue/token display hardware).
 * Swap the copy and screenshot in once the product is ready — everything here
 * is deliberately marked "Coming soon" so it reads as a preview, not a shipped product.
 */
export default function ComingSoon() {
  return (
    <Fade delay={0.2} className="mt-10 md:mt-7">
      <div className="relative overflow-hidden rounded-[20px] border border-dashed border-[#b9bdb0] bg-panel/60 p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
          <PartTile type="ic" tone="panel" className="shrink-0" />
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <p className="tag !mb-0">Hardware Services · In Development</p>
              <motion.span
                className="rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper"
                animate={{ opacity: [1, 0.55, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                Coming soon
              </motion.span>
            </div>
            <h3 className="headline mb-2 text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1]">Q-caller system</h3>
            <p className="max-w-[62ch] text-ink2">
              A dedicated queue-management device for hospitals — calling patient tokens to the right counter with a clear on-screen and audio display. Currently in engineering; details and a live demo will land here once the hardware ships.
            </p>
          </div>
        </div>
      </div>
    </Fade>
  )
}
