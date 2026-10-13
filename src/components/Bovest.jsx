import { motion } from 'framer-motion'
import { Button, BOVEST_URL, Fade, Tag } from './Text'
import { Chars, ScrollReveal } from './Motion'
import LiveFrame from './LiveFrame'

const model = [
  ['01', 'The 50/50 Split', "We sell your cow's milk daily. 50% of the profit covers all expenses (feed, vet, staff). The other 50% is pure profit."],
  ['02', 'Your 20% Cut', 'Of the profit milk, 20% goes directly to you, and 80% goes to Bovest. Profits are credited to your wallet every month.'],
  ['03', 'The Bonus Calf', "When your cow has its first calf, it belongs to you. Once the calf reaches maturity, it produces milk, adding a second stream of income."],
]

/** A simplified echo of Bovest's own "Profit Model" cards, used as the frame's loading fallback */
function ProfitCards() {
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
      <text x="34" y="40" fontFamily="Instrument Serif, serif" fontStyle="italic" fontSize="20">Bovest</text>
      <text x="398" y="38" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5b6152">live</text>
      <circle className="soft-ping" cx="386" cy="34" r="4" fill="#3b9bd1" />
      {[0, 1, 2].map((i) => (
        <motion.g key={i} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.15, duration: 0.7 } } }}>
          <rect x={34 + i * 158} y="84" width="142" height="368" rx="14" fill="#f7f8f3" stroke="#e2e4da" />
          <text x={105 + i * 158} y="136" textAnchor="middle" fontFamily="Instrument Serif, serif" fontStyle="italic" fontSize="30" fill="#8a9a4a">{`0${i + 1}`}</text>
          <rect x={54 + i * 158} y="168" width="102" height="10" rx="5" fill="#111" opacity="0.85" />
          <rect x={54 + i * 158} y="210" width="102" height="7" rx="3.5" fill="#c7cabc" />
          <rect x={54 + i * 158} y="228" width="90" height="7" rx="3.5" fill="#c7cabc" />
          <rect x={54 + i * 158} y="246" width="70" height="7" rx="3.5" fill="#c7cabc" />
        </motion.g>
      ))}
    </motion.svg>
  )
}

export default function Bovest() {
  return (
    <section id="bovest" className="bg-panel py-24 md:py-32">
      <div className="mx-auto grid max-w-[1840px] items-center gap-12 px-5 md:px-6 xl:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <Tag className="mb-5">Portfolio Venture</Tag>
          <Chars text="Meet *Bovest:* One Investor. One Real Cow." className="text-[clamp(2.3rem,4.6vw,3.9rem)]" />
          <ScrollReveal
            className="mb-8 mt-6 max-w-[56ch] text-[17px] leading-relaxed text-ink"
            text="Bovest is where old-school farming meets modern tech and honest profit-sharing. You're not putting money into a vague digital asset — your investment buys a real, physical cow that lives on our farm, and you collect your share of the milk profits every month."
          />
          <ol className="mb-9">
            {model.map(([n, t, d], i) => (
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
          <Fade><Button href={BOVEST_URL}>Explore Bovest</Button></Fade>
        </div>
        <LiveFrame url={BOVEST_URL} domain="bovest-website.onrender.com" fallback={<ProfitCards />} />
      </div>
    </section>
  )
}
