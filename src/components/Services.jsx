import { motion } from 'framer-motion'
import { Fade, Tag, Words } from './Text'
import { HardwareArt, SoftwareArt } from './ServiceArt'
import ComingSoon from './ComingSoon'

function Card({ art, bg, tag, title, body, chips, delay = 0 }) {
  return (
    <Fade delay={delay} className="flex flex-col">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className={`overflow-hidden rounded-[20px] p-4 md:p-8 ${bg}`}
      >
        {art}
      </motion.div>
      <p className="tag mb-3 mt-8">{tag}</p>
      <h3 className="headline mb-4 text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.05]">{title}</h3>
      <p className="max-w-[48ch] text-ink2">{body}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {chips.map((c) => (
          <li key={c} className="rounded-full border border-line px-3 py-1.5 font-mono text-[11.5px] text-ink2">{c}</li>
        ))}
      </ul>
    </Fade>
  )
}

export default function Services() {
  return (
    <section id="services" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1840px] px-5 md:px-6 xl:px-8">
        <div className="text-center">
          <Tag className="mb-5">What We Do</Tag>
          <Words text="End-to-End *Engineering:* From Digital to Physical" className="mx-auto max-w-[17ch] text-[clamp(2.4rem,5vw,4.2rem)]" />
        </div>
        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-2 md:gap-7">
          <Card
            art={<SoftwareArt />}
            bg="bg-sky"
            tag="Software Services"
            title="Web & Mobile App Development"
            body="We engineer high-performance web applications and mobile apps built on clean code architectures. Every digital interface is crafted with a cohesive, unified design system to ensure seamless user experiences."
            chips={['Web apps', 'iOS & Android', 'Design systems']}
          />
          <Card
            art={<HardwareArt />}
            bg="bg-mint"
            delay={0.12}
            tag="Hardware Services"
            title="Hardware Components & Electronic Boards"
            body="Beyond software, we specialize in physical engineering. We design custom electronic boards, specialized hardware components, and integrated physical devices tailored to precise operational specifications."
            chips={['Custom PCBs', 'Components', 'Physical devices']}
          />
        </div>
        <div id="innovations" className="mt-20 scroll-mt-24 md:mt-28">
          <Tag className="mb-5">Our Innovations</Tag>
          <h2 className="headline max-w-[18ch] text-[clamp(2.4rem,5vw,4.2rem)]">Our Innovations and Products</h2>
          <ComingSoon />
        </div>
      </div>
    </section>
  )
}
