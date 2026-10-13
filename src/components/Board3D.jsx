import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useInView, useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { isHeavyPaused } from '../lib/heavyPause'

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const easeOutBack = (x) => 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2)
const easeOut = (x) => 1 - Math.pow(1 - x, 3)

/* ───────────── materials (shared) ───────────── */
const std = (o) => new THREE.MeshStandardMaterial(o)
const M = {
  mask: new THREE.MeshPhysicalMaterial({ color: '#1d3815', roughness: 0.4, clearcoat: 0.3, clearcoatRoughness: 0.4 }),
  edge: std({ color: '#c9a45a', metalness: 1, roughness: 0.35 }),
  copper: std({ color: '#d7ae66', metalness: 1, roughness: 0.28 }),
  gold: std({ color: '#e8c76c', metalness: 1, roughness: 0.2 }),
  silver: std({ color: '#d6d9d3', metalness: 1, roughness: 0.24 }),
  brushed: std({ color: '#b9bdb6', metalness: 1, roughness: 0.42 }),
  plastic: std({ color: '#15170f', roughness: 0.45, metalness: 0.1 }),
  chip: std({ color: '#101109', roughness: 0.38, metalness: 0.25 }),
  navy: std({ color: '#12293c', roughness: 0.42, metalness: 0.2 }),
  pale: std({ color: '#dfe4cf', roughness: 0.6 }),
  tan: std({ color: '#b98f5c', roughness: 0.6 }),
  resBody: std({ color: '#dccb9e', roughness: 0.5 }),
  ferrite: std({ color: '#2a2b27', roughness: 0.55, metalness: 0.2 }),
  hole: std({ color: '#070805', roughness: 0.9 }),
  brown: std({ color: '#5a2d0c', roughness: 0.6 }),
  black: std({ color: '#0b0b0b', roughness: 0.6 }),
  red: std({ color: '#b3261e', roughness: 0.6 }),
  gband: std({ color: '#d4af37', metalness: 0.9, roughness: 0.3 }),
  smdRes: std({ color: '#141414', roughness: 0.5 }),
  tantal: std({ color: '#c47a1c', roughness: 0.45 }),
  tantalBar: std({ color: '#2b1a09', roughness: 0.5 }),
}

const Cyl = ({ r, h, mat, p = [0, 0, 0], rot, seg = 36, open = false, arc = [0, Math.PI * 2] }) => (
  <mesh position={p} rotation={rot} material={mat}>
    <cylinderGeometry args={[r, r, h, seg, 1, open, arc[0], arc[1]]} />
  </mesh>
)
const Box = ({ s, mat, p = [0, 0, 0], rot }) => (
  <mesh position={p} rotation={rot} material={mat}>
    <boxGeometry args={s} />
  </mesh>
)
const Lead = ({ x = 0, y = 0.16, len = 0.9 }) => <Cyl r={0.018} h={len} mat={M.silver} p={[x, y, 0]} rot={[0, 0, Math.PI / 2]} seg={8} />
const Leg = ({ x, h = 0.16 }) => <Cyl r={0.018} h={h} mat={M.silver} p={[x, h / 2 - 0.02, 0]} seg={8} />

/* ───────────── component models (origin = board surface) ───────────── */
function ECap() {
  return (
    <group>
      <Cyl r={0.245} h={0.045} mat={M.black} p={[0, 0.045, 0]} seg={40} />
      <Cyl r={0.24} h={0.5} mat={M.navy} p={[0, 0.315, 0]} seg={40} />
      <Cyl r={0.243} h={0.5} mat={M.pale} p={[0, 0.315, 0]} seg={40} open arc={[0.6, 1.25]} />
      <Cyl r={0.246} h={0.03} mat={M.navy} p={[0, 0.5, 0]} seg={40} />
      <Cyl r={0.232} h={0.02} mat={M.brushed} p={[0, 0.57, 0]} seg={40} />
      <Box s={[0.3, 0.008, 0.022]} mat={M.hole} p={[0, 0.582, 0]} />
      <Box s={[0.022, 0.008, 0.3]} mat={M.hole} p={[0, 0.582, 0]} />
      <Leg x={-0.09} />
      <Leg x={0.09} />
    </group>
  )
}

function Diode() {
  return (
    <group position={[0, 0, 0]}>
      <Lead y={0.17} len={0.92} />
      <Leg x={-0.46} h={0.17} />
      <Leg x={0.46} h={0.17} />
      <Cyl r={0.105} h={0.44} mat={M.plastic} p={[0, 0.17, 0]} rot={[0, 0, Math.PI / 2]} seg={28} />
      <Cyl r={0.108} h={0.07} mat={M.silver} p={[0.15, 0.17, 0]} rot={[0, 0, Math.PI / 2]} seg={28} />
      <Cyl r={0.11} h={0.02} mat={M.plastic} p={[-0.22, 0.17, 0]} rot={[0, 0, Math.PI / 2]} seg={28} />
    </group>
  )
}

function Resistor() {
  return (
    <group>
      <Lead y={0.15} len={0.9} />
      <Leg x={-0.46} h={0.15} />
      <Leg x={0.46} h={0.15} />
      <Cyl r={0.058} h={0.34} mat={M.resBody} p={[0, 0.15, 0]} rot={[0, 0, Math.PI / 2]} seg={20} />
      <Cyl r={0.078} h={0.09} mat={M.resBody} p={[-0.18, 0.15, 0]} rot={[0, 0, Math.PI / 2]} seg={20} />
      <Cyl r={0.078} h={0.09} mat={M.resBody} p={[0.18, 0.15, 0]} rot={[0, 0, Math.PI / 2]} seg={20} />
      {[[-0.1, M.brown], [-0.05, M.black], [0.0, M.red], [0.1, M.gband]].map(([x, m]) => (
        <Cyl key={x} r={0.063} h={0.03} mat={m} p={[x, 0.15, 0]} rot={[0, 0, Math.PI / 2]} seg={20} />
      ))}
    </group>
  )
}

function Led() {
  const mat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#6cc1ee', emissive: '#3b9bd1', emissiveIntensity: 0.8, roughness: 0.1, transparent: true, opacity: 0.92, clearcoat: 1 }), [])
  const glow = useRef()
  useFrame((s) => {
    const k = 0.5 + 0.5 * Math.sin(s.clock.elapsedTime * 2.2)
    mat.emissiveIntensity = 0.5 + k * 1.1
    if (glow.current) glow.current.material.opacity = 0.12 + k * 0.22
  })
  return (
    <group>
      <mesh ref={glow} position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.62, 32]} />
        <meshBasicMaterial color="#7fc8f0" transparent opacity={0.2} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
      <Cyl r={0.15} h={0.03} mat={mat} p={[0, 0.03, 0]} seg={32} />
      <Cyl r={0.125} h={0.2} mat={mat} p={[0, 0.14, 0]} seg={32} />
      <mesh position={[0, 0.24, 0]} material={mat}>
        <sphereGeometry args={[0.125, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      <Box s={[0.05, 0.13, 0.05]} mat={M.silver} p={[-0.04, 0.12, 0]} />
      <Box s={[0.1, 0.03, 0.06]} mat={M.silver} p={[0.03, 0.19, 0]} />
      <Leg x={-0.06} h={0.12} />
      <Leg x={0.06} h={0.1} />
    </group>
  )
}

