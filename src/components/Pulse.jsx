import { motion } from 'framer-motion'
import { Button, Fade, PULSE_URL, Tag } from './Text'
import { Chars, ScrollReveal } from './Motion'
import LiveFrame from './LiveFrame'

const features = [
  ['01', 'Real-Time Tracking', 'Keep a live heartbeat on your operational workflows.'],
  ['02', 'Unified Architecture', 'Bring scattered tasks and data into a single, intuitive dashboard.'],
  ['03', 'Engineer-Built', 'Developed completely from scratch to meet rigorous performance standards.'],
]

const bars = [
  { w: 330, c: '#3b4a12' },
  { w: 220, c: '#3b9bd1' },
  { w: 400, c: '#3b4a12' },
  { w: 150, c: '#3b9bd1' },
]

function Dashboard() {
  return (
    <motion.svg
      viewBox="0 0 520 480"
      className="w-full drop-shadow-[0_24px_40px_rgba(17,19,16,0.12)]"
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <rect x="10" y="10" width="500" height="460" rx="20" fill="#fff" stroke="#111" strokeWidth="2" />
      <path d="M10 56h500" stroke="#111" strokeWidth="2" />
      <text x="34" y="40" fontFamily="DM Sans, sans-serif" fontWeight="600" fontSize="18">PULSE</text>
      <text x="398" y="38" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5b6152">live</text>
      <circle className="soft-ping" cx="386" cy="34" r="4" fill="#3b9bd1" />
      <rect x="34" y="80" width="452" height="140" rx="12" fill="#bfe0f2" />
      <motion.path
        d="M46 160h90l16-44 24 88 22-72 14 28h60l16-36 22 72 18-52h90l14-18h60"
        fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.8 } } }}
      />
      {[['TASKS', '248', 34, '#e3edc9', '#3b4a12'], ['UPTIME', '99.9%', 190, '#f1f2ec', '#5b6152'], ['TEAMS', '12', 346, '#f1f2ec', '#5b6152']].map(([l, v, x, bg, c], i) => (
        <motion.g key={l} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { delay: 0.4 + i * 0.12, duration: 0.7 } } }}>
          <rect x={x} y="236" width="140" height="92" rx="12" fill={bg} />
          <text x={x + 18} y="266" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={c}>{l}</text>
          <text x={x + 18} y="308" fontFamily="Instrument Serif, serif" fontSize="40">{v}</text>
        </motion.g>
      ))}
      {bars.map((b, i) => (
        <g key={i}>
          <rect x="34" y={344 + i * 30} width="452" height="14" rx="7" fill="#f1f2ec" />
          <motion.rect
            x="34" y={344 + i * 30} width={b.w} height="14" rx="7" fill={b.c}
            style={{ transformBox: 'fill-box', transformOrigin: 'left' }}
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { delay: 0.7 + i * 0.12, duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
          />
        </g>
      ))}
    </motion.svg>
  )
}


export default function Pulse() {
  return (
    <section id="pulse" className="bg-panel py-24 md:py-32">
      <div className="mx-auto grid max-w-[1840px] items-center gap-12 px-5 md:px-6 xl:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <Tag className="mb-5">Internal Innovation</Tag>
          <Chars text="Meet *Pulse:* Our Flagship Product Innovation" className="text-[clamp(2.3rem,4.6vw,3.9rem)]" />
          <ScrollReveal className="mb-8 mt-6 max-w-[56ch] text-[17px] leading-relaxed text-ink" text="Built entirely inside our own labs, Pulse is our upcoming management and efficiency ecosystem designed to let you “manage everything” with absolute clarity, real-time tracking, and streamlined workflow control." />
          <ol className="mb-9">
            {features.map(([n, t, d], i) => (
              <Fade key={n} delay={i * 0.08} y={14}>
                <li className={`grid grid-cols-[40px_1fr] border-t border-line py-4 text-[15px] text-ink2 ${i === 2 ? 'border-b' : ''}`}>
                  <span className="pt-0.5 font-mono text-xs text-olive">{n}</span>
                  <div>
                    <strong className="block font-semibold text-ink">{t}</strong>
                    {d}
                  </div>
                </li>
              </Fade>
            ))}
          </ol>
          <Fade><Button href={PULSE_URL}>Join the Waitlist</Button></Fade>
        </div>
        <LiveFrame url={PULSE_URL} domain="managementsystem-fkx0.onrender.com" fallback={<Dashboard />} />
      </div>
    </section>
  )
}
