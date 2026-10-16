import { motion } from 'framer-motion'
import { Scramble } from './Motion'
import { goToHashSection } from '../lib/useHashNavFix'

const ease = [0.16, 1, 0.3, 1]

/** Masked word-by-word headline reveal. Wrap a word in *asterisks* for the italic accent. */
export function Words({ text, as: Tag = 'h2', className = '', delay = 0, stagger = 0.06 }) {
  const words = text.split(' ')
  return (
    <Tag className={`headline ${className}`} aria-label={text.replaceAll('*', '')}>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        className="inline"
      >
        {words.map((w, i) => {
          const accent = w.startsWith('*')
          const clean = w.replaceAll('*', '')
          return (
            <span key={i} className="inline-block overflow-hidden py-[0.1em] -my-[0.1em] align-bottom">
              <motion.span
                variants={{ hidden: { y: '115%' }, show: { y: 0 } }}
                transition={{ duration: 1, ease }}
                className="inline-block"
              >
                {accent ? <em>{clean}</em> : clean}
                {i < words.length - 1 && ' '}
              </motion.span>
            </span>
          )
        })}
      </motion.span>
    </Tag>
  )
}

export function Fade({ children, delay = 0, y = 24, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Tag({ children, className = '' }) {
  return <div className={`tag ${className}`}><Scramble text={children} /></div>
}

export const PULSE_URL = 'https://managementsystem-fkx0.onrender.com'
export const BOVEST_URL = 'https://bovest-website.onrender.com'

export function Button({ href, children, variant = 'solid', size = 'md' }) {
  const external = /^https?:/.test(href)
  const base =
    'group inline-flex items-center gap-2 rounded-full border font-medium tracking-normal transition-all duration-300 ease-out-expo hover:-translate-y-0.5'
  const sizes = { sm: 'px-4 py-2 text-xs', md: 'px-6 py-3.5 text-sm', lg: 'px-10 py-[18px] text-[15px]' }
  const variants = {
    solid: 'border-olive bg-olive text-[#f4f7e8] hover:bg-olive2',
    ghost: 'border-ink bg-transparent text-ink hover:bg-ink hover:text-paper',
    mint: 'border-mint bg-mint text-olive hover:bg-[#d5e4b0]',
  }
  const isHash = href.startsWith('#') && href !== '#'
  const onClick = isHash
    ? (e) => { e.preventDefault(); goToHashSection(href.slice(1)) }
    : undefined

  return (
    <a href={href} onClick={onClick} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`${base} ${sizes[size]} ${variants[variant]}`}>
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">›</span>
    </a>
  )
}
