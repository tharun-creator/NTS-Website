import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Factory, FlaskConical, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

const defaultLayers = [
  {
    src: '/hero-bg.jpg',
    alt: 'NTS distillery hero background',
    speedX: 0.018,
    speedY: 0.024,
    speedZ: 0,
    rotation: 0,
    zIndex: 1,
    initialTop: '50%',
    initialLeft: '50%',
    width: 'max(125vw, 1900px)',
    className: 'h-full object-cover opacity-95',
  },
  {
    src: '/images/Vodka_and_spirits_collection_lin._202607241659.jpeg',
    alt: 'premium spirits collection',
    speedX: 0.034,
    speedY: 0.021,
    speedZ: 0.06,
    rotation: 0.05,
    zIndex: 3,
    initialTop: '54%',
    initialLeft: '76%',
    width: '760px',
    className: 'hidden md:block rounded-[8px] opacity-55 saturate-[0.9] shadow-2xl',
  },
  {
    src: '/bottle-2/bottle (2).png',
    alt: 'Old Town Indian Blended Malt Whisky bottle',
    speedX: 0.08,
    speedY: 0.052,
    speedZ: 0.44,
    rotation: 0.16,
    zIndex: 18,
    initialTop: '57%',
    initialLeft: '51%',
    width: '330px',
    className: 'hero-product-bottle',
  },
  {
    src: '/bottle-2/bottle (1).png',
    alt: 'East Coast rum bottle',
    speedX: 0.052,
    speedY: 0.036,
    speedZ: 0.29,
    rotation: 0.1,
    zIndex: 15,
    initialTop: '61%',
    initialLeft: '65%',
    width: '260px',
    className: 'hero-side-bottle hidden sm:block',
  },
  {
    src: '/bottle-2/bottle.png',
    alt: 'East Coast brandy bottle',
    speedX: 0.045,
    speedY: 0.029,
    speedZ: 0.24,
    rotation: 0.08,
    zIndex: 14,
    initialTop: '62%',
    initialLeft: '37%',
    width: '245px',
    className: 'hero-side-bottle hidden md:block',
  },
  {
    src: '/secti.png',
    alt: 'distillery texture layer',
    speedX: 0.11,
    speedY: 0.06,
    speedZ: 0,
    rotation: 0,
    zIndex: 21,
    initialTop: '88%',
    initialLeft: '50%',
    width: '1500px',
    className: 'opacity-20 mix-blend-screen',
  },
]

