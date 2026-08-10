import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const newsletterBottleA = '/bottle-2/bottle (2).png'
const newsletterBottleB = '/bottle-2/bottle (1).png'
const newsletterBottleC = '/bottle-2/bottle (3).png'
const newsletterBottleD = '/bottle-2/bottle.png'
const newsletterBottleE = '/bottle-2/Product_bottle_3D_render_202607251455-removebg-preview.png'
const newsletterBottleF = '/1/Liquor_bottle_on_white_background_202607250547 (1).png'

const portfolioModels = [
  {
    tag: 'WHISKY',
    name: 'Old Town',
    desc: 'Indian blended malt with smoke, dry fruit, and a long warm finish.',
    image: '/bottle-2/bottle (2).png',
  },
  {
    tag: 'BRANDY',
    name: 'Wanted 999',
    desc: 'VSOP brandy with grape, vanilla, and fruit-forward depth.',
    image: '/bottle-2/bottle (3).png',
  },
  {
    tag: 'RUM',
    name: 'East Coast XXX',
    desc: 'Coastal rum shaped by spice, cocoa, and a rounded finish.',
    image: '/bottle-2/bottle (1).png',
  },
  {
    tag: 'MALT',
    name: 'East Coast Malt',
    desc: 'Honey, apple, and vanilla notes shaped for elegant everyday pours.',
    image: '/bottle-2/bottle.png',
  },
  {
    tag: 'BRANDY',
    name: 'Reserve Grape',
    desc: 'A smooth grape brandy profile with honeyed depth and quiet warmth.',
    image: '/1/Liquor_bottle_on_white_background_202607250547 (4).png',
  },
  {
    tag: 'WHISKY',
    name: 'Heritage Blend',
    desc: 'Mature wood notes, sweet spice, and a composed premium finish.',
    image: '/1/Liquor_bottle_on_white_background_202607250547 (5).png',
  },
  {
    tag: 'GIN',
    name: 'Coastal Dry',
    desc: 'Botanical clarity and mineral freshness built for modern bar menus.',
    image: '/1/Liquor_bottle_on_white_background_202607250547 (6).png',
  },
  {
    tag: 'RUM',
    name: 'Night Coast',
    desc: 'Dark cocktails, cocoa warmth, and spice-led character for late hours.',
    image: '/1/Liquor_bottle_on_white_background_202607250547 (7).png',
  },
  {
    tag: 'BRANDY',
    name: 'VSOP Gold',
    desc: 'Creamy vanilla and ripe fruit notes arranged with lasting elegance.',
    image: '/1/Liquor_bottle_on_white_background_202607250548 (1).png',
  },
  {
    tag: 'WHISKY',
    name: 'Quiet Barrel',
    desc: 'Balanced malt, gentle smoke, and a refined signature aftertaste.',
    image: '/1/Liquor_bottle_on_white_background_202607250548 (2).png',
  },
  {
    tag: 'VODKA',
    name: 'Clear House',
    desc: 'Neutral precision, polished mouthfeel, and dependable mixability.',
    image: '/1/Liquor_bottle_on_white_background_202607250548 (3).png',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function Badge({ children }) {
  return (
    <span className="inline-flex self-start rounded-full bg-[#B7FF3C] px-3 py-1 text-sm font-bold uppercase tracking-[0.12em] text-[#111] transition-transform duration-300 hover:-translate-y-0.5">
      {children}
    </span>
  )
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isMobile
}

function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const pauseTimer = useRef(null)
  const wheelLock = useRef(false)
  const shouldReduceMotion = useReducedMotion()
  const total = portfolioModels.length
  const spring = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 220, damping: 24 }

  const normalizeIndex = useCallback((index) => ((index % total) + total) % total, [total])

  const pauseAutoplay = useCallback(() => {
    setIsPaused(true)
    if (pauseTimer.current) {
      window.clearTimeout(pauseTimer.current)
    }
    pauseTimer.current = window.setTimeout(() => setIsPaused(false), 3000)
  }, [])

  const moveCarousel = useCallback((direction, userInitiated = true) => {
    if (userInitiated) pauseAutoplay()
    setActiveIndex((current) => normalizeIndex(current + direction))
  }, [normalizeIndex, pauseAutoplay])

  useEffect(() => {
    if (isPaused || activeIndex === 0) return undefined
    const timer = window.setInterval(() => moveCarousel(1, false), 4000)
    return () => window.clearInterval(timer)
  }, [activeIndex, isPaused, moveCarousel])

  useEffect(() => () => {
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current)
  }, [])

  const visibleCards = useMemo(() => {
    return [-2, -1, 0, 1, 2].map((offset) => {
      const modelIndex = normalizeIndex(activeIndex + offset)
      return { model: portfolioModels[modelIndex], modelIndex, offset }
    })
  }, [activeIndex, normalizeIndex])

  const handleWheel = (event) => {
    if (wheelLock.current) return
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    if (Math.abs(delta) < 18) return
    wheelLock.current = true
    moveCarousel(delta > 0 ? 1 : -1)
    window.setTimeout(() => {
      wheelLock.current = false
    }, 650)
  }

  const handleDragEnd = (_, info) => {
    const intent = info.offset.x + info.velocity.x * 0.18
    if (intent < -70) moveCarousel(1)
    if (intent > 70) moveCarousel(-1)
  }

  return (
    <section
      id="portfolio"
      className="overflow-hidden bg-black px-4 py-[88px] text-white md:px-8 md:py-[120px]"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="NTS spirits portfolio carousel"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') moveCarousel(1)
        if (event.key === 'ArrowLeft') moveCarousel(-1)
      }}
    >
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="mx-auto max-w-[1280px] text-center">
        <Badge>Portfolio</Badge>
        <h2 className="mx-auto mt-4 max-w-md text-[48px] font-bold leading-none tracking-[-0.03em] text-white">
          Four signatures. One quiet standard.
        </h2>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="relative mx-auto mt-16 h-[620px] max-w-[1280px] outline-none md:h-[660px]"
        onWheel={handleWheel}
        onMouseEnter={pauseAutoplay}
        onTouchStart={pauseAutoplay}
      >
        <motion.div
          className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragStart={pauseAutoplay}
          onDragEnd={handleDragEnd}
        >
          {visibleCards.map(({ model, modelIndex, offset }) => {
            const isActive = offset === 0
            const distance = Math.abs(offset)
            const x = `calc(-50% + ${offset * 444}px)`
            return (
              <motion.article
                key={modelIndex}
                aria-hidden={!isActive}
                aria-label={`${model.name}, ${model.tag}. ${model.desc}`}
                className="group absolute left-1/2 top-0 flex h-[540px] w-[min(420px,calc(100vw-40px))] select-none flex-col rounded-[32px] border border-[#E7E7E3] bg-white p-6 text-[#111] will-change-transform md:h-[580px]"
                initial={false}
                animate={{
                  x,
                  scale: isActive ? 1 : distance === 1 ? 0.9 : 0.82,
                  opacity: isActive ? 1 : distance === 1 ? 0.75 : 0,
                  filter: isActive ? 'blur(0px)' : distance === 1 ? 'blur(1.2px)' : 'blur(3px)',
                  zIndex: isActive ? 30 : distance === 1 ? 20 : 10,
                  boxShadow: isActive
                    ? '0 34px 80px rgba(0,0,0,0.42)'
                    : '0 18px 44px rgba(0,0,0,0.24)',
                }}
                whileHover={isActive ? { y: -6, scale: 1.03 } : { y: -3 }}
                transition={spring}
              >
                <span className="inline-flex w-fit rounded-full bg-[#B7FF3C] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#111]">
                  {model.tag}
                </span>
                <div className="mt-5 flex flex-1 items-center justify-center overflow-hidden rounded-[24px] border border-[#E7E7E3] bg-[#F7F7F7]">
                  <img
                    src={model.image}
                    alt={`${model.name} bottle`}
                    loading={isActive ? 'eager' : 'lazy'}
                    draggable={false}
                    className="h-full w-full scale-[1.22] object-contain drop-shadow-[0_28px_32px_rgba(0,0,0,0.22)] transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.28]"
                  />
                </div>
                <div className="pt-6">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#111]">{model.name}</h3>
                  <p className="mt-3 max-w-sm text-base font-normal leading-[1.7] text-[#444]">{model.desc}</p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        <button
          type="button"
          onClick={() => moveCarousel(-1)}
          className="absolute left-0 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#B7FF3C] md:left-6"
          aria-label="Previous portfolio item"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => moveCarousel(1)}
          className="absolute right-0 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#B7FF3C] md:right-6"
          aria-label="Next portfolio item"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.div>

      <div className="mx-auto mt-2 flex max-w-[1280px] items-center justify-center gap-2" aria-label={`Portfolio item ${activeIndex + 1} of ${total}`}>
        {portfolioModels.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => {
              pauseAutoplay()
              setActiveIndex(index)
            }}
            className="group h-5 rounded-full px-0.5 focus:outline-none focus:ring-2 focus:ring-[#B7FF3C]"
            aria-label={`Show ${item.name}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <span className={`block h-1.5 rounded-full transition-all duration-500 ${index === activeIndex ? 'w-10 bg-[#B7FF3C]' : 'w-5 bg-white/25 group-hover:bg-white/50'}`} />
          </button>
        ))}
      </div>
    </section>
  )
}

function Newsletter() {
  const bottleEase = [0.22, 1, 0.36, 1]
  const isMobile = useIsMobile()
  const leftBottles = [
    {
      image: newsletterBottleA,
      className: 'left-[12px] bottom-[-152px] w-[190px] md:left-[-62px] md:bottom-[-70px] md:w-[270px] lg:left-[58px] lg:bottom-[-48px] lg:w-[350px]',
      rotation: -10,
      x: isMobile ? -44 : -80,
      scale: 0.82,
      opacity: 1,
      delay: 0,
      float: [-6, 0, -6],
      duration: 9,
      z: 'z-[7]',
      blur: '',
    },
    {
      image: newsletterBottleC,
      className: 'left-[72px] bottom-[-104px] w-[132px] md:left-[-12px] md:top-[92px] md:bottom-auto md:w-[188px] lg:left-[70px] lg:top-[74px] lg:w-[248px]',
      rotation: -18,
      x: isMobile ? -32 : -48,
      scale: 0.86,
      opacity: 0.9,
      delay: 0.12,
      float: [-5, 0, -5],
      duration: 10,
      z: 'z-[6]',
      blur: '',
    },
    {
      image: newsletterBottleE,
      className: 'hidden md:block md:left-[150px] md:top-[154px] md:w-[140px] lg:left-[220px] lg:top-[142px] lg:w-[190px]',
      rotation: -8,
      x: -24,
      scale: 0.9,
      opacity: 0.55,
      delay: 0.24,
      float: [-4, 0, -4],
      duration: 11,
      z: 'z-[5]',
      blur: 'blur-[1.5px]',
    },
  ]
  const rightBottles = [
    {
      image: newsletterBottleB,
      className: 'right-[12px] bottom-[-152px] w-[190px] md:right-[-62px] md:bottom-[-70px] md:w-[270px] lg:right-[58px] lg:bottom-[-48px] lg:w-[350px]',
      rotation: 10,
      x: isMobile ? 44 : 80,
      scale: 0.82,
      opacity: 1,
      delay: 0.12,
      float: [0, -6, 0],
      duration: 9.5,
      z: 'z-[7]',
      blur: '',
    },
    {
      image: newsletterBottleD,
      className: 'right-[72px] bottom-[-104px] w-[132px] md:right-[-12px] md:top-[92px] md:bottom-auto md:w-[188px] lg:right-[70px] lg:top-[74px] lg:w-[248px]',
      rotation: 18,
      x: isMobile ? 32 : 48,
      scale: 0.86,
      opacity: 0.9,
      delay: 0.24,
      float: [0, -5, 0],
      duration: 10.5,
      z: 'z-[6]',
      blur: '',
    },
    {
      image: newsletterBottleF,
      className: 'hidden md:block md:right-[150px] md:top-[154px] md:w-[140px] lg:right-[220px] lg:top-[142px] lg:w-[190px]',
      rotation: 8,
      x: 20,
      scale: 0.9,
      opacity: 0.55,
      delay: 0.36,
      float: [0, -4, 0],
      duration: 12,
      z: 'z-[5]',
      blur: 'blur-[1.5px]',
    },
  ]
  const bottleShadow = isMobile
    ? 'drop-shadow(0 14px 24px rgba(0,0,0,0.12)) drop-shadow(0 0 24px rgba(255,255,255,0.14))'
    : 'drop-shadow(0 18px 40px rgba(0,0,0,0.12)) drop-shadow(0 0 24px rgba(255,255,255,0.14))'

  return (
    <section id="contact" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F7F5] px-4 py-24 md:px-8">
      {[...leftBottles, ...rightBottles].map((bottle, index) => (
        <motion.div
          key={`${bottle.className}-${index}`}
          className={`pointer-events-none absolute ${bottle.z} ${bottle.className}`}
          initial={{ opacity: 0, x: bottle.x, y: 24, rotate: bottle.rotation, scale: bottle.scale }}
          whileInView={{ opacity: bottle.opacity, x: 0, y: 0, rotate: bottle.rotation, scale: 1 }}
          transition={{ duration: 0.9, delay: bottle.delay, ease: bottleEase }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.img
            src={bottle.image}
            alt=""
            aria-hidden="true"
            className={`w-full select-none object-contain will-change-transform ${bottle.blur}`}
            animate={{ y: bottle.float }}
            transition={{ duration: bottle.duration, ease: 'easeInOut', repeat: Infinity, delay: 1.05 + bottle.delay }}
            style={{ filter: bottleShadow }}
          />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto w-full max-w-[760px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: bottleEase }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="inline-flex rounded-full bg-[#C7FF3A] px-[18px] py-2 text-sm font-bold uppercase tracking-[2px] text-[#111]">
            Updates
          </span>
          <h2 className="mx-auto mt-8 max-w-[700px] text-[clamp(56px,6vw,82px)] font-black leading-[0.95] tracking-[-0.06em] text-[#111]">
            New labels, production notes, partner updates. Nothing else.
          </h2>
        </motion.div>

        <div className="relative z-10 mt-10 flex justify-center">
          <motion.form
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: bottleEase }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative z-10 flex min-h-16 w-full max-w-[620px] items-center rounded-[32px] border border-black/[0.08] bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-colors duration-300 focus-within:border-[#111] max-[480px]:flex-col max-[480px]:items-stretch max-[480px]:rounded-[28px] max-[480px]:p-2"
          >
            <label className="sr-only" htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="Enter your email" className="h-[52px] min-w-0 flex-1 rounded-full bg-transparent pl-[26px] pr-3 text-lg text-[#111] outline-none placeholder:text-[#777] max-[480px]:w-full max-[480px]:pl-5" />
            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: bottleEase }}
              viewport={{ once: true, amount: 0.4 }}
              className="h-[52px] cursor-pointer rounded-full bg-[#111] px-[34px] text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#222] active:bg-[#111] max-[480px]:w-full"
            >
              Subscribe
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function FooterRedesign() {
  const portfolioLinks = [
    ['Our Spirits', '#portfolio'],
    ['Process', '#process'],
    ['Facility', '#details'],
    ['Partnerships', '#contact'],
  ]
  const exploreLinks = [
    ['About', '#about'],
    ['Workshop', '#workshop'],
    ['All Products', '#portfolio'],
    ['Careers', '#contact'],
  ]
  const socialLinks = [
    ['IG', 'Instagram', '@ntsdistillers'],
    ['X', 'X', '@ntsdistillers'],
    ['IN', 'LinkedIn', '@ntsdistillers'],
    ['YT', 'YouTube', '@ntsdistillers'],
  ]

  return (
    <footer className="bg-white px-5 py-6 md:px-8 lg:px-14">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto max-w-[1440px] overflow-hidden rounded-[24px] bg-[#EDEBE7] px-6 pb-0 pt-14 text-[#111] sm:px-8 md:px-12 md:pt-16 lg:px-14"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-[360px] font-serif text-[28px] font-medium leading-[1.08] tracking-[-0.025em] text-[#111]">
            Crafting spirits.
            <br />
            Rooted in Goa.
          </h2>
          <a href="#contact" className="inline-flex w-fit items-center justify-center rounded-full bg-[#111] px-7 py-3 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-black/30 focus:ring-offset-2 focus:ring-offset-[#EDEBE7]">
            Get in Touch
          </a>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#77736C]">Portfolio</h3>
            <nav className="mt-5 flex flex-col items-start gap-2.5 text-[14px] font-medium text-[#151515]">
              {portfolioLinks.map(([label, href]) => (
                <a key={label} href={href} className="relative w-fit after:absolute after:left-0 after:top-full after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#77736C]">Explore</h3>
            <nav className="mt-5 flex flex-col items-start gap-2.5 text-[14px] font-medium text-[#151515]">
              {exploreLinks.map(([label, href]) => (
                <a key={label} href={href} className="relative w-fit after:absolute after:left-0 after:top-full after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#77736C]">Say Hello</h3>
            <div className="mt-5 flex flex-col items-start gap-2.5 text-[14px] font-medium text-[#151515]">
              {socialLinks.map(([icon, label, handle]) => (
                <a key={label} href="#contact" className="group flex w-fit items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white/55 text-[10px] font-bold text-[#151515] transition-colors duration-300 group-hover:border-black">
                    {icon}
                  </span>
                  <span className="relative after:absolute after:left-0 after:top-full after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                    <span className="sr-only">{label} </span>
                    {handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-16">
          <p className="text-[13px] font-medium text-[#77736C]">
            (c) 2026 NTS Blenders and Distillers Pvt. Ltd. All rights reserved.
          </p>
          <div className="mt-5 h-[86px] overflow-hidden sm:h-[112px] md:h-[150px] lg:h-[194px]">
            <div className="flex whitespace-nowrap text-[76px] font-black lowercase leading-[0.78] tracking-[-0.09em] text-black min-[390px]:text-[86px] sm:text-[120px] md:text-[166px] lg:text-[222px] xl:text-[252px]" style={{ fontFamily: '"Inter Tight", "Plus Jakarta Sans", system-ui, sans-serif' }}>
              <span>nts</span>
              <span className="ml-[0.22em]">distillers</span>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

export default function HandoffPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#111]">
      <Portfolio />
      <Newsletter />
      <FooterRedesign />
    </main>
  )
}
