import { Tag, Words } from './Text'
import { ScrollReveal } from './Motion'
import { PartTile, PartsStrip } from './Parts'

const pillars = [
  ['ic', 'sky', 'Hands-on mastery', 'Founders who write the code and solder the boards.'],
  ['ecap', 'mint', 'Zero templates', 'Every solution is engineered around the actual problem.'],
  ['display', 'mint', 'Our own products', 'We build proprietary innovations, like Pulse, in-house.'],
  ['led', 'sky', 'Delivered, owned', 'From first sketch to a deployed, working product.'],
]

export default function About() {
  return (
    <section id="about" className="pb-10 pt-32 md:pt-44">
      <div className="mx-auto max-w-[1840px] px-5 md:px-6 xl:px-8">
        <div className="mx-auto max-w-[780px] text-center">
          <Tag className="mb-5">Our Startup Story</Tag>
          <Words text="Engineers Who *Build,* Not Just Talk." className="text-[clamp(2.4rem,5vw,4.2rem)]" />
          <ScrollReveal className="mx-auto mt-10 max-w-[64ch] text-[clamp(1.15rem,1.75vw,1.5rem)] leading-[1.45] tracking-[-0.015em] text-ink" text="We started Engineer Tech completely from scratch because we believe the most powerful solutions come from founders who deeply understand technology from the ground up. As an engineer-led team, we don’t rely on generic templates or surface-level fixes. We use our hands-on technical mastery to develop our own product innovations (like Pulse) and provide rigorous, specialized engineering services that solve complex real-world challenges." />
        </div>

        <ul className="mt-20 grid gap-10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4 lg:gap-0">
          {pillars.map(([type, tone, title, body], i) => (
            <li key={title} className={`text-sm text-ink2 ${i ? 'lg:border-l lg:border-line lg:pl-7' : ''} lg:pr-7`}>
              <PartTile type={type} tone={tone} />
              <h3 className="mb-1.5 mt-5 text-[15px] font-semibold text-ink">{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-24 max-w-[1840px] px-5 md:mt-32 md:px-6">
        <PartsStrip
          items={[
            { type: 'ecap', label: 'C1 · IDEA' },
            { type: 'ic', label: 'U1 · CODE' },
            { type: 'diode', label: 'D1 · BOARD' },
            { type: 'display', label: 'UI1 · APP' },
            { type: 'led', label: 'LED1 · SHIP' },
          ]}
        />
      </div>
    </section>
  )
}
