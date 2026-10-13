import { motion } from 'framer-motion'

/* Schematic symbols drawn in a local box (-30..30 wide, centred on 0,0) */
export const SYMBOLS = {
  capacitor: ['M-30 0H-4', 'M-4 -15V15', 'M4 -15V15', 'M4 0H30'],
  diode: ['M-30 0H-8', 'M-8 -12V12L10 0Z', 'M10 -12V12', 'M10 0H30'],
  code: ['M-30 0H-20', 'M-12 -12L-20 0L-12 12', 'M12 -12L20 0L12 12', 'M20 0H30', 'M4 -15L-4 15'],
  window: ['M-30 0H-20', 'M-20 -14H20V14H-20Z', 'M-20 -6H20', 'M-15 -10h.01', 'M-10 -10h.01', 'M20 0H30'],
  phone: ['M-30 0H-9', 'M-9 -17H9V17H-9Z', 'M-3 12H3', 'M9 0H30'],
}

export const drawVariant = (i = 0, duration = 1.1) => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration, delay: i * 0.14, ease: [0.65, 0, 0.35, 1] },
      opacity: { duration: 0.01, delay: i * 0.14 },
    },
  },
})

export const nodeVariant = (i = 0) => ({
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { delay: i * 0.14 + 0.5, type: 'spring', stiffness: 300, damping: 18 } },
})

export function Draw({ d, i = 0, duration, ...props }) {
  return <motion.path d={d} variants={drawVariant(i, duration)} {...props} />
}

export function Symbol({ type, x = 0, y = 0, i = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {SYMBOLS[type].map((d, k) => (
        <Draw key={k} d={d} i={i} />
      ))}
    </g>
  )
}

/** Small self-drawing schematic icon */
export function SymbolIcon({ type, className = '' }) {
  return (
    <motion.svg
      viewBox="-34 -28 68 56"
      className={`h-10 w-auto ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
      aria-hidden="true"
    >
      <Symbol type={type} />
    </motion.svg>
  )
}

/** Full-width trace whose components draw themselves on scroll, with an electron travelling along it */
export function CircuitLine({ items, className = '' }) {
  const step = 200
  const W = items.length * step
  const cy = 46
  const cx = (n) => step / 2 + n * step
  let d = `M0 ${cy}H${cx(0) - 30}`
  items.forEach((_, n) => {
    if (n < items.length - 1) d += `M${cx(n) + 30} ${cy}H${cx(n + 1) - 30}`
  })
  d += `M${cx(items.length - 1) + 30} ${cy}H${W}`

  return (
    <motion.svg
      viewBox={`0 0 ${W} 100`}
      className={`w-full text-olive ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      role="img"
      aria-label="Electrical circuit schematic"
    >
      <Draw d={d} duration={1.6} />
      {items.map((it, n) => (
        <g key={n}>
          <Symbol type={it.type} x={cx(n)} y={cy} i={n + 1} />
          <motion.text
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.9 + n * 0.14 } } }}
            x={cx(n)}
            y={cy + 42}
            textAnchor="middle"
            fill="var(--color-ink3)"
            stroke="none"
            fontFamily="JetBrains Mono, monospace"
            fontSize="11"
            letterSpacing="1"
          >
            {it.label}
          </motion.text>
        </g>
      ))}
      <motion.circle
        r="4.5"
        cy={cy}
        fill="var(--color-volt)"
        stroke="none"
        initial={{ cx: 0, opacity: 0 }}
        animate={{ cx: [0, W], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 2 }}
      />
    </motion.svg>
  )
}