function Mlcc({ s = 1 }) {
  return (
    <group scale={s}>
      <Box s={[0.2, 0.1, 0.12]} mat={M.tan} p={[0, 0.06, 0]} />
      <Box s={[0.04, 0.104, 0.124]} mat={M.silver} p={[-0.09, 0.06, 0]} />
      <Box s={[0.04, 0.104, 0.124]} mat={M.silver} p={[0.09, 0.06, 0]} />
    </group>
  )
}

function Smd({ kind = 'res' }) {
  return (
    <group>
      <Box s={[0.16, 0.045, 0.085]} mat={kind === 'res' ? M.smdRes : M.tan} p={[0, 0.03, 0]} />
      <Box s={[0.032, 0.05, 0.09]} mat={M.silver} p={[-0.066, 0.03, 0]} />
      <Box s={[0.032, 0.05, 0.09]} mat={M.silver} p={[0.066, 0.03, 0]} />
    </group>
  )
}

function Tantalum() {
  return (
    <group>
      <Box s={[0.34, 0.12, 0.2]} mat={M.tantal} p={[0, 0.07, 0]} />
      <Box s={[0.05, 0.122, 0.202]} mat={M.tantalBar} p={[-0.145, 0.07, 0]} />
      <Box s={[0.06, 0.02, 0.17]} mat={M.silver} p={[-0.2, 0.012, 0]} />
      <Box s={[0.06, 0.02, 0.17]} mat={M.silver} p={[0.2, 0.012, 0]} />
    </group>
  )
}

function Sot23() {
  return (
    <group>
      <Box s={[0.19, 0.075, 0.12]} mat={M.chip} p={[0, 0.06, 0]} />
      {[[-0.065, -0.09], [0.065, -0.09], [0, 0.09]].map(([x, z], i) => (
        <Box key={i} s={[0.03, 0.02, 0.07]} mat={M.silver} p={[x, 0.02, z]} />
      ))}
    </group>
  )
}

function Shield() {
  return (
    <group>
      <Box s={[1.1, 0.17, 0.52]} mat={M.brushed} p={[0, 0.1, 0]} />
      <Box s={[1.0, 0.012, 0.42]} mat={M.silver} p={[0, 0.192, 0]} />
      {Array.from({ length: 6 }, (_, i) => (
        <Cyl key={i} r={0.022} h={0.006} mat={M.hole} p={[-0.35 + i * 0.14, 0.2, 0]} seg={10} />
      ))}
    </group>
  )
}

function Tact() {
  return (
    <group>
      <Box s={[0.5, 0.08, 0.5]} mat={M.plastic} p={[0, 0.05, 0]} />
      <Box s={[0.42, 0.02, 0.42]} mat={M.silver} p={[0, 0.095, 0]} />
      <Cyl r={0.12} h={0.08} mat={M.plastic} p={[0, 0.14, 0]} seg={24} />
      {[[-0.27, -0.14], [0.27, -0.14], [-0.27, 0.14], [0.27, 0.14]].map(([x, z], i) => (
        <Box key={i} s={[0.06, 0.02, 0.09]} mat={M.silver} p={[x, 0.012, z]} />
      ))}
    </group>
  )
}

function Inductor() {
  return (
    <group>
      <Box s={[0.4, 0.2, 0.4]} mat={M.ferrite} p={[0, 0.11, 0]} />
      <Box s={[0.05, 0.19, 0.4]} mat={M.copper} p={[-0.19, 0.1, 0]} />
      <Box s={[0.05, 0.19, 0.4]} mat={M.copper} p={[0.19, 0.1, 0]} />
    </group>
  )
}

function Chip({ tex }) {
  const pins = []
  for (let k = 0; k < 8; k++) {
    const o = (k - 3.5) * 0.17
    pins.push({ p: [-0.93, 0.045, o], s: [0.2, 0.03, 0.07] }, { p: [0.93, 0.045, o], s: [0.2, 0.03, 0.07] })
    pins.push({ p: [o, 0.045, -0.93], s: [0.07, 0.03, 0.2] }, { p: [o, 0.045, 0.93], s: [0.07, 0.03, 0.2] })
  }
  return (
    <group>
      <Box s={[1.72, 0.17, 1.72]} mat={M.chip} p={[0, 0.125, 0]} />
      <Box s={[1.78, 0.03, 1.78]} mat={M.chip} p={[0, 0.06, 0]} />
      <mesh position={[0, 0.2115, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 1.6]} />
        <meshStandardMaterial map={tex} roughness={0.45} metalness={0.3} />
      </mesh>
      {pins.map((q, i) => (
        <Box key={i} s={q.s} mat={M.silver} p={q.p} />
      ))}
      {pins.map((q, i) => (
        <Box key={`f${i}`} s={[q.s[0] > q.s[2] ? 0.1 : 0.07, 0.02, q.s[0] > q.s[2] ? 0.07 : 0.1]} mat={M.silver} p={[q.p[0] * (q.s[0] > q.s[2] ? 1.08 : 1), 0.012, q.p[2] * (q.s[0] > q.s[2] ? 1 : 1.08)]} />
      ))}
    </group>
  )
}

function Soic() {
  const pins = []
  for (let k = 0; k < 4; k++) {
    const x = (k - 1.5) * 0.15
    pins.push([x, 0.035, -0.3], [x, 0.035, 0.3])
  }
  return (
    <group>
      <Box s={[0.66, 0.11, 0.46]} mat={M.chip} p={[0, 0.09, 0]} />
      <Cyl r={0.025} h={0.006} mat={M.brushed} p={[-0.26, 0.148, -0.14]} seg={12} />
      {pins.map((p, i) => (
        <Box key={i} s={[0.05, 0.025, 0.16]} mat={M.silver} p={p} />
      ))}
    </group>
  )
}

