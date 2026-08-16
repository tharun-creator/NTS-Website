import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import AgeGate from './components/AgeGate'
import Newsletter from './components/Newsletter'
import TrustStrip from './components/TrustStrip'
import CategoryMarquee from './components/CategoryMarquee'
import BannerSection from './components/BannerSection'
import FooterRedesign from './components/FooterRedesign'
import RibbonShowcase from './components/RibbonShowcase'
import BrandTimeline from './components/BrandTimeline'
import Testimonials from './components/Testimonials'

const announcementItems = [
  'GOA MANUFACTURING FACILITY',
  'CONTRACT BOTTLING & BLENDING PARTNERS',
  '15+ PROPRIETARY IMFL BRANDS',
  'NTS BLENDERS AND DISTILLERS PVT. LTD.',
]

function AnnouncementMarquee() {
  const tickerItems = [...announcementItems, ...announcementItems, ...announcementItems, ...announcementItems]
  return (
    <div className="w-full overflow-hidden border-b border-maroon/20 bg-[#F4ECDF] py-2 text-maroon">
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

const NTS_PRODUCTS = [
  {
    id: 'wanted-999',
    name: 'Wanted 999 VSOP Brandy',
    tagline: 'Rich grape, vanilla and mixed fruit depth.',
    abv: '42.8%',
    category: 'Brandy',
    style: 'Rare & Rich',
    cardClass: 'berry',
    note: 'Spirits concept 01',
    image: '/bottle-2/bottle (3).png',
    description: 'A fruit-forward VSOP brandy with grape, pineapple brightness, vanilla warmth and a rounded finish.',
  },
  {
    id: 'east-coast-brandy',
    name: 'East Coast Indian Blended Grape Brandy',
    tagline: 'Fig, honey and a smooth melon finish.',
    abv: '42.8%',
    category: 'Brandy',
    style: 'Smooth Finish',
    cardClass: 'vanilla',
    note: 'Spirits concept 02',
    image: '/bottle-2/bottle.png',
    description: 'A grape brandy profile with honeyed lift, ripe fig notes and a clean, quietly luxurious finish.',
  },
  {
    id: 'east-coast-rum',
    name: 'East Coast XXX Rum',
    tagline: 'Oak-aged depth, spice and cocoa warmth.',
    abv: '42.8%',
    category: 'Rum',
    style: 'Dark Spiced',
    cardClass: 'cookie',
    note: 'Spirits concept 03',
    image: '/bottle-2/bottle (1).png',
    description: 'Coastal dark rum with traditional spice, tropical lift, oak shadow and a cocoa-tinged close.',
  },
  {
    id: 'east-coast-sugar-rum',
    name: 'East Coast Sugar New Rum',
    tagline: 'Fresh sugar-cane spirit with tropical clarity.',
    abv: '42.8%',
    category: 'Rum',
    style: 'Light & Fresh',
    cardClass: 'pb',
    note: 'Spirits concept 04',
    image: '/bottle-2/Product_bottle_3D_render_202607251455-removebg-preview.png',
    description: 'A crisp, sugarcane-derived light rum designed for mixology and clean highballs.',
  },
  {
    id: 'canacona-vodka',
    name: 'Canacona Zimmy Pop Kiwi Vodka',
    tagline: 'Electric kiwi blast with smooth grain alcohol.',
    abv: '37.5%',
    category: 'Vodka',
    style: 'Infused Grain',
    cardClass: 'choc',
    note: 'Spirits concept 05',
    image: '/images/product-1_202607241330.png',
    description: 'An invigorating green vodka infusion with tart kiwi, smooth grain spirit refinement, and a refreshing citrus finish.',
  },
]

const DISTRIBUTED_BRANDS = [
  {
    group: 'UB GROUP (CDL / CAREW PHIPSON)',
    brands: 'Vin Grape, Top Rum, Carew\'s Fine Brandy, Red Riband Vodka, Booth\'s Gin, Kalyani Beer, UB Export Lager, Bullet Strong, Kingfisher',
  },
  {
    group: 'MCDOWELL\'S PORTFOLIO (UB GROUP)',
    brands: 'McDowell\'s Traveller Brandy & Whisky, Old Cask Rum, Blue Riband Gin, Duet, Tango, Golden Amber Brandy, Men\'s Choice Whisky',
  },
  {
    group: 'SHAW WALLACE',
    brands: 'Haywards Fine Whisky, Punch Brandy, Haywards 5000 Beer, Haywards Lager, Haywards 2000, Royal Challenge Beer',
  },
  {
    group: 'OTHER MAJOR PORTFOLIOS',
    brands: 'Spencer & Co. brands, Zingaro Beer (Pondicherry), Sand Piper Beer (Pondicherry)',
  },
]

const PORTFOLIO_PROJECTS = NTS_PRODUCTS.map((product) => ({
  id: product.id,
  title: product.name,
  subtitle: `${product.category} / ${product.style}`,
  image: product.image,
}))

function getCarouselOffset(index, currentIndex, total) {
  const rawOffset = index - currentIndex
  const half = total / 2

  if (rawOffset > half) return rawOffset - total
  if (rawOffset < -half) return rawOffset + total
  return rawOffset
}

function getCarouselProfile() {
  if (typeof window === 'undefined') {
    return {
      x: [-320, -160, 0, 160, 320],
      y: [40, 20, 0, 20, 40],
      rotateZ: [-14, -8, 0, 8, 14],
      rotateY: [28, 18, 0, -18, -28],
      scale: [0.9, 0.96, 1.08, 0.96, 0.9],
    }
  }

  if (window.innerWidth < 640) {
    return {
      x: [-160, -80, 0, 80, 160],
      y: [32, 16, 0, 16, 32],
      rotateZ: [-9, -5, 0, 5, 9],
      rotateY: [12, 8, 0, -8, -12],
      scale: [0.92, 0.98, 1.08, 0.98, 0.92],
    }
  }

  if (window.innerWidth < 1024) {
    return {
      x: [-240, -120, 0, 120, 240],
      y: [36, 18, 0, 18, 36],
      rotateZ: [-11, -6, 0, 6, 11],
      rotateY: [16, 10, 0, -10, -16],
      scale: [0.9, 0.97, 1.08, 0.97, 0.9],
    }
  }

  return {
    x: [-320, -160, 0, 160, 320],
    y: [40, 20, 0, 20, 40],
    rotateZ: [-14, -8, 0, 8, 14],
    rotateY: [28, 18, 0, -18, -28],
    scale: [0.9, 0.96, 1.08, 0.96, 0.9],
  }
}

function calculateTransform(index, currentIndex, total) {
  const offset = getCarouselOffset(index, currentIndex, total)
  const profile = getCarouselProfile()
  const clampedOffset = Math.max(-2, Math.min(2, offset))
  const slot = clampedOffset + 2

  return `translateX(${profile.x[slot]}px) translateY(${profile.y[slot]}px) rotateZ(${profile.rotateZ[slot]}deg) rotateY(${profile.rotateY[slot]}deg) scale(${profile.scale[slot]})`
}

function calculateOpacity(index, currentIndex, total) {
  const offset = Math.abs(getCarouselOffset(index, currentIndex, total))

  if (offset === 0) return 1
  if (offset === 1) return 0.92
  return 0.78
}

function calculateZIndex(index, currentIndex, total) {
  return 20 - Math.abs(getCarouselOffset(index, currentIndex, total))
}

function ProductModal({ product, onClose }) {
  if (!product) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} profile`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="premium-modal relative grid max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/20 bg-surface text-ink shadow-2xl md:grid-cols-[0.86fr_1fr]"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="premium-modal-media flex min-h-[280px] items-center justify-center bg-ink p-8">
          {product.image ? (
            <img src={product.image} alt={product.name} className="h-64 w-auto object-contain drop-shadow-2xl" />
          ) : (
            <div className="flex h-64 w-44 items-center justify-center rounded-md border border-white/20 bg-white/10 font-serif text-3xl font-black uppercase text-surface">
              NTS
            </div>
          )}
        </div>

        <div className="overflow-y-auto p-7 sm:p-9">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-surface transition-colors hover:bg-accent hover:text-ink"
            aria-label="Close product profile"
          >
            <X className="h-5 w-5" />
          </button>

          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-terracotta">
            {product.category} / {product.style}
          </span>
          <h2 className="mt-4 pr-12 font-serif text-3xl font-black uppercase leading-tight tracking-tight text-ink sm:text-4xl">
            {product.name}
          </h2>
          <p className="mt-4 font-sans text-sm font-medium leading-relaxed opacity-80">
            {product.description || product.tagline}
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-ink/10 bg-black/5 p-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-60">ABV</span>
              <p className="mt-1 font-serif text-2xl font-black">{product.abv}</p>
            </div>
            <div className="rounded-xl border border-ink/10 bg-black/5 p-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-60">Style</span>
              <p className="mt-1 font-serif text-2xl font-black">{product.style}</p>
            </div>
          </div>
          <a
            href="mailto:Ntsdistillers@gmail.com?subject=NTS spirit inquiry"
            className="magnetic-cta mt-8 inline-flex rounded-full bg-ink px-8 py-3.5 font-serif text-xs font-bold uppercase tracking-widest text-surface transition-colors hover:bg-accent hover:text-ink"
          >
            Start Inquiry →
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkNav, setIsDarkNav] = useState(false)
  const [isNavCompact, setIsNavCompact] = useState(false)
  const [isPlayingFilm, setIsPlayingFilm] = useState(false)
  const [portfolioIndex, setPortfolioIndex] = useState(0)
  const [signupNote, setSignupNote] = useState('')

  const flavorTrackRef = useRef(null)
  const flavorSectionRef = useRef(null)
  const manifestoRef = useRef(null)

  // Menu toggle helper
  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const nextState = !prev
      document.body.classList.toggle('menu-open', nextState)
      return nextState
    })
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.classList.remove('menu-open')
  }

  // Dark section nav detector & scroll reveals
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('site-nav')
      if (!nav) return

      setIsNavCompact(window.scrollY > 48)
      
      const darkSections = document.querySelectorAll('.dark-zone')
      let inDarkZone = false

      darkSections.forEach((sec) => {
        const rect = sec.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          inDarkZone = true
        }
      })

      setIsDarkNav(inDarkZone)

      // Sticky horizontal carousel progress
      if (flavorSectionRef.current && flavorTrackRef.current && window.innerWidth > 820) {
        const section = flavorSectionRef.current
        const track = flavorTrackRef.current
        const rect = section.getBoundingClientRect()
        const distance = section.offsetHeight - window.innerHeight
        const progress = Math.max(0, Math.min(1, -rect.top / distance))
        const maxX = Math.max(0, track.scrollWidth - window.innerWidth + 40)
        track.style.transform = `translate3d(${-progress * maxX}px, 0, 0)`
      }

    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Reveal observer & Manifesto word reveal observer
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 }
    )
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))

    // Manifesto words observer
    const manifestoContainer = manifestoRef.current
    if (manifestoContainer) {
      const words = manifestoContainer.querySelectorAll('.reveal-word')
      const wordObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              words.forEach((word, i) => {
                setTimeout(() => {
                  word.classList.add('on')
                }, reduced ? 0 : i * 110)
              })
              wordObserver.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.3 }
      )
      wordObserver.observe(manifestoContainer)
    }
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const timer = window.setInterval(() => {
      setPortfolioIndex((current) => (current + 1) % PORTFOLIO_PROJECTS.length)
    }, 2600)

    return () => window.clearInterval(timer)
  }, [])

  const handleSignup = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const emailInput = form.elements.email
    if (!emailInput.checkValidity()) {
      setSignupNote('Enter a valid email to subscribe.')
      emailInput.focus()
      return
    }
    setSignupNote("You're on the NTS B2B inquiry list. Thank you!")
    form.reset()
  }

  return (
    <div className="bg-bg text-fg antialiased selection:bg-accent selection:text-ink">
      <AgeGate />
      
      <a className="skip-link" href="#main">Skip to content</a>

      {/* Top Announcement Marquee Ticker & Navbar Header */}
      <div className="sticky top-0 z-50 shadow-md">
        <AnnouncementMarquee />
        
        {/* Full-width Navbar Header */}
        <header className="site-nav px-4 py-3 sm:px-8 sm:py-3.5 lg:px-12" id="site-nav" data-od-id="site-navigation">
          <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between">
            {/* Logo Seal & Serif Title */}
            <a className="group flex items-center gap-3 text-decoration-none" href="#top" aria-label="NTS Distillers home" data-od-id="wordmark">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#3E1F18]/25 bg-[#3E1F18] p-0.5 shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
                <img src="/logo.png" alt="NTS Seal" className="h-full w-full rounded-full object-contain" />
              </div>
              <span className="font-serif text-lg font-black uppercase tracking-tight text-[#3E1F18] transition-colors group-hover:text-[#E9542E] sm:text-xl md:text-2xl">
                NTS DISTILLERS
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-5 md:flex lg:gap-8" aria-label="Main Navigation">
              <a href="#flavors" className="font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#3E1F18] transition-colors hover:text-[#E9542E]">
                BRANDS
              </a>
              <a href="#our-story" className="font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#3E1F18] transition-colors hover:text-[#E9542E]">
                OUR STORY
              </a>
              <a href="#timeline" className="font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#3E1F18] transition-colors hover:text-[#E9542E]">
                TIMELINE
              </a>
              <a href="#lifestyle" className="font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#3E1F18] transition-colors hover:text-[#E9542E]">
                DISTILLERY
              </a>
              <a href="#legacy" className="font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#3E1F18] transition-colors hover:text-[#E9542E]">
                TRACK RECORD
              </a>
              <a href="#footer" className="font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#3E1F18] transition-colors hover:text-[#E9542E]">
                B2B PROPOSALS
              </a>
            </nav>

            {/* Mobile Navigation Trigger Button */}
            <button
              className="menu-trigger md:hidden"
              id="menu-trigger"
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="menu-panel"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMenu}
              data-od-id="menu-control"
            >
              <span className="menu-lines" aria-hidden="true"></span>
            </button>
          </div>
        </header>
      </div>

      {/* Fullscreen Navigation Menu Overlay */}
      <div className={`menu-panel ${isMenuOpen ? 'open' : ''}`} id="menu-panel" aria-hidden={!isMenuOpen} data-od-id="menu-panel">
        <nav aria-label="Main menu">
          <a href="#flavors" onClick={closeMenu}>BRANDS</a>
          <a href="#our-story" onClick={closeMenu}>OUR STORY</a>
          <a href="#timeline" onClick={closeMenu}>TIMELINE</a>
          <a href="#lifestyle" onClick={closeMenu}>DISTILLERY</a>
          <a href="#legacy" onClick={closeMenu}>TRACK RECORD</a>
          <a href="#footer" onClick={closeMenu}>B2B PROPOSALS</a>
        </nav>
      </div>

      <main id="main">
        {/* Section 1: Hero */}
        <section className="hero group relative w-full overflow-hidden bg-[#150a09]" id="top" data-od-id="hero">
          <img
            className="hero-media absolute inset-0 h-full w-full object-cover object-center"
            src="/hero-bg.jpg"
            alt="NTS Distillers 5 spirits bottles lineup"
          />

          <div className="relative z-10 mx-auto flex min-h-[540px] w-full max-w-[1440px] items-end px-6 pb-12 sm:min-h-[calc(100vh-120px)] sm:px-12 sm:pb-16 lg:pb-20">
            <div className="hero-copy max-w-[540px]">
              <h1 className="font-serif text-[clamp(2.4rem,5.2vw,4.8rem)] font-black uppercase leading-[0.94] tracking-normal text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]">
                FOUR DECADES.<br />
                ONE LEGACY.<br />
                INFINITE SPIRIT.
              </h1>
              <p className="mt-5 max-w-[460px] font-sans text-sm font-medium leading-relaxed text-white/95 drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] sm:text-base">
                From a single distribution venture in Pondicherry to a full-scale manufacturing powerhouse, NTS has been shaping India's alcobev landscape since 1980.
              </p>
              <div className="mt-8 flex">
                <a
                  className="magnetic-cta rounded-full bg-[#E9542E] px-8 py-3.5 text-center font-sans text-xs font-black uppercase tracking-widest text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#150a09] active:scale-[0.98]"
                  href="#flavors"
                  data-od-id="shop-flavors-cta"
                >
                  EXPLORE OUR JOURNEY
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* B2B Trust Strip Indicator Band */}
        <TrustStrip />

        {/* Category Orange Marquee Ticker */}
        <CategoryMarquee />

        {/* Section 2: Banner Showcase (Dark Zone) */}
        <BannerSection />

        {/* Section 3: Spirits Lineup Showcase (Sticky Horizontal Scroll) */}
        <section className="flavors" id="flavors" ref={flavorSectionRef} data-od-id="flavor-showcase">
          <div className="flavor-sticky">
            <div className="section-head">
              <div>
                <p className="eyebrow">Five flagship offerings</p>
                <h2 className="display" data-od-id="flavors-heading">Pick your spirit</h2>
              </div>
              <p>Scroll to move through the lineup. Click any spirit to view profile details.</p>
            </div>

            <div className="flavor-track" ref={flavorTrackRef} tabIndex={0} aria-label="Spirits carousel" data-od-id="flavor-carousel">
              {NTS_PRODUCTS.map((prod) => (
                <article
                  key={prod.id}
                  className={`flavor-card premium-product-card ${prod.cardClass}`}
                  onClick={() => setSelectedProduct(prod)}
                  data-od-id={`flavor-card-${prod.id}`}
                >
                  <span className="flavor-note">{prod.note}</span>
                  <div className="bottle-wrapper" aria-hidden="true">
                    <img src={prod.image} alt={prod.name} className="bottle-img" />
                  </div>
                  <h3 className="flavor-name">
                    {prod.name.split(' ')[0]}<br />
                    {prod.name.split(' ').slice(1, 3).join(' ')}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Lifestyle & Production (Grid Layout) */}
        <section className="lifestyle" data-od-id="lifestyle-benefits">
          <div className="container lifestyle-grid">
            <div className="reveal">
              <p className="eyebrow">Distillery & Production</p>
              <h2 className="display" data-od-id="lifestyle-heading">
                Crafted with <span className="highlight">mastery & passion</span>
              </h2>
            </div>
            <figure className="still-life reveal" data-od-id="product-still-life">
              <img
                src="/images/WhatsApp_Image_2026-07-23_at_12.21.09_202607231334 (1).jpeg"
                alt="NTS Goa manufacturing facility and spirits collection"
              />
              <figcaption className="still-life-label">
                Goa manufacturing facility, high-speed bottling lines and blending unit.
              </figcaption>
            </figure>
          </div>

          <dl className="nutrition reveal" data-od-id="nutrition-capsule">
            <div className="stat">
              <dt>Established</dt>
              <dd>1980</dd>
            </div>
            <div className="stat">
              <dt>Facility</dt>
              <dd>Goa, India</dd>
            </div>
            <div className="stat">
              <dt>Portfolio</dt>
              <dd>15+ Brands</dd>
            </div>
            <div className="stat">
              <dt>Capacity</dt>
              <dd>Industrial Scale</dd>
            </div>
            <div className="stat">
              <dt>Standard</dt>
              <dd>Pure Grain</dd>
            </div>
          </dl>
        </section>

        {/* Section 4.4: Our Story */}
        <section
          id="our-story"
          className="relative overflow-hidden bg-cover bg-center py-16 sm:py-24"
          style={{ backgroundImage: "url('/images/Vodka_and_spirits_collection_lin._202607241659.jpeg')" }}
          data-od-id="our-story"
        >
          <div className="absolute inset-0 bg-[#F4ECDF]/90 backdrop-blur-[2px] pointer-events-none" />

          <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-10 px-4 sm:px-8 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: NTS Spirits Lineup Photo */}
            <div className="mx-auto flex w-full max-w-lg items-center justify-center lg:col-span-6">
              <img
                src="/images/tt.png"
                alt="NTS Blenders and Distillers premium products"
                className="premium-image h-auto w-full max-w-md rounded-[2.5rem] border border-ink/10 object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>

            {/* Right Column: Our Story Content */}
            <div className="reveal space-y-6 lg:col-span-6">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E9542E]">
                OUR STORY
              </span>
              <h2 className="font-serif text-3xl font-black uppercase leading-[0.98] tracking-tight text-ink sm:text-4xl lg:text-[42px]">
                FOUR DECADES OF BLENDING &amp; DISTILLING MASTERY
              </h2>
              <p className="font-sans text-sm font-medium leading-relaxed opacity-85 text-ink">
                Born in 1980 in Pondicherry under the name <strong>NTS WINES</strong>, founded by <strong>Mr. N.T. Sambath</strong>, what started as a bold distribution venture has grown into a powerhouse spanning IMFL, beer, imported FMFL, and our own manufactured brands. Today, under <strong>Prashanth Sambath's</strong> leadership as Managing Director, NTS Blenders and Distillers Pvt. Ltd. stands as a trusted name with a rich, decades-deep history and an eye firmly on the future.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <span className="font-serif text-4xl font-black text-[#E9542E]">5.0</span>
                <div className="space-y-0.5">
                  <div className="flex text-base font-bold text-[#E9542E]">★★★★★</div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/75">
                    INDUSTRY CERTIFIED STANDARDS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4.45: Interactive Brand Timeline */}
        <BrandTimeline />

        {/* Section 4.5: Distribution Legacy */}
        <section
          id="legacy"
          className="relative flex min-h-[660px] items-center overflow-hidden bg-cover bg-left bg-no-repeat py-16 sm:py-24 lg:min-h-[720px]"
          style={{ backgroundImage: "url('/images/Canacona_vodka_bottles_orange_ba…_202607231523.jpeg')" }}
          data-od-id="distribution-legacy"
        >
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />

          <div className="container relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Column Spacer to reveal Canacona Vodka Bottles in the background image */}
              <div className="hidden min-h-[480px] lg:block lg:col-span-6" />

              {/* Right Column: Distribution Legacy White Card */}
              <div className="reveal premium-panel space-y-6 rounded-[2.5rem] bg-white p-8 text-[#150a09] shadow-2xl sm:p-12 lg:col-span-6 lg:p-14">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E9542E]">
                  DISTRIBUTION LEGACY
                </span>
                <h2 className="font-serif text-3xl font-black uppercase leading-[0.98] tracking-tight text-[#150a09] sm:text-4xl lg:text-[42px]">
                  FOUR DECADES OF DISTRIBUTION &amp; MARKET LEADERSHIP
                </h2>
                <p className="font-sans text-xs font-medium leading-relaxed opacity-75 sm:text-sm">
                  Prior to manufacturing its own brands, NTS built its business distributing brands on behalf of major spirits groups in India. These include:
                </p>

                <div className="space-y-5 pt-2">
                  {DISTRIBUTED_BRANDS.map((item) => (
                    <div key={item.group} className="space-y-1 border-l-2 border-[#E9542E] pl-4">
                      <h4 className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#E9542E]">
                        {item.group}
                      </h4>
                      <p className="font-sans text-[11px] font-medium leading-relaxed opacity-85 sm:text-xs">
                        {item.brands}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Dark Run (Ribbons + Film Player - Dark Zone) */}
        <section className="dark-run dark-zone" id="film" data-od-id="advantages-and-film">
          <RibbonShowcase />

          <div className="film">
            <div className="film-copy reveal">
              <p className="eyebrow">The brand film</p>
              <h2 className="display" data-od-id="film-heading">Mastery in motion</h2>
              <p>
                A visual exploration of four decades of heritage, blending expertise, and modern distillation in Goa.
              </p>
            </div>
            <div
              className={`poster reveal ${isPlayingFilm ? 'playing' : ''}`}
              id="poster"
              data-od-id="brand-film-player"
            >
              <img
                src="/images/Vodka_and_spirits_collection_lin._202607241659.jpeg"
                alt="Poster frame of NTS Distillers collection"
              />
              <button
                className="play"
                id="play"
                type="button"
                aria-pressed={isPlayingFilm}
                aria-label={isPlayingFilm ? 'Pause concept film' : 'Play concept film'}
                onClick={() => setIsPlayingFilm(!isPlayingFilm)}
                data-od-id="film-play-control"
              >
                <span aria-hidden="true">{isPlayingFilm ? 'Ⅱ' : '▶'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 6: Editorial Portfolio Carousel */}
        <section className="social" id="voices" data-od-id="design-aesthetic">
          <div className="portfolio-carousel-header">
            <p className="eyebrow">
              Distributor & Trade Reactions
            </p>
            <h2 data-od-id="social-heading">
              We build brands that are
              <br />
              <span>clear, cohesive, and built to last.</span>
            </h2>
          </div>

          <div className="portfolio-carousel-stage" style={{ perspective: '1200px' }} data-od-id="portfolio-3d-carousel">
            <div className="portfolio-carousel">
              {PORTFOLIO_PROJECTS.map((project, index) => (
                <article
                  key={project.id}
                  className="portfolio-card"
                  style={{
                    transform: calculateTransform(index, portfolioIndex, PORTFOLIO_PROJECTS.length),
                    opacity: calculateOpacity(index, portfolioIndex, PORTFOLIO_PROJECTS.length),
                    zIndex: calculateZIndex(index, portfolioIndex, PORTFOLIO_PROJECTS.length),
                  }}
                  aria-hidden={Math.abs(getCarouselOffset(index, portfolioIndex, PORTFOLIO_PROJECTS.length)) > 2}
                  data-od-id={`portfolio-card-${String(index + 1).padStart(2, '0')}`}
                >
                  <img src={project.image} alt={project.title} />
                  <div className="portfolio-card-overlay">
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="portfolio-carousel-nav" aria-label="Portfolio carousel controls">
            <button
              type="button"
              aria-label="Previous portfolio project"
              onClick={() => setPortfolioIndex((current) => (current - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length)}
            >
              &larr;
            </button>
            <button
              type="button"
              aria-label="Next portfolio project"
              onClick={() => setPortfolioIndex((current) => (current + 1) % PORTFOLIO_PROJECTS.length)}
            >
              &rarr;
            </button>
          </div>
        </section>

        {/* Section 6.25: Trade & Distributor Testimonials */}
        <Testimonials />

        {/* Section 6.5: Animated Partner Notes Newsletter */}
        <Newsletter />
      </main>

      {/* Section 7: FooterRedesign Component */}
      <FooterRedesign />

      {/* Product Quick View Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  )
}
