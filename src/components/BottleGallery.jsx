import React, { useRef, useState, useEffect } from 'react'
import { animate } from 'animejs'

export default function BottleGallery({ brands, onAddToCart, onQuickView }) {
  const trackRef = useRef(null)
  const hudRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const [loading, setLoading] = useState(true)

  const targetProgress = useRef(0)
  const currentProgress = useRef(0)
  const targetMousePos = useRef({ x: 0, y: 0 })
  const currentMousePos = useRef({ x: 0, y: 0 })
  const loadedCount = useRef(0)

  // Track system prefers-reduced-motion query
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = () => {
      setReducedMotion(mediaQuery.matches)
    }
    mediaQuery.addEventListener('change', handleChange)
    
    // Safety timeout to hide skeleton loader if any image fails to load
    const loadTimer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      clearTimeout(loadTimer)
    }
  }, [])

  const handleImageLoad = () => {
    loadedCount.current += 1
    if (loadedCount.current >= brands.length) {
      setLoading(false)
    }
  }

  // Trigger anime.js slide-up, fade-in transition on right-corner HUD details whenever the active bottle changes
  useEffect(() => {
    if (hudRef.current) {
      // Select the title, meta text, and description inside HUD
      const animTarget = hudRef.current.querySelectorAll('.animate-hud')
      
      // Reset running animations
      if (window.anime) {
        window.anime.remove(animTarget)
      }
      
      animate(animTarget, {
        translateY: [24, 0],
        opacity: [0, 1],
        delay: (el, i) => i * 80,
        duration: 500,
        easing: 'cubicBezier(.16, 1, .3, 1)' // Premium non-bouncy easing
      })
    }
  }, [activeIndex])

  useEffect(() => {
    let animationFrameId;

    const updateAnimations = () => {
      // Liquid-smooth lerping for scroll progression
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08
      setScrollProgress(currentProgress.current)

      // Calculate active bottle index from the smooth scroll progress
      const index = Math.min(
        brands.length - 1,
        Math.max(0, Math.floor(currentProgress.current * brands.length))
      )
      setActiveIndex(index)

      // Smooth lag effect for mouse tilting parallax
      currentMousePos.current.x += (targetMousePos.current.x - currentMousePos.current.x) * 0.08
      currentMousePos.current.y += (targetMousePos.current.y - currentMousePos.current.y) * 0.08
      setMousePos({ x: currentMousePos.current.x, y: currentMousePos.current.y })

      // Loop frame if there's any pending motion to resolve
      const progressDiff = Math.abs(targetProgress.current - currentProgress.current)
      const mouseDiffX = Math.abs(targetMousePos.current.x - currentMousePos.current.x)
      const mouseDiffY = Math.abs(targetMousePos.current.y - currentMousePos.current.y)

      if (progressDiff > 0.0001 || mouseDiffX > 0.0001 || mouseDiffY > 0.0001) {
        animationFrameId = requestAnimationFrame(updateAnimations)
      }
    }

    const handleScroll = () => {
      if (!trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const scrollHeight = rect.height - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / scrollHeight))
      
      targetProgress.current = progress
      
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(updateAnimations)
    }

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5
      const y = (e.clientY / window.innerHeight) - 0.5
      
      targetMousePos.current = { x, y }
      
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(updateAnimations)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [brands])

  return (
    // Replaced dynamic background themes with a solid premium white background
    <div ref={trackRef} className="relative h-[500vh] sm:h-[700vh] w-full bg-white">
      
      {/* Sticky Stage Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-between px-2 sm:px-12 lg:px-24">
        
        {/* Soft elegant vignette gradient overlay to ground the bottles */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(0,0,0,0.01)_0%,rgba(0,0,0,0.05)_100%)]" />

        {/* 3D Scene Viewport: Centered Perspective aligned perfectly for giant bottles */}
        <div className="relative w-full md:w-1/2 h-full flex items-center justify-center md:justify-start" style={{ perspective: '1600px', perspectiveOrigin: '50% 50%' }}>
          
          {brands.map((product, index) => {
            const itemSegment = 1 / brands.length
            const itemCenterProgress = (index + 0.5) * itemSegment
            
            const diff = scrollProgress - itemCenterProgress
            
            // Carousel interpolation path: Moves from right to left
            let x = 700
            let z = 0
            let rotateY = reducedMotion ? 0 : 10
            let opacity = 0
            
            if (Math.abs(diff) < itemSegment * 1.5) {
              const t = diff / (itemSegment * 1.5) // Range [-1, 1]
              x = -t * 700 // x goes from 700 (upcoming) to -700 (passed)
              z = 0 // Keep Z-depth at 0 for equal bottle heights
              rotateY = reducedMotion ? 0 : -t * 10 // Capped rotation at max 10 degrees to look premium
              opacity = 1 - Math.pow(Math.abs(t), 2) // Quadratic fade
            } else if (diff < 0) {
              x = 700
              z = 0
              rotateY = reducedMotion ? 0 : 10
              opacity = 0
            } else {
              x = -700
              z = 0
              rotateY = reducedMotion ? 0 : -10
              opacity = 0
            }

            // Real-time cursor tilting values (parallax physics)
            const isCurrent = index === activeIndex
            const tiltX = isCurrent && !reducedMotion ? mousePos.x * 12 : 0
            const tiltY = isCurrent && !reducedMotion ? mousePos.y * -8 : 0

            const activeImage = product.removedBgImage || product.image

            return (
              <div
                key={product.id}
                style={{
                  transform: `translate3d(${x + tiltX}px, ${tiltY}px, ${z}px) rotateY(${rotateY + tiltX * 1.2}deg)`,
                  opacity: opacity,
                  pointerEvents: opacity > 0.6 ? 'auto' : 'none',
                  transition: 'transform 0.15s ease-out, opacity 0.15s ease-out'
                }}
                // Giant dominant bottle container raised slightly higher to balance horizontally with text HUD. Uses responsive sizing for mobile devices
                className="absolute inset-y-0 my-auto left-1/2 -translate-x-1/2 md:translate-x-0 md:left-8 w-[200px] sm:w-[280px] md:w-[420px] flex flex-col justify-center items-center cursor-pointer group"
                onClick={() => onQuickView && onQuickView(product)}
              >
                <div className="relative w-full h-full flex flex-col justify-end items-center">
                  
                  {/* Subtle soft backdrop blur/shadow centered behind the giant bottle */}
                  <div className={`absolute left-1/2 bottom-[12%] w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(0,0,0,0.06),transparent_70%)] opacity-0 transition-opacity duration-700 pointer-events-none -z-10 ${index === activeIndex ? 'opacity-100' : ''}`} />
                  
                  {/* High-res bottle image — fixed height so every product renders at equal scale */}
                  <img
                    src={activeImage}
                    alt={product.name}
                    onLoad={handleImageLoad}
                    className="w-auto h-[280px] sm:h-[420px] md:h-[600px] object-contain filter drop-shadow-[0_45px_55px_rgba(0,0,0,0.22)] transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Floor Reflection */}
                  <div className="absolute top-[94%] left-0 w-full h-[50%] overflow-hidden scale-y-[-1] pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.12), transparent 70%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.12), transparent 70%)' }}>
                    <img
                      src={activeImage}
                      alt={`${product.name} reflection`}
                      className="max-w-full max-h-[166.66%] object-contain object-top"
                    />
                  </div>

                </div>
              </div>
            )
          })}
        </div>



        {/* Floating Active Caption HUD: Right half, vertically centered */}
        <div ref={hudRef} className="hidden md:flex flex-col justify-center items-start text-left w-[45%] h-full z-20 pointer-events-none font-sans pl-8 xl:pl-16">
          <div className="text-[11px] tracking-[0.35em] text-maroon/35 uppercase mb-4 font-bold animate-hud">
            {String(activeIndex + 1).padStart(2, '0')} / {String(brands.length).padStart(2, '0')}
          </div>
          <h3 className="font-rye text-2xl lg:text-4xl xl:text-5xl text-maroon tracking-wide mb-3 leading-[1.1] font-extrabold uppercase animate-hud">
            {brands[activeIndex]?.name}
          </h3>
          <p className="text-[12px] text-maroon/60 tracking-[0.1em] uppercase mb-5 font-semibold animate-hud font-mono">
            {brands[activeIndex]?.type} • {brands[activeIndex]?.dosage}
          </p>
          <div className="max-w-sm text-left text-xs leading-relaxed text-maroon/55 mb-8 font-lora animate-hud">
            {brands[activeIndex]?.description}
          </div>
          
          {/* Quick action button in HUD */}
          <button
            onClick={() => onQuickView && onQuickView(brands[activeIndex])}
            className="pointer-events-auto px-7 py-3 bg-maroon text-cream hover:bg-coral-orange text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md animate-hud"
          >
            View Profile Specs
          </button>
        </div>

        {/* HUD Fallback for Mobile views */}
        <div className="absolute inset-x-4 bottom-[10%] text-center pointer-events-none md:hidden z-20 font-sans bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-maroon/5 shadow-lg">
          <div className="text-[11px] tracking-[0.3em] text-maroon/40 uppercase mb-1">
            {String(activeIndex + 1).padStart(2, '0')} / {String(brands.length).padStart(2, '0')}
          </div>
          <h3 className="font-rye text-lg sm:text-xl text-maroon tracking-wide mb-1 font-bold uppercase">
            {brands[activeIndex]?.name}
          </h3>
          <p className="text-[11px] text-maroon/70 tracking-[0.06em] uppercase mb-3">
            {brands[activeIndex]?.type} • {brands[activeIndex]?.dosage}
          </p>
          <button
            onClick={() => onQuickView && onQuickView(brands[activeIndex])}
            className="pointer-events-auto px-5 py-2 bg-maroon text-cream text-[10px] font-bold uppercase tracking-widest rounded-full transition-all shadow-md"
          >
            View Profile
          </button>
        </div>

        {/* Scroll Progress Rail indicator */}
        <div className="absolute left-1/2 bottom-[4%] -translate-x-1/2 w-[200px] h-[2px] bg-maroon/10 rounded-full overflow-hidden z-20">
          <div
            className="h-full bg-maroon transition-all duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Skeleton Loader Overlay */}
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