function Crystal() {
  return (
    <group>
      <Box s={[0.34, 0.26, 0.17]} mat={M.brushed} p={[0, 0.15, 0]} />
      <Cyl r={0.085} h={0.26} mat={M.brushed} p={[-0.17, 0.15, 0]} seg={20} />
      <Cyl r={0.085} h={0.26} mat={M.brushed} p={[0.17, 0.15, 0]} seg={20} />
      <mesh position={[0, 0.281, 0]} rotation={[0, 0, 0]} material={M.brushed}>
        <boxGeometry args={[0.34, 0.006, 0.17]} />
      </mesh>
      <Cyl r={0.085} h={0.006} mat={M.brushed} p={[-0.17, 0.281, 0]} seg={20} />
      <Cyl r={0.085} h={0.006} mat={M.brushed} p={[0.17, 0.281, 0]} seg={20} />
      <Leg x={-0.12} h={0.06} />
      <Leg x={0.12} h={0.06} />
    </group>
  )
}

function Toroid() {
  const R = 0.2
  return (
    <group position={[0, 0.11, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={M.ferrite}>
        <torusGeometry args={[R, 0.088, 24, 56]} />
      </mesh>
      {Array.from({ length: 22 }, (_, i) => {
        const a = (i / 22) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * R, 0, Math.sin(a) * R]} rotation={[0, -a, 0]} material={M.copper}>
            <torusGeometry args={[0.1, 0.014, 8, 20]} />
          </mesh>
        )
      })}
    </group>
  )
}

function UsbC() {
  return (
    <group>
      <Box s={[0.92, 0.3, 0.78]} mat={M.brushed} p={[0, 0.17, 0]} />
      <Box s={[0.72, 0.15, 0.06]} mat={M.hole} p={[0, 0.17, 0.4]} />
      <Box s={[0.5, 0.03, 0.06]} mat={M.silver} p={[0, 0.17, 0.4]} />
      <Box s={[0.08, 0.34, 0.5]} mat={M.silver} p={[-0.5, 0.17, 0.1]} />
      <Box s={[0.08, 0.34, 0.5]} mat={M.silver} p={[0.5, 0.17, 0.1]} />
    </group>
  )
}

function Header({ xs }) {
  const w = (xs[xs.length - 1] - xs[0]) + 0.34
  const cx = (xs[0] + xs[xs.length - 1]) / 2
  return (
    <group>
      <Box s={[w, 0.1, 0.14]} mat={M.plastic} p={[cx, 0.05, 0]} />
      {xs.map((x) => (
        <group key={x}>
          <Box s={[0.05, 0.34, 0.05]} mat={M.gold} p={[x, 0.2, 0]} />
          <Box s={[0.06, 0.02, 0.06]} mat={M.gold} p={[x, 0.37, 0]} />
        </group>
      ))}
    </group>
  )
}

const MODELS = { ecap: ECap, diode: Diode, res: Resistor, led: Led }

/* ───────────── layout ───────────── */
const BW = 7.4
const BH = 4.8
const PIN = 0.17
const pinC = (k) => (k - 3.5) * PIN
const L_K = [0, 2, 4, 5, 7]
const T_Z = [-1.3, -0.65, 0, 0.65, 1.3]
const L_TYPES = ['ecap', 'diode', 'res', 'led', 'ecap']
const R_TYPES = ['led', 'res', 'ecap', 'diode', 'res']

function sideTrace(sign, k, zt, type) {
  const zp = pinC(k)
  const dz = Math.abs(zt - zp)
  const endX = type === 'ecap' ? 2.6 : 2.5
  const pts = dz < 0.01
    ? [[sign * 1.0, zp], [sign * endX, zp]]
    : [[sign * 1.0, zp], [sign * 1.3, zp], [sign * (1.3 + dz), zt], [sign * endX, zt]]
  return { pts, comp: { type, at: [sign * endX, zt], rot: 0 } }
}

const TRACES = [
  ...L_K.map((k, i) => sideTrace(-1, k, T_Z[i], L_TYPES[i])),
  ...L_K.map((k, i) => sideTrace(1, k, T_Z[i], R_TYPES[i])),
  ...[1, 3, 4, 6].map((k) => ({ pts: [[pinC(k), -1.0], [pinC(k), -1.3], [pinC(k), -1.6]], pad: true })),
  ...[0, 2, 4, 6].map((k) => ({ pts: [[pinC(k), 1.0], [pinC(k), 1.4], [pinC(k), 1.95]], pad: true })),
]
const HEADER_XS = [-0.935, -0.595, -0.255, 0.085, 0.425, 0.765]

/* dense SMD field: bypass caps around the MCU + two resistor/cap columns down each side */
const SMD = []
;[[-1.15, -1.15], [1.15, -1.15], [-1.15, 1.15], [1.15, 1.15], [-0.8, -1.3], [0.8, -1.3], [-0.8, 1.3], [0.8, 1.3]].forEach(([x, z], i) => SMD.push({ at: [x, z], rot: i % 2 ? Math.PI / 2 : 0, kind: i % 3 ? 'cap' : 'res' }))
;[-1, 1].forEach((sg) => {
  for (let i = 0; i < 7; i++) SMD.push({ at: [sg * 3.15, -1.2 + i * 0.4], rot: Math.PI / 2, kind: (i + (sg > 0 ? 1 : 0)) % 2 ? 'cap' : 'res' })
})

const EXTRAS = [
  { kind: 'shield', at: [-2.2, -2.0], label: 'SH1', hw: 0.6, hd: 0.3 },
  { kind: 'toroid', at: [-3.15, -2.0], label: 'L1', hw: 0.33, hd: 0.33 },
  { kind: 'crystal', at: [1.4, -2.0], label: 'Y1', hw: 0.3, hd: 0.15 },
  { kind: 'soic', at: [2.25, -2.0], label: 'U2', hw: 0.36, hd: 0.26 },
  { kind: 'tact', at: [3.05, -2.0], label: 'SW1', hw: 0.28, hd: 0.28 },
  { kind: 'soic', at: [-2.9, 2.0], label: 'U3', hw: 0.36, hd: 0.26 },
  { kind: 'sot', at: [-2.15, 2.0], label: 'Q1', hw: 0.12, hd: 0.09 },
  { kind: 'sot', at: [-1.8, 2.05], label: 'Q2', hw: 0.12, hd: 0.09 },
  { kind: 'tantalum', at: [-1.42, 2.0], label: 'C30', hw: 0.2, hd: 0.12 },
  { kind: 'tantalum', at: [1.42, 2.0], label: 'C31', hw: 0.2, hd: 0.12 },
  { kind: 'sot', at: [1.85, 2.05], label: 'Q3', hw: 0.12, hd: 0.09 },
  { kind: 'soic', at: [2.5, 2.0], label: 'U4', hw: 0.36, hd: 0.26 },
  { kind: 'inductor', at: [3.15, 1.98], label: 'L2', hw: 0.24, hd: 0.24 },
]

/* ───────────── textures ───────────── */
function makeCanvasTex(w, h, draw) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  draw(c.getContext('2d'), w, h)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

