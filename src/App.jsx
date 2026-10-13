import { Suspense, lazy } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import { Cta, Footer } from './components/Footer'
import { PartDefs } from './components/Parts'
import { Marquee } from './components/Motion'
import LazyMount from './components/LazyMount'
import PrivacyPolicy from './components/PrivacyPolicy'

const Services = lazy(() => import('./components/Services'))
const Pulse = lazy(() => import('./components/Pulse'))
const Bovest = lazy(() => import('./components/Bovest'))
const Approach = lazy(() => import('./components/Approach'))

export default function App() {
  const isPrivacyPolicy = window.location.pathname === '/privacy-policy'

  if (isPrivacyPolicy) {
    return (
      <>
        <Nav privacyPage />
        <PrivacyPolicy />
        <Footer privacyPage />
      </>
    )
  }

  return (
    <>
      <PartDefs />
      <Nav />
      <main>
        <Hero />
        <div className="mt-24 md:mt-32">
          <Marquee items={['Web Apps', 'Mobile Apps', 'Custom PCBs', 'Design Systems', 'Firmware', 'Rapid Prototyping', 'Hardware Components', 'Pulse', 'Bovest']} />
        </div>
        <About />
        <LazyMount minHeight={600}>
          <Suspense fallback={<div className="min-h-[600px]" />}>
            <Services />
          </Suspense>
        </LazyMount>
        <LazyMount minHeight={500}>
          <Suspense fallback={<div className="min-h-[500px]" />}>
            <Pulse />
          </Suspense>
        </LazyMount>
        <LazyMount minHeight={500}>
          <Suspense fallback={<div className="min-h-[500px]" />}>
            <Bovest />
          </Suspense>
        </LazyMount>
        <LazyMount minHeight={500}>
          <Suspense fallback={<div className="min-h-[500px]" />}>
            <Approach />
          </Suspense>
        </LazyMount>
        <Cta />
      </main>
      <Footer />
    </>
  )
}
