import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'

const TIMELINE_ERAS = [
  {
    index: '01 / 08',
    year: '1980',
    title: 'Founding',
    description: "NTS is founded in Pondicherry as NTS Wines by Mr. N.T. Sambath — the first step into India's IMFL and beer distribution space.",
  },
  {
    index: '02 / 08',
    year: '1980s–90s',
    title: 'Building the network',
    description: 'Starting with regional brands from Vinbros Pondicherry, NTS earns recognition from UB Group, unlocking brands across IMFL, beer, rum, brandy, gin, vodka, and export lager categories.',
  },
  {
    index: '03 / 08',
    year: '1990s',
    title: 'McDowell & Shaw Wallace era',
    description: "Portfolio expands with McDowell's and Shaw Wallace brands, establishing NTS as a serious distribution force across major national spirits and beer labels.",
  },
  {
    index: '04 / 08',
    year: '1997',
    title: '100-truck month',
    description: 'In a single month, NTS distributes 100 truckloads of Royal Challenge Beer to smash its year-end target — a defining show of scale and execution power.',
  },
  {
    index: '05 / 08',
    year: '2000s',
    title: 'Market leadership achievements',
    description: "McDowell's Traveller Brandy overtakes the No.1 McDowell's brand. Old Cask Rum surpasses Old Monk. Haywards 5000 leads the beer market for over a decade.",
  },
  {
    index: '06 / 08',
    year: 'Distillation',
    title: 'Manufacturing begins',
    description: 'NTS launches its own brands: My Choice Brandy, OK Deluxe Brandy, and King Romeo Brandy, successfully targeting the economy IMFL segments.',
  },
  {
    index: '07 / 08',
    year: 'Goa',
    title: 'Facility expansion',
    description: 'NTS establishes its own distillery in Canacona Industrial Estate, Goa — a 3-acre, pollution-free unit on the state highway connecting to NH 66.',
  },
  {
    index: '08 / 08',
    year: 'Today',
    title: 'Semi-premium portfolio',
    description: 'Launches semi-premium brands: Old Town Indian Blended Malt Whisky, East Coast Premium Malt Whisky, Grape Brandy & XXX Rum, Wanted 999 VSOP Brandy, and Zipper Vodkas.',
  },
]

function useRowReveal(options, playOnce = true) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        if (playOnce) observer.unobserve(entry.target)
        return
      }

      if (!playOnce) setInView(false)
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
  }, [options, playOnce])

  return [ref, inView]
}

function TimelineRow({ era, index }) {
  const observerOptions = useMemo(() => ({ threshold: 0.1, rootMargin: '0px 0px -10% 0px' }), [])
  const [rowRef, inView] = useRowReveal(observerOptions, true)
  const number = era.index.split('/')[0].trim()
  const isMilestone = number === '04' || number === '07'
  
  // Staircase step progressive indent on desktop (capped at max 36% indent to keep layout structured)
  const stepIndent = `${Math.min(index, 6) * 6}%`

  return (
    <motion.article
      ref={rowRef}
      id={`timeline-block-${number}`}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{ duration: 0.7, ease: [0.21, 1.02, 0.35, 1.01] }}
      className="relative py-8 md:py-12 select-none border-b border-maroon/8 last:border-0 pl-10 md:pl-0"
      style={{ '--step-indent': stepIndent }}
      aria-label={`${era.year}: ${era.title}`}
    >
      <div 
        className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 w-full md:ml-[var(--step-indent)] transition-all duration-300"
      >
        {/* Index number and Milestone pill */}
        <div className="flex items-center gap-3 shrink-0 md:w-32">
          <span className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-maroon/40">
            {era.index}
          </span>
          {isMilestone && (
            <span className="rounded-full bg-coral-orange/10 border border-coral-orange/30 px-2.5 py-0.5 font-sans text-[9px] font-black uppercase tracking-[0.16em] text-coral-orange shadow-sm animate-pulse">
              Milestone
            </span>
          )}
        </div>

        {/* Year */}
        <div className="shrink-0 md:w-40">
          <h3 className="font-rye text-4xl sm:text-5xl md:text-[56px] text-maroon leading-none">
            {era.year}
          </h3>
        </div>

        {/* Title & Description in single line-flow */}
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 flex-1">
          <h4 className="font-serif text-lg md:text-xl font-bold uppercase tracking-[0.08em] text-maroon md:w-56 shrink-0">
            {era.title}
          </h4>
          <p className="font-sans text-sm md:text-base leading-relaxed text-maroon/70 max-w-2xl">
            {era.description}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

export default function BrandTimeline() {
  const data = TIMELINE_ERAS
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 65%', 'end 35%'],
  })

  return (
    <section id="track-record" ref={sectionRef} className="relative overflow-hidden bg-cream text-maroon">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(233,84,46,0.1),transparent_30%),radial-gradient(circle_at_82%_72%,rgba(201,161,90,0.12),transparent_32%)]" />

      <div className="relative mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:py-24 z-10">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-coral-orange">Track Record</span>
          <h2 className="mt-3 font-serif text-3xl font-extrabold uppercase leading-tight tracking-normal text-maroon sm:text-4xl">
            Decades of Brand Building
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-maroon/70">
            A product-led chronology of distribution scale, market leadership, and manufacturing growth.
          </p>
        </div>

        <div className="relative">
          {/* Animated drawing timeline spine */}
          <div className="absolute top-0 bottom-0 left-5 w-1 md:left-1/2 md:-translate-x-1/2 pointer-events-none z-0">
            <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              viewBox="0 0 4 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Background track line */}
              <line x1="2" y1="0" x2="2" y2="100" className="stroke-maroon/10" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              {/* Animated active drawing path */}
              <motion.path
                d="M 2 0 L 2 100"
                style={{ pathLength: scrollYProgress }}
                className="stroke-coral-orange"
                strokeWidth="2.5"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="relative space-y-2 md:space-y-0 z-10">
            {data.map((era, index) => (
              <TimelineRow key={era.index} era={era} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