const mulberry = (a) => () => {
  a |= 0; a = (a + 0x6d2b79f5) | 0
  let t = Math.imul(a ^ (a >>> 15), 1 | a)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
const S = 250

/* solder-mask layer: fibre noise, ground-pour hatching, buried bus routing and via stitching */
function baseTexture() {
  const W = BW * S
  const H = BH * S
  return makeCanvasTex(W, H, (ctx) => {
    const rnd = mulberry(7)
    const px = (x) => (x + BW / 2) * S
    const pz = (z) => (z + BH / 2) * S
    const via = (x, z, r = 6) => {
      ctx.fillStyle = '#c9a45a'; ctx.beginPath(); ctx.arc(px(x), pz(z), r, 0, 7); ctx.fill()
      ctx.fillStyle = '#070805'; ctx.beginPath(); ctx.arc(px(x), pz(z), r * 0.42, 0, 7); ctx.fill()
    }
    const g = ctx.createLinearGradient(0, 0, W, H)
    g.addColorStop(0, '#1f3b16'); g.addColorStop(0.5, '#1b3513'); g.addColorStop(1, '#213f18')
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
    for (let i = 0; i < 14000; i++) {
      ctx.fillStyle = rnd() > 0.5 ? 'rgba(255,255,255,.028)' : 'rgba(0,0,0,.05)'
      ctx.fillRect(rnd() * W, rnd() * H, 1 + rnd() * 2, 1 + rnd() * 2)
    }
    // ground-pour hatching in the outer strips
    ctx.strokeStyle = 'rgba(150,205,110,.17)'; ctx.lineWidth = 2
    const hatch = (x0, z0, x1, z1) => {
      ctx.save(); ctx.beginPath(); ctx.rect(px(x0), pz(z0), (x1 - x0) * S, (z1 - z0) * S); ctx.clip()
      for (let d = -H; d < W + H; d += 11) { ctx.beginPath(); ctx.moveTo(px(x0) + d, pz(z0)); ctx.lineTo(px(x0) + d - H, pz(z0) + H); ctx.stroke() }
      ctx.restore()
    }
    hatch(-3.6, -2.3, -0.75, -1.72); hatch(0.75, -2.3, 3.6, -1.72)
    hatch(-3.6, 1.72, -1.0, 2.3); hatch(1.0, 1.72, 3.6, 2.3)
    hatch(-3.6, -1.6, -3.3, 1.6); hatch(3.3, -1.6, 3.6, 1.6)
    // buried bus traces (faint, under the mask)
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    for (let n = 0; n < 9; n++) {
      const lanes = 4 + Math.floor(rnd() * 4)
      const x0 = -3.4 + rnd() * 5
      const z0 = -2.0 + rnd() * 4
      const dir = rnd() > 0.5 ? 1 : -1
      const run = 0.8 + rnd() * 1.6
      const jog = (rnd() - 0.5) * 0.9
      for (let l = 0; l < lanes; l++) {
        const o = l * 0.07
        ctx.strokeStyle = 'rgba(170,225,120,.5)'; ctx.lineWidth = 5
        ctx.beginPath()
        ctx.moveTo(px(x0), pz(z0 + o))
        ctx.lineTo(px(x0 + run * 0.4 * dir), pz(z0 + o))
        ctx.lineTo(px(x0 + run * 0.4 * dir + Math.abs(jog) * dir), pz(z0 + o + jog))
        ctx.lineTo(px(x0 + run * dir + Math.abs(jog) * dir), pz(z0 + o + jog))
        ctx.stroke()
        via(x0, z0 + o); via(x0 + run * dir + Math.abs(jog) * dir, z0 + o + jog)
      }
    }
    // via stitching along the border
    for (let x = -3.45; x <= 3.46; x += 0.3) { via(x, -2.2, 5); via(x, 2.2, 5) }
    // test points down the edges
    ;[-3.5, 3.5].forEach((x) => {
      for (let i = 0; i < 7; i++) {
        const z = -1.2 + i * 0.4
        ctx.fillStyle = '#e0bd6a'; ctx.beginPath(); ctx.arc(px(x), pz(z), 8, 0, 7); ctx.fill()
        ctx.fillStyle = '#b8944a'; ctx.beginPath(); ctx.arc(px(x), pz(z), 4, 0, 7); ctx.fill()
      }
    })
    // gold fingers along the front edge
    for (let i = 0; i < 12; i++) { ctx.fillStyle = '#d9b862'; ctx.fillRect(px(-2.2 + i * 0.2), pz(2.3), 0.11 * S, 0.14 * S) }
  })
}

function silkTexture() {
  const W = BW * S
  const H = BH * S
  return makeCanvasTex(W, H, (ctx) => {
    const px = (x) => (x + BW / 2) * S
    const pz = (z) => (z + BH / 2) * S
    ctx.strokeStyle = 'rgba(238,244,222,.88)'
    ctx.fillStyle = 'rgba(238,244,222,.92)'
    ctx.lineWidth = 3
    ctx.textAlign = 'center'
    const label = (t, x, z, n = 22) => { ctx.font = `600 ${n}px monospace`; ctx.fillText(t, px(x), pz(z)) }
    const box = (x, z, hw, hd) => ctx.strokeRect(px(x - hw), pz(z - hd), hw * 2 * S, hd * 2 * S)
    box(0, 0, 0.98, 0.98)
    ctx.beginPath(); ctx.arc(px(-1.12), pz(-1.12), 8, 0, 7); ctx.fill()
    label('U1', 0, 1.16)
    const names = { ecap: 'C', diode: 'D', res: 'R', led: 'LED' }
    const count = {}
    TRACES.forEach((t) => {
      if (!t.comp) return
      const n = (count[t.comp.type] = (count[t.comp.type] || 0) + 1)
      const [x, z] = t.comp.at
      label(names[t.comp.type] + n, x, z + 0.42, 20)
    })
    SMD.forEach((m, i) => {
      const along = Math.abs(Math.sin(m.rot)) > 0.5
      box(m.at[0], m.at[1], along ? 0.075 : 0.13, along ? 0.13 : 0.075)
      if (i < 8) label('C' + (20 + i), m.at[0], m.at[1] + (m.at[1] > 0 ? 0.24 : -0.16), 13)
      else if (i % 2 === 0) label((m.kind === 'res' ? 'R' : 'C') + (40 + i), m.at[0] + (m.at[0] > 0 ? 0.3 : -0.3), m.at[1] + 0.04, 13)
    })
    EXTRAS.forEach((e) => {
      box(e.at[0], e.at[1], e.hw + 0.07, e.hd + 0.07)
      label(e.label, e.at[0], e.at[1] + e.hd + 0.24, 16)
    })
    box(-0.085, 1.95, 0.7, 0.16)
    label('J1 · IO', -0.085, 2.27)
    HEADER_XS.forEach((x, i) => label(String(i + 1), x, 1.68, 12))
    box(0, -2.2, 0.55, 0.42)
    label('J2 · USB-C', 0, -1.4, 18)
    ctx.save()
    ctx.translate(px(-3.3), pz(0)); ctx.rotate(-Math.PI / 2)
    ctx.font = '600 26px monospace'; ctx.fillText('ENGINEER TECH · ET-01 · REV 1.0', 0, 0)
    ctx.restore()
    label('CE', 3.3, 2.28, 20)
    ctx.lineWidth = 2
    ;[[-3.3, 2.05], [3.3, -2.3]].forEach(([x, z]) => {
      ctx.beginPath(); ctx.arc(px(x), pz(z), 14, 0, 7); ctx.moveTo(px(x) - 22, pz(z)); ctx.lineTo(px(x) + 22, pz(z)); ctx.moveTo(px(x), pz(z) - 22); ctx.lineTo(px(x), pz(z) + 22); ctx.stroke()
    })
  })
}

function chipTexture() {
  return makeCanvasTex(512, 512, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, h)
    g.addColorStop(0, '#1b1c14'); g.addColorStop(1, '#0d0e09')
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = 'rgba(200,205,190,.25)'; ctx.lineWidth = 3; ctx.strokeRect(24, 24, w - 48, h - 48)
    ctx.fillStyle = '#cfe4a4'; ctx.textAlign = 'center'
    ctx.font = '600 84px monospace'; ctx.fillText('ET-01', w / 2, 230)
    ctx.fillStyle = 'rgba(232,235,224,.8)'; ctx.font = '500 30px monospace'
    ctx.fillText('ENGINEER TECH', w / 2, 290)
    ctx.font = '400 24px monospace'; ctx.fillText('MCU · 32-BIT · 240 MHz', w / 2, 336)
    ctx.fillText('2604 · BUILT FROM SCRATCH', w / 2, 372)
    ctx.beginPath(); ctx.arc(64, 64, 12, 0, 7); ctx.fillStyle = 'rgba(200,205,190,.55)'; ctx.fill()
  })
}

