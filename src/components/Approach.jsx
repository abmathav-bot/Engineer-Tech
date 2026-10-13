import { Button, Fade, Tag, Words } from './Text'
import { Chars } from './Motion'
import { PartsStrip } from './Parts'

const steps = [
  ['01', 'First-Principles Analysis', 'We dive deep into your specific industry or business challenges rather than applying one-size-fits-all fixes.'],
  ['02', 'Custom Architecture', 'Whether you need a software application, an electronic board, or both, we engineer the solution from scratch.'],
  ['03', 'Successful Delivery', 'We take ownership from the initial concept and prototyping phase all the way to a fully deployed, high-performing product.'],
]

export default function Approach() {
  return (
    <section id="approach" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1840px] px-5 md:px-6 xl:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Tag className="mb-5">Our Methodology</Tag>
            <Words text="Tailored *Problem-Solving,* Delivered Successfully." className="max-w-[18ch] text-[clamp(2.3rem,4.6vw,3.9rem)]" />
          </div>
          <Fade><Button href="#contact" variant="mint">Start a project</Button></Fade>
        </div>

        <div className="mt-14 hidden md:block">
          <PartsStrip
            items={[
              { type: 'ic', label: 'STEP 01 · ANALYSE' },
              { type: 'ecap', label: 'STEP 02 · ARCHITECT' },
              { type: 'display', label: 'STEP 03 · DELIVER' },
            ]}
          />
        </div>

        <div className="mt-10 grid gap-12 md:mt-8 md:grid-cols-3 md:gap-14">
          {steps.map(([n, t, d], i) => (
            <Fade key={n} delay={i * 0.12}>
              <div className="group border-t border-ink pt-5">
                <Chars as="span" text={n} charStagger={0.16} className="mb-5 block text-[clamp(4rem,8vw,7rem)] leading-none tracking-tight text-[#b9bdb0] transition-colors duration-500 group-hover:text-olive" />
                <h3 className="mb-2 text-[19px] font-medium tracking-tight">{t}</h3>
                <p className="max-w-[34ch] text-[15px] text-ink2">{d}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  )
}
