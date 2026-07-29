import React, { useState, useEffect, useRef } from 'react'
import Marquee from './components/Marquee'
import AgeGate from './components/AgeGate'
import CartDrawer from './components/CartDrawer'
import ProductCard from './components/ProductCard'
import BottleGallery from './components/BottleGallery'

// Kinetic Row Component with pure React scroll tracking, horizontal parallax marquee, and popping bottles
function KineticRow({ text, direction, bottleImage }) {
  const rowRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [entryProgress, setEntryProgress] = useState(0);
  
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    let animationFrameId;

    const updateProgress = () => {
      // Smooth linear interpolation (lerp) for liquid-smooth momentum scrolling
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08;
      setScrollProgress(currentProgress.current);

      if (rowRef.current) {
        const rect = rowRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalDist = viewportHeight + rect.height;
        const currentDist = viewportHeight - rect.top;
        let eProgress = currentDist / totalDist;
        eProgress = Math.max(0, Math.min(1, eProgress));
        setEntryProgress(eProgress);
      }

      if (Math.abs(targetProgress.current - currentProgress.current) > 0.0001) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    const handleScroll = () => {
      if (!rowRef.current) return;
      const rect = rowRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      
      // Calculate target progress from -1.5 to 1.5 relative to viewport center
      let progress = (viewportCenter - elementCenter) / (viewportHeight / 2);
      progress = Math.max(-1.5, Math.min(1.5, progress));
      
      targetProgress.current = progress;
      
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Parallax horizontal offset
  const xOffset = direction === 'left' ? scrollProgress * -200 : scrollProgress * 200;
  
  // Center focus progress (1 when centered, 0 when far away)
  const centerFocus = 1 - Math.min(1, Math.abs(scrollProgress));
  
  // Brand name text scale and opacity popping
  const textScale = 0.9 + centerFocus * 0.15; // Grows from 0.9 to 1.05 when centered
  const textOpacity = 0.3 + centerFocus * 0.7; // Fades from 0.3 to 1.0
  const textColor = centerFocus > 0.55 ? 'text-[#E9542E]' : 'text-[#4a151c]';

  // Bottle image pop scale, rotation, and vertical float parallax
  const popScale = Math.pow(centerFocus, 2.2) * 1.8 + 0.2; // Scales up to 2x
  const popOpacity = Math.min(1, Math.pow(centerFocus, 2) * 1.5);
  const rotateDeg = scrollProgress * -15; // Smooth rotation based on scroll momentum
  const translateY = scrollProgress * -40; // Vertical parallax float in opposite direction

  return (
    <div 
      ref={rowRef} 
      className="py-16 sm:py-24 overflow-hidden w-full flex justify-center items-center select-none relative min-h-[320px] sm:min-h-[460px]"
    >
      <div 
        style={{
          transform: `translateX(${xOffset}px) scale(${textScale})`,
          opacity: textOpacity,
          fontFamily: '"Rye", cursive',
          lineHeight: '0.85',
          textShadow: centerFocus > 0.55 ? '0 15px 35px rgba(233, 84, 46, 0.15)' : 'none',
        }}
        className={`font-extrabold uppercase transition-colors duration-500 text-5xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-normal whitespace-nowrap text-center relative z-10 ${textColor}`}
      >
        {text}
      </div>

      {/* Popping Bottle Overlay */}
      {bottleImage && (
        <div
          style={{
            transform: `translate(-50%, -50%) scale(${popScale}) rotate(${rotateDeg}deg) translateY(${translateY}px)`,
            opacity: popOpacity,
            pointerEvents: 'none',
            // spring-like elastic curve for satisfying pop response
            transition: 'transform 0.1s ease-out, opacity 0.15s ease-out',
          }}
          className="absolute left-1/2 top-1/2 w-[200px] h-[380px] sm:w-[280px] sm:h-[500px] flex items-center justify-center z-20"
        >
          <img
            src={bottleImage}
            alt={`${text} popping bottle`}
            className="max-w-full max-h-full object-contain filter drop-shadow-[0_35px_50px_rgba(0,0,0,0.55)] transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
    </div>
  );
}


// Proprietary Brands Portfolio
const ntsProprietaryBrands = [
  {
    id: 'nts-oldtown-whisky',
    name: 'Old Town Indian Blended Malt Whisky',
    price: 32.00,
    type: 'Whisky',
    dosage: 'Flagship Premium',
    graphic: '🥃',
    image: '/bottle-2/bottle (2).png',
    removedBgImage: '/bottle-2/bottle (2).png',
    colorGradient: 'from-[#FDBA74] to-[#7A4A2E]',
    badgeText: 'FLAGSHIP PREMIUM',
    description: 'Dry fruit, woodiness and smoke aroma with a sweet corn and spice palate. The hallmark of NTS distilling heritage.',
  },
  {
    id: 'nts-eastcoast-brandy',
    name: 'East Coast Indian Blended Grape Brandy',
    price: 26.00,
    type: 'Brandy',
    dosage: 'Blended Grape',
    graphic: '🍷',
    image: '/bottle-2/bottle.png',
    removedBgImage: '/bottle-2/bottle.png',
    colorGradient: 'from-[#D9C4A8] to-[#7A4A2E]',
    badgeText: 'SMOOTH FINISH',
    description: 'Distinctive fig and honey aroma, completing with a remarkably smooth melon finish. 75° Proof, 750ml.',
  },
  {
    id: 'nts-wanted999-brandy',
    name: 'Wanted 999 VSOP Brandy',
    price: 35.00,
    type: 'Brandy',
    dosage: 'Rare & Rich',
    graphic: '🍇',
    image: '/bottle-2/bottle (3).png',
    removedBgImage: '/bottle-2/bottle (3).png',
    colorGradient: 'from-[#FBCFE8] to-[#E9542E]',
    badgeText: 'RARE & RICH',
    description: 'Rich grape and mixed fruit vanilla aroma. An elegant grape-pineapple palate with a VSOP depth. 750ml.',
  },
  {
    id: 'nts-eastcoast-xxx-rum',
    name: 'East Coast XXX Rum',
    price: 22.00,
    type: 'Rum',
    dosage: 'Dark Spiced',
    graphic: '🥥',
    image: '/bottle-2/bottle (1).png',
    removedBgImage: '/bottle-2/bottle (1).png',
    colorGradient: 'from-[#C9A87C] to-[#3A2010]',
    badgeText: 'DEEPLY SMOOTH',
    description: 'Oak-aged depth with traditional spices, tropical pineapple and a cocoa-tinged finish. 750ml.',
  },
  {
    id: 'nts-eastcoast-sugar-rum',
    name: 'East Coast Sugar New Rum',
    price: 20.00,
    type: 'Rum',
    dosage: 'Sugar Cane New',
    graphic: '🌴',
    image: '/bottle-2/Product_bottle_3D_render_202607251455-removebg-preview.png',
    removedBgImage: '/bottle-2/Product_bottle_3D_render_202607251455-removebg-preview.png',
    colorGradient: 'from-[#A8E6CF] to-[#1A6B5C]',
    badgeText: 'LIGHT & FRESH',
    description: 'A light, fresh sugar-cane new rum with a tropical sweetness and clean maritime character.',
  },
]


// Economy Brands Portfolio
const ntsEconomyBrands = [
  { id: 'nts-mychoice', name: 'My Choice Brandy', type: 'Brandy', desc: 'Economy-segment brand, local distillery tie-up.' },
  { id: 'nts-okdeluxe', name: 'OK Deluxe Brandy', type: 'Brandy', desc: 'Economy-segment brand, local distillery tie-up.' },
  { id: 'nts-kingromeo', name: 'King Romeo Brandy', type: 'Brandy', desc: 'Economy-segment brand, local distillery tie-up.' }
]

// Historically Distributed Groups
const distributedBrands = [
  {
    group: 'UB Group (CDL / Carew Phipson)',
    brands: ['Vin Grape', 'Top Rum', "Carew's Fine Brandy", 'Red Riband Vodka', "Booth's Gin", 'Kalyani Beer', 'UB Export Lager', 'Bullet Strong', 'Kingfisher']
  },
  {
    group: "McDowell's Portfolio (UB Group)",
    brands: ["McDowell's Traveller Brandy & Whisky", 'Old Cask Rum', 'Blue Riband Gin', 'Duet', 'Tango', 'Golden Amber Brandy', "Men's Choice Whisky"]
  },
  {
    group: 'Shaw Wallace',
    brands: ['Haywards Fine Whisky', 'Punch Brandy', 'Haywards 5000 Beer', 'Haywards Lager', 'Haywards 2000', 'Royal Challenge Beer']
  },
  {
    group: 'Other Major Portfolios',
    brands: ['Spencer & Co. brands', 'Zingaro Beer (Pondicherry)', 'Sand Piper Beer (Pondicherry)']
  }
]

// Capacity Metric Data
const capacityMetrics = [
  { label: 'Blending Capacity', current: '1,40,000 L', planned: '5,40,000 L' },
  { label: 'ENA Storage Capacity', current: '1,20,000 L', planned: '3,00,000 L' },
  { label: 'Production Capacity', current: '75,000 cases/month', planned: '2,50,000 cases/month' },
  { label: 'Bonded Warehouse Capacity', current: '25,000 cases', planned: '60,000 cases' }
]

const timelineMilestones = [
  {
    id: '1980',
    label: '1980',
    year: '1980',
    title: 'The Beginning',
    desc: 'NTS is founded in Pondicherry as NTS Wines by Mr. N.T. Sambath — the first step into India\'s IMFL and beer distribution space.'
  },
  {
    id: 'network',
    label: 'UB Network',
    year: '1980s-90s',
    title: 'Building the Network',
    desc: 'Starting with regional brands from Vinbros Pondicherry, NTS earns recognition from UB Group, unlocking brands across IMFL, beer, rum, brandy, gin, vodka, and export lager categories.'
  },
  {
    id: 'mcdowell',
    label: 'McDowell & Shaw',
    year: '1990s',
    title: 'McDowell & Shaw Wallace Era',
    desc: 'Portfolio expands with McDowell\'s and Shaw Wallace brands, establishing NTS as a serious distribution force across major national spirits and beer labels.'
  },
  {
    id: '100truck',
    label: '1997',
    year: '1997',
    title: 'The 100-Truck Month',
    desc: 'In a single month, NTS distributes 100 truckloads of Royal Challenge Beer to smash its year-end target — a defining show of scale and execution power.'
  },
  {
    id: 'leadership',
    label: 'Leadership',
    year: 'Milestones',
    title: 'Market Leadership Achievements',
    desc: 'McDowell\'s Traveller Brandy overtakes the No.1 McDowell\'s brand. Old Cask Rum surpasses Old Monk. Haywards 5000 leads the beer market for over a decade.'
  },
  {
    id: 'distilling',
    label: 'Manufacturing',
    year: 'Distillation',
    title: 'Manufacturing Segment Begins',
    desc: 'NTS launches its own brands: My Choice Brandy, OK Deluxe Brandy, and King Romeo Brandy, successfully targeting the economy IMFL segments.'
  },
  {
    id: 'goa',
    label: 'Goa',
    year: 'Goa',
    title: 'Goa Distillery Expansion',
    desc: 'NTS establishes its own distillery in Canacona Industrial Estate, Goa — a 3-acre, pollution-free unit on the state highway connecting to NH 66.'
  },
  {
    id: 'today',
    label: 'Today',
    year: 'Today',
    title: 'Semi-Premium Portfolio',
    desc: 'Launches semi-premium brands: Old Town Indian Blended Malt Whisky, East Coast Premium Malt Whisky, Grape Brandy & XXX Rum, Wanted 999 VSOP Brandy, and Zipper Vodkas.'
  }
]

// Machinery on Site List
const machineryList = [
  { desc: 'Rotary Washing Machine', count: 3 },
  { desc: '8-Head Vacuum Filling Machine (auto cut system)', count: 6 },
  { desc: 'Manual ROPP Sealing Machine', count: 2 },
  { desc: 'Automatic 6-Head ROPP Cap Sealing Machine', count: 2 },
  { desc: 'Automatic Guala Cap Pressing Machine', count: 3 },
  { desc: 'Inspection Unit (1½ ft x 4 ft)', count: 3 },
  { desc: 'Maharshi Label Machine', count: 2 },
  { desc: 'Interpack Technologies Label Machine', count: 1 },
  { desc: 'Control Print Limited – Label Printer', count: 3 },
  { desc: 'Conveyor Belts (24-Feet & 40-Feet twin track with dip tray)', count: 6 },
  { desc: '240-Litre Liquor Rejection Tank with Transfer Pump', count: 3 },
  { desc: 'Packing Machine', count: 1 }
]

// Canacona Premium Vodka range (from background-remover images)
const canaconaVodkas = [
  {
    id: 'canacona-kiwi',
    name: 'Canacona Vodka - Zimmy Pop Kiwi',
    image: '/images/product-1_202607241330.png',
    flavor: 'Zimmy Pop Kiwi',
    color: 'from-[#a3e635] to-[#4d7c0f]',
    bgTheme: '#8da946',
    abv: '37.5%',
    tagline: 'Crisp Electric Kiwi Blast',
    desc: 'An invigorating green vodka infusion that delivers a vibrant punch of tart kiwi, smooth grain spirit refinement, and a refreshing citrus finish.',
    notes: 'Sweet kiwi pulp, zesty lime peel, smooth body.'
  },
  {
    id: 'canacona-apple',
    name: 'Canacona Vodka - Apple Blast Room',
    image: '/images/prodcut-2_202607241330.png',
    flavor: 'Apple Blast Room',
    color: 'from-[#ef4444] to-[#7f1d1d]',
    bgTheme: '#b0342b',
    abv: '37.5%',
    tagline: 'Orchard-Fresh Tart Red Apple',
    desc: 'An explosive sweet-tart red apple taste experience. Crafted with premium grain alcohol and natural apple essence for an elegant mouthfeel and juicy finish.',
    notes: 'Freshly cut apples, subtle caramel, crisp tart finish.'
  },
  {
    id: 'canacona-orange',
    name: 'Canacona Vodka - Zimmy Twist Orange',
    image: '/images/prodcut-3_202607241330.png',
    flavor: 'Zimmy Twist Orange',
    color: 'from-[#f97316] to-[#7c2d12]',
    bgTheme: '#d97706',
    abv: '37.5%',
    tagline: 'Zesty Sweet Orange Peel Burst',
    desc: 'A sun-drenched orange sensation loaded with citrus oils and rich orange peel extracts. Exceptionally smooth body, perfect on the rocks or with tonic water.',
    notes: 'Sweet orange marmalade, zesty peel oil, clean citrus finish.'
  }
]

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Capacity Selector State
  const [inquiryType, setInquiryType] = useState('blending')

  // Timeline Scroll Animation States
  const timelineSectionRef = useRef(null)
  const [activeTimelineId, setActiveTimelineId] = useState('1980')
  const [timelineScrollProgress, setTimelineScrollProgress] = useState(0)
  const [timelineSectionVisible, setTimelineSectionVisible] = useState(false)
  const [reducedTimelineMotion, setReducedTimelineMotion] = useState(false)

  // Reveal Timeline Section on Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimelineSectionVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (timelineSectionRef.current) {
      observer.observe(timelineSectionRef.current)
    }
    return () => observer.disconnect()
  }, [])

  // Single scroll progress source for vertical timeline line, node activation, and quick nav.
  useEffect(() => {
    const section = timelineSectionRef.current
    if (!section) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedTimelineMotion(mediaQuery.matches)
    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const progressStart = viewportHeight * 0.62
      const totalDistance = Math.max(1, rect.height - viewportHeight * 0.28)
      const rawProgress = (progressStart - rect.top) / totalDistance
      const progress = Math.max(0, Math.min(1, rawProgress))
      const activeIndex = Math.min(
        timelineMilestones.length - 1,
        Math.max(0, Math.floor(progress * timelineMilestones.length))
      )

      setTimelineScrollProgress(progress)
      setActiveTimelineId(timelineMilestones[activeIndex].id)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()
    const timer1 = setTimeout(handleScroll, 100)
    const timer2 = setTimeout(handleScroll, 600)

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) return prev
      return [...prev, product]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div id="top" className="min-h-screen flex flex-col font-sans selection:bg-coral-orange selection:text-white bg-cream">
      {/* SVG Clip Paths definitions for Cloud Masks */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="cloud-mask-large" clipPathUnits="objectBoundingBox">
            <path d="M 0.5,0 C 0.68,0 0.82,0.06 0.9,0.18 C 0.98,0.3 1,0.48 0.96,0.65 C 0.92,0.82 0.8,0.92 0.66,0.97 C 0.52,1.02 0.38,1 0.24,0.94 C 0.1,0.88 0.02,0.74 0,0.58 C -0.02,0.42 0.06,0.26 0.16,0.14 C 0.26,0.02 0.38,0 0.5,0 Z" />
          </clipPath>
          <clipPath id="cloud-mask-accent" clipPathUnits="objectBoundingBox">
            <path d="M 0.5,0 C 0.7,0 0.85,0.1 0.93,0.25 C 1.01,0.4 1.03,0.6 0.95,0.76 C 0.87,0.92 0.72,0.98 0.5,0.98 C 0.28,0.98 0.12,0.92 0.04,0.76 C -0.04,0.6 0.01,0.4 0.09,0.25 C 0.17,0.1 0.3,0 0.5,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <AgeGate />
      
      {/* 1. Announcement Bar */}
      <Marquee 
        items={["NTS BLENDERS AND DISTILLERS PVT. LTD.", "ESTABLISHED 1980", "GOA MANUFACTURING FACILITY", "CONTRACT BOTTLING & BLENDING PARTNERS", "15+ PROPRIETARY IMFL BRANDS"]} 
        bgClass="bg-cream" 
        textClass="text-maroon border-b border-maroon/20"
        speed="20s"
      />

      {/* 2. Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-cream/95 backdrop-blur-md shadow-md py-3 sm:py-4' : 'bg-cream/90 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none py-3 sm:py-6'}`}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-8">
          
          <a href="#top" className="flex items-center gap-2 sm:gap-3 text-maroon hover:text-coral-orange transition-colors select-none leading-tight min-w-0">
            <img
              src="/logo.png"
              alt="NTS Blenders and Distillers Pvt. Ltd. logo"
              className="h-10 w-10 sm:h-11 sm:w-11 object-contain shrink-0 translate-y-[1px]"
            />
            <span className="font-serif text-sm sm:text-base lg:text-lg font-extrabold tracking-wide sm:tracking-widest uppercase whitespace-nowrap">
              <span className="sm:hidden">NTS</span>
              <span className="hidden sm:inline">NTS Distillers</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center justify-center gap-7 xl:gap-9 text-[11px] font-bold uppercase tracking-widest">
            <a href="#portfolio" className="hover:text-coral-orange transition-colors whitespace-nowrap">Brands</a>
            <a href="#track-record" className="hover:text-coral-orange transition-colors whitespace-nowrap">Track Record</a>
            <a href="#facility" className="hover:text-coral-orange transition-colors whitespace-nowrap">Distillery</a>
            <a href="#machinery" className="hover:text-coral-orange transition-colors whitespace-nowrap">Machinery</a>
            <a href="#contact" className="hover:text-coral-orange transition-colors whitespace-nowrap">B2B Proposals</a>
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative h-10 px-3 sm:px-4 bg-maroon text-cream rounded-full hover:bg-coral-orange hover:text-white transition-all flex items-center gap-1.5 shadow-sm active:scale-[0.98]"
            >
              <span className="hidden sm:inline">Inquiry</span>
              <span>({cartItems.length})</span>
            </button>
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden h-10 px-2 text-maroon hover:text-coral-orange text-xs font-bold uppercase tracking-wider"
            >
              Menu
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-cream border-b border-maroon/10 p-6 flex flex-col gap-2 text-xs font-bold uppercase tracking-widest shadow-lg z-50">
            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="py-3.5 px-4 rounded-xl hover:bg-maroon/5 hover:text-coral-orange transition-colors">Brands</a>
            <a href="#track-record" onClick={() => setMobileMenuOpen(false)} className="py-3.5 px-4 rounded-xl hover:bg-maroon/5 hover:text-coral-orange transition-colors">Track Record</a>
            <a href="#facility" onClick={() => setMobileMenuOpen(false)} className="py-3.5 px-4 rounded-xl hover:bg-maroon/5 hover:text-coral-orange transition-colors">Distillery</a>
            <a href="#machinery" onClick={() => setMobileMenuOpen(false)} className="py-3.5 px-4 rounded-xl hover:bg-maroon/5 hover:text-coral-orange transition-colors">Machinery</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-3.5 px-4 rounded-xl hover:bg-maroon/5 hover:text-coral-orange transition-colors">B2B Proposals</a>
          </div>
        )}
      </header>

      {/* 3. Hero Section */}
      <section className="hero-section group relative min-h-[680px] h-[calc(100svh-44px)] sm:h-[92vh] flex flex-col overflow-hidden bg-neutral-900">
        <div className="hero-bg absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-[60%_bottom] sm:bg-[center_bottom] opacity-100 transition-transform duration-[1400ms] ease-out group-hover:scale-105"></div>
        <div className="hero-scrim absolute left-0 bottom-0 h-[58%] w-full sm:w-[62%] lg:w-[48%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(21,10,9,0.88)_0%,rgba(21,10,9,0.64)_42%,rgba(21,10,9,0)_72%)] pointer-events-none"></div>

        <div className="hero-copy absolute left-0 bottom-0 z-10 w-full max-w-xl px-5 pb-10 sm:px-10 sm:pb-14 lg:px-14 lg:pb-16 text-left space-y-4 sm:space-y-5 animate-heroRise">

          <span className="inline-flex items-center justify-center rounded-full border border-cream/30 bg-[#150a09]/45 px-4 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-cream shadow-lg backdrop-blur-sm">
            Goa Distillery Since 1980
          </span>
          <h1 className="font-rye text-[1.9rem] min-[380px]:text-[2.15rem] sm:text-4xl lg:text-5xl font-black uppercase leading-[1.05] tracking-normal text-cream drop-shadow-[0_8px_24px_rgba(0,0,0,0.75)]">
            Four Decades.<br />One Legacy.<br />Infinite Spirit.
          </h1>
          <p className="text-sm sm:text-base text-cream max-w-md font-sans leading-relaxed font-semibold drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]">
            From a single distribution venture in Pondicherry to a full-scale manufacturing powerhouse, NTS has been shaping India's alcobev landscape since 1980.
          </p>
          <div className="flex pt-2">
            <a 
              href="#track-record" 
              className="w-full sm:w-auto px-8 py-4 bg-[#E9542E] text-white hover:bg-cream hover:text-maroon font-bold rounded-full transition-all duration-300 text-xs uppercase tracking-widest shadow-lg text-center hover:-translate-y-1 active:scale-[0.98]"
            >
              Explore Our Journey
            </a>
          </div>

        </div>
      </section>

      {/* Credibility Trust Strip (B2B Authority) */}
      <div className="bg-bg-maroon border-y border-maroon/20 py-6 w-full relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-12 grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-6 text-center text-cream/80">
          <div className="space-y-1 reveal-soft">
            <span className="text-[10px] uppercase font-bold tracking-widest text-coral-orange block">Heritage Legacy</span>
            <span className="font-serif text-lg font-bold text-cream">ESTD 1980</span>
          </div>
          <div className="space-y-1 border-l border-white/5 reveal-soft delay-100">
            <span className="text-[10px] uppercase font-bold tracking-widest text-coral-orange block">Distillery Location</span>
            <span className="font-serif text-lg font-bold text-cream">Goa, India</span>
          </div>
          <div className="space-y-1 md:border-l border-white/5 reveal-soft delay-200">
            <span className="text-[10px] uppercase font-bold tracking-widest text-coral-orange block">Quality Standard</span>
            <span className="font-serif text-lg font-bold text-cream">FDA Compliant</span>
          </div>
          <div className="space-y-1 border-l border-white/5 reveal-soft delay-300">
            <span className="text-[10px] uppercase font-bold tracking-widest text-coral-orange block">Industrial Scale</span>
            <span className="font-serif text-lg font-bold text-cream">Export Certified</span>
          </div>
        </div>
      </div>


      {/* Hero Secondary Marquee */}
      <Marquee 
        items={["WHISKY", "BRANDY", "RUM", "VODKA", "BOTTLING SERVICES", "BULK DE-MINERALIZED SPIRITS", "QUALITY CONTROL LAB"]} 
        bgClass="bg-coral-orange" 
        textClass="text-cream"
        speed="22s"
      />

      {/* 4. First Product Grid */}
      <section id="portfolio" className="pt-16 sm:pt-24 pb-10 sm:pb-12 bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-coral-orange">PROPRIETARY portfolio</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase text-maroon leading-tight mt-1">
              Spirits as Delicious as They Are Delightful
            </h2>
            <p className="text-sm text-maroon/70 font-sans leading-relaxed">
              We manufacture premium proprietary products across 4 categories. Browse our premium distillation range and add brands to your inquiry portfolio.
            </p>
          </div>

          <div className="w-full">
            <BottleGallery brands={ntsProprietaryBrands} onAddToCart={handleAddToCart} onQuickView={setSelectedProduct} />
          </div>



          {/* Economy Brands sub-row */}
          <div className="mt-0 pt-8 border-t border-maroon/10">
            <h3 className="font-rye text-xl font-bold uppercase text-maroon mb-6 text-center">Economy Brandy & Local Distillery Segments</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ntsEconomyBrands.map(brand => (
                <div key={brand.id} className="bg-white p-6 rounded-3xl border border-maroon/5 flex flex-col justify-between hover:shadow-lg transition-all">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-coral-orange px-2 py-0.5 bg-coral-orange/10 rounded-full inline-block mb-3">{brand.type}</span>
                    <h4 className="font-serif text-base font-bold uppercase text-maroon mb-2">{brand.name}</h4>
                  <p className="text-xs text-maroon/75 font-sans leading-relaxed">{brand.desc}</p>
                </div>
              </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. Brand Info (Clean, Functional, Feel Good Layout) */}
      <section 
        className="py-16 sm:py-24 border-t border-maroon/10 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/images/Vodka_and_spirits_collection_lin._202607241659.jpeg')" }}
      >
        {/* Soft cream overlay to maintain text readability */}
        <div className="absolute inset-0 bg-cream/90 backdrop-blur-[1px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Side: Dominant tt.png Image */}
          <div className="lg:col-span-6 w-full max-w-lg mx-auto flex items-center justify-center">
            <img 
              src="/images/tt.png" 
              alt="NTS Blenders and Distillers Pvt. Ltd. premium products" 
              className="w-full h-auto rounded-[2rem] shadow-2xl border border-maroon/10 object-cover"
            />
          </div>

            {/* Right Side: Copy & Rating */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-coral-orange">OUR STORY (Brand Intro)</span>
              <h2 className="font-rye text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-maroon leading-[1.05]">
                Four Decades of Blending & Distilling Mastery
              </h2>
              <p className="text-sm text-maroon/85 leading-relaxed font-sans font-medium">
                Born in 1980 in Pondicherry under the name <strong>NTS WINES</strong>, founded by <strong>Mr. N.T. Sambath</strong>, what started as a bold distribution venture has grown into a powerhouse spanning IMFL, beer, imported FMFL, and — proudly — our own manufactured brands. Today, under <strong>Prashanth Sambath's</strong> leadership as Managing Director, NTS Blenders and Distillers Pvt. Ltd. stands as a trusted name with a rich, decades-deep history and an eye firmly on the future.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <span className="text-3xl font-extrabold text-coral-orange">5.0</span>
                <div className="space-y-0.5">
                  <div className="flex text-coral-orange text-sm font-bold">★★★★★</div>
                  <div className="text-[10px] text-maroon/80 uppercase tracking-widest font-mono font-bold">Industry Certified Standards</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* 7. Historical Legacy & Vodka Range */}
      <section 
        id="track-record" 
        className="bg-cover bg-center border-y border-maroon/10 relative py-14 sm:py-20 flex items-center min-h-[620px] lg:min-h-[650px] overflow-hidden"
        style={{ 
          backgroundImage: "url('/images/Canacona_vodka_bottles_orange_ba…_202607231523.jpeg')",
          backgroundPosition: '0% center'
        }}
      >
        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        
        <div className="max-w-[1280px] mx-auto px-4 sm:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left side: Transparent click zones positioned exactly on top of the bottles in the background image */}
            <div className="hidden lg:block lg:col-span-4 relative h-[450px] sm:h-[550px] select-none lg:-translate-x-6 xl:-translate-x-20">
              {/* Green Kiwi Bottle Click Zone */}
              <div 
                onClick={() => setSelectedProduct(canaconaVodkas[0])}
                className="absolute left-[8%] bottom-[5%] w-[25%] h-[80%] cursor-pointer group rounded-3xl"
                title="View Zimmy Pop Kiwi"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-3xl transition-all duration-300 flex items-center justify-center border border-white/0 group-hover:border-white/10">
                  <span className="bg-[#E9542E] text-white text-[10px] font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    Kiwi Details
                  </span>
                </div>
              </div>

              {/* Red Apple Bottle Click Zone */}
              <div 
                onClick={() => setSelectedProduct(canaconaVodkas[1])}
                className="absolute left-[36%] bottom-[10%] w-[26%] h-[80%] cursor-pointer group rounded-3xl"
                title="View Apple Blast Room"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-3xl transition-all duration-300 flex items-center justify-center border border-white/0 group-hover:border-white/10">
                  <span className="bg-[#E9542E] text-white text-[10px] font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    Apple Details
                  </span>
                </div>
              </div>

              {/* Orange Bottle Click Zone */}
              <div 
                onClick={() => setSelectedProduct(canaconaVodkas[2])}
                className="absolute right-[8%] bottom-[5%] w-[25%] h-[80%] cursor-pointer group rounded-3xl"
                title="View Zimmy Twist Orange"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-3xl transition-all duration-300 flex items-center justify-center border border-white/0 group-hover:border-white/10">
                  <span className="bg-[#E9542E] text-white text-[10px] font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    Orange Details
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right side: White card containing details (pushed to the right) */}
            <div className="lg:col-span-6 lg:col-start-7 bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 shadow-2xl space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E9542E]">
                DISTRIBUTION LEGACY
              </span>
              <h2 className="font-rye text-3xl sm:text-4xl lg:text-[40px] font-extrabold uppercase text-maroon leading-tight">
                Four Decades of Distribution & Market Leadership
              </h2>
              
              <p className="text-xs sm:text-sm text-maroon/70 font-sans leading-relaxed">
                Prior to manufacturing its own brands, NTS built its business distributing brands on behalf of major spirits groups in India. These include:
              </p>
              
              <div className="space-y-4 pt-2">
                {distributedBrands.map((group, idx) => (
                  <div key={idx} className="border-l-2 border-[#E9542E] pl-4 py-1 space-y-1">
                    <h4 className="font-serif text-xs font-bold uppercase text-[#E9542E] tracking-wider">
                      {group.group}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-maroon/80 font-sans leading-relaxed">
                      {group.brands.join(', ')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="lg:hidden pt-2">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-maroon/55">
                    Tap a Canacona flavor
                  </h3>
                  <span className="h-px flex-1 bg-maroon/10"></span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {canaconaVodkas.map((vodka) => (
                    <button
                      key={vodka.id}
                      type="button"
                      onClick={() => setSelectedProduct(vodka)}
                      className="min-h-[132px] rounded-2xl border border-maroon/10 bg-cream/70 px-2 py-3 text-center shadow-sm transition-all active:scale-[0.98]"
                    >
                      <img
                        src={vodka.image}
                        alt={vodka.name}
                        className="mx-auto h-20 w-full object-contain drop-shadow-[0_16px_18px_rgba(74,21,28,0.18)]"
                      />
                      <span className="mt-2 block font-sans text-[9px] font-extrabold uppercase leading-tight tracking-wide text-maroon">
                        {vodka.flavor}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. The Timeline — 45 Years of Momentum */}
      <section 
        id="track-record" 
        ref={timelineSectionRef}
        className="relative py-16 sm:py-24 bg-deep-navy text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(233,84,46,0.08),transparent_50%)] pointer-events-none" />
        
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-12 z-10 space-y-10 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className={`text-[10px] font-bold uppercase tracking-widest text-[#E9542E] bg-white/10 px-3.5 py-1.5 rounded-full inline-block transition-all duration-1000 transform ${
              timelineSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}>
              THE TIMELINE — 45 YEARS OF MOMENTUM
            </span>
            <h2 className={`font-rye text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-cream transition-all duration-1000 delay-100 transform ${
              timelineSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              Decades of Brand Building
            </h2>
            <p className={`text-xs sm:text-sm text-cream/70 font-sans max-w-md mx-auto transition-all duration-1000 delay-200 transform ${
              timelineSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              Scroll or click the milestones to explore our legacy of scale, distribution power, and manufacturing growth.
            </p>
          </div>

          {/* Vertical Scroll Timeline */}
          <div className={`relative transition-all duration-1000 delay-300 transform ${
            timelineSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="sticky top-20 z-20 mb-8 flex justify-center md:hidden">
              <div className="flex gap-2 rounded-full border border-white/10 bg-[#1B2E33]/90 px-3 py-2 backdrop-blur-md">
                {timelineMilestones.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      const el = document.getElementById(`timeline-${item.id}`)
                      if (el) el.scrollIntoView({ behavior: reducedTimelineMotion ? 'auto' : 'smooth', block: 'center' })
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      activeTimelineId === item.id ? 'w-7 bg-[#E9542E]' : 'w-2.5 bg-white/20'
                    }`}
                    aria-label={`Jump to ${item.label}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[170px_minmax(0,1fr)] gap-8 lg:gap-12">
              <nav className="hidden md:block sticky top-28 self-start">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md space-y-2">
                  {timelineMilestones.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        const el = document.getElementById(`timeline-${item.id}`)
                        if (el) el.scrollIntoView({ behavior: reducedTimelineMotion ? 'auto' : 'smooth', block: 'center' })
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all ${
                        activeTimelineId === item.id
                          ? 'bg-[#E9542E] text-white shadow-lg shadow-[#E9542E]/25'
                          : 'text-cream/55 hover:bg-white/10 hover:text-cream'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </nav>

              <div className="relative pl-8 md:pl-0">
                <div className="absolute left-3 md:left-1/2 top-8 bottom-8 w-px -translate-x-1/2 bg-white/12"></div>
                <div
                  style={{
                    transform: `scaleY(${reducedTimelineMotion ? 1 : timelineScrollProgress})`,
                    transformOrigin: 'top'
                  }}
                  className="absolute left-3 md:left-1/2 top-8 bottom-8 w-[3px] -translate-x-1/2 rounded-full bg-[#E9542E] shadow-[0_0_16px_rgba(233,84,46,0.65)] transition-transform duration-150 ease-out"
                ></div>

                <div className="space-y-10 md:space-y-16">
                  {timelineMilestones.map((item, idx) => {
                    const nodeProgress = timelineMilestones.length === 1 ? 1 : idx / (timelineMilestones.length - 1)
                    const isReached = reducedTimelineMotion || timelineScrollProgress + 0.02 >= nodeProgress
                    const isActive = activeTimelineId === item.id
                    const alignRight = idx % 2 === 0

                    return (
                      <div
                        key={item.id}
                        id={`timeline-${item.id}`}
                        className={`relative grid md:grid-cols-2 gap-6 md:gap-16 items-center scroll-mt-32 ${
                          alignRight ? '' : 'md:[&>*:last-child]:col-start-1 md:[&>*:last-child]:row-start-1'
                        }`}
                      >
                        <div className={`hidden md:block ${alignRight ? '' : 'md:col-start-2'}`}></div>

                        <div
                          className={`absolute left-3 md:left-1/2 top-7 h-5 w-5 -translate-x-1/2 rounded-full border-2 transition-all duration-300 ${
                            isReached
                              ? 'border-[#E9542E] bg-[#E9542E] shadow-[0_0_0_8px_rgba(233,84,46,0.12),0_0_24px_rgba(233,84,46,0.45)]'
                              : 'border-white/20 bg-[#1B2E33]'
                          }`}
                        ></div>

                        <article
                          className={`rounded-[1.25rem] sm:rounded-[1.5rem] border p-5 sm:p-8 backdrop-blur-md transition-all duration-500 ${
                            isReached
                              ? 'bg-white/8 border-[#E9542E]/45 text-cream shadow-[0_20px_45px_-18px_rgba(233,84,46,0.34)] opacity-100 translate-y-0'
                              : 'bg-white/4 border-white/10 text-cream/65 opacity-55 translate-y-4'
                          } ${isActive ? 'scale-[1.015]' : 'scale-100'}`}
                        >
                          <span className="text-xl sm:text-2xl font-serif font-black text-coral-orange block mb-3">
                            {item.year}
                          </span>
                          <h3 className="font-serif text-lg sm:text-xl font-bold uppercase tracking-wide text-cream leading-snug mb-3">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-cream/78 font-sans leading-relaxed font-medium">
                            {item.desc}
                          </p>
                        </article>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* 9. Distillery Facility & Capacity Metric (Bundle & Save Layout) */}
      <section id="facility" className="py-16 sm:py-24 bg-cream relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-12">
          <div className="bg-maroon text-cream rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 border border-maroon/20 relative overflow-hidden shadow-2xl space-y-10 sm:space-y-12">
            
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-coral-orange/10 rounded-full blur-3xl"></div>
            
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-coral-orange bg-white/15 px-3.5 py-1.5 rounded-full inline-block">
                GOA DISTILLERY SERVICES
              </span>
              <h2 className="font-rye text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">
                Capacity Metric & Storage Specs
              </h2>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed font-sans max-w-xl mx-auto">
                Select your contract bottling schedules or request technical data for bulk spirits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {capacityMetrics.map((metric, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-dashed border-white/15 space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-coral-orange">{metric.label}</h4>
                  <div className="text-xl sm:text-2xl font-mono font-extrabold text-cream tracking-tight">{metric.current}</div>
                  <div className="text-[9px] font-mono opacity-60">Target Expansion: {metric.planned}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <a 
                href="#contact"
                className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-coral-orange text-white hover:bg-cream hover:text-maroon font-bold rounded-full transition-all duration-300 text-xs uppercase tracking-widest shadow-lg text-center"
              >
                Inquire Bottling & Blending Capacity
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Machinery on Site */}
      <section id="machinery" className="py-16 sm:py-20 bg-white border-y border-maroon/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-coral-orange">ENGINEERING CAPABILITY</span>
            <h2 className="font-rye text-3xl sm:text-4xl font-extrabold uppercase text-maroon leading-tight mt-1">
              Machinery & Equipment on Site
            </h2>
            <p className="text-sm text-maroon/70 font-sans leading-relaxed">
              Equipped with high-performance automated filling, sealing, conveyor systems, and quality control systems to ensure premium packaging and quality control.
            </p>
          </div>

          {/* Machinery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machineryList.map((m, idx) => (
              <div key={idx} className="bg-cream/30 p-6 rounded-2xl border border-maroon/5 flex justify-between items-center hover:bg-cream/60 transition-all">
                <div className="space-y-1">
                  <h4 className="font-serif text-sm font-bold uppercase text-maroon leading-snug">{m.desc}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-coral-orange">Fully Commissioned</span>
                </div>
                <div className="bg-maroon text-cream text-base font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                  {m.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. B2B Proposal & Contact Section */}
      <section id="contact" className="py-16 sm:py-24 bg-maroon text-cream relative overflow-hidden">
        
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 w-full">
          
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest bg-cream text-maroon px-4 py-1.5 rounded-full inline-block mb-6 shadow-sm">
              MANUFACTURING TIE-UP PROPOSALS
            </span>
            <h2 className="font-rye text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-[0.95] tracking-tighter max-w-4xl mx-auto mb-4 text-cream">
              Contract Bottling &amp; Blending Partnership
            </h2>
            <p className="text-sm font-sans max-w-xl mx-auto text-gold-soft/85 leading-relaxed">
              Direct queries are reviewed by our Managing Director, Prashanth Sambath. Fill in your details and we'll get back to you.
            </p>
          </div>

          {/* Centered B2B Form Card */}
          <div className="max-w-xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const name = fd.get('name');
                const email = fd.get('email');
                const message = fd.get('message');
                const subject = encodeURIComponent(`Partnership Inquiry from ${name}`);
                const body = encodeURIComponent(
                  `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                );
                window.location.href = `mailto:md@ntsdistillers.com?subject=${subject}&body=${body}`;
              }}
              className="bg-bg-maroon/80 backdrop-blur-md border border-cream/15 rounded-3xl p-5 sm:p-8 space-y-5 shadow-2xl"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold-soft block">Your Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Prashanth Sambath"
                    className="w-full bg-cream text-maroon placeholder-maroon/45 border border-cream/20 rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-coral-orange focus:ring-2 focus:ring-coral-orange/25 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold-soft block">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full bg-cream text-maroon placeholder-maroon/45 border border-cream/20 rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-coral-orange focus:ring-2 focus:ring-coral-orange/25 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold-soft block">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us about your manufacturing requirements, volumes, or partnership interest..."
                    className="w-full bg-cream text-maroon placeholder-maroon/45 border border-cream/20 rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-coral-orange focus:ring-2 focus:ring-coral-orange/25 transition-all resize-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-coral-orange text-cream font-bold text-xs uppercase tracking-widest rounded-full hover:bg-cream hover:text-maroon transition-all duration-300 shadow-lg shadow-coral-orange/25 active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 10. Footer Section (Styled exactly like the Botzudio blue reference layout) */}
      <footer className="bg-[#18202d] text-slate-300 pt-12 sm:pt-16 pb-8 px-4 sm:px-12 relative overflow-hidden border-t border-white/10">
        
        {/* Core Links & Info Grid */}
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 items-start mb-12">
          
          {/* Left brand logo/desc column */}
          <div className="space-y-4 min-[420px]:col-span-2 sm:col-span-3 md:col-span-1">
            <div className="flex items-center gap-3">
              {/* Rounded Brand Badge (BZ-style logo look) */}
              <div className="bg-gradient-to-tr from-maroon to-[#E9542E] w-9 h-9 rounded-xl flex items-center justify-center text-white font-sans font-black text-xs shadow-md">
                NTS
              </div>
              <span className="font-sans font-black text-white text-base tracking-tight">NTS Blenders and Distillers Pvt. Ltd.</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-sans max-w-[240px]">
              Heritage alcobev manufacturing and contract bottling services since 1980. Professional quality, zero compliance friction.
            </p>
            {/* Outline social badges */}
            <div className="flex gap-2.5 pt-2">
              <a href="#contact" className="w-8 h-8 rounded-lg border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                <span className="text-[10px] font-bold">WEB</span>
              </a>
              <a href="#contact" className="w-8 h-8 rounded-lg border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                <span className="text-[10px] font-bold">IG</span>
              </a>
              <a href="#contact" className="w-8 h-8 rounded-lg border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                <span className="text-[10px] font-bold">IN</span>
              </a>
            </div>
          </div>

          {/* Product Link Column */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">PRODUCT</h4>
            <ul className="text-xs space-y-2.5 font-sans font-medium text-slate-400">
              <li><a href="#portfolio" className="hover:text-white transition-colors">Proprietary Brands</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Economy Range</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Bulk Spirits</a></li>
            </ul>
          </div>

          {/* Resources Link Column */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">RESOURCES</h4>
            <ul className="text-xs space-y-2.5 font-sans font-medium text-slate-400">
              <li><a href="#facility" className="hover:text-white transition-colors">Capacity Specs</a></li>
              <li><a href="#facility" className="hover:text-white transition-colors">Facility Audits</a></li>
              <li><a href="#machinery" className="hover:text-white transition-colors">Equipment List</a></li>
            </ul>
          </div>

          {/* Company Link Column */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">COMPANY</h4>
            <ul className="text-xs space-y-2.5 font-sans font-medium text-slate-400">
              <li><a href="#contact" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Distillery Location</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Specs</a></li>
            </ul>
          </div>

          {/* Our Product Column */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">OUR PRODUCT</h4>
            <ul className="text-xs space-y-2.5 font-sans font-medium text-slate-400">
              <li><a href="#contact" className="hover:text-white transition-colors">Regulatory Filings</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Compliance Certs</a></li>
            </ul>
          </div>

        </div>

        {/* Massive Geometric Sans-Serif Wordmark (matching Botzudio font/style) */}
        <div className="relative select-none pointer-events-none w-full text-center mt-12 mb-4 max-w-[1280px] mx-auto">
          <h2 className="font-jakarta font-black text-[9vw] sm:text-[11vw] lg:text-[12vw] tracking-tighter leading-none text-white/10 uppercase select-none">
            NTS BLENDERS
          </h2>
        </div>

        {/* Regulatory Disclaimer & Bottom bar */}
        <div className="max-w-[1280px] mx-auto pt-6 text-center space-y-4 border-t border-white/10">
          <p className="text-[8px] text-slate-500 uppercase tracking-widest font-mono leading-relaxed max-w-4xl mx-auto md:mx-0">
            * IMFL ADVISORY: SPECIFICATION AND CAPACITY METRICS PRESENTED IN THIS PORTFOLIO ARE ACCORDING TO ACTUAL PLANT AUDITS AND GOA INDUSTRIAL ESTATE REGULATORY DOCUMENTATION. GOVERNMENT LICENSE AND COMPLIANCE CERTIFICATION ARE MAINTAINED AT SITE.
          </p>

          <div className="flex flex-col gap-3 items-center pt-2">
            <div className="flex gap-4 text-[10px] text-slate-500 uppercase tracking-widest">
              <span>(c) 2026 NTS Blenders and Distillers Pvt. Ltd. All rights reserved.</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
              <a href="#contact" className="hover:text-slate-300 transition-colors">Terms &amp; Conditions</a>
              <span>|</span>
              <span>Goa, India</span>
              <span>|</span>
              <span>FDA CERTIFIED</span>
            </div>
          </div>
        </div>
      </footer>
 
      {/* Cart/Inquiry Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />

      {/* Product Detail Pop-up Modal */}
      {selectedProduct && (
        <div 
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-cream rounded-[1.5rem] sm:rounded-[2rem] max-w-2xl w-full border border-maroon/10 overflow-hidden relative shadow-2xl flex flex-col md:flex-row animate-scaleIn max-h-[90vh] overflow-y-auto"
          >
            
            {/* Left side: Flavor Theme color panel + image */}
            <div className={`w-full md:w-[45%] bg-gradient-to-b ${selectedProduct.color || selectedProduct.colorGradient || 'from-maroon/80 to-maroon'} p-6 sm:p-8 flex flex-col items-center justify-center relative min-h-[220px] sm:min-h-[300px] md:min-h-full`}>
              <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
              
              <img 
                src={selectedProduct.removedBgImage || selectedProduct.image} 
                alt={selectedProduct.name}
                className="max-h-[260px] md:max-h-[320px] object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)] transform hover:scale-105 transition-transform duration-300 relative z-10"
              />
            </div>
            
            {/* Right side: Product Details */}
            <div className="w-full md:w-[55%] p-6 sm:p-10 flex flex-col justify-between space-y-4 sm:space-y-6 bg-white relative">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-maroon/5 text-maroon hover:bg-maroon hover:text-cream flex items-center justify-center transition-all text-base font-bold z-20 active:scale-95"
                aria-label="Close details"
              >
                X
              </button>
 
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-coral-orange">
                    {selectedProduct.type || 'IMFL Portfolio'}
                  </span>
                  <h3 className="font-serif text-2xl font-extrabold uppercase text-maroon leading-tight">
                    {selectedProduct.flavor || selectedProduct.name}
                  </h3>
                  <div className="inline-block bg-cream text-maroon text-[9px] font-bold px-2.5 py-0.5 rounded-full mt-1.5">
                    ABV: {selectedProduct.abv || '42.8%'}
                  </div>
                </div>
 
                <div className="h-px bg-maroon/10"></div>
 
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-maroon/60">Tagline</p>
                  <p className="text-xs font-semibold text-maroon italic">
                    "{selectedProduct.tagline || selectedProduct.dosage || 'Premium spirits crafted to perfection'}"
                  </p>
                </div>
 
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-maroon/60">Profile</p>
                  <p className="text-xs text-maroon/80 font-sans leading-relaxed">
                    {selectedProduct.desc || selectedProduct.description}
                  </p>
                </div>
 
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-maroon/60">Tasting Notes</p>
                  <p className="text-xs text-maroon/70 font-sans leading-relaxed">
                    {selectedProduct.notes || 'Rich, complex bouquet with balanced finish.'}
                  </p>
                </div>
              </div>
 
              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => {
                    handleAddToCart({
                      id: selectedProduct.id,
                      name: selectedProduct.name,
                      type: selectedProduct.type || 'IMFL',
                      dosage: selectedProduct.dosage || selectedProduct.tagline,
                      graphic: selectedProduct.graphic || 'NTS',
                      image: selectedProduct.image
                    });
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-3 bg-[#E9542E] text-white hover:bg-maroon font-bold rounded-full text-xs uppercase tracking-widest transition-all shadow-md"
                >
                  Add to Inquiry
                </button>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="px-5 py-3 border border-maroon/20 text-maroon hover:bg-maroon/5 font-bold rounded-full text-xs uppercase tracking-widest transition-all"
                >
                  Back
                </button>
              </div>
 
            </div>
 
          </div>
        </div>
      )}
    </div>
  )
}