/* ───────────── software panels (canvas textures) ───────────── */
const rr = (ctx, x, y, w, h, r) => {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r)
}
const shadowed = (ctx, fn) => {
  ctx.save(); ctx.shadowColor = 'rgba(17,19,16,.35)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18; fn(); ctx.restore()
}
const FONT = '"JetBrains Mono", ui-monospace, monospace'
const SANS = '"DM Sans", system-ui, sans-serif'

const CODE = [
  [['import', 'k'], [' { board, app } ', 'p'], ['from', 'k'], [' "@et/core"', 's'], [';', 'p']],
  [],
  [['export async function', 'k'], [' ship', 'f'], ['(spec) {', 'p']],
  [['  const', 'k'], [' pcb ', 'p'], ['= await ', 'k'], ['board', 'p'], ['.design', 'f'], ['(spec);', 'p']],
  [['  const', 'k'], [' ui  ', 'p'], ['= ', 'k'], ['app', 'p'], ['.build', 'f'], ['({ web, ios });', 'p']],
  [['  pulse', 'p'], ['.track', 'f'], ['(pcb, ui).', 'p'], ['live', 'f'], ['();', 'p']],
  [['  return', 'k'], [' deploy', 'f'], ['(pcb, ui);', 'p']],
  [['}', 'p']],
]
const CC = { k: '#8cc9ea', s: '#cfe4a4', f: '#f1d68b', p: '#e6e9dc' }

function drawEditor(ctx, W, H, prog) {
  ctx.clearRect(0, 0, W, H)
  shadowed(ctx, () => { rr(ctx, 50, 40, W - 100, H - 100, 26); ctx.fillStyle = '#13170e'; ctx.fill() })
  rr(ctx, 50, 40, W - 100, H - 100, 26); ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 2; ctx.stroke()
  ;['#e6e9dc55', '#bfe0f2', '#cfe4a4'].forEach((c, i) => { ctx.beginPath(); ctx.arc(96 + i * 30, 88, 8, 0, 7); ctx.fillStyle = c; ctx.fill() })
  ctx.fillStyle = '#1d2314'; rr(ctx, 210, 66, 250, 46, 12); ctx.fill()
  ctx.font = `500 22px ${FONT}`; ctx.fillStyle = '#e6e9dc'; ctx.textAlign = 'left'; ctx.fillText('ship.service.ts', 232, 97)
  ctx.fillStyle = '#3b9bd1'; ctx.beginPath(); ctx.arc(440, 89, 5, 0, 7); ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,.07)'; ctx.beginPath(); ctx.moveTo(50, 130); ctx.lineTo(W - 50, 130); ctx.stroke()
  ctx.font = `500 30px ${FONT}`
  let left = Math.floor(prog)
  let lastX = 0, lastY = 0
  CODE.forEach((line, i) => {
    const y = 190 + i * 56
    ctx.fillStyle = 'rgba(230,233,220,.28)'; ctx.fillText(String(i + 1).padStart(2, ' '), 84, y)
    let x = 140
    for (const [txt, c] of line) {
      const n = Math.min(txt.length, Math.max(left, 0))
      if (n > 0) { ctx.fillStyle = CC[c]; ctx.fillText(txt.slice(0, n), x, y) }
      x += ctx.measureText(txt).width
      left -= txt.length
      if (left >= 0) { lastX = x; lastY = y }
    }
  })
  if (Math.floor(prog * 0.06) % 2 === 0 || prog < 300) { ctx.fillStyle = '#bfe0f2'; ctx.fillRect(lastX + 4, lastY - 26, 14, 34) }
  ctx.fillStyle = '#3b4a12'; rr(ctx, 50, H - 106, W - 100, 46, [0, 0, 26, 26]); ctx.fill()
  ctx.font = `500 20px ${FONT}`; ctx.fillStyle = '#e3edc9'; ctx.fillText('● build passing   TypeScript   UTF-8', 84, H - 76)
}

