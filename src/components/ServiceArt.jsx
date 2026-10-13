import { motion } from 'framer-motion'
import { Draw } from './Circuit'

const MONO = 'JetBrains Mono, ui-monospace, monospace'
const SANS = 'DM Sans, system-ui, sans-serif'
const SERIF = 'Instrument Serif, Georgia, serif'

/* ─────────────────────────── SOFTWARE ─────────────────────────── */
export function SoftwareArt() {
  return (
    <motion.svg
      viewBox="0 0 640 450"
      className="w-full"
      role="img"
      aria-label="Illustration of a web dashboard, a mobile app and a code snippet"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      <defs>
        <filter id="sw-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#111310" floodOpacity="0.28" />
        </filter>
        <filter id="sw-soft" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#111310" floodOpacity="0.14" />
        </filter>
        <linearGradient id="sw-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6f4fb" />
          <stop offset="1" stopColor="#bfe0f2" />
        </linearGradient>
        <linearGradient id="sw-olive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4d6119" />
          <stop offset="1" stopColor="#2f3c0d" />
        </linearGradient>
        <linearGradient id="sw-dark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#242a18" />
          <stop offset="1" stopColor="#0d100a" />
        </linearGradient>
        <linearGradient id="sw-bezel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a3f30" />
          <stop offset="0.5" stopColor="#12150d" />
          <stop offset="1" stopColor="#2b3022" />
        </linearGradient>
        <linearGradient id="sw-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b9bd1" stopOpacity="0.45" />
          <stop offset="1" stopColor="#3b9bd1" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sw-mint" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef5d8" />
          <stop offset="1" stopColor="#d6e5ac" />
        </linearGradient>
        <clipPath id="sw-clip-browser"><rect x="30" y="40" width="420" height="290" rx="16" /></clipPath>
        <clipPath id="sw-clip-screen"><rect x="438" y="98" width="164" height="304" rx="30" /></clipPath>
      </defs>

      {/* ── browser window ── */}
      <g className="float-a">
        <rect x="30" y="40" width="420" height="290" rx="16" fill="#fff" filter="url(#sw-shadow)" />
        <g clipPath="url(#sw-clip-browser)">
          <rect x="30" y="40" width="420" height="34" fill="#f1f2ec" />
          <path d="M30 74H450" stroke="#111310" strokeOpacity="0.08" />
          <circle cx="50" cy="57" r="4.5" fill="#f26b5e" />
          <circle cx="66" cy="57" r="4.5" fill="#f4c04e" />
          <circle cx="82" cy="57" r="4.5" fill="#6cc46a" />
          <rect x="122" y="47" width="220" height="20" rx="10" fill="#fff" />
          <text x="132" y="61" fontFamily={MONO} fontSize="9.5" fill="#7c8274">🔒 engineer-tech.app/dashboard</text>

          {/* nav */}
          <g transform="translate(30 74)">
            <rect x="20" y="14" width="18" height="18" rx="6" fill="url(#sw-olive)" />
            <path d="M25 23l3 3 5-6" stroke="#e3edc9" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="46" y="27" fontFamily={SANS} fontWeight="700" fontSize="13" fill="#111310">Nova</text>
            <text x="150" y="27" fontFamily={SANS} fontSize="10" fill="#4a5043">Product</text>
            <text x="198" y="27" fontFamily={SANS} fontSize="10" fill="#4a5043">Pricing</text>
            <text x="240" y="27" fontFamily={SANS} fontSize="10" fill="#4a5043">Docs</text>
            <rect x="338" y="14" width="62" height="24" rx="12" fill="url(#sw-olive)" />
            <text x="369" y="29.5" textAnchor="middle" fontFamily={SANS} fontWeight="600" fontSize="9.5" fill="#f4f7e8">Sign in</text>
            <path d="M0 46H420" stroke="#111310" strokeOpacity="0.06" />

            {/* hero copy */}
            <text x="24" y="92" fontFamily={SERIF} fontSize="35" fill="#111310" letterSpacing="-1">Build once,</text>
            <text x="24" y="126" fontFamily={SERIF} fontStyle="italic" fontSize="35" fill="#3b4a12" letterSpacing="-1">ship everywhere.</text>
            <text x="24" y="150" fontFamily={SANS} fontSize="10" fill="#4a5043">One unified design system for web and mobile,</text>
            <text x="24" y="164" fontFamily={SANS} fontSize="10" fill="#4a5043">engineered on clean architecture.</text>
            <rect x="24" y="178" width="100" height="28" rx="14" fill="url(#sw-olive)" />
            <text x="74" y="196" textAnchor="middle" fontFamily={SANS} fontWeight="600" fontSize="10.5" fill="#f4f7e8">Get started  ›</text>
            <rect x="132" y="178" width="78" height="28" rx="14" fill="none" stroke="#111310" strokeOpacity="0.85" />
            <text x="171" y="196" textAnchor="middle" fontFamily={SANS} fontWeight="500" fontSize="10.5" fill="#111310">Live demo</text>

            {/* chart card */}
            <rect x="238" y="66" width="160" height="126" rx="14" fill="url(#sw-sky)" />
            <text x="252" y="88" fontFamily={MONO} fontSize="8" letterSpacing="1" fill="#4a5043">REVENUE · 30D</text>
            <text x="252" y="112" fontFamily={SERIF} fontSize="26" fill="#111310">$48.2k</text>
            <rect x="338" y="96" width="46" height="16" rx="8" fill="#e3edc9" />
            <text x="361" y="107.5" textAnchor="middle" fontFamily={SANS} fontWeight="600" fontSize="8.5" fill="#3b4a12">▲ 12.4%</text>
            <path d="M250 176 L272 160 L292 166 L316 140 L340 148 L362 122 L386 128 V186 H250Z" fill="url(#sw-area)" />
            <Draw d="M250 176 L272 160 L292 166 L316 140 L340 148 L362 122 L386 128" i={2} duration={1.6} fill="none" stroke="#111310" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="386" cy="128" r="4.5" fill="#fff" stroke="#111310" strokeWidth="2" />

            {/* stat tiles */}
            {[['UPTIME', '99.98%', '#e3edc9'], ['LATENCY', '24 ms', '#f1f2ec'], ['USERS', '12.4k', '#f1f2ec']].map(([l, v, bg], i) => (
              <g key={l} transform={`translate(${20 + i * 128} 204)`}>
                <rect width="118" height="44" rx="11" fill={bg} />
                <text x="12" y="17" fontFamily={MONO} fontSize="7.5" letterSpacing="1" fill="#4a5043">{l}</text>
                <text x="12" y="36" fontFamily={SERIF} fontSize="19" fill="#111310">{v}</text>
                <circle cx="102" cy="14" r="3" fill={i === 0 ? '#3b9bd1' : '#b9bdb0'} />
              </g>
            ))}
          </g>
        </g>
        <rect x="30" y="40" width="420" height="290" rx="16" fill="none" stroke="#111310" strokeOpacity="0.1" />
      </g>

      {/* ── design-system card ── */}
      <g className="float-b">
        <g transform="translate(8 336)" filter="url(#sw-shadow)">
          <rect width="250" height="96" rx="16" fill="#fff" />
          <rect x="14" y="14" width="68" height="68" rx="12" fill="url(#sw-mint)" />
          <text x="48" y="60" textAnchor="middle" fontFamily={SERIF} fontSize="42" fill="#111310">Aa</text>
          <text x="98" y="32" fontFamily={MONO} fontSize="8" letterSpacing="1.2" fill="#7c8274">DESIGN SYSTEM</text>
          <text x="98" y="52" fontFamily={SANS} fontWeight="600" fontSize="13" fill="#111310">One language,</text>
          <text x="98" y="68" fontFamily={SANS} fontWeight="600" fontSize="13" fill="#111310">every screen.</text>
          {[['#3b4a12', 98], ['#3b9bd1', 118], ['#bfe0f2', 138], ['#e3edc9', 158], ['#111310', 178]].map(([c, x]) => (
            <circle key={c} cx={x + 8} cy="84" r="7" fill={c} stroke="#111310" strokeOpacity="0.12" />
          ))}
        </g>
      </g>

      {/* ── phone ── */}
      <g className="float-b">
        <g filter="url(#sw-shadow)">
          <rect x="430" y="90" width="180" height="320" rx="36" fill="url(#sw-bezel)" />
          <rect x="428" y="90" width="3" height="40" rx="1.5" fill="#2b3022" />
        </g>
        <rect x="438" y="98" width="164" height="304" rx="30" fill="#fbfbf8" />
        <g clipPath="url(#sw-clip-screen)">
          <text x="456" y="126" fontFamily={SANS} fontWeight="600" fontSize="9.5" fill="#111310">9:41</text>
          <rect x="496" y="106" width="48" height="14" rx="7" fill="#0d100a" />
          <g fill="#111310"><rect x="566" y="120" width="3" height="4" rx="1" /><rect x="571" y="118" width="3" height="6" rx="1" /><rect x="576" y="116" width="3" height="8" rx="1" /><rect x="581" y="114" width="3" height="10" rx="1" /></g>

          <text x="456" y="158" fontFamily={SANS} fontWeight="700" fontSize="17" fill="#111310">Pulse</text>
          <circle cx="580" cy="152" r="10" fill="url(#sw-mint)" />
          <text x="580" y="155.5" textAnchor="middle" fontFamily={SANS} fontWeight="700" fontSize="9" fill="#3b4a12">AT</text>

          <rect x="452" y="172" width="136" height="98" rx="16" fill="url(#sw-sky)" />
          <text x="466" y="192" fontFamily={MONO} fontSize="7.5" letterSpacing="1" fill="#4a5043">TASKS · LIVE</text>
          <text x="466" y="230" fontFamily={SERIF} fontSize="40" fill="#111310">248</text>
          <Draw d="M494 258 L510 246 L524 252 L540 236 L556 242 L574 226" i={3} duration={1.4} fill="none" stroke="#111310" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="574" cy="226" r="3.5" fill="#3b9bd1" />

          {[['Design review', '#3b4a12', true], ['Firmware build', '#3b9bd1', false], ['Deploy web app', '#3b4a12', true]].map(([t, c, on], i) => (
            <g key={t} transform={`translate(452 ${282 + i * 34})`}>
              <rect width="136" height="28" rx="10" fill="#f1f2ec" />
              <circle cx="15" cy="14" r="7" fill={c} />
              <path d="M11.5 14l2.5 2.5 4-5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <text x="28" y="17.5" fontFamily={SANS} fontWeight="500" fontSize="9.5" fill="#111310">{t}</text>
              <rect x="106" y="8" width="22" height="12" rx="6" fill={on ? '#3b4a12' : '#c9cdc1'} />
              <circle cx={on ? 122 : 112} cy="14" r="4.4" fill="#fff" />
            </g>
          ))}

          <rect x="438" y="378" width="164" height="24" fill="#fbfbf8" />
          <rect x="500" y="388" width="40" height="4" rx="2" fill="#111310" fillOpacity="0.3" />
        </g>
      </g>

    </motion.svg>
  )
}

