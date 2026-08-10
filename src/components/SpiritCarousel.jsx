import React, { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import BottleStage3D from "./BottleStage3D"

const TRANSITIONS = {
  bottleSpring: { type: "spring", stiffness: 120, damping: 16 },
  text: { duration: 0.44, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  bg: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
}

const PRODUCTS = [
  {
    id: "wanted-999",
    name: "Wanted 999 VSOP Brandy",
    tagline: "Rich grape, vanilla and mixed fruit depth.",
    price: 35,
    abv: "42.8%",
    category: "Brandy",
    style: "Rare & Rich",
    objPath: "/models/wanted/wanted.obj",
    mtlPath: "/models/wanted/wanted.mtl",
    fallbackImage: "/bottle-2/bottle (3).png",
    modelPose: {
      axisRotation: [0, 0, -Math.PI / 2],
      stageRotation: [0.16, -0.42, 0.62],
      scale: 0.9,
      position: [-0.08, 0, 0],
    },
    accentColor: "#E9542E",
    description: "A fruit-forward VSOP brandy with grape, pineapple brightness, vanilla warmth and a rounded finish.",
    bgElements: [
      { type: "orb", className: "right-[2%] top-[12%] h-52 w-52 bg-[#E9542E]/28 blur-2xl" },
      { type: "swirl", className: "left-[9%] top-[21%] h-36 w-36 border-[#F4A6C8]/35" },
      { type: "drop", className: "right-[24%] bottom-[15%] h-16 w-16 bg-[#E3C98F]/24" },
    ],
  },
  {
    id: "east-coast-brandy",
    name: "East Coast Indian Blended Grape Brandy",
    tagline: "Fig, honey and a smooth melon finish.",
    price: 26,
    abv: "42.8%",
    category: "Brandy",
    style: "Smooth Finish",
    objPath: "/models/brown-east-coast/brown-east-coast.obj",
    mtlPath: "/models/brown-east-coast/brown-east-coast.mtl",
    fallbackImage: "/bottle-2/bottle.png",
    modelPose: {
      axisRotation: [0, 0, -Math.PI / 2],
      stageRotation: [0.16, -0.42, 0.62],
      scale: 0.9,
      position: [-0.08, 0, 0],
    },
    accentColor: "#B47A4B",
    description: "A grape brandy profile with honeyed lift, ripe fig notes and a clean, quietly luxurious finish.",
    bgElements: [
      { type: "orb", className: "left-[10%] top-[14%] h-48 w-48 bg-[#B47A4B]/30 blur-2xl" },
      { type: "swirl", className: "right-[12%] bottom-[12%] h-40 w-40 border-[#E3C98F]/30" },
      { type: "grain", className: "right-[28%] top-[24%] text-[#F4ECDF]/22" },
    ],
  },
  {
    id: "east-coast-rum",
    name: "East Coast XXX Rum",
    tagline: "Oak-aged depth, spice and cocoa warmth.",
    price: 22,
    abv: "42.8%",
    category: "Rum",
    style: "Dark Spiced",
    objPath: "/models/blue-east-coast/blue-east-coast.obj",
    mtlPath: "/models/blue-east-coast/blue-east-coast.mtl",
    fallbackImage: "/bottle-2/bottle (1).png",
    modelPose: {
      axisRotation: [0, 0, -Math.PI / 2],
      stageRotation: [0.16, -0.42, 0.62],
      scale: 0.9,
      position: [-0.08, 0, 0],
    },
    accentColor: "#1E6FAD",
    description: "Coastal dark rum with traditional spice, tropical lift, oak shadow and a cocoa-tinged close.",
    bgElements: [
      { type: "orb", className: "right-[6%] top-[18%] h-52 w-52 bg-[#1E6FAD]/30 blur-2xl" },
      { type: "wave", className: "left-[6%] bottom-[16%] h-20 w-52 border-[#5FB8D9]/35" },
      { type: "drop", className: "left-[24%] top-[20%] h-14 w-14 bg-[#C9A15A]/22" },
    ],
  },
  {
    id: "east-coast-sugar-rum",
    name: "East Coast Sugar New Rum",
    tagline: "Fresh sugar-cane spirit with tropical clarity.",
    price: 20,
    abv: "42.8%",
    category: "Rum",
    style: "Light & Fresh",
    objPath: "/models/white-east-coast/white-east-coast.obj",
    mtlPath: "/models/white-east-coast/white-east-coast.mtl",
    fallbackImage: "/bottle-2/Product_bottle_3D_render_202607251455-removebg-preview.png",
    modelPose: {
      axisRotation: [0, 0, -Math.PI / 2],
      stageRotation: [0.16, -0.42, 0.62],
      scale: 0.72,
      position: [-0.08, -0.38, 0],
    },
    accentColor: "#2E8B57",
    description: "A lighter sugar-cane rum with clean maritime character, gentle sweetness and fresh cocktail energy.",
    bgElements: [
      { type: "orb", className: "left-[6%] top-[14%] h-52 w-52 bg-[#2E8B57]/30 blur-2xl" },
      { type: "leaf", className: "right-[16%] top-[22%] h-24 w-10 bg-[#A8E6CF]/22" },
      { type: "wave", className: "right-[9%] bottom-[16%] h-20 w-52 border-[#A8E6CF]/32" },
    ],
  },
]

const modelVariants = {
  enter: (dir) => ({ x: dir > 0 ? 120 : -120, opacity: 0, rotateY: dir > 0 ? 20 : -20, scale: 0.92 }),
  center: { x: 0, opacity: 1, rotateY: 0, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -120 : 120, opacity: 0, rotateY: dir > 0 ? -20 : 20, scale: 0.9 }),
}

function ModelStage({ product, direction, reduceMotion, goNext, goPrev, pause, resume }) {
  return (
    <div className="relative z-20 order-1 min-h-[360px] w-full md:order-2 md:min-h-[620px]">
      <div className="absolute left-1/2 top-1/2 h-[min(76vw,520px)] w-[min(76vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/10 bg-cream/[0.035] shadow-[inset_0_0_100px_rgba(244,236,223,0.05)]" />
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={product.id}
          custom={direction}
          variants={modelVariants}
          initial={reduceMotion ? { opacity: 0 } : "enter"}
          animate={reduceMotion ? { opacity: 1 } : "center"}
          exit={reduceMotion ? { opacity: 0 } : "exit"}
          transition={reduceMotion ? { duration: 0.2 } : TRANSITIONS.bottleSpring}
          className="absolute inset-0"
          style={{ perspective: 1200 }}
          onDragStart={pause}
          onHoverStart={pause}
          onHoverEnd={resume}
        >
          <BottleStage3D
            objPath={product.objPath}
            mtlPath={product.mtlPath}
            accentColor={product.accentColor}
            fallbackImage={product.fallbackImage}
            productName={product.name}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function renderElement(element) {
  const className = `absolute pointer-events-none will-change-transform ${element.className}`
  if (element.type === "barrel") return <div className={`${className} rounded-[44%] border-2 opacity-80`} />
  if (element.type === "grain") {
    return (
      <div className={`${className} flex gap-1 font-serif text-4xl leading-none opacity-80`}>
        <span>*</span>
        <span className="translate-y-5">*</span>
        <span className="-translate-y-2">*</span>
      </div>
    )
  }
  if (element.type === "swirl") return <div className={`${className} rounded-full border-[18px] border-r-transparent opacity-75 blur-[1px]`} />
  if (element.type === "wave") return <div className={`${className} rounded-[50%] border-b-[16px] border-l-0 border-r-0 border-t-0 opacity-80 blur-[1px]`} />
  if (element.type === "leaf") return <div className={`${className} rotate-45 rounded-[90%_0_90%_0] blur-[1px]`} />
  if (element.type === "drop") return <div className={`${className} rotate-45 rounded-[70%_70%_70%_8%] blur-[1px]`} />
  return <div className={`${className} rounded-full`} />
}

function BackgroundLayer({ product, direction, reduceMotion }) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      animate={{
        background: `radial-gradient(circle at 80% 18%, ${product.accentColor}35, transparent 32%), radial-gradient(circle at 16% 84%, ${product.accentColor}24, transparent 30%), linear-gradient(135deg, #0a1f22 0%, #0d2b30 48%, #071316 100%)`,
      }}
      transition={reduceMotion ? { duration: 0 } : TRANSITIONS.bg}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(244,236,223,0.08),transparent_36%)]" />
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={product.id}
          custom={direction}
          className="absolute inset-0"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? 34 : -34, scale: 0.95 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? -24 : 24, scale: 1.1 }}
          transition={reduceMotion ? { duration: 0.2 } : { ...TRANSITIONS.bg, delay: 0.1 }}
        >
          {product.bgElements.map((element, index) => (
            <motion.div
              key={`${product.id}-${index}`}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, index % 2 ? -10 : 8, 0] }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { opacity: { delay: 0.08 + index * 0.08, duration: 0.32 }, y: { duration: 5 + index, repeat: Infinity, ease: "easeInOut" } }
              }
            >
              {renderElement(element)}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