function ParallaxHero({
  layers = defaultLayers,
  title = 'NTS',
  className,
}) {
  const layerRefs = useRef([])
  const textRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handleMotionChange = () => setReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleMotionChange)
    return () => mediaQuery.removeEventListener('change', handleMotionChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) return undefined

    let frame = 0
    const updateLayers = (cursorPosition, xVal, yVal, rotateDeg) => {
      layerRefs.current.forEach((el, index) => {
        if (!el) return
        const layer = layers[index]
        const computedLeft = parseFloat(getComputedStyle(el).left.replace('px', ''))
        const isInLeft = computedLeft < window.innerWidth / 2 ? 1 : -1
        const zValue = (cursorPosition - computedLeft) * isInLeft * 0.1

        el.style.transform = `perspective(2300px) translateZ(${zValue * layer.speedZ}px) rotateY(${rotateDeg * layer.rotation}deg) translateX(calc(-50% + ${-xVal * layer.speedX}px)) translateY(calc(-50% + ${yVal * layer.speedY}px))`
      })

      if (textRef.current) {
        textRef.current.style.transform = `perspective(2300px) rotateY(${rotateDeg * 0.025}deg) translateX(calc(-50% + ${-xVal * 0.035}px)) translateY(calc(-50% + ${yVal * 0.02}px))`
      }
    }

    const handleMouseMove = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const xValue = event.clientX - window.innerWidth / 2
        const yValue = event.clientY - window.innerHeight / 2
        const rotateDegree = (xValue / (window.innerWidth / 2)) * 18
        updateLayers(event.clientX, xValue, yValue, rotateDegree)
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frame)
    }
  }, [layers, reducedMotion])

  return (
    <section
      className={cn(
        'relative min-h-[760px] overflow-hidden bg-[#120b0a] text-cream sm:min-h-[calc(100svh-44px)]',
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(233,84,46,0.18),transparent_24%),linear-gradient(115deg,rgba(18,11,10,0.98)_0%,rgba(39,12,17,0.78)_40%,rgba(16,19,24,0.28)_100%)]" />
      <div className="absolute inset-0 z-[30] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_48%,rgba(0,0,0,0.72)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 z-[32] h-36 bg-gradient-to-t from-[#120b0a] to-transparent pointer-events-none" />

      {layers.map((layer, index) => (
        <img
          key={`${layer.alt}-${index}`}
          ref={(el) => {
            layerRefs.current[index] = el
          }}
          src={layer.src}
          alt={layer.alt}
          className={cn(
            'absolute max-w-none pointer-events-none select-none transition-transform duration-[450ms] ease-out',
            layer.className
          )}
          style={{
            width: layer.width,
            top: layer.initialTop,
            left: layer.initialLeft,
            zIndex: layer.zIndex,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <div className="absolute inset-x-0 top-0 z-[40] mx-auto flex max-w-[1280px] justify-between px-5 pt-5 sm:px-10 lg:px-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-black/20 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-cream/85 backdrop-blur-md">
          <MapPin size={13} />
          Goa Manufacturing Facility
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-cream/20 bg-black/20 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-cream/85 backdrop-blur-md sm:inline-flex">
          Estd. 1980
        </div>
      </div>

      <motion.div
        ref={textRef}
        className="absolute left-1/2 top-[43%] z-[16] w-[min(92vw,980px)] -translate-x-1/2 -translate-y-1/2 text-center transition-transform duration-[450ms] ease-out"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mx-auto mb-3 w-fit border-y border-cream/25 px-4 py-2 text-[10px] font-black uppercase tracking-[0.34em] text-gold-soft sm:text-xs">
          Blenders & Distillers Pvt. Ltd.
        </p>
        <h1 className="font-rye text-[4.1rem] font-black uppercase leading-[0.74] tracking-normal text-white drop-shadow-[0_18px_45px_rgba(0,0,0,0.78)] sm:text-[9rem] lg:text-[14rem]">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm font-semibold leading-relaxed text-cream/88 drop-shadow-[0_8px_20px_rgba(0,0,0,0.75)] sm:text-base">
          Four decades of Indian alcobev manufacturing, proprietary IMFL brands, and contract bottling capacity presented with a modern distillery-grade digital experience.
        </p>
      </motion.div>

      <div className="absolute inset-x-0 bottom-8 z-[42] mx-auto grid max-w-[1180px] gap-4 px-5 sm:bottom-10 sm:px-10 lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:px-14">
        <div className="hidden max-w-xs space-y-3 rounded-[8px] border border-cream/15 bg-black/20 p-4 backdrop-blur-md lg:block">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold-soft">
            <Factory size={14} />
            Industrial Capability
          </div>
          <p className="text-xs leading-relaxed text-cream/78">
            Blending, warehousing, quality control, and scaled bottling operations under one manufacturing roof.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <a
            href="#portfolio"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral-orange px-8 py-4 text-center text-[11px] font-black uppercase tracking-widest text-white shadow-2xl shadow-coral-orange/25 transition-all duration-300 hover:-translate-y-1 hover:bg-cream hover:text-maroon active:scale-[0.98] sm:w-auto"
          >
            Explore Brands
            <ArrowDown size={15} />
          </a>
          <div className="grid w-full grid-cols-3 gap-2 text-center sm:w-auto">
            {['Whisky', 'Brandy', 'Rum'].map((item) => (
              <span key={item} className="rounded-full border border-cream/20 bg-black/20 px-3 py-2 text-[9px] font-bold uppercase tracking-widest text-cream/80 backdrop-blur-md">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden max-w-xs justify-self-end space-y-3 rounded-[8px] border border-cream/15 bg-black/20 p-4 text-right backdrop-blur-md lg:block">
          <div className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase tracking-widest text-gold-soft">
            Quality Profile
            <FlaskConical size={14} />
          </div>
          <p className="text-xs leading-relaxed text-cream/78">
            FDA-compliant process storytelling for B2B proposals, facility reviews, and premium product discovery.
          </p>
        </div>
      </div>
    </section>
  )
}

export function ParallaxHeroDemo() {
  return <ParallaxHero />
}

export default ParallaxHero
