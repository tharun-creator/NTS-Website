import React from 'react'
import { motion } from 'framer-motion'

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

const FLOATING_BOTTLES = [
  {
    id: 'bottle-1',
    src: '/bottle-2/bottle (3).png',
    name: 'Wanted 999 VSOP Brandy',
    side: 'left',
    top: '3%',
    rotate: -18,
  },
  {
    id: 'bottle-2',
    src: '/bottle-2/bottle.png',
    name: 'East Coast Brandy',
    side: 'right',
    top: '20%',
    rotate: 22,
  },
  {
    id: 'bottle-3',
    src: '/bottle-2/bottle (1).png',
    name: 'East Coast XXX Rum',
    side: 'left',
    top: '43%',
    rotate: -22,
  },
  {
    id: 'bottle-4',
    src: '/bottle-2/Product_bottle_3D_render_202607251455-removebg-preview.png',
    name: 'East Coast Sugar Rum',
    side: 'right',
    top: '67%',
    rotate: 18,
  },
  {
    id: 'bottle-5',
    src: '/bottle-2/bottle (2).png',
    name: 'Old Town Whisky',
    side: 'left',
    top: '87%',
    rotate: -15,
  },
]

const ICONS = {
  '01 / 08': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
  ),
  '02 / 08': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  '03 / 08': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  '04 / 08': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 3v5h-7V8zM5 7h6M5 11h4" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  '05 / 08': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  '06 / 08': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3h6l1 7H8L9 3z" />
      <path d="M8 10s-2 2-2 5a6 6 0 0012 0c0-3-2-5-2-5" />
      <line x1="12" y1="3" x2="12" y2="10" />
    </svg>
  ),
  '07 / 08': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  '08 / 08': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
}

function MilestoneCard({ era, index }) {
  const number = era.index.split('/')[0].trim()
  const isMilestone = number === '04' || number === '07' || number === '08' || number === '01'
  const icon = ICONS[era.index]
  const isLast = index === TIMELINE_ERAS.length - 1

  return (
    <motion.article
      initial={{ opacity: 0, y: 55, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.025, y: -4, transition: { duration: 0.25 } }}
      aria-label={`${era.year}: ${era.title}`}
      className="group relative flex items-stretch gap-6 md:gap-8"
    >
      <div className="relative flex flex-shrink-0 flex-col items-center" aria-hidden="true">
        <div
          className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 transition-transform duration-300 group-hover:scale-125 group-hover:bg-[#E9542E] group-hover:text-white"
          style={{ borderColor: '#E9542E', backgroundColor: 'rgba(233,84,46,0.12)', color: '#E9542E' }}
        >
          <span className="block h-5 w-5">{icon}</span>
        </div>
        {!isLast && (
          <div
            className="mt-1 w-0.5 flex-1"
            style={{ background: 'linear-gradient(to bottom, rgba(233,84,46,0.5), rgba(233,84,46,0.08))' }}
          />
        )}
      </div>

      <div
        className="mb-10 flex-1 overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md p-6 sm:p-8 transition-all duration-300 group-hover:shadow-[0_24px_50px_rgba(74,21,28,0.15)] group-hover:bg-white"
        style={{
          borderLeft: '5px solid #E9542E',
          boxShadow: '0 6px 28px rgba(74,21,28,0.08), 0 2px 6px rgba(74,21,28,0.04)',
        }}
      >
        {/* Top row: year + milestone badge */}
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3
            className="font-serif leading-none text-maroon"
            style={{ fontSize: 'clamp(2.8rem,4.6vw,3.6rem)', lineHeight: 1.05 }}
          >
            {era.year}
          </h3>
          {isMilestone && (
            <span
              className="rounded-full border px-3.5 py-1 font-sans text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ borderColor: 'rgba(233,84,46,0.4)', color: '#E9542E', backgroundColor: 'rgba(233,84,46,0.1)' }}
            >
              Milestone
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="mt-3 font-serif text-lg font-extrabold uppercase tracking-wide text-maroon sm:text-xl">
          {era.title}
        </h4>

        {/* Description */}
        <p
          className="mt-3 font-sans text-sm leading-relaxed text-maroon/80 sm:text-base"
          style={{ paddingBottom: 14, borderBottom: '1.5px solid rgba(74,21,28,0.14)' }}
        >
          {era.description}
        </p>
      </div>
    </motion.article>
  )
}

export default function BrandTimeline() {
  return (
    <section id="timeline" className="relative w-full overflow-hidden bg-[#F4ECDF] py-20 sm:py-28 lg:py-36 text-maroon border-t border-maroon/10" data-od-id="brand-timeline-section">
      {/* Radial Background Glow Accents */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 12% 18%, rgba(233,84,46,0.12) 0%, transparent 35%), radial-gradient(circle at 88% 78%, rgba(201,161,90,0.14) 0%, transparent 35%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#E9542E] bg-maroon/5 px-4 py-1.5 rounded-full">
            40-YEAR CHRONOLOGY
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[46px] font-black uppercase leading-tight text-maroon tracking-tight">
            DECADES OF BRAND BUILDING
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm sm:text-base leading-relaxed text-maroon/75">
            A product-led chronicle of distribution leadership, market milestones, and state-of-the-art distillery manufacturing in Goa.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mx-auto max-w-3xl lg:max-w-4xl">
          {/* Side Floating Interactive 3D Models */}
          {FLOATING_BOTTLES.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 90, scale: 0.75 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                top: b.top,
                ...(b.side === 'left' ? { left: '-210px' } : { right: '-210px' }),
              }}
              className="pointer-events-auto hidden xl:block z-30 cursor-pointer"
            >
              <motion.img
                src={b.src}
                alt={b.name}
                animate={{
                  y: [0, -22, 0],
                  rotate: [b.rotate, b.rotate + 8, b.rotate],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }}
                whileHover={{
                  scale: 1.25,
                  rotate: 0,
                  y: -14,
                  filter: 'drop-shadow(0 35px 55px rgba(233,84,46,0.5)) drop-shadow(0 10px 20px rgba(0,0,0,0.4))',
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
                className="h-80 lg:h-[410px] w-auto object-contain filter drop-shadow-[0_28px_45px_rgba(0,0,0,0.38)] transition-all"
              />
            </motion.div>
          ))}

          {TIMELINE_ERAS.map((era, i) => (
            <MilestoneCard key={era.index} era={era} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
