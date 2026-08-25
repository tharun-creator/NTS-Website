import React from 'react'
import { motion } from 'framer-motion'

export default function OldTownDistillery() {
  return (
    <section
      className="oldtown-section relative w-full min-h-[100vh] sm:min-h-[105vh] lg:min-h-[110vh] bg-[#030303] text-white overflow-hidden flex flex-col justify-between py-8 sm:py-12 select-none border-t border-white/10"
      id="lifestyle"
      data-od-id="distillery-and-production"
    >
      {/* 2. Giant Vertical Watermark on Left Margin */}
      <div className="absolute left-0 top-0 bottom-0 w-36 pointer-events-none hidden md:flex items-center justify-center z-0 overflow-hidden">
        <span
          className="font-serif text-[clamp(4.5rem,8vw,7.5rem)] font-black uppercase tracking-tight text-white/[0.05] select-none whitespace-nowrap -rotate-90 origin-center"
          style={{ fontFamily: 'var(--font-jd-display)' }}
        >
          NTS BLENDERS
        </span>
      </div>


      {/* 4. Main Stage: Giant Z-Structure Typography & Foreground Old Town Bottle */}
      <div className="oldtown-stage relative z-10 mx-auto flex w-full max-w-[1540px] flex-1 items-center justify-center px-4 py-2 sm:px-8">
        <div className="oldtown-mobile-kicker" aria-hidden="true">
          <span>Old Town</span>
          <strong>Malt Blended Whisky</strong>
        </div>
        
        {/* Giant Z-Structure Typography behind bottle: CRAFTED (Top-Left) -> WITH (Center) -> MASTERY (Bottom-Right) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[1400px] flex flex-col justify-center px-4 sm:px-12 font-serif font-black uppercase text-white tracking-normal"
            style={{ fontFamily: 'var(--font-jd-display)' }}
            >
            {/* Row 1: Top-Left -> CRAFTED */}
            <div className="oldtown-word-row oldtown-word-row--crafted w-full flex justify-start pl-2 sm:pl-8 lg:pl-16">
              <span className="oldtown-word text-[clamp(3.8rem,13vw,11.5rem)] leading-[0.84] tracking-tight block text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
                CRAFTED
              </span>
            </div>

            {/* Row 2: Center -> WITH */}
            <div className="oldtown-word-row oldtown-word-row--with w-full flex justify-center mt-[-1.5vw]">
              <span className="oldtown-word text-[clamp(3.8rem,13vw,11.5rem)] leading-[0.84] tracking-tight block text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
                WITH
              </span>
            </div>

            {/* Row 3: Bottom-Right -> MASTERY */}
            <div className="oldtown-word-row oldtown-word-row--mastery w-full flex justify-end pr-2 sm:pr-8 lg:pr-16 mt-[-1.5vw]">
              <span className="oldtown-word text-[clamp(3.8rem,13vw,11.5rem)] leading-[0.84] tracking-tight block text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
                MASTERY
              </span>
            </div>
          </motion.div>
        </div>

        {/* Centerpiece Bottle: Large Towering Old Town Malt Whisky */}
        <div className="relative z-20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            <img
              src="/portfolio-images/old-town.png"
              alt="Old Town Indian Blended Malt Whisky - Goa Distillery"
              loading="lazy"
              decoding="async"
              className="oldtown-bottle h-[82vh] sm:h-[92vh] lg:h-[102vh] xl:h-[108vh] max-h-[1040px] w-auto scale-105 object-contain drop-shadow-[0_35px_65px_rgba(0,0,0,0.95)] transition-transform duration-500 hover:scale-110 cursor-pointer"
            />
            {/* Realistic Floor Shadow */}
            <div className="oldtown-floor-shadow absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-9 rounded-full bg-black/95 blur-lg pointer-events-none" />
          </motion.div>
        </div>

      </div>

      {/* Bottom spacer for clean margin */}
      <div className="h-4 sm:h-8" />
    </section>
  )
}
