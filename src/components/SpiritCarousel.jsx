import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const CAROUSEL_ITEMS = [
  {
    id: 'old-town-whisky',
    brandName: 'OLD TOWN',
    productText: 'Indian Blended Malt Whisky',
    name: 'OLD TOWN Indian Blended Malt Whisky',
    category: 'Whisky',
    style: 'Malt Blended',
    ghostWord: 'MALT WHISKY',
    abv: 'Trade spec',
    description:
      'Old Town Indian Blended Malt Whisky leads the NTS semi-premium portfolio with a label-forward malt blended whisky presence.',
    image: '/portfolio-images/old-town.png',
    tones: ['#1c0f06', '#5C3412', '#a3703b'],
    accent: '#e9a355',
  },
  {
    id: 'east-coast-premium-malt-whisky',
    brandName: 'EAST COAST',
    productText: 'Premium Malt Whisky',
    name: 'EAST COAST Premium Malt Whisky',
    category: 'Whisky',
    style: 'Premium Malt',
    ghostWord: 'PREMIUM MALT',
    abv: 'Trade spec',
    description:
      'EAST COAST Premium Malt Whisky is part of the NTS semi-premium portfolio with a premium malt whisky identity.',
    image: '/portfolio-images/east-coast-premium-malt-whisky.png',
    tones: ['#08131a', '#1F3A4A', '#4d7f96'],
    accent: '#7fd1e6',
  },
  {
    id: 'east-coast-rum',
    brandName: 'EAST COAST',
    productText: 'xxx Rum',
    name: 'EAST COAST xxx Rum',
    category: 'Rum',
    style: 'XXX Rum',
    ghostWord: 'XXX RUM',
    abv: 'Trade spec',
    description:
      'EAST COAST xxx Rum brings a bold rum expression to the NTS portfolio with strong shelf recognition.',
    image: '/portfolio-images/east-coast-xxx-rum.png',
    tones: ['#180705', '#4A1B12', '#8a3f24'],
    accent: '#e2833f',
  },
  {
    id: 'east-coast-brandy',
    brandName: 'EAST COAST',
    productText: 'Indian Blended Brandy',
    name: 'EAST COAST Indian Blended Brandy',
    category: 'Brandy',
    style: 'Blended Brandy',
    ghostWord: 'INDIAN BRANDY',
    abv: 'Trade spec',
    description:
      'EAST COAST Indian Blended Brandy carries the East Coast range with a smooth blended brandy identity.',
    image: '/portfolio-images/east-coast-indian-blended-brandy.png',
    tones: ['#12040c', '#3A1228', '#6e2650'],
    accent: '#d9799b',
  },
  {
    id: 'wanted-999',
    brandName: 'WANTED 999',
    productText: 'Vsop Brandy',
    name: 'WANTED 999 Vsop Brandy',
    category: 'Brandy',
    style: 'VSOP Brandy',
    ghostWord: 'VSOP BRANDY',
    abv: 'Trade spec',
    description:
      'WANTED 999 Vsop Brandy is part of the NTS house portfolio, built around a rich VSOP brandy profile and strong shelf recognition.',
    image: '/portfolio-images/wanted.png',
    tones: ['#0b0804', '#221A0C', '#4a3a1c'],
    accent: '#c9a13b',
  },
]

const COUNT = CAROUSEL_ITEMS.length
const wrap = (n) => (n + COUNT) % COUNT

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")"

// Five-slot wheel: the active bottle plus its immediate neighbors sit at reduced scale/opacity
// with a blur, everything further out is parked fully hidden until it's rotated into view.
const POSITIONS = {
  hero: { x: '0vw', y: '0vh', scale: 1.2, rotation: 0, opacity: 1, blur: 0, zIndex: 4 },
  next: { x: '35vw', y: '2vh', scale: 0.42, rotation: 8, opacity: 0.5, blur: 5, zIndex: 2 },
  prev: { x: '-35vw', y: '2vh', scale: 0.42, rotation: -8, opacity: 0.5, blur: 5, zIndex: 2 },
  hiddenRight: { x: '64vw', y: '6vh', scale: 0.25, rotation: 13, opacity: 0, blur: 12, zIndex: 1 },
  hiddenLeft: { x: '-64vw', y: '6vh', scale: 0.25, rotation: -13, opacity: 0, blur: 12, zIndex: 1 },
}

function setBottlePosition(node, position) {
  if (!node) return
  gsap.set(node, {
    '--base-x': position.x,
    '--base-y': position.y,
    '--base-scale': position.scale,
    '--base-rotation': `${position.rotation}deg`,
    opacity: position.opacity,
    filter: `drop-shadow(0 28px 22px rgba(0,0,0,.36)) blur(${position.blur}px)`,
    zIndex: position.zIndex,
  })
}

