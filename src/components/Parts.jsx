import { motion } from 'framer-motion'

const MONO = 'JetBrains Mono, ui-monospace, monospace'
const ease = [0.16, 1, 0.3, 1]

/** Rendered once at the app root so every illustration below can reference these gradients by id. */
export function PartDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="pt-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="pt-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.9 0 0 0 -0.32" />
        </filter>
        <linearGradient id="pt-board" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a5a1e" />
          <stop offset="0.55" stopColor="#274317" />
          <stop offset="1" stopColor="#1d3412" />
        </linearGradient>
        <linearGradient id="pt-copper" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="0">
          <stop offset="0" stopColor="#f0d590" />
          <stop offset="0.5" stopColor="#d3a95a" />
          <stop offset="1" stopColor="#b98a3f" />
        </linearGradient>
        <linearGradient id="pt-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="pt-navy" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0a1c29" />
          <stop offset="0.32" stopColor="#33637f" />
          <stop offset="0.6" stopColor="#173a52" />
          <stop offset="1" stopColor="#081a26" />
        </linearGradient>
        <radialGradient id="pt-alu" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#f6f7f2" />
          <stop offset="0.6" stopColor="#c4c8c0" />
          <stop offset="1" stopColor="#8d928a" />
        </radialGradient>
        <linearGradient id="pt-lead" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6f7f2" />
          <stop offset="1" stopColor="#8a8e86" />
        </linearGradient>
        <linearGradient id="pt-black" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f4138" />
          <stop offset="0.45" stopColor="#15160f" />
          <stop offset="1" stopColor="#050604" />
        </linearGradient>
        <linearGradient id="pt-chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2c2e24" />
          <stop offset="1" stopColor="#0a0b07" />
        </linearGradient>
        <radialGradient id="pt-gold" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#fff0b8" />
          <stop offset="1" stopColor="#b8892f" />
        </radialGradient>
        <radialGradient id="pt-led" cx="0.4" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#f4fcff" />
          <stop offset="0.5" stopColor="#7fc8f0" />
          <stop offset="1" stopColor="#2f86bd" />
        </radialGradient>
        <radialGradient id="pt-glow">
          <stop offset="0" stopColor="#9fdcff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#9fdcff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pt-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6f8f1" />
          <stop offset="1" stopColor="#dbe9df" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ───────── individual parts, drawn around (0,0) ───────── */
function ECap() {
  return (
    <g>
      <ellipse cx="2" cy="42" rx="30" ry="6" fill="#000" opacity="0.35" filter="url(#pt-blur)" />
      <rect x="-9" y="30" width="3.2" height="18" rx="1.2" fill="url(#pt-lead)" />
      <rect x="6" y="30" width="3.2" height="18" rx="1.2" fill="url(#pt-lead)" />
      <path d="M-25 -32 V30 A25 7 0 0 0 25 30 V-32 Z" fill="url(#pt-navy)" />
      <path d="M-25 -32 V30 A25 7 0 0 0 -12 36.6 V-28 Z" fill="#dfe4cf" opacity="0.94" />
      {[-14, 2, 18].map((y) => (
        <text key={y} x="-18.5" y={y + 4} fontFamily={MONO} fontWeight="700" fontSize="11" fill="#173447" textAnchor="middle">−</text>
      ))}
      <text transform="translate(9 22) rotate(-90)" fontFamily={MONO} fontSize="7" fill="#bcd3e2" opacity="0.85" letterSpacing="0.6">470µF 25V</text>
      <path d="M17 -22 V22" stroke="#fff" strokeOpacity="0.16" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="0" cy="-32" rx="25" ry="7.5" fill="url(#pt-alu)" />
      <ellipse cx="0" cy="-32" rx="20.5" ry="5.6" fill="none" stroke="#7d8179" strokeWidth="0.8" />
      <path d="M-10 -34.2 L10 -29.8 M10 -34.2 L-10 -29.8" stroke="#6b6f66" strokeWidth="1.3" strokeLinecap="round" />
    </g>
  )
}

function Diode() {
  return (
    <g>
      <ellipse cx="0" cy="18" rx="42" ry="5" fill="#000" opacity="0.3" filter="url(#pt-blur)" />
      <rect x="-50" y="-1.6" width="100" height="3.2" rx="1.6" fill="url(#pt-lead)" />
      <rect x="-25" y="-12" width="50" height="24" rx="8" fill="url(#pt-black)" />
      <rect x="10" y="-12" width="8" height="24" fill="url(#pt-alu)" />
      <path d="M-19 -7 H4" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
      <text x="-6" y="4" fontFamily={MONO} fontSize="6" fill="#cfd3c9" opacity="0.7" textAnchor="middle">1N4148</text>
    </g>
  )
}