function ProductText({ product, activeIndex, total, reduceMotion, onQuickView }) {
  return (
    <div className="relative z-20 order-2 mx-auto w-full max-w-xl text-center md:order-1 md:mx-0 md:text-left">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={product.id}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={reduceMotion ? { duration: 0.2 } : TRANSITIONS.text}
          className="space-y-5"
        >
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <span className="h-px w-10" style={{ backgroundColor: product.accentColor }} />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-cream/64">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <div className="space-y-3">
            <span
              className="inline-flex rounded-full border px-3.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ borderColor: `${product.accentColor}66`, color: product.accentColor, backgroundColor: `${product.accentColor}14` }}
            >
              {product.category} / {product.style}
            </span>
            <h3 className="font-serif text-3xl font-extrabold uppercase leading-[1.04] tracking-normal text-cream sm:text-4xl lg:text-5xl">
              {product.name}
            </h3>
            <p className="mx-auto max-w-md font-sans text-sm font-semibold leading-relaxed text-gold-soft md:mx-0">{product.tagline}</p>
            <p className="mx-auto max-w-md font-sans text-sm leading-[1.8] text-cream/70 md:mx-0">{product.description}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <span className="rounded-md border border-cream/12 bg-cream/8 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-cream/85">
              ABV {product.abv}
            </span>
            <span className="rounded-md border border-cream/12 bg-cream/8 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-cream/85">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              onQuickView &&
              onQuickView({
                id: product.id,
                name: product.name,
                type: product.category,
                dosage: product.style,
                tagline: product.tagline,
                desc: product.description,
                price: product.price,
                abv: product.abv,
                colorGradient: "from-[#0a1f22] to-[#0d2b30]",
              })
            }
            className="rounded-full bg-cream px-7 py-3.5 font-sans text-[10px] font-extrabold uppercase tracking-widest text-maroon shadow-lg shadow-black/20 transition-colors hover:bg-coral-orange hover:text-white focus:outline-none focus:ring-2 focus:ring-coral-orange focus:ring-offset-2 focus:ring-offset-[#0a1f22] active:scale-[0.98]"
          >
            View Profile Specs
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function CarouselControls({ products, activeIndex, accentColor, goTo, goPrev, goNext }) {
  return (
    <div className="relative z-30 mx-auto flex max-w-[1280px] items-center justify-center gap-5 px-6 pb-12">
      <motion.button
        type="button"
        onClick={goPrev}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/18 bg-cream/10 text-cream shadow-lg shadow-black/20 backdrop-blur-md transition-colors hover:bg-cream hover:text-maroon focus:outline-none focus:ring-2 focus:ring-coral-orange"
        aria-label="Previous spirit"
      >
        <ChevronLeft className="h-5 w-5" />
      </motion.button>

      <div className="flex h-8 items-center gap-2" aria-label={`Spirit ${activeIndex + 1} of ${products.length}`}>
        {products.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(index)}
            className="relative h-5 rounded-full px-0.5 focus:outline-none focus:ring-2 focus:ring-coral-orange"
            aria-label={`Show ${item.name}`}
            aria-current={index === activeIndex ? "true" : undefined}
          >
            <span className="block h-1.5 w-5 rounded-full bg-cream/24" />
            {index === activeIndex && (
              <motion.span
                layoutId="activeDot"
                className="absolute left-0.5 top-1/2 h-1.5 w-10 -translate-y-1/2 rounded-full"
                style={{ backgroundColor: accentColor }}
                transition={{ type: "spring", stiffness: 360, damping: 28 }}
              />
            )}
          </button>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={goNext}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/18 bg-cream/10 text-cream shadow-lg shadow-black/20 backdrop-blur-md transition-colors hover:bg-cream hover:text-maroon focus:outline-none focus:ring-2 focus:ring-coral-orange"
        aria-label="Next spirit"
      >
        <ChevronRight className="h-5 w-5" />
      </motion.button>
    </div>
  )
}

export default function SpiritCarousel({ onQuickView }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const resumeTimer = useRef(null)
  const product = PRODUCTS[activeIndex]

  const goTo = useCallback(
    (targetIndex) => {
      const normalized = ((targetIndex % PRODUCTS.length) + PRODUCTS.length) % PRODUCTS.length
      if (normalized === activeIndex) return
      setDirection(normalized > activeIndex ? 1 : -1)
      setActiveIndex(normalized)
    },
    [activeIndex],
  )

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  const pause = useCallback(() => {
    setPaused(true)
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
  }, [])

  const resume = useCallback(() => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => setPaused(false), 1400)
  }, [])

  useEffect(() => {
    if (paused || reduceMotion) return undefined
    const timer = window.setInterval(goNext, 6000)
    return () => window.clearInterval(timer)
  }, [goNext, paused, reduceMotion])

  useEffect(
    () => () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    },
    [],
  )

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden text-cream"
      aria-roledescription="carousel"
      aria-label="NTS proprietary spirits 3D model carousel"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <BackgroundLayer product={product} direction={direction} reduceMotion={reduceMotion} />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 pt-16 text-center sm:px-12 sm:pt-24">
        <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-coral-orange">PROPRIETARY portfolio</span>
        <h2 className="mx-auto mt-3 max-w-3xl font-serif text-3xl font-extrabold uppercase leading-tight tracking-normal text-cream sm:text-4xl">
          Spirits as Delicious as They Are Delightful
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-cream/70">
          We manufacture premium proprietary products across 4 categories. Browse our premium distillation range and add brands to your inquiry portfolio.
        </p>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[690px] max-w-[1280px] grid-cols-1 items-center gap-4 px-6 py-8 sm:px-12 md:min-h-[660px] md:grid-cols-2 lg:px-16">
        <ProductText product={product} activeIndex={activeIndex} total={PRODUCTS.length} reduceMotion={reduceMotion} onQuickView={onQuickView} />
        <ModelStage product={product} direction={direction} reduceMotion={reduceMotion} goNext={goNext} goPrev={goPrev} pause={pause} resume={resume} />
      </div>

      <CarouselControls products={PRODUCTS} activeIndex={activeIndex} accentColor={product.accentColor} goTo={goTo} goPrev={goPrev} goNext={goNext} />
    </section>
  )
}