function drawPhone(ctx, W, H) {
  ctx.clearRect(0, 0, W, H)
  shadowed(ctx, () => { rr(ctx, 60, 40, W - 120, H - 90, 64); ctx.fillStyle = '#13170e'; ctx.fill() })
  rr(ctx, 76, 56, W - 152, H - 122, 50); ctx.fillStyle = '#fbfbf8'; ctx.fill()
  ctx.fillStyle = '#13170e'; rr(ctx, W / 2 - 46, 74, 92, 26, 13); ctx.fill()
  ctx.textAlign = 'left'
  ctx.fillStyle = '#111310'; ctx.font = `600 34px ${SANS}`; ctx.fillText('Pulse', 112, 170)
  ctx.fillStyle = '#3b9bd1'; ctx.beginPath(); ctx.arc(W - 122, 158, 8, 0, 7); ctx.fill()
  ctx.fillStyle = '#bfe0f2'; rr(ctx, 108, 200, W - 216, 210, 26); ctx.fill()
  ctx.fillStyle = '#4a5043'; ctx.font = `500 20px ${FONT}`; ctx.fillText('TASKS · LIVE', 132, 240)
  ctx.fillStyle = '#111310'; ctx.font = `400 84px "Instrument Serif", Georgia, serif`; ctx.fillText('248', 130, 322)
  ctx.strokeStyle = '#111310'; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath()
  ;[[132, 380], [178, 352], [214, 366], [262, 336], [306, 350], [348, 322]].forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
  ctx.stroke()
  ;[['Design review', '#3b4a12', 440], ['Firmware build', '#3b9bd1', 540], ['Deploy web app', '#3b4a12', 640]].forEach(([t, c, y], i) => {
    ctx.fillStyle = '#f1f2ec'; rr(ctx, 108, y, W - 216, 78, 20); ctx.fill()
    ctx.fillStyle = c; ctx.beginPath(); ctx.arc(146, y + 39, 12, 0, 7); ctx.fill()
    ctx.fillStyle = '#111310'; ctx.font = `500 24px ${SANS}`; ctx.fillText(t, 176, y + 47)
    ctx.fillStyle = '#d9dcd2'; rr(ctx, W - 210, y + 27, 70, 24, 12); ctx.fill()
    ctx.fillStyle = c; ctx.beginPath(); ctx.arc(i === 1 ? W - 175 : W - 152, y + 39, 9, 0, 7); ctx.fill()
  })
  ctx.fillStyle = '#3b4a12'; rr(ctx, 108, 760, W - 216, 84, 42); ctx.fill()
  ctx.fillStyle = '#f4f7e8'; ctx.font = `600 24px ${SANS}`; ctx.textAlign = 'center'; ctx.fillText('New workflow', W / 2, 810)
  ctx.fillStyle = 'rgba(17,19,16,.25)'; rr(ctx, W / 2 - 60, H - 100, 120, 8, 4); ctx.fill()
}

function drawDash(ctx, W, H) {
  ctx.clearRect(0, 0, W, H)
  shadowed(ctx, () => { rr(ctx, 50, 40, W - 100, H - 100, 24); ctx.fillStyle = '#fff'; ctx.fill() })
  rr(ctx, 50, 40, W - 100, H - 100, 24); ctx.strokeStyle = 'rgba(17,19,16,.12)'; ctx.lineWidth = 2; ctx.stroke()
  ctx.fillStyle = '#f1f2ec'; rr(ctx, 50, 40, W - 100, 62, [24, 24, 0, 0]); ctx.fill()
  ;['#111310', '#bfe0f2', '#e3edc9'].forEach((c, i) => { ctx.beginPath(); ctx.arc(92 + i * 28, 71, 8, 0, 7); ctx.fillStyle = c; ctx.fill() })
  ctx.fillStyle = '#fff'; rr(ctx, 260, 54, 460, 36, 18); ctx.fill()
  ctx.fillStyle = '#7c8274'; ctx.font = `500 20px ${FONT}`; ctx.textAlign = 'left'; ctx.fillText('pulse.app/dashboard', 284, 79)
  ctx.fillStyle = '#f7f8f3'; ctx.fillRect(50, 102, 170, H - 162)
  ;['Overview', 'Workflows', 'Teams', 'Reports'].forEach((t, i) => {
    if (i === 0) { ctx.fillStyle = '#e3edc9'; rr(ctx, 66, 126, 138, 44, 12); ctx.fill() }
    ctx.fillStyle = i === 0 ? '#3b4a12' : '#7c8274'; ctx.font = `500 22px ${SANS}`; ctx.fillText(t, 84, 156 + i * 56)
  })
  ;[['UPTIME', '99.9%', '#e3edc9'], ['TEAMS', '12', '#bfe0f2'], ['TASKS', '248', '#f1f2ec']].forEach(([l, v, bg], i) => {
    const x = 246 + i * 250
    ctx.fillStyle = bg; rr(ctx, x, 126, 232, 120, 18); ctx.fill()
    ctx.fillStyle = '#4a5043'; ctx.font = `500 18px ${FONT}`; ctx.fillText(l, x + 20, 158)
    ctx.fillStyle = '#111310'; ctx.font = `400 56px "Instrument Serif", Georgia, serif`; ctx.fillText(v, x + 20, 224)
  })
  ctx.fillStyle = '#f7f8f3'; rr(ctx, 246, 268, 732, 268, 20); ctx.fill()
  const bars = [60, 90, 74, 130, 104, 150, 118, 176, 140, 196, 160, 214]
  bars.forEach((h, i) => { ctx.fillStyle = i % 4 === 3 ? '#3b4a12' : '#bfe0f2'; rr(ctx, 276 + i * 54, 512 - h, 34, h, 8); ctx.fill() })
  ctx.strokeStyle = '#3b9bd1'; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath()
  bars.forEach((h, i) => (i ? ctx.lineTo(293 + i * 54, 470 - h * 1.05) : ctx.moveTo(293, 470 - h * 1.05)))
  ctx.stroke()
}

function Panel({ draw, px, size, pos, rot, t0, clockRef, reduced, animated = false }) {
  const group = useRef()
  const mat = useRef()
  const last = useRef(-1)
  const canvas = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = px[0]; c.height = px[1]
    return c
  }, [px])
  const tex = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    return t
  }, [canvas])

  const paint = (prog) => {
    draw(canvas.getContext('2d'), px[0], px[1], prog)
    tex.needsUpdate = true
  }
  useEffect(() => {
    let dead = false
    const go = () => !dead && paint(animated ? 0 : 1)
    Promise.all([document.fonts.load(`500 24px "JetBrains Mono"`), document.fonts.load('600 24px "DM Sans"'), document.fonts.load('40px "Instrument Serif"')]).then(go, go)
    return () => { dead = true }
  }, [])

  useFrame((s) => {
    const t = clockRef.current
    const p = reduced ? 1 : clamp((t - t0) / 1.1)
    const e = easeOutBack(p)
    const g = group.current
    g.visible = p > 0
    g.scale.setScalar(0.6 + 0.4 * clamp(e, 0, 1.06))
    mat.current.opacity = clamp(p * 1.6)
    const bob = reduced ? 0 : Math.sin(s.clock.elapsedTime * 0.9 + pos[0]) * 0.08
    g.position.set(pos[0], pos[1] + bob + (1 - p) * -0.6, pos[2])
    if (animated) {
      const chars = reduced ? 9999 : Math.max(0, Math.floor((t - t0 - 0.6) * 42))
      if (chars !== last.current && (chars < 260 || last.current < 260 || Math.floor(t * 2) !== Math.floor((t - 0.05) * 2))) {
        last.current = chars
        paint(chars)
      }
    }
  })

  return (
    <group ref={group} rotation={rot} visible={false}>
      <mesh>
        <planeGeometry args={size} />
        <meshBasicMaterial ref={mat} map={tex} transparent toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  )
}

