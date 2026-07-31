import React, { useRef, useState, useEffect } from 'react'
import { animate } from 'animejs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ModelBottleViewer from './ModelBottleViewer'

export default function BottleGallery({ brands, onQuickView }) {
  const hudRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modelError, setModelError] = useState(false)
  const [slideDirection, setSlideDirection] = useState('next')

  const activeProduct = brands[activeIndex]
  const displayProduct = brands[displayIndex] || activeProduct
  const galleryBackground = activeProduct?.galleryBackground || '#ffffff'

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
    brands.forEach((brand) => {
      const assetPaths = [brand.modelPath, brand.materialPath, ...(brand.texturePaths || [])].filter(Boolean)
      assetPaths.forEach((assetPath) => {
        fetch(assetPath).catch(() => {})
      })
    })
  }, [brands])

  useEffect(() => {
    setLoading(!activeProduct?.modelPath)
    setModelError(false)
    setDisplayIndex(activeIndex)
    if (!hudRef.current) return

    const animTarget = hudRef.current.querySelectorAll('.animate-hud')
    animate(animTarget, {
      translateY: [12, 0],
      opacity: [0, 1],
      delay: (el, i) => i * 55,
      duration: 560,
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
    const nextIndex = (index + brands.length) % brands.length
    if (nextIndex === activeIndex) return
    setSlideDirection(nextIndex > activeIndex || (activeIndex === brands.length - 1 && nextIndex === 0) ? 'next' : 'previous')
    setActiveIndex(nextIndex)
  }

  const goPrevious = () => goTo(activeIndex - 1)
  const goNext = () => goTo(activeIndex + 1)

  if (!brands.length) return null

  const tiltX = reducedMotion ? 0 : mousePos.x * 10
  const tiltY = reducedMotion ? 0 : mousePos.y * -6
  const bottleTransform = `translate3d(${tiltX}px, ${tiltY}px, 0) rotateY(${tiltX * 0.45}deg)`

  return (
    <div
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden transition-colors duration-700"
      style={{ background: galleryBackground }}
    >
      <div className="relative mx-auto min-h-[620px] max-w-[1440px] overflow-hidden px-4 py-8 sm:min-h-[700px] sm:px-10 md:min-h-[760px] lg:px-16">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_48%,rgba(233,84,46,0.14),transparent_24%),radial-gradient(circle_at_50%_72%,rgba(201,161,90,0.22),transparent_32%),linear-gradient(115deg,rgba(255,255,255,0.98),rgba(247,239,226,0.50)_52%,rgba(255,255,255,0.90))] transition-opacity duration-700" />
        <div className="absolute left-1/2 top-[58%] h-px w-[72vw] max-w-[900px] -translate-x-1/2 bg-gradient-to-r from-transparent via-maroon/8 to-transparent" />
        <div className="absolute left-1/2 bottom-[14%] h-[130px] w-[460px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(74,21,28,0.15),transparent_68%)] blur-sm pointer-events-none sm:w-[620px] lg:left-[34%]" />

        <div className="relative z-20 flex min-h-[560px] w-full flex-col items-center justify-center gap-2 sm:min-h-[640px] md:min-h-[700px] lg:flex-row lg:gap-8">
          <button
            type="button"
            onClick={goPrevious}
            className="absolute left-2 top-1/2 z-40 h-12 w-12 -translate-y-1/2 rounded-full bg-maroon text-cream hover:bg-coral-orange transition-all shadow-lg flex items-center justify-center active:scale-95 sm:left-8"
            aria-label="Previous bottle"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-40 h-12 w-12 -translate-y-1/2 rounded-full bg-maroon text-cream hover:bg-coral-orange transition-all shadow-lg flex items-center justify-center active:scale-95 sm:right-8"
            aria-label="Next bottle"
          >
            <ChevronRight size={20} />
          </button>

          <div
            key={activeProduct.id}
            className="gallery-bottle-enter relative z-20 flex h-[430px] w-full shrink-0 items-center justify-center sm:h-[560px] md:h-[640px] lg:h-[700px] lg:w-[58%]"
            style={{ '--gallery-enter-x': slideDirection === 'next' ? '54px' : '-54px' }}
          >
            <ModelBottleViewer
              modelPath={activeProduct.modelPath}
              materialPath={activeProduct.materialPath}
              alt={activeProduct.name}
              viewSettings={activeProduct.modelView}
              reducedMotion={reducedMotion}
              transform={bottleTransform}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false)
                setModelError(true)
              }}
              onClick={() => onQuickView && onQuickView(activeProduct)}
            />

            {modelError && (
              <div className="absolute inset-0 z-30 flex items-center justify-center px-8 text-center">
                <div className="rounded-lg border border-maroon/10 bg-white/80 px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-maroon shadow-sm backdrop-blur">
                  3D model could not load
                </div>
              </div>
            )}
          </div>

          <div ref={hudRef} className="relative z-30 w-[min(92vw,520px)] text-center font-sans lg:w-[38%] lg:max-w-[430px] lg:text-left">
            <div className="text-[10px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.35em] uppercase mb-3 sm:mb-4 font-bold animate-hud text-maroon/38">
              {String(activeIndex + 1).padStart(2, '0')} / {String(brands.length).padStart(2, '0')}
            </div>
            <h3 className="font-rye text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-wide mb-3 leading-[1.02] font-extrabold uppercase animate-hud text-maroon">
              {displayProduct.name}
            </h3>
            <p className="text-[11px] sm:text-[12px] tracking-[0.08em] sm:tracking-[0.12em] uppercase mb-4 sm:mb-5 font-semibold animate-hud font-mono text-maroon/60">
              {displayProduct.type} &bull; {displayProduct.dosage}
            </p>
            <div className="mx-auto max-w-sm text-xs leading-relaxed mb-5 sm:mb-6 font-lora animate-hud text-maroon/65">
              {displayProduct.description}
            </div>

            <div className="flex justify-center lg:justify-start animate-hud">
              <button
                onClick={() => onQuickView && onQuickView(displayProduct)}
                className="w-full sm:w-auto px-7 py-3.5 sm:py-3 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md active:scale-[0.98] bg-maroon text-cream hover:bg-coral-orange"
              >
                View Profile Specs
              </button>
            </div>

            <div className="flex justify-center gap-2 pt-5 sm:pt-6 lg:justify-start">
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