/* ─────────────────────────── HARDWARE ─────────────────────────── */
const mx = (x) => 640 - x

const TRACES = [
  [[258, 170], [232, 170], [167, 105], [128, 105]],
  [[258, 190], [232, 190], [207, 165], [132, 165]],
  [[258, 212], [232, 212], [219, 225], [136, 225]],
  [[258, 234], [232, 234], [181, 285], [126, 285]],
  [[258, 254], [232, 254], [141, 345], [128, 345]],
]
const toD = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
const ALL_TRACES = [
  ...TRACES.map(toD),
  ...TRACES.map((t) => toD(t.map(([x, y]) => [mx(x), y]))),
  ...[300, 311, 322, 333].map((x) => `M${x} 150 V66`),
  ...[278, 300, 322, 344].map((x) => `M${x} 270 V300 L${x} 330 V346`),
]

const part = (delay) => ({
  hidden: { opacity: 0, y: -18, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
})

function ECap({ x, y, r = 26, label, d }) {
  return (
    <motion.g variants={part(d)} style={{ transformOrigin: `${x}px ${y}px` }}>
      <ellipse cx={x + 3} cy={y + 5} rx={r + 2} ry={r} fill="#000" opacity="0.35" filter="url(#hw-blur)" />
      <circle cx={x} cy={y} r={r} fill="url(#hw-navy)" />
      <path d={`M${x - r * 0.98} ${y - 4} A${r} ${r} 0 0 0 ${x - 6} ${y + r * 0.97} L${x - 9} ${y + r * 0.7} A${r * 0.72} ${r * 0.72} 0 0 1 ${x - r * 0.7} ${y - 3}Z`} fill="#dfe4cf" opacity="0.92" />
      <text x={x - r * 0.75} y={y + 4} fontFamily={MONO} fontWeight="700" fontSize="11" fill="#173447">−</text>
      <circle cx={x} cy={y} r={r - 5} fill="url(#hw-alu)" />
      <circle cx={x} cy={y} r={r - 5} fill="none" stroke="#7d8179" strokeWidth="0.8" />
      <path d={`M${x - r * 0.5} ${y - r * 0.5} L${x + r * 0.5} ${y + r * 0.5} M${x + r * 0.5} ${y - r * 0.5} L${x - r * 0.5} ${y + r * 0.5}`} stroke="#6b6f66" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx={x} cy={y} r={r * 0.3} fill="none" stroke="#8a8e85" strokeWidth="0.8" />
      <path d={`M${x - r * 0.55} ${y - r * 0.55} A${r} ${r} 0 0 1 ${x + r * 0.3} ${y - r * 0.85}`} stroke="#fff" strokeOpacity="0.55" strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x={x} y={y + r + 13} textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill="#eef4de">{label}</text>
    </motion.g>
  )
}

function Resistor({ x, y, label, d }) {
  const bands = [[-15, '#7a3d12'], [-6, '#111'], [3, '#c1272d'], [17, '#d4af37']]
  return (
    <motion.g variants={part(d)}>
      <ellipse cx={x} cy={y + 6} rx="42" ry="8" fill="#000" opacity="0.32" filter="url(#hw-blur)" />
      <path d={`M${x - 44} ${y}H${x - 26}M${x + 26} ${y}H${x + 44}`} stroke="url(#hw-lead)" strokeWidth="3" strokeLinecap="round" />
      <rect x={x - 27} y={y - 8} width="54" height="16" rx="8" fill="url(#hw-res)" />
      <circle cx={x - 22} cy={y} r="9" fill="url(#hw-res)" />
      <circle cx={x + 22} cy={y} r="9" fill="url(#hw-res)" />
      {bands.map(([o, c]) => <rect key={o} x={x + o - 2} y={y - 8.5} width="4" height="17" fill={c} />)}
      <path d={`M${x - 18} ${y - 5}H${x + 14}`} stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
      <text x={x} y={y + 24} textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill="#eef4de">{label}</text>
    </motion.g>
  )
}

function Diode({ x, y, label, d }) {
  return (
    <motion.g variants={part(d)}>
      <ellipse cx={x} cy={y + 6} rx="40" ry="7" fill="#000" opacity="0.32" filter="url(#hw-blur)" />
      <path d={`M${x - 42} ${y}H${x + 42}`} stroke="url(#hw-lead)" strokeWidth="3" strokeLinecap="round" />
      <rect x={x - 22} y={y - 10} width="44" height="20" rx="6" fill="url(#hw-black)" />
      <rect x={x + 8} y={y - 10} width="7" height="20" fill="url(#hw-alu)" />
      <path d={`M${x - 18} ${y - 6}H${x + 4}`} stroke="#fff" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" />
      <text x={x} y={y + 25} textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill="#eef4de">{label}</text>
    </motion.g>
  )
}

function Led({ x, y, label, d }) {
  return (
    <motion.g variants={part(d)}>
      <motion.circle cx={x} cy={y} r="30" fill="url(#hw-glow)" animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
      <circle cx={x} cy={y} r="19" fill="#bcd9e8" fillOpacity="0.55" stroke="#dff0fa" strokeWidth="1" />
      <circle cx={x} cy={y} r="15" fill="url(#hw-led)" />
      <path d={`M${x - 6} ${y + 2}h12M${x - 3} ${y - 6}v14`} stroke="#eaf6fd" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
      <path d={`M${x - 11} ${y - 8} A14 14 0 0 1 ${x + 2} ${y - 14}`} stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.85" />
      <text x={x} y={y + 34} textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill="#eef4de">{label}</text>
    </motion.g>
  )
}

function Smd({ x, y, cap = false, v = false }) {
  const w = v ? 9 : 17
  const h = v ? 17 : 9
  const cw = v ? 9 : 4.5
  const ch = v ? 4.5 : 9
  return (
    <g>
      <rect x={x - w / 2 + 1} y={y - h / 2 + 2} width={w} height={h} rx="1.5" fill="#000" opacity="0.35" />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="1.5" fill={cap ? '#b98f5c' : '#161616'} />
      <rect x={x - w / 2} y={y - h / 2} width={cw} height={ch} rx="1" fill="url(#hw-alu)" />
      <rect x={x + w / 2 - cw} y={y + h / 2 - ch} width={cw} height={ch} rx="1" fill="url(#hw-alu)" />
    </g>
  )
}

export function HardwareArt() {
  const pinsX = Array.from({ length: 10 }, (_, i) => 267 + i * 11)
  const pinsY = Array.from({ length: 10 }, (_, i) => 165 + i * 11)
  return (
    <motion.svg
      viewBox="0 -15 640 450"
      className="w-full"
      role="img"
      aria-label="Detailed illustration of a printed circuit board with a microcontroller, capacitors, resistors, diodes and LEDs"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <defs>
        <filter id="hw-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="hw-drop" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#111310" floodOpacity="0.32" />
        </filter>
        <filter id="hw-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.9 0 0 0 -0.32" />
        </filter>
        <linearGradient id="hw-board" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a5a1e" />
          <stop offset="0.55" stopColor="#274317" />
          <stop offset="1" stopColor="#1d3412" />
        </linearGradient>
        <linearGradient id="hw-copper" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="640" y2="420">
          <stop offset="0" stopColor="#f0d590" />
          <stop offset="0.5" stopColor="#d3a95a" />
          <stop offset="1" stopColor="#b98a3f" />
        </linearGradient>
        <linearGradient id="hw-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="hw-chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a2c22" />
          <stop offset="1" stopColor="#0b0c08" />
        </linearGradient>
        <radialGradient id="hw-navy" cx="0.38" cy="0.35" r="0.85">
          <stop offset="0" stopColor="#2d5675" />
          <stop offset="1" stopColor="#0e2434" />
        </radialGradient>
        <radialGradient id="hw-alu" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#f3f4ef" />
          <stop offset="0.6" stopColor="#c4c8c0" />
          <stop offset="1" stopColor="#8f948b" />
        </radialGradient>
        <linearGradient id="hw-lead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f5f0" />
          <stop offset="1" stopColor="#8c9088" />
        </linearGradient>
        <linearGradient id="hw-res" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0e2b8" />
          <stop offset="1" stopColor="#c7b07a" />
        </linearGradient>
        <linearGradient id="hw-black" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b3d35" />
          <stop offset="0.5" stopColor="#141510" />
          <stop offset="1" stopColor="#050604" />
        </linearGradient>
        <radialGradient id="hw-led" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#f2fbff" />
          <stop offset="0.5" stopColor="#7fc8f0" />
          <stop offset="1" stopColor="#2f86bd" />
        </radialGradient>
        <radialGradient id="hw-glow">
          <stop offset="0" stopColor="#9fdcff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#9fdcff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hw-gold" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#fff0b8" />
          <stop offset="1" stopColor="#b8892f" />
        </radialGradient>
        <clipPath id="hw-clip"><rect x="40" y="30" width="560" height="360" rx="22" /></clipPath>
      </defs>

      <g className="float-a">
        {/* board body */}
        <rect x="40" y="30" width="560" height="360" rx="22" fill="url(#hw-board)" filter="url(#hw-drop)" />
        <g clipPath="url(#hw-clip)">
          <rect x="40" y="30" width="560" height="360" filter="url(#hw-grain)" opacity="0.5" />
          {/* faint buried buses */}
          <g stroke="#a7dc78" strokeOpacity="0.22" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {[0, 1, 2, 3, 4].map((i) => <path key={`a${i}`} d={`M60 ${46 + i * 6} H150 L164 ${60 + i * 6} H210`} />)}
            {[0, 1, 2, 3, 4].map((i) => <path key={`b${i}`} d={`M580 ${374 - i * 6} H490 L476 ${360 - i * 6} H430`} />)}
            {[0, 1, 2, 3].map((i) => <path key={`c${i}`} d={`M420 ${60 + i * 6} H520 L536 ${76 + i * 6} H580`} />)}
            {[0, 1, 2, 3].map((i) => <path key={`d${i}`} d={`M60 ${356 - i * 6} H130 L146 ${340 - i * 6} H190`} />)}
          </g>
          {/* ground pour hatching */}
          <g stroke="#b7e58a" strokeOpacity="0.09" strokeWidth="1.6">
            {Array.from({ length: 34 }, (_, i) => <path key={i} d={`M${40 + i * 18} 30 l-150 150`} />)}
          </g>
          <rect x="40" y="30" width="560" height="360" fill="url(#hw-sheen)" />
        </g>
        <rect x="41" y="31" width="558" height="358" rx="21.5" fill="none" stroke="#fff" strokeOpacity="0.14" />
        <rect x="40" y="30" width="560" height="360" rx="22" fill="none" stroke="#0d1a08" strokeOpacity="0.6" strokeWidth="1.5" />

        {/* mounting holes */}
        {[[62, 52], [578, 52], [62, 368], [578, 368]].map(([x, y]) => (
          <g key={x + '-' + y}>
            <circle cx={x} cy={y} r="11" fill="url(#hw-gold)" />
            <circle cx={x} cy={y} r="6" fill="#050604" />
            <circle cx={x - 1} cy={y - 1} r="6" fill="none" stroke="#2a2c22" strokeWidth="1" />
          </g>
        ))}

        {/* silkscreen */}
        <g fill="none" stroke="#eef4de" strokeOpacity="0.85" strokeWidth="1.2">
          <rect x="238" y="138" width="164" height="144" />
          <rect x="285" y="24" width="70" height="44" rx="3" strokeOpacity="0.5" />
          <rect x="236" y="336" width="168" height="26" rx="2" />
          <path d="M40 30 m0 0" />
        </g>
        <g fontFamily={MONO} fill="#eef4de" fillOpacity="0.9">
          <text x="244" y="150" fontSize="8">U1</text>
          <text x="320" y="296" fontSize="8" textAnchor="middle">ET-01 · MCU</text>
          <text x="320" y="376" fontSize="8" textAnchor="middle">J1 · IO</text>
          <text x="320" y="80" fontSize="8" textAnchor="middle">J2 · USB-C</text>
          <text x="66" y="386" fontSize="9" fontWeight="700" letterSpacing="1">ENGINEER TECH · REV 1.0</text>
          <text x="536" y="386" fontSize="8">2604</text>
          <circle cx="248" cy="148" r="0" />
        </g>

        {/* buried vias */}
        <g>
          {[[176, 60], [464, 60], [176, 372], [464, 372], [232, 120], [408, 300], [150, 250], [490, 175]].map(([x, y]) => (
            <g key={x + '-' + y}><circle cx={x} cy={y} r="4.5" fill="url(#hw-gold)" /><circle cx={x} cy={y} r="1.7" fill="#050604" /></g>
          ))}
        </g>

        {/* copper traces (shadow + metal) */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {ALL_TRACES.map((d, i) => (
            <g key={i}>
              <Draw d={d} i={i * 0.5} duration={1.2} stroke="#000" strokeOpacity="0.4" strokeWidth="7" transform="translate(0 2.5)" />
              <Draw d={d} i={i * 0.5} duration={1.2} stroke="url(#hw-copper)" strokeWidth="5" />
              <Draw d={d} i={i * 0.5} duration={1.2} stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" transform="translate(0 -1.2)" />
            </g>
          ))}
        </g>

        {/* SMD passives */}
        <g>
          {[[170, 78], [190, 78], [210, 78], [430, 78], [450, 78], [470, 78]].map(([x, y], i) => <Smd key={`t${i}`} x={x} y={y} cap={i % 2 === 0} />)}
          {[[170, 366], [190, 366], [210, 366], [430, 366], [450, 366], [470, 366]].map(([x, y], i) => <Smd key={`b${i}`} x={x} y={y} cap={i % 2 === 1} />)}
          {[[238, 118], [402, 118], [238, 302], [402, 302]].map(([x, y], i) => <Smd key={`c${i}`} x={x} y={y} cap v={i % 2 === 0} />)}
        </g>

        {/* USB-C */}
        <motion.g variants={part(1.6)}>
          <rect x="288" y="18" width="64" height="44" rx="5" fill="url(#hw-alu)" />
          <rect x="288" y="18" width="64" height="44" rx="5" fill="none" stroke="#6b6f66" />
          <rect x="298" y="26" width="44" height="14" rx="7" fill="#0b0c08" />
          <rect x="304" y="31" width="32" height="4" rx="2" fill="#c4c8c0" />
          <path d="M294 50H346" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" />
        </motion.g>

        {/* header */}
        <motion.g variants={part(1.7)}>
          <rect x="238" y="338" width="164" height="22" rx="3" fill="url(#hw-black)" />
          {[256, 278, 300, 322, 344, 366].map((x) => (
            <g key={x}>
              <rect x={x - 4.5} y="343" width="9" height="12" rx="1.5" fill="url(#hw-gold)" />
              <rect x={x - 1.5} y="346" width="3" height="6" fill="#7a5a1a" opacity="0.5" />
            </g>
          ))}
        </motion.g>

        {/* crystal */}
        <motion.g variants={part(1.5)}>
          <rect x="196" y="44" width="46" height="18" rx="9" fill="url(#hw-alu)" />
          <rect x="196" y="44" width="46" height="18" rx="9" fill="none" stroke="#6b6f66" />
          <path d="M204 49h30" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
          <text x="219" y="74" textAnchor="middle" fontFamily={MONO} fontSize="7.5" fill="#eef4de">Y1</text>
        </motion.g>

        {/* left components */}
        <ECap x={100} y={105} label="C1" d={1.0} />
        <Diode x={95} y={165} label="D1" d={1.15} />
        <Resistor x={95} y={225} label="R1" d={1.3} />
        <Led x={100} y={285} label="LED1" d={1.45} />
        <ECap x={100} y={345} label="C2" d={1.6} />
        {/* right components */}
        <Resistor x={545} y={105} label="R2" d={1.05} />
        <Led x={540} y={165} label="LED2" d={1.2} />
        <ECap x={540} y={225} label="C3" d={1.35} />
        <Diode x={545} y={285} label="D2" d={1.5} />
        <ECap x={540} y={345} label="C4" d={1.65} />

        {/* microcontroller */}
        <motion.g variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} style={{ transformOrigin: '320px 210px' }}>
          <rect x="262" y="154" width="120" height="120" rx="6" fill="#000" opacity="0.4" filter="url(#hw-blur)" transform="translate(4 8)" />
          {pinsX.map((x) => (
            <g key={x}>
              <rect x={x - 3} y="144" width="6" height="14" rx="1" fill="url(#hw-lead)" />
              <rect x={x - 3} y="266" width="6" height="14" rx="1" fill="url(#hw-lead)" />
            </g>
          ))}
          {pinsY.map((y) => (
            <g key={y}>
              <rect x="246" y={y - 3} width="14" height="6" rx="1" fill="url(#hw-lead)" />
              <rect x="380" y={y - 3} width="14" height="6" rx="1" fill="url(#hw-lead)" />
            </g>
          ))}
          <rect x="258" y="152" width="124" height="124" rx="6" fill="url(#hw-chip)" />
          <rect x="258" y="152" width="124" height="124" rx="6" fill="none" stroke="#fff" strokeOpacity="0.14" />
          <rect x="266" y="160" width="108" height="108" rx="3" fill="none" stroke="#fff" strokeOpacity="0.08" />
          <circle cx="274" cy="168" r="3.4" fill="#0b0c08" stroke="#8f948b" strokeWidth="0.8" />
          <text x="320" y="204" textAnchor="middle" fontFamily={MONO} fontWeight="700" fontSize="24" fill="#cfe4a4" letterSpacing="1">ET-01</text>
          <text x="320" y="222" textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill="#e6e9dc" fillOpacity="0.8" letterSpacing="1.5">ENGINEER TECH</text>
          <text x="320" y="238" textAnchor="middle" fontFamily={MONO} fontSize="7" fill="#e6e9dc" fillOpacity="0.55">32-BIT · 240 MHz</text>
          <text x="320" y="250" textAnchor="middle" fontFamily={MONO} fontSize="7" fill="#e6e9dc" fillOpacity="0.55">2604 · BUILT FROM SCRATCH</text>
          <path d="M262 156 L378 156 L262 262Z" fill="#fff" opacity="0.04" />
        </motion.g>

        {/* pads at trace ends */}
        <g>
          {[[128, 105], [132, 165], [136, 225], [126, 285], [128, 345], [512, 105], [508, 165], [504, 225], [514, 285], [512, 345]].map(([x, y]) => (
            <g key={x + '-' + y}><circle cx={x} cy={y} r="4.5" fill="url(#hw-gold)" /><circle cx={x} cy={y} r="1.6" fill="#050604" /></g>
          ))}
        </g>

        <rect x="40" y="30" width="560" height="360" rx="22" fill="url(#hw-sheen)" pointerEvents="none" />
      </g>
    </motion.svg>
  )
}
