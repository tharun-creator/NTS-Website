import React, { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import AgeGate from './components/AgeGate'
import BrandTimeline from './components/BrandTimeline'
import CategoryMarquee from './components/CategoryMarquee'
import Portfolio from './components/Portfolio'
import SpiritCarousel from './components/SpiritCarousel'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import FooterRedesign from './components/FooterRedesign'
import HandoffPage from './components/HandoffPage'
import LegacySections from './components/LegacySections'
import TrustStrip from './components/TrustStrip'

const announcementItems = [
  'GOA MANUFACTURING FACILITY',
  'CONTRACT BOTTLING & BLENDING PARTNERS',
  '15+ PROPRIETARY IMFL BRANDS',
  'NTS BLENDERS AND DISTILLERS PVT. LTD.',
]

function AnnouncementMarquee() {
  const tickerItems = [...announcementItems, ...announcementItems, ...announcementItems, ...announcementItems]
  return (
    <div className="w-full overflow-hidden border-b border-maroon/35 bg-[#F4ECDF] py-2.5 text-maroon">
      <div className="inline-flex min-w-max animate-marquee items-center whitespace-nowrap">
        {tickerItems.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center font-sans text-[11px] font-black uppercase tracking-[0.18em] text-maroon">
            <span className="mx-8 inline-block h-1.5 w-1.5 rounded-full bg-maroon/70" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="sticky left-0 right-0 top-0 z-50 bg-[#F4ECDF] text-maroon">
      <AnnouncementMarquee />
      <header className="bg-[#F4ECDF] px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-3" aria-label="NTS Distillers home">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon font-serif text-[13px] font-black uppercase tracking-normal text-cream shadow-[inset_0_0_0_1px_rgba(244,236,223,0.18)]">
              NTS
            </span>
            <span className="font-serif text-[15px] font-black uppercase tracking-[0.16em] text-maroon sm:text-lg">
              NTS Distillers
            </span>
          </a>

          <nav className="hidden items-center gap-8 font-sans text-[11px] font-black uppercase tracking-[0.16em] text-maroon lg:flex">
            <a className="transition-colors hover:text-coral-orange" href="#portfolio">Brands</a>
            <a className="transition-colors hover:text-coral-orange" href="#track-record">Track Record</a>
            <a className="transition-colors hover:text-coral-orange" href="#facility">Distillery</a>
            <a className="transition-colors hover:text-coral-orange" href="#machinery">Machinery</a>
            <a className="transition-colors hover:text-coral-orange" href="#updates">B2B Proposals</a>
          </nav>
        </div>
      </header>
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="hero-section group relative min-h-[680px] overflow-hidden bg-[#E9542E] text-white sm:min-h-[calc(100svh-106px)]">
      <div className="hero-bg absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-[58%_bottom] opacity-100 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025] sm:bg-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(74,21,28,0.48)_0%,rgba(74,21,28,0.2)_30%,rgba(74,21,28,0)_62%),linear-gradient(0deg,rgba(21,10,9,0.44)_0%,rgba(21,10,9,0)_48%)]" />

      <div className="relative z-10 flex min-h-[680px] items-end px-5 pb-14 sm:min-h-[calc(100svh-106px)] sm:px-10 sm:pb-16 lg:px-14 lg:pb-20">
        <div className="hero-copy w-full max-w-[min(35vw,520px)] min-w-[300px] text-left max-[640px]:max-w-[88vw] max-[640px]:min-w-0">
          <h1 className="font-rye text-[clamp(2.5rem,4.35vw,4.45rem)] font-black uppercase leading-[0.96] tracking-normal text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] max-[640px]:text-[clamp(2.2rem,12vw,3.25rem)]">
            FOUR DECADES.
            <br />
            ONE LEGACY.
            <br />
            INFINITE SPIRIT.
          </h1>
          <p className="mt-5 max-w-[460px] font-sans text-sm font-medium leading-relaxed text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.62)] sm:text-base">
            From a single distribution venture in Pondicherry to a full-scale manufacturing powerhouse, NTS has been shaping India's alcobev landscape since 1980.
          </p>
          <div className="mt-8 flex">
            <a className="rounded-full bg-coral-orange px-8 py-4 text-center font-sans text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cream hover:text-maroon active:scale-[0.98]" href="#track-record">
              Explore Our Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductModal({ product, onClose }) {
  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} profile`}
    >
      <div
        className="relative grid max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-lg border border-cream/12 bg-cream text-maroon shadow-2xl md:grid-cols-[0.86fr_1fr]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex min-h-[280px] items-center justify-center bg-[linear-gradient(145deg,#150A09,#2C0F14)] p-8">
          <div className="flex h-64 w-44 items-center justify-center rounded-md border border-cream/12 bg-cream/8 text-center font-serif text-3xl font-black uppercase text-cream">
            NTS
          </div>
        </div>

        <div className="overflow-y-auto p-7 sm:p-9">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-cream transition-colors hover:bg-coral-orange"
            aria-label="Close product profile"
          >
            <X className="h-5 w-5" />
          </button>

          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-coral-orange">
            {product.type || product.category || 'IMFL'} / {product.dosage || product.style || 'Portfolio'}
          </span>
          <h2 className="mt-4 pr-12 font-serif text-3xl font-black uppercase leading-tight tracking-normal sm:text-4xl">
            {product.name}
          </h2>
          <p className="mt-4 font-sans text-sm font-semibold leading-7 text-maroon/72">
            {product.tagline || product.desc || product.description || 'Premium spirits crafted for trade partners.'}
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-md border border-maroon/10 bg-white/60 p-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-maroon/50">ABV</span>
              <p className="mt-1 font-serif text-xl font-black">{product.abv || '42.8%'}</p>
            </div>
            <div className="rounded-md border border-maroon/10 bg-white/60 p-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-maroon/50">Profile</span>
              <p className="mt-1 font-serif text-xl font-black">{product.dosage || product.style || 'Premium'}</p>
            </div>
          </div>
          <a
            href="mailto:Ntsdistillers@gmail.com?subject=NTS partnership inquiry"
            className="mt-8 inline-flex rounded-full bg-maroon px-7 py-3 text-xs font-black uppercase tracking-widest text-cream transition-colors hover:bg-coral-orange"
          >
            Start Inquiry
          </a>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const showHandoffPage = useMemo(() => {
    if (typeof window === 'undefined') return false
    return new URLSearchParams(window.location.search).get('handoff') === 'true'
  }, [])

  if (showHandoffPage) {
    return (
      <>
        <AgeGate />
        <HandoffPage />
      </>
    )
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-cream text-maroon">
      <AgeGate />
      <Header />
      <Hero />
      <TrustStrip />
      <CategoryMarquee />
      <SpiritCarousel onQuickView={setSelectedProduct} />
      <LegacySections onQuickView={setSelectedProduct} />
      <Portfolio />
      <BrandTimeline />
      <Testimonials />
      <Newsletter />
      <FooterRedesign />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </main>
  )
}