function Led() {
  return (
    <g>
      <motion.circle cx="0" cy="-10" r="40" fill="url(#pt-glow)" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
      <ellipse cx="0" cy="44" rx="20" ry="4" fill="#000" opacity="0.3" filter="url(#pt-blur)" />
      <rect x="-9" y="12" width="3.2" height="32" rx="1.2" fill="url(#pt-lead)" />
      <rect x="6" y="12" width="3.2" height="26" rx="1.2" fill="url(#pt-lead)" />
      <path d="M-17 8 V-14 A17 17 0 0 1 17 -14 V8 Z" fill="url(#pt-led)" opacity="0.95" />
      <path d="M-17 8 V-14 A17 17 0 0 1 17 -14 V8 Z" fill="none" stroke="#dff0fa" strokeOpacity="0.7" />
      <rect x="-20" y="8" width="40" height="5" rx="2" fill="#bcd9e8" opacity="0.85" />
      <path d="M-4 8 V-6 H-9 M3 8 V-12 H10" stroke="#eaf6fd" strokeWidth="1.4" fill="none" opacity="0.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M-11 -18 A13 13 0 0 1 -1 -26" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.9" />
    </g>
  )
}

function Ic() {
  const pins = Array.from({ length: 6 }, (_, i) => -25 + i * 10)
  return (
    <g>
      <rect x="-30" y="-24" width="68" height="68" rx="6" fill="#000" opacity="0.35" filter="url(#pt-blur)" />
      {pins.map((p) => (
        <g key={p}>
          <rect x={p - 2.5} y="-42" width="5" height="12" rx="1" fill="url(#pt-lead)" />
          <rect x={p - 2.5} y="30" width="5" height="12" rx="1" fill="url(#pt-lead)" />
          <rect x="-42" y={p - 2.5} width="12" height="5" rx="1" fill="url(#pt-lead)" />
          <rect x="30" y={p - 2.5} width="12" height="5" rx="1" fill="url(#pt-lead)" />
        </g>
      ))}
      <rect x="-32" y="-32" width="64" height="64" rx="5" fill="url(#pt-chip)" />
      <rect x="-32" y="-32" width="64" height="64" rx="5" fill="none" stroke="#fff" strokeOpacity="0.16" />
      <circle cx="-24" cy="-24" r="2.6" fill="#0a0b07" stroke="#8d928a" strokeWidth="0.7" />
      <text x="0" y="6" textAnchor="middle" fontFamily={MONO} fontWeight="700" fontSize="19" fill="#cfe4a4" letterSpacing="-1">{'</>'}</text>
      <text x="0" y="20" textAnchor="middle" fontFamily={MONO} fontSize="6.5" fill="#e6e9dc" opacity="0.7" letterSpacing="1.2">ET-01</text>
      <path d="M-30 -30 L30 -30 L-30 30Z" fill="#fff" opacity="0.045" />
    </g>
  )
}

function Display() {
  return (
    <g>
      <ellipse cx="2" cy="42" rx="50" ry="5" fill="#000" opacity="0.3" filter="url(#pt-blur)" />
      <rect x="-54" y="-38" width="108" height="76" rx="9" fill="url(#pt-board)" />
      {[-21, -7, 7, 21].map((x) => <rect key={x} x={x - 3.5} y="30" width="7" height="8" rx="1.2" fill="url(#pt-gold)" />)}
      <rect x="-48" y="-32" width="96" height="56" rx="5" fill="#0b0d08" />
      <rect x="-44" y="-28" width="88" height="48" rx="3" fill="url(#pt-screen)" />
      <g>
        <circle cx="-39" cy="-23" r="1.4" fill="#f26b5e" /><circle cx="-34.5" cy="-23" r="1.4" fill="#f4c04e" /><circle cx="-30" cy="-23" r="1.4" fill="#6cc46a" />
        <text x="-39" y="-11" fontFamily="DM Sans, sans-serif" fontWeight="700" fontSize="7" fill="#111310">Nova</text>
        <rect x="-39" y="-6" width="34" height="3" rx="1.5" fill="#b9bdb0" />
        <rect x="-39" y="-0.5" width="26" height="3" rx="1.5" fill="#d3d6cb" />
        <rect x="-39" y="7" width="18" height="7" rx="3.5" fill="#3b4a12" />
        <rect x="-2" y="-14" width="38" height="28" rx="4" fill="#bfe0f2" />
        {[3, 8, 14, 20, 26].map((o, i) => <rect key={o} x={o - 0.5} y={12 - [6, 10, 8, 14, 11][i]} width="4.6" height={[6, 10, 8, 14, 11][i]} rx="1" fill={i === 3 ? '#3b4a12' : '#f6f8f1'} />)}
        <path d="M2 4 L10 -2 L17 1 L26 -8 L33 -5" stroke="#111310" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="M-44 -28 L-6 -28 L-44 12Z" fill="#fff" opacity="0.1" />
    </g>
  )
}

