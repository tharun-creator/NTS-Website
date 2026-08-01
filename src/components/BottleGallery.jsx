import React, { useRef, useState, useEffect } from 'react'
import { animate } from 'animejs'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function BottleGallery({ brands, onAddToCart, onQuickView }) {
  const hudRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const [loading, setLoading] = useState(true)

  const activeProduct = brands[activeIndex]
  const activeImage = activeProduct?.removedBgImage || activeProduct?.image

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = () => setReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    const loadTimer = setTimeout(() => setLoading(false), 1400)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      clearTimeout(loadTimer)
    }
  }, [])

  useEffect(() => {
    if (!hudRef.current) return

    const animTarget = hudRef.current.querySelectorAll('.animate-hud')
    animate(animTarget, {
      translateY: [18, 0],
      opacity: [0, 1],
      delay: (el, i) => i * 70,
      duration: 420,
      easing: 'cubicBezier(.16, 1, .3, 1)'
    })
  }, [activeIndex])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const goTo = (index) => {
    if (!brands.length) return
    setActiveIndex((index + brands.length) % brands.length)
  }

  const goPrevious = () => goTo(activeIndex - 1)
  const goNext = () => goTo(activeIndex + 1)

  if (!brands.length) return null

  const tiltX = reducedMotion ? 0 : mousePos.x * 10
  const tiltY = reducedMotion ? 0 : mousePos.y * -6

  return (
    <div className="relative w-full overflow-hidden bg-white rounded-2xl sm:rounded-[2rem] border border-maroon/5 shadow-sm">
      <div className="relative min-h-[560px] sm:min-h-[640px] md:min-h-[700px] overflow-hidden flex flex-col md:flex-row items-center justify-between px-4 sm:px-10 lg:px-16 py-8 sm:py-10 md:py-14">
        <div className="relative w-full md:w-1/2 min-h-[300px] sm:min-h-[430px] md:min-h-[560px] flex items-center justify-center">
          <button
            type="button"
            onClick={goPrevious}
            className="absolute left-0 sm:left-2 z-30 h-11 w-11 rounded-full bg-maroon text-cream hover:bg-coral-orange transition-all shadow-lg flex items-center justify-center active:scale-95"
            aria-label="Previous bottle"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 sm:right-2 z-30 h-11 w-11 rounded-full bg-maroon text-cream hover:bg-coral-orange transition-all shadow-lg flex items-center justify-center active:scale-95"
            aria-label="Next bottle"
          >
            <ChevronRight size={20} />
          </button>

          <img
            key={activeProduct.id}
            src={activeImage}
            alt={activeProduct.name}
            onLoad={() => setLoading(false)}
            onClick={() => onQuickView && onQuickView(activeProduct)}
            style={{
              transform: `translate3d(${tiltX}px, ${tiltY}px, 0) rotateY(${tiltX * 0.8}deg)`
            }}
            className="relative z-10 w-auto max-w-[78%] h-[260px] sm:h-[440px] md:h-[590px] object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer hover:scale-[1.03]"
          />
        </div>

        <div ref={hudRef} className="relative z-20 w-full md:w-[45%] text-center md:text-left font-sans pt-3 md:pt-0">
          <div className="text-[10px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.35em] text-maroon/35 uppercase mb-3 sm:mb-4 font-bold animate-hud">
            {String(activeIndex + 1).padStart(2, '0')} / {String(brands.length).padStart(2, '0')}
          </div>
          <h3 className="font-rye text-xl sm:text-2xl lg:text-4xl xl:text-5xl text-maroon tracking-wide mb-3 leading-[1.1] font-extrabold uppercase animate-hud">
            {activeProduct.name}
          </h3>
          <p className="text-[11px] sm:text-[12px] text-maroon/60 tracking-[0.06em] sm:tracking-[0.1em] uppercase mb-4 sm:mb-5 font-semibold animate-hud font-mono">
            {activeProduct.type} &bull; {activeProduct.dosage}
          </p>
          <div className="max-w-sm mx-auto md:mx-0 text-xs leading-relaxed text-maroon/65 mb-6 sm:mb-7 font-lora animate-hud">
            {activeProduct.description}
          </div>

          <div className="flex justify-center md:justify-start animate-hud">
            <button
              onClick={() => onQuickView && onQuickView(activeProduct)}
              className="w-full sm:w-auto px-7 py-3.5 sm:py-3 bg-maroon text-cream hover:bg-coral-orange text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md active:scale-[0.98]"
            >
              View Profile Specs
            </button>
          </div>

          <div className="flex justify-center md:justify-start gap-2 pt-6 sm:pt-8">
            {brands.map((brand, index) => (
              <button
                key={brand.id}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? 'w-8 bg-coral-orange' : 'w-2.5 bg-maroon/20 hover:bg-maroon/40'
                }`}
                aria-label={`Show ${brand.name}`}
              />
            ))}
          </div>
        </div>

        {loading && (
          <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center gap-4 transition-opacity duration-500 pointer-events-none">
            <div className="w-12 h-12 border-2 border-[#4A151C]/10 border-t-[#E9542E] rounded-full animate-spin"></div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#4A151C]/60">NTS Distillery Vault Loading...</span>
          </div>
        )}
      </div>
    </div>
  )
}
