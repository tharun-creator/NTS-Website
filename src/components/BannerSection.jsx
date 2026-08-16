import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BANNERS = [
  {
    id: 1,
    src: '/banner/banner-1.png',
    alt: 'Old Town Whisky - Crafted for the bold'
  },
  {
    id: 2,
    src: '/banner/banner-2.png',
    alt: 'NTS Blenders - Four ways to stand out collection'
  },
  {
    id: 3,
    src: '/banner/banner-3.png',
    alt: 'East Coast Rum - Smooth blend, bold character'
  }
]

export default function BannerSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-slide transition every 4 seconds
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isHovered])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)
  }

  return (
    <section 
      className="manifesto dark-zone relative w-full h-[65vh] sm:h-[80vh] lg:h-[90vh] min-h-[500px] max-h-[900px] overflow-hidden bg-[#0A0405] text-white" 
      id="why" 
      data-od-id="brand-manifesto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pure Full-Bleed Animated Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {BANNERS.map((banner, index) => {
          const isActive = index === currentIndex
          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={banner.src}
                alt={banner.alt}
                className={`w-full h-full object-cover object-center transform transition-transform duration-[4000ms] ease-out ${
                  isActive ? 'scale-100' : 'scale-105'
                }`}
              />
              {/* Ultra subtle top/bottom scrim for seamless integration */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
            </div>
          )
        })}
      </div>

      {/* Sleek Minimalist Side Chevrons (Shows on Hover / Interactive) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-black/30 hover:bg-[#E9542E] backdrop-blur-md border border-white/10 text-white/80 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-2xl opacity-80 hover:opacity-100"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-black/30 hover:bg-[#E9542E] backdrop-blur-md border border-white/10 text-white/80 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-2xl opacity-80 hover:opacity-100"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Luxury Minimalist Slide Indicators & Counter at Bottom Center */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/15 shadow-xl">
        <div className="flex items-center gap-2">
          {BANNERS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex ? 'w-8 bg-[#E9542E]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <span className="h-3 w-[1px] bg-white/20" />

        <div className="font-mono text-xs tracking-widest text-white/80 font-bold">
          0{currentIndex + 1} / 0{BANNERS.length}
        </div>
      </div>
    </section>
  )
}