/* data streams from the software panels down into the chip */
function Streams({ from }) {
  const tubes = useMemo(
    () => from.map((p) => new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(...p), new THREE.Vector3(p[0] * 0.45, p[1] + 0.9, p[2] * 0.4), new THREE.Vector3(0, 0.45, 0)), 48, 0.007, 6)),
    [from],
  )
  return (
    <group>
      {tubes.map((g, i) => (
        <mesh key={i} geometry={g}>
          <meshBasicMaterial color="#3b9bd1" transparent opacity={0.22} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

/* ───────────── traces ───────────── */
function Trace({ data, index, reduced, clockRef }) {
  const { v, segs, total } = useMemo(() => {
    const v = data.pts.map(([x, z]) => new THREE.Vector3(x, 0, z))
    const segs = []
    let total = 0
    for (let i = 0; i < v.length - 1; i++) {
      const len = v[i].distanceTo(v[i + 1])
      segs.push({ a: v[i], b: v[i + 1], len, start: total, angle: Math.atan2(v[i + 1].z - v[i].z, v[i + 1].x - v[i].x) })
      total += len
    }
    return { v, segs, total }
  }, [data])
  const meshes = useRef([])
  const joints = useRef([])
  const delay = 0.7 + index * 0.11
  const dur = 1.3

  useFrame(() => {
    const t = clockRef.current
    const p = reduced ? 1 : clamp((t - delay) / dur)
    const drawn = easeOut(p) * total
    segs.forEach((s, i) => {
      const m = meshes.current[i]
      if (!m) return
      const frac = clamp((drawn - s.start) / s.len)
      m.visible = frac > 0
      m.scale.x = Math.max(frac * s.len, 0.0001)
      m.position.set(s.a.x + (Math.cos(s.angle) * frac * s.len) / 2, 0.012, s.a.z + (Math.sin(s.angle) * frac * s.len) / 2)
    })
    joints.current.forEach((j, i) => j && (j.visible = drawn >= (i === 0 ? 0.001 : segs[i - 1].start + segs[i - 1].len - 0.001)))
  })

  return (
    <group>
      {segs.map((s, i) => (
        <mesh key={i} ref={(el) => (meshes.current[i] = el)} rotation={[0, -s.angle, 0]} visible={false} material={M.copper}>
          <boxGeometry args={[1, 0.022, 0.06]} />
        </mesh>
      ))}
      {v.map((p, i) => (
        <mesh key={i} ref={(el) => (joints.current[i] = el)} position={[p.x, 0.012, p.z]} visible={false} material={M.copper}>
          <cylinderGeometry args={[0.031, 0.031, 0.022, 12]} />
        </mesh>
      ))}
    </group>
  )
}

/* wrapper that drops a part onto the board */
function Drop({ at, rot = 0, t0, clockRef, reduced, from = 2.2, children }) {
  const g = useRef()
  useFrame(() => {
    const p = reduced ? 1 : clamp((clockRef.current - t0) / 0.75)
    g.current.visible = p > 0
    g.current.position.y = (1 - easeOutBack(p)) * from
    g.current.scale.setScalar(clamp(p * 4, 0.001, 1))
  })
  return (
    <group position={[at[0], 0, at[1]]} rotation={[0, rot, 0]}>
      <group ref={g} visible={false}>{children}</group>
    </group>
  )
}

function Pads({ list }) {
  return list.map(([x, z], i) => (
    <group key={i} position={[x, 0.006, z]}>
      <Cyl r={0.085} h={0.014} mat={M.gold} seg={20} />
    </group>
  ))
}

function Environment() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pm = new THREE.PMREMGenerator(gl)
    const env = pm.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    scene.environmentIntensity = 0.55
    return () => { scene.environment = null; env.dispose(); pm.dispose() }
  }, [gl, scene])
  return null
}

function boardShape() {
  const w = BW, h = BH, r = 0.2
  const s = new THREE.Shape()
  s.moveTo(-w / 2 + r, -h / 2)
  s.lineTo(w / 2 - r, -h / 2); s.absarc(w / 2 - r, -h / 2 + r, r, -Math.PI / 2, 0, false)
  s.lineTo(w / 2, h / 2 - r); s.absarc(w / 2 - r, h / 2 - r, r, 0, Math.PI / 2, false)
  s.lineTo(-w / 2 + r, h / 2); s.absarc(-w / 2 + r, h / 2 - r, r, Math.PI / 2, Math.PI, false)
  s.lineTo(-w / 2, -h / 2 + r); s.absarc(-w / 2 + r, -h / 2 + r, r, Math.PI, Math.PI * 1.5, false)
  return s
}

const PANELS = [
  { key: 'editor', draw: drawEditor, px: [1100, 700], size: [3.5, 2.23], pos: [-3.15, 2.7, -1.5], rot: [-0.06, 0.42, 0.02], t0: 3.4, animated: true, from: [-3.15, 1.6, -1.5] },
  { key: 'phone', draw: drawPhone, px: [520, 1020], size: [1.2, 2.35], pos: [3.75, 2.25, 0.5], rot: [-0.06, -0.46, -0.03], t0: 3.7, from: [3.75, 1.1, 0.5] },
  { key: 'dash', draw: drawDash, px: [1100, 700], size: [3.0, 1.91], pos: [1.1, 3.0, -2.7], rot: [-0.14, -0.14, 0], t0: 4.0, from: [1.1, 2.05, -2.7] },
]

function Board({ reduced }) {
  const group = useRef()
  const clockRef = useRef(reduced ? 30 : 0)
  const { viewport, pointer } = useThree()
  const scale = Math.min(1.12, viewport.width / 10.4)
  const silk = useMemo(silkTexture, [])
  const base = useMemo(baseTexture, [])
  const flatGeo = useMemo(() => {
    const g = new THREE.ShapeGeometry(boardShape(), 24)
    const pos = g.attributes.position
    const uv = g.attributes.uv
    for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + BW / 2) / BW, (pos.getY(i) + BH / 2) / BH)
    return g
  }, [])
  const chipTex = useMemo(chipTexture, [])
  const boardGeo = useMemo(() => new THREE.ExtrudeGeometry(boardShape(), { depth: 0.16, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2, curveSegments: 24 }), [])

  useEffect(() => {
    group.current.traverse((o) => { if (o.isMesh && !o.material?.blending) { o.castShadow = true; o.receiveShadow = true } })
  }, [])

  useFrame((state, dt) => {
    clockRef.current += dt
    const t = state.clock.elapsedTime
    const g = group.current
    const tx = reduced ? 0 : pointer.y * -0.04
    const ty = reduced ? 0.25 : 0.16 * Math.sin(t * 0.22) + pointer.x * 0.16
    g.rotation.x += (tx - g.rotation.x) * 0.05
    g.rotation.y += (ty - g.rotation.y) * 0.05
  })

  const ports = [...TRACES.filter((t) => t.comp).map((t) => t.comp.at)]
  const padList = TRACES.filter((t) => t.pad).map((t) => t.pts[t.pts.length - 1])
  const vias = [[-1.3, 0.9], [1.3, -0.9], [-0.55, -1.15], [0.55, 1.15], [-1.7, 1.0], [1.75, -1.0]]

  return (
    <group ref={group} scale={scale} position={[0, -0.7, 0]}>
      {/* board */}
      <mesh geometry={boardGeo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.168, 0]} material={M.mask} />
      <mesh geometry={flatGeo} position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial map={base} roughness={0.42} clearcoat={0.3} clearcoatRoughness={0.4} polygonOffset polygonOffsetFactor={-1} />
      </mesh>
      <mesh geometry={flatGeo} position={[0, 0.0018, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial map={silk} transparent roughness={0.6} depthWrite={false} polygonOffset polygonOffsetFactor={-2} />
      </mesh>
      {/* mounting holes + vias */}
      {[[-3.45, -2.15], [3.45, -2.15], [-3.45, 2.15], [3.45, 2.15]].map(([x, z], i) => (
        <group key={i} position={[x, 0.004, z]}>
          <Cyl r={0.17} h={0.012} mat={M.gold} seg={32} />
          <Cyl r={0.095} h={0.016} mat={M.hole} seg={32} />
        </group>
      ))}
      {vias.map(([x, z], i) => (
        <group key={i} position={[x, 0.006, z]}>
          <Cyl r={0.055} h={0.012} mat={M.gold} seg={16} />
          <Cyl r={0.022} h={0.016} mat={M.hole} seg={12} />
        </group>
      ))}
      <Pads list={[...ports, ...padList]} />

      {TRACES.map((tr, i) => (
        <Trace key={i} data={tr} index={i} reduced={reduced} clockRef={clockRef} />
      ))}

      {/* parts */}
      <Drop at={[0, 0]} t0={0.3} clockRef={clockRef} reduced={reduced} from={1.6}><Chip tex={chipTex} /></Drop>
      {TRACES.filter((t) => t.comp).map((t, i) => {
        const Part = MODELS[t.comp.type]
        const idx = TRACES.indexOf(t)
        return (
          <Drop key={i} at={t.comp.at} rot={t.comp.rot} t0={0.7 + idx * 0.11 + 1.3} clockRef={clockRef} reduced={reduced}>
            <Part />
          </Drop>
        )
      })}
      {SMD.map((m, i) => (
        <Drop key={i} at={m.at} rot={m.rot} t0={2.3 + (i % 12) * 0.07 + Math.floor(i / 12) * 0.12} clockRef={clockRef} reduced={reduced} from={1.4}><Smd kind={m.kind} /></Drop>
      ))}
      {EXTRAS.map((e, i) => {
        const P = { shield: Shield, toroid: Toroid, crystal: Crystal, soic: Soic, tact: Tact, sot: Sot23, tantalum: Tantalum, inductor: Inductor }[e.kind]
        return (
          <Drop key={i} at={e.at} t0={2.2 + i * 0.1} clockRef={clockRef} reduced={reduced}>
            <P />
          </Drop>
        )
      })}
      <Drop at={[0, -2.2]} t0={2.5} clockRef={clockRef} reduced={reduced} from={2.6}><UsbC /></Drop>
      <Drop at={[0, 1.95]} t0={2.7} clockRef={clockRef} reduced={reduced} from={2.6}><Header xs={HEADER_XS} /></Drop>

      {/* software layer */}
      {PANELS.map(({ key, ...p }) => <Panel key={key} {...p} clockRef={clockRef} reduced={reduced} />)}

    </group>
  )
}