const PARTS = { ecap: ECap, diode: Diode, led: Led, ic: Ic, display: Display }

const drop = (d) => ({
  hidden: { opacity: 0, y: -26, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { delay: d, duration: 0.8, ease } },
})

export function Part({ type, x = 0, y = 0, s = 1, delay = 0 }) {
  const P = PARTS[type]
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <motion.g variants={drop(delay)}>
        <P />
      </motion.g>
    </g>
  )
}

/** Rounded tile holding one illustrated part — used as an icon */
export function PartTile({ type, tone = 'mint', className = '' }) {
  const bg = { mint: 'bg-mint', sky: 'bg-sky', panel: 'bg-panel' }[tone]
  return (
    <div className={`grid h-[84px] w-[84px] place-items-center rounded-2xl ${bg} ${className}`}>
      <motion.svg viewBox="-56 -56 112 112" className="h-[74px] w-[74px]" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }} aria-hidden="true">
        <Part type={type} s={0.95} />
      </motion.svg>
    </div>
  )
}

/** A slice of PCB with illustrated parts mounted on a copper trace */
export function PartsStrip({ items, className = '', label = 'Circuit board strip with electronic components' }) {
  const W = 1200
  const n = items.length
  const xs = items.map((_, i) => ((i + 0.5) * W) / n)
  const trace = `M18 105 H${W - 18}`
  return (
    <motion.svg
      viewBox={`0 0 ${W} 210`}
      className={`w-full ${className}`}
      role="img"
      aria-label={label}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <rect x="0" y="20" width={W} height="170" rx="22" fill="url(#pt-board)" />
      <rect x="0" y="20" width={W} height="170" rx="22" filter="url(#pt-grain)" opacity="0.5" />
      <g stroke="#a7dc78" strokeOpacity="0.2" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {[0, 1, 2, 3].map((i) => <path key={`a${i}`} d={`M40 ${40 + i * 6} H${W * 0.22} l14 14 H${W * 0.3}`} />)}
        {[0, 1, 2, 3].map((i) => <path key={`b${i}`} d={`M${W - 40} ${170 - i * 6} H${W * 0.78} l-14 -14 H${W * 0.7}`} />)}
      </g>
      <g stroke="#b7e58a" strokeOpacity="0.07" strokeWidth="1.6">
        {Array.from({ length: 60 }, (_, i) => <path key={i} d={`M${i * 22} 20 l-170 170`} />)}
      </g>
      <rect x="0" y="20" width={W} height="170" rx="22" fill="url(#pt-sheen)" />
      <rect x="0.75" y="20.75" width={W - 1.5} height="168.5" rx="21.5" fill="none" stroke="#fff" strokeOpacity="0.14" />

      {[[30, 42], [W - 30, 42], [30, 168], [W - 30, 168]].map(([x, y]) => (
        <g key={x + '-' + y}>
          <circle cx={x} cy={y} r="9" fill="url(#pt-gold)" />
          <circle cx={x} cy={y} r="5" fill="#050604" />
        </g>
      ))}

      {/* copper trace */}
      <g fill="none" strokeLinecap="round">
        <motion.path d={trace} stroke="#000" strokeOpacity="0.4" strokeWidth="9" transform="translate(0 3)" variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.6, ease: [0.65, 0, 0.35, 1] } } }} />
        <motion.path d={trace} stroke="url(#pt-copper)" strokeWidth="6" variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.6, ease: [0.65, 0, 0.35, 1] } } }} />
        <motion.path d={trace} stroke="#fff" strokeOpacity="0.35" strokeWidth="1.4" transform="translate(0 -1.6)" variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.6, ease: [0.65, 0, 0.35, 1] } } }} />
      </g>

      {/* vias between parts */}
      {xs.slice(0, -1).map((x, i) => {
        const vx = x + W / n / 2
        return (
          <g key={i}>
            <circle cx={vx} cy="105" r="8" fill="url(#pt-gold)" />
            <circle cx={vx} cy="105" r="3" fill="#050604" />
          </g>
        )
      })}

      {items.map((it, i) => (
        <g key={i}>
          <Part type={it.type} x={xs[i]} y={102} delay={0.9 + i * 0.14} />
          <motion.text
            x={xs[i]}
            y="178"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="12"
            letterSpacing="1.4"
            fill="#eef4de"
            fillOpacity="0.9"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.4 + i * 0.12 } } }}
          >
            {it.label}
          </motion.text>
        </g>
      ))}
    </motion.svg>
  )
}