function animateBottlePosition(timeline, node, position, duration, at = 0) {
  if (!node) return
  timeline.to(
    node,
    {
      '--base-x': position.x,
      '--base-y': position.y,
      '--base-scale': position.scale,
      '--base-rotation': `${position.rotation}deg`,
      opacity: position.opacity,
      filter: `drop-shadow(0 28px 22px rgba(0,0,0,.36)) blur(${position.blur}px)`,
      zIndex: position.zIndex,
      duration,
    },
    at
  )
}

export default function SpiritCarousel({ onSelectProduct }) {
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const lockedRef = useRef(false)
  const stageRef = useRef(null)
  const bottleRefs = useRef([])
  const panelRef = useRef(null)
  const actionRef = useRef(null)

  const current = CAROUSEL_ITEMS[active]

  // Mount: place every bottle on the wheel around whichever one is active.
  useLayoutEffect(() => {
    bottleRefs.current.forEach((node, i) => {
      if (!node) return
      const position =
        i === activeRef.current
          ? POSITIONS.hero
          : i === wrap(activeRef.current + 1)
          ? POSITIONS.next
          : i === wrap(activeRef.current - 1)
          ? POSITIONS.prev
          : POSITIONS.hiddenRight
      setBottlePosition(node, position)
      gsap.set(node, { '--parallax-x': '0px', '--parallax-y': '0px', '--parallax-rx': '0deg', '--parallax-ry': '0deg' })
    })
  }, [])

  useEffect(() => {
    const preload = CAROUSEL_ITEMS.map(({ image }) => {
      const img = new Image()
      img.src = image
      return img
    })
    return () => preload.forEach((img) => { img.src = '' })
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowRight') changeProduct(1)
      if (event.key === 'ArrowLeft') changeProduct(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Wheel must be a real DOM listener with { passive: false } — some browsers mark React's
  // onWheel as passive, which silently breaks preventDefault() and floods the console.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const onWheelNative = (event) => {
      event.preventDefault()
      if (Math.abs(event.deltaY) < 8) return
      changeProduct(event.deltaY > 0 ? 1 : -1)
    }
    stage.addEventListener('wheel', onWheelNative, { passive: false })
    return () => stage.removeEventListener('wheel', onWheelNative)
  })

  function resetParallax(immediate = true) {
    const targets = bottleRefs.current.filter(Boolean)
    gsap.killTweensOf(targets)
    const vars = {
      '--parallax-x': '0px',
      '--parallax-y': '0px',
      '--parallax-rx': '0deg',
      '--parallax-ry': '0deg',
      duration: immediate ? 0 : 0.45,
      ease: 'power3.out',
      overwrite: 'auto',
    }
    targets.forEach((node) => (immediate ? gsap.set(node, vars) : gsap.to(node, vars)))
  }

  function changeProduct(direction) {
    if (lockedRef.current) return
    lockedRef.current = true
    resetParallax(true)

    const old = activeRef.current
    const next = wrap(old + direction)
    const nextItem = CAROUSEL_ITEMS[next]
    const oldHero = bottleRefs.current[old]
    const incoming = bottleRefs.current[next]
    const entering = bottleRefs.current[wrap(old + direction * 2)]
    const exiting = bottleRefs.current[wrap(old - direction)]

    setBottlePosition(entering, direction > 0 ? POSITIONS.hiddenRight : POSITIONS.hiddenLeft)
    setBottlePosition(incoming, direction > 0 ? POSITIONS.hiddenRight : POSITIONS.hiddenLeft)
    gsap.killTweensOf([panelRef.current, actionRef.current, oldHero, incoming, entering, exiting])

    const timeline = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
      onComplete: () => {
        activeRef.current = next
        setActive(next)
        resetParallax(true)
        lockedRef.current = false
      },
    })

    timeline.to(
      stageRef.current,
      {
        '--tone-1': nextItem.tones[0],
        '--tone-2': nextItem.tones[1],
        '--tone-3': nextItem.tones[2],
        '--accent': nextItem.accent,
        duration: 0.95,
      },
      0
    )
    animateBottlePosition(timeline, oldHero, direction > 0 ? POSITIONS.prev : POSITIONS.next, 0.92, 0)
    animateBottlePosition(timeline, incoming, POSITIONS.hero, 0.98, 0.03)
    animateBottlePosition(timeline, entering, direction > 0 ? POSITIONS.next : POSITIONS.prev, 0.9, 0.08)
    animateBottlePosition(timeline, exiting, direction > 0 ? POSITIONS.hiddenLeft : POSITIONS.hiddenRight, 0.72, 0)

    timeline
      .to([panelRef.current, actionRef.current], { opacity: 0, y: -12, filter: 'blur(5px)', duration: 0.28, stagger: 0.025 }, 0)
      .call(() => { activeRef.current = next; setActive(next) }, [], 0.38)
      .fromTo(
        [panelRef.current, actionRef.current],
        { opacity: 0, y: 15, filter: 'blur(5px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.04, ease: 'power3.out' },
        0.5
      )
  }

  const onPointerMove = (event) => {
    if (!stageRef.current || lockedRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2))
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2))
    gsap.to(stageRef.current, {
      '--parallax-x': `${x * 3}px`,
      '--parallax-y': `${y * 2}px`,
      '--glow-x': `${50 + x * 8}%`,
      '--glow-y': `${46 + y * 6}%`,
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto',
    })
    const hero = bottleRefs.current[activeRef.current]
    if (hero) {
      gsap.to(hero, {
        '--parallax-x': `${x * 7}px`,
        '--parallax-y': `${y * 4}px`,
        '--parallax-rx': `${-y * 1.1}deg`,
        '--parallax-ry': `${x * 1.6}deg`,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }
  }

  const onPointerLeave = () => {
    if (lockedRef.current) return
    resetParallax(false)
    gsap.to(stageRef.current, {
      '--parallax-x': '0px',
      '--parallax-y': '0px',
      '--glow-x': '50%',
      '--glow-y': '46%',
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const handleViewDetails = () => {
    onSelectProduct?.({
      name: current.name,
      category: current.category,
      style: current.style,
      abv: current.abv,
      description: current.description,
      image: current.image,
    })
  }

  return (
    <section
      id="flavors"
      data-od-id="spirit-carousel"
      className="relative w-full overflow-hidden select-none border-t border-white/10"
    >
      <div
        ref={stageRef}
        className="spirit-stage relative w-full"
        style={{
          height: '100svh',
          minHeight: 660,
          overflow: 'hidden',
          '--tone-1': current.tones[0],
          '--tone-2': current.tones[1],
          '--tone-3': current.tones[2],
          '--accent': current.accent,
        }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div className="spirit-stage-bg" />

        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 46,
            opacity: 0.4,
            backgroundImage: GRAIN_URL,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        <div className="spirit-stage-vignette" />

        {/* Section eyebrow */}
        <div className="absolute top-6 left-4 sm:left-8 z-[60]">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white/85">
            Proprietary Distillation
          </span>
        </div>

        {/* Giant centered headline */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none font-serif px-4"
          style={{ top: '13%', zIndex: 2 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="uppercase text-white text-center block"
              style={{
                fontSize: 'clamp(44px, 12vw, 210px)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              {current.ghostWord}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Bottle wheel: hero + prev/next peeking at reduced scale/opacity/blur, everything
            further out parked off-stage until it's rotated into view. */}
        <div className="absolute inset-0" style={{ zIndex: 20, perspective: 1200, display: 'grid', placeItems: 'center' }}>
          {CAROUSEL_ITEMS.map((item, i) => (
            <img
              key={item.id}
              ref={(node) => { bottleRefs.current[i] = node }}
              src={item.image}
              alt={item.name}
              draggable={false}
              className="spirit-bottle"
            />
          ))}
        </div>

        {/* Bottom-left: active spirit + nav */}
        <div ref={panelRef} className="absolute bottom-6 left-4 sm:bottom-10 sm:left-10" style={{ zIndex: 60, maxWidth: 340 }}>
          <p
            className="font-serif uppercase text-white mb-1 sm:mb-2"
            style={{ fontSize: 'clamp(18px, 2.4vw, 26px)', fontWeight: 900, letterSpacing: '0.01em' }}
          >
            {current.brandName}
          </p>
          <p
            className="text-white/85 mb-2 sm:mb-3"
            style={{ fontSize: 'clamp(13px, 1.3vw, 16px)', fontWeight: 700 }}
          >
            {current.productText}
          </p>
          <p className="hidden sm:block text-white/80 mb-5" style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 300 }}>
            {current.description}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => changeProduct(-1)}
              aria-label="Previous spirit"
              className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white/70 text-white transition-all duration-150 hover:scale-[1.08] hover:border-accent hover:bg-accent/15"
            >
              <ArrowLeft size={20} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={() => changeProduct(1)}
              aria-label="Next spirit"
              className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white/70 text-white transition-all duration-150 hover:scale-[1.08] hover:border-accent hover:bg-accent/15"
            >
              <ArrowRight size={20} strokeWidth={2.25} />
            </button>
            <span className="font-mono text-[11px] text-white/60 ml-1">
              {String(active + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Bottom-right: view details */}
        <button
          ref={actionRef}
          type="button"
          onClick={handleViewDetails}
          className="absolute bottom-6 right-4 sm:bottom-10 sm:right-10 flex items-center gap-2 font-serif uppercase text-white group"
          style={{ zIndex: 60, fontSize: 'clamp(15px, 2.4vw, 32px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}
        >
          <span className="opacity-95 transition-opacity duration-200 group-hover:opacity-100">View details</span>
          <ArrowRight
            className="h-4 w-4 sm:h-7 sm:w-7 transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2.25}
          />
        </button>
      </div>
    </section>
  )
}