/**
 * r3f's 'always' frameloop redraws on every display refresh — 120fps+ on a
 * high-refresh monitor for an animation that only needs to look smooth, not
 * match the screen exactly. This caps redraws to a fixed rate via 'demand'
 * + manual invalidation, which is the main fix for the sticky, blurred nav
 * feeling laggy while this scene animates behind it: fewer GPU frames means
 * less competition with the browser's own scroll compositing. Purely a
 * frame-rate cap — nothing about the rendered scene changes.
 */
function FrameLimiter({ fps = 40, active = true }) {
  const { invalidate } = useThree()
  useEffect(() => {
    if (!active) return
    let raf
    let last = 0
    const tick = (t) => {
      if (t - last >= 1000 / fps) {
        last = t
        if (!isHeavyPaused()) invalidate()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [fps, active])
  return null
}

export default function Board3D() {
  const wrap = useRef(null)
  // margin: '0px' — stop rendering the instant this leaves the viewport, instead
  // of continuing another 100px past it. That 100px overlap was the main reason
  // this scene was still burning GPU frames while the marquee below it (also
  // animating) had already scrolled into view — two animated things competing
  // for the same frame budget at once.
  const inView = useInView(wrap, { margin: '0px' })
  const reduced = useReducedMotion()

  return (
    <div ref={wrap} className="relative mx-auto aspect-[4/3] w-full max-w-[1760px] sm:aspect-[16/10] xl:aspect-[16/9]" role="img" aria-label="Interactive 3D scene: a detailed circuit board assembling itself beneath floating software windows — a code editor, a mobile app and a dashboard">
      <Canvas
        shadows="soft"
        frameloop={inView ? 'demand' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 6.4, 11.6], fov: 31, near: 2, far: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }}
        onCreated={({ camera }) => camera.lookAt(0, 0.9, 0)}
      >
        <FrameLimiter fps={40} active={inView} />
        <Environment />
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[5, 9, 6]}
          intensity={1.7}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-5.2}
          shadow-camera-right={5.2}
          shadow-camera-top={5.2}
          shadow-camera-bottom={-5.2}
          shadow-camera-near={1}
          shadow-camera-far={25}
          shadow-bias={-0.0003}
          shadow-normalBias={0.02}
        />
        <directionalLight position={[-6, 4, -3]} intensity={0.6} color="#bfe0f2" />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <shadowMaterial opacity={0.16} />
        </mesh>
        <Board reduced={!!reduced} />
      </Canvas>
    </div>
  )
}
