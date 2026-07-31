import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

gsap.registerPlugin(ScrollTrigger)

const landingImage = new URL('../Landing.png', import.meta.url).href
const introBackgroundImage = new URL('../Luxury_liquor_background.jpeg', import.meta.url).href
const introImage = new URL('../images/WhatsApp_Image_2026-07-23_at_12.21.13_202607231334.jpeg', import.meta.url).href
const splitImage = new URL('../images/WhatsApp_Image_2026-07-23_at_12.21.16_202607231334.jpeg', import.meta.url).href
const founderImage = new URL('../images/WhatsApp_Image_2026-07-23_at_12.21.05_202607231329.jpeg', import.meta.url).href
const canaconaShowcaseImage = new URL('../images/Canacona_vodka_bottles_orange_ba…_202607231523.jpeg', import.meta.url).href
const oldTownObj = new URL('../3d-models/old town/old+town.obj', import.meta.url).href
const oldTownBasecolor = new URL('../3d-models/old town/old+town_basecolor.jpg', import.meta.url).href
const oldTownNormal = new URL('../3d-models/old town/old+town_normal.jpg', import.meta.url).href
const oldTownRoughness = new URL('../3d-models/old town/old+town_roughness.jpg', import.meta.url).href
const oldTownMetallic = new URL('../3d-models/old town/old+town_metallic.jpg', import.meta.url).href
const newsletterBottleA = new URL('../bottle-2/bottle (2).png', import.meta.url).href
const newsletterBottleB = new URL('../bottle-2/bottle (1).png', import.meta.url).href
const newsletterBottleC = new URL('../bottle-2/bottle (3).png', import.meta.url).href
const newsletterBottleD = new URL('../bottle-2/bottle.png', import.meta.url).href
const newsletterBottleE = new URL('../bottle-2/Product_bottle_3D_render_202607251455-removebg-preview.png', import.meta.url).href
const newsletterBottleF = new URL('../1/Liquor_bottle_on_white_background_202607250547 (1).png', import.meta.url).href
const whyBottleLineup = new URL('../bottle-2/tt.png', import.meta.url).href

const navItems = ['Home', 'About', 'Portfolio', 'Process', 'Workshop']

const portfolioModels = [
  {
    tag: 'WHISKY',
    name: 'Old Town',
    desc: 'Indian blended malt with smoke, dry fruit, and a long warm finish.',
    image: new URL('../bottle-2/bottle (2).png', import.meta.url).href,
  },
  {
    tag: 'BRANDY',
    name: 'Wanted 999',
    desc: 'VSOP brandy with grape, vanilla, and fruit-forward depth.',
    image: new URL('../bottle-2/bottle (3).png', import.meta.url).href,
  },
  {
    tag: 'RUM',
    name: 'East Coast XXX',
    desc: 'Coastal rum shaped by spice, cocoa, and a rounded finish.',
    image: new URL('../bottle-2/bottle (1).png', import.meta.url).href,
  },
  {
    tag: 'MALT',
    name: 'East Coast Malt',
    desc: 'Honey, apple, and vanilla notes shaped for elegant everyday pours.',
    image: new URL('../bottle-2/bottle.png', import.meta.url).href,
  },
  {
    tag: 'BRANDY',
    name: 'Reserve Grape',
    desc: 'A smooth grape brandy profile with honeyed depth and quiet warmth.',
    image: new URL('../1/Liquor_bottle_on_white_background_202607250547 (4).png', import.meta.url).href,
  },
  {
    tag: 'WHISKY',
    name: 'Heritage Blend',
    desc: 'Mature wood notes, sweet spice, and a composed premium finish.',
    image: new URL('../1/Liquor_bottle_on_white_background_202607250547 (5).png', import.meta.url).href,
  },
  {
    tag: 'GIN',
    name: 'Coastal Dry',
    desc: 'Botanical clarity and mineral freshness built for modern bar menus.',
    image: new URL('../1/Liquor_bottle_on_white_background_202607250547 (6).png', import.meta.url).href,
  },
  {
    tag: 'RUM',
    name: 'Night Coast',
    desc: 'Dark cocktails, cocoa warmth, and spice-led character for late hours.',
    image: new URL('../1/Liquor_bottle_on_white_background_202607250547 (7).png', import.meta.url).href,
  },
  {
    tag: 'BRANDY',
    name: 'VSOP Gold',
    desc: 'Creamy vanilla and ripe fruit notes arranged with lasting elegance.',
    image: new URL('../1/Liquor_bottle_on_white_background_202607250548 (1).png', import.meta.url).href,
  },
  {
    tag: 'WHISKY',
    name: 'Quiet Barrel',
    desc: 'Balanced malt, gentle smoke, and a refined signature aftertaste.',
    image: new URL('../1/Liquor_bottle_on_white_background_202607250548 (2).png', import.meta.url).href,
  },
  {
    tag: 'VODKA',
    name: 'Clear House',
    desc: 'Neutral precision, polished mouthfeel, and dependable mixability.',
    image: new URL('../1/Liquor_bottle_on_white_background_202607250548 (3).png', import.meta.url).href,
  },
]

const process = [
  {
    title: 'Blend',
    text: 'Spirit profiles are built around repeatable taste, aroma, and finish targets.',
    points: ['Profile mapping', 'Aroma control', 'Finish testing'],
    note: 'Checked against batch standards.',
    icon: 'M5 18h14M7 18V7l5-3 5 3v11M9 10h6M9 14h6',
  },
  {
    title: 'Bottle',
    text: 'Production lines handle controlled filling, sealing, labeling, and inspection.',
    points: ['Measured filling', 'Seal review', 'Label alignment'],
    note: 'Designed for consistent shelf presence.',
    icon: 'M12 3v5m-3 0h6l1 11H8L9 8Zm0 4h6',
  },
  {
    title: 'Dispatch',
    text: 'Secure warehousing and logistics keep partner supply moving with discipline.',
    points: ['Stock rotation', 'Secure storage', 'Trade dispatch'],
    note: 'Prepared for reliable market movement.',
    icon: 'M4 7h10v8H4V7Zm10 3h3l3 3v2h-6v-5ZM7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  },
]

const oldTownStoryCards = [
  {
    title: 'Selected Grain',
    text: "Only carefully selected grains are blended to create Old Town's smooth foundation.",
    icon: 'M5 17c5.8-.4 10.4-4.8 12-10.5M7 15c-.4-4.4 2.8-8 7.6-9.5M9 19c2.2-4.5 5.5-7.3 10-8.5M5 17c2.1.2 4-.3 5.5-1.4',
  },
  {
    title: 'Traditional Distillation',
    text: 'Slow copper still distillation preserves aroma, richness, and depth of character.',
    icon: 'M8 19h8M10 19V9h4v10M9 9h6l1.5-4h-9L9 9Zm-3 7h12M6 16c0-2.5 2.7-4 6-4s6 1.5 6 4',
  },
  {
    title: 'Oak Barrel Maturation',
    text: 'Years inside oak barrels develop notes of vanilla, smoke, spice, and warm oak.',
    icon: 'M6 8c1.5-1.2 10.5-1.2 12 0M6 16c1.5 1.2 10.5 1.2 12 0M7 8v8m10-8v8M5 12h14M8 6h8c1.7 0 3 2.7 3 6s-1.3 6-3 6H8c-1.7 0-3-2.7-3-6s1.3-6 3-6Z',
  },
  {
    title: 'Signature Blend',
    text: 'Master blenders refine every batch until it reaches the unmistakable Old Town profile.',
    icon: 'M10 3h4v5l1.2 1.7c.5.7.8 1.6.8 2.5V20H8v-7.8c0-.9.3-1.8.8-2.5L10 8V3Zm0 4h4M9 14h6',
  },
]

const companySnapshot = [
  {
    value: '1980',
    label: 'Founded in Pondicherry as NTS Wines',
  },
  {
    value: 'Goa',
    label: 'Distillery at Canacona Industrial Estate',
  },
  {
    value: '3 acres',
    label: 'Pollution-free manufacturing unit',
  },
  {
    value: 'IMFL',
    label: 'Whisky, rum, brandy, vodka, and partnerships',
  },
]

const portfolioInformation = [
  {
    title: 'Company Profile',
    text: 'NTS Blenders and Distillers Pvt. Ltd. grew from a distribution venture into a focused spirits house with manufacturing, brand development, and partner support capabilities.',
  },
  {
    title: 'Portfolio Purpose',
    text: 'This website works as a company portfolio: it presents the NTS story, production strengths, product range, operating standards, and partnership opportunities in one readable place.',
  },
  {
    title: 'Track Record',
    text: 'The business has worked across IMFL, beer, rum, brandy, gin, vodka, imported FMFL, and regional trade networks before building its own manufactured brands.',
  },
  {
    title: 'Facility Overview',
    text: 'The Goa facility supports blending, bottling, warehousing, quality checks, labeling, packing, and dispatch workflows for NTS brands and partner requirements.',
  },
]

const capacitySnapshot = [
  ['Blending capacity', '1,40,000 L current', '5,40,000 L planned'],
  ['ENA storage', '1,20,000 L current', '3,00,000 L planned'],
  ['Production capacity', '75,000 cases/month current', '2,50,000 cases/month planned'],
  ['Bonded warehouse', '25,000 cases current', '60,000 cases planned'],
]

const footerNavigation = ['About', 'Portfolio', 'Process']
const footerSocials = [
  ['IN', '@nts.distillers'],
  ['LI', 'NTS Blenders'],
  ['IG', '@ntsspirits'],
  ['YT', 'NTS House'],
  ['X', '@ntslegacy'],
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isMobile
}

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex self-start rounded-full bg-[#B7FF3C] px-3 py-1 text-sm font-bold uppercase tracking-[0.12em] text-[#111] transition-transform duration-300 hover:-translate-y-0.5">
      {children}
    </span>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" aria-hidden="true">
      <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FooterArrow({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-[1.08] ${dark ? 'border-[#111] bg-[#111] text-white' : 'border-[#111] bg-transparent text-[#111]'}`}>
      <svg viewBox="0 0 24 24" className="h-5 w-5 -rotate-45" fill="none" aria-hidden="true">
        <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function WeatherIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SmallIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1" fill="none" aria-hidden="true">
      <path d={path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Navbar() {
  return (
    <nav className="absolute left-0 right-0 top-0 z-50 px-5 py-5 md:px-8">
      <div className="mx-auto flex h-12 max-w-[1280px] items-center justify-between text-[#111]">
        <a href="#home" className="inline-flex h-12 items-center text-sm font-semibold tracking-tight text-[#111] transition-opacity duration-300 hover:opacity-70">
          NTS
        </a>
        <div className="hidden h-12 items-center gap-8 text-sm font-semibold md:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="relative inline-flex h-12 items-center opacity-80 transition-opacity duration-300 after:absolute after:bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#111] after:transition-transform after:duration-300 hover:opacity-100 hover:after:scale-x-100">
              {item}
            </a>
          ))}
        </div>
        <a href="#contact" className="inline-flex h-11 items-center justify-center rounded-full bg-[#111] px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B7FF3C] hover:text-[#111] active:translate-y-0">
          Start a Conversation
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1, 1.06])
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -18])

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-[#F8F8F6] text-[#111]">
      <Navbar />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[48svh] md:inset-0 md:h-auto"
        style={{ scale: heroScale, y: heroY }}
      >
        <img
          src={landingImage}
          alt="NTS premium spirits bottle lineup"
          className="h-full w-full object-contain object-bottom md:object-cover md:object-[58%_center]"
        />
      </motion.div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-[1] h-[58%] w-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.42)_34%,rgba(0,0,0,0.16)_62%,rgba(0,0,0,0)_82%)] md:h-[64%] md:w-[68%]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1280px] flex-col items-start justify-end px-5 pb-8 pt-[48svh] sm:pb-10 md:px-8 md:pb-16 md:pt-24">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <h1 className="max-w-[620px] text-[36px] font-bold leading-[0.98] tracking-[-0.03em] text-white min-[390px]:text-[40px] md:text-[56px] md:leading-[0.95] md:tracking-[-0.04em] lg:text-[72px]">
            Distilled with intent. Designed for presence.
          </h1>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.12 }} className="mt-5 max-w-[420px] md:mt-6">
          <p className="text-[15px] font-normal leading-[1.65] text-white md:text-base md:leading-[1.7]">
            The official company portfolio for NTS Blenders and Distillers Pvt. Ltd., covering our story, spirits range, Goa production facility, and partnership capabilities.
          </p>
          <a href="#portfolio" className="group mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#111] px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B7FF3C] active:translate-y-0 md:mt-6">
            View the collection <ArrowIcon />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#F5F5F3] px-5 py-[88px] md:px-8 md:py-[120px]">
      <img
        src={introBackgroundImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#F5F5F3]/42" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,245,243,0.34),rgba(245,245,243,0.68)_76%)]" />
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="relative z-10 mx-auto max-w-[1280px] text-center">
        <Badge>Why</Badge>
        <h2 className="mx-auto mt-4 max-w-xl text-[48px] font-bold leading-none tracking-[-0.03em] text-[#111]">
          We make premium spirits. Nothing else.
        </h2>
        <div className="mt-12 grid items-center gap-8 md:grid-cols-3">
          <p className="mx-auto max-w-[250px] text-left text-base font-normal leading-[1.85] text-[#444] md:text-center">
            NTS began in 1980 as NTS Wines in Pondicherry and grew through distribution discipline, trade relationships, and a sharp understanding of South India's spirits market.
          </p>
          <div className="mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[28px] border border-[#E7E7E3] bg-[#F5F5F3] transition-colors duration-300 hover:border-[#111]">
            <img src={whyBottleLineup} alt="NTS premium spirits bottle lineup" className="h-full w-full scale-[1.18] object-contain object-bottom transition-transform duration-[800ms] hover:scale-[1.22]" />
          </div>
          <p className="mx-auto max-w-[250px] text-left text-base font-normal leading-[1.85] text-[#444] md:text-center">
            Today that experience supports a focused portfolio from Goa: whisky, rum, brandy, vodka, manufacturing services, and long-term brand partnerships.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

function CompanyPortfolio() {
  return (
    <section className="bg-white px-5 py-[88px] md:px-8 md:py-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="lg:sticky lg:top-28">
            <Badge>Company portfolio</Badge>
            <h2 className="mt-5 max-w-[560px] text-[42px] font-bold leading-[0.98] tracking-[-0.04em] text-[#111] md:text-[56px]">
              A clear profile of NTS, its products, and its manufacturing strength.
            </h2>
            <p className="mt-6 max-w-[520px] text-base font-normal leading-[1.75] text-[#444]">
              Use this portfolio to understand the company at a glance: where NTS began, what it produces, how the Goa facility is structured, and where partnership conversations can begin.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {companySnapshot.map((item) => (
                <div key={item.value} className="rounded-[24px] border border-[#E7E7E3] bg-[#F8F8F6] p-5">
                  <p className="text-[32px] font-bold leading-none tracking-[-0.04em] text-[#111]">{item.value}</p>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#444]">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {portfolioInformation.map((item) => (
                <article key={item.title} className="rounded-[24px] border border-[#E7E7E3] bg-white p-6 shadow-[0_18px_48px_rgba(17,17,17,0.06)]">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#111]">{item.title}</h3>
                  <p className="mt-3 text-[15px] font-normal leading-[1.75] text-[#444]">{item.text}</p>
                </article>
              ))}
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#E7E7E3] bg-[#111] text-white">
              <div className="border-b border-white/10 p-6">
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/55">Capacity snapshot</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">Current scale and planned expansion</h3>
              </div>
              <div className="divide-y divide-white/10">
                {capacitySnapshot.map(([label, current, planned]) => (
                  <div key={label} className="grid gap-2 p-5 text-sm leading-6 sm:grid-cols-[1fr_1fr_1fr] sm:items-center">
                    <p className="font-semibold text-white">{label}</p>
                    <p className="text-white/72">{current}</p>
                    <p className="text-[#B7FF3C]">{planned}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function OldTownModel({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null)
  const scrollProgress = useRef(0)
  const obj = useLoader(OBJLoader, oldTownObj)
  const [basecolorMap, normalMap, roughnessMap, metallicMap] = useLoader(THREE.TextureLoader, [
    oldTownBasecolor,
    oldTownNormal,
    oldTownRoughness,
    oldTownMetallic,
  ])

  useMotionValueEvent(progress, 'change', (latest) => {
    scrollProgress.current = latest
  })

  const bottle = useMemo(() => {
    const clone = obj.clone()
    basecolorMap.colorSpace = THREE.SRGBColorSpace
    ;[basecolorMap, normalMap, roughnessMap, metallicMap].forEach((texture) => {
      texture.anisotropy = 8
      texture.needsUpdate = true
    })

    const studioMaterial = new THREE.MeshPhysicalMaterial({
      map: basecolorMap,
      normalMap,
      roughnessMap,
      metalnessMap: metallicMap,
      roughness: 0.34,
      metalness: 0.18,
      clearcoat: 0.62,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.35,
    })

    clone.rotation.z = -Math.PI / 2
    const box = new THREE.Box3().setFromObject(clone)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    clone.position.sub(center)
    clone.scale.setScalar(2.95 / Math.max(size.x, size.y, size.z))
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        mesh.material = studioMaterial.clone()
      }
    })

    return clone
  }, [basecolorMap, metallicMap, normalMap, obj, roughnessMap])

  useFrame((_, delta) => {
    if (!group.current) return

    const target = scrollProgress.current
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, THREE.MathUtils.degToRad(-4), delta * 5)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, target * Math.PI * 3.25 + 0.35, delta * 4.2)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, THREE.MathUtils.degToRad(-3 + target * 8), delta * 4.2)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(target * Math.PI) * 0.12, delta * 4.5)
  })

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[-2.5, 4.2, 4]} intensity={2.6} color="#fff0d6" />
      <directionalLight position={[3.2, 2.4, -3]} intensity={1.8} color="#ffffff" />
      <spotLight position={[0, 5, 3.5]} angle={0.34} penumbra={0.8} intensity={1.7} color="#f8e1b6" />
      <group ref={group}>
        <primitive object={bottle} />
      </group>
    </>
  )
}

function OldTownScrollModel({ sectionRef }: { sectionRef: RefObject<HTMLElement> }) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 82%', 'end 18%'] })
  const x = useTransform(scrollYProgress, [0, 0.24, 0.82, 1], [180, 0, 0, 56])
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.88, 1], [0, 1, 1, 0.72])
  const scale = useTransform(scrollYProgress, [0, 0.26, 1], [0.78, 1, 1])

  return (
    <motion.div
      className="relative mx-auto h-[390px] w-full max-w-[calc(100vw-40px)] overflow-hidden rounded-[28px] border border-[#E7E7E3] bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.96),rgba(238,238,232,0.72)_48%,rgba(17,17,17,0.06)_100%)] shadow-[0_28px_80px_rgba(17,17,17,0.12)] md:h-[520px] md:max-w-[520px] lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]"
      style={{ x, opacity, scale }}
      aria-label="Rotating Old Town 3D bottle model"
    >
      <Canvas
        camera={{ position: [0, 0.08, 6.4], fov: 34, near: 0.1, far: 70 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: true }}
        dpr={[1, 1.6]}
        className="h-full w-full"
      >
        <Suspense fallback={null}>
          <OldTownModel progress={scrollYProgress} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-x-8 bottom-7 rounded-full bg-black/15 blur-2xl lg:bottom-10 lg:h-10" />
    </motion.div>
  )
}

function OldTownStory() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (!sectionRef.current) return undefined

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.92, filter: 'blur(12px)' },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 72%',
              end: 'top 48%',
              scrub: 0.8,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F8F8F6] px-5 py-[96px] md:px-8 md:py-[140px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(183,255,60,0.12),transparent_28%),linear-gradient(180deg,#F8F8F6_0%,#FFFFFF_48%,#F8F8F6_100%)]" />
      <div className="relative z-10 mx-auto grid min-h-[120vh] max-w-[1280px] items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="max-w-[520px]">
          <Badge>Old Town</Badge>
          <h2 className="mt-5 text-[clamp(44px,5vw,72px)] font-bold leading-[0.95] tracking-[-0.05em] text-[#111]">
            Follow the bottle through its making.
          </h2>
          <p className="mt-6 max-w-md text-base font-normal leading-[1.7] text-[#444]">
            Before Old Town enters the portfolio, the bottle pauses for inspection: grain, copper, oak, and the final blend revealed with restraint.
          </p>

          <div className="mt-10 lg:hidden">
            <OldTownScrollModel sectionRef={sectionRef} />
          </div>

          <div className="mt-14 grid gap-5">
            {oldTownStoryCards.map((card, index) => (
              <div
                key={card.title}
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                className="rounded-[28px] border border-[#E7E7E3] bg-white p-6 text-left shadow-[0_24px_60px_rgba(17,17,17,0.08)] will-change-transform md:p-7"
              >
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#B7FF3C] text-[#111]">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                      <path d={card.icon} stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold uppercase tracking-[0.12em] text-[#6B6B6B]">Chapter {index + 1}</span>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#111]">{card.title}</h3>
                    <p className="mt-3 text-base font-normal leading-[1.7] text-[#444]">{card.text}</p>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-[90vh] lg:block">
          <OldTownScrollModel sectionRef={sectionRef} />
        </div>
      </div>
    </section>
  )
}

function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const pauseTimer = useRef<number | null>(null)
  const wheelLock = useRef(false)
  const shouldReduceMotion = useReducedMotion()
  const total = portfolioModels.length
  const spring = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 220, damping: 24 }

  const normalizeIndex = useCallback((index: number) => ((index % total) + total) % total, [total])

  const pauseAutoplay = useCallback(() => {
    setIsPaused(true)
    if (pauseTimer.current) {
      window.clearTimeout(pauseTimer.current)
    }
    pauseTimer.current = window.setTimeout(() => setIsPaused(false), 3000)
  }, [])

  const moveCarousel = useCallback((direction: number, userInitiated = true) => {
    if (userInitiated) pauseAutoplay()
    setActiveIndex((current) => normalizeIndex(current + direction))
  }, [normalizeIndex, pauseAutoplay])

  useEffect(() => {
    if (isPaused || activeIndex === 0) return undefined
    const timer = window.setInterval(() => moveCarousel(1, false), 4000)
    return () => window.clearInterval(timer)
  }, [activeIndex, isPaused, moveCarousel])

  useEffect(() => () => {
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current)
  }, [])

  const visibleCards = useMemo(() => {
    return [-2, -1, 0, 1, 2].map((offset) => {
      const modelIndex = normalizeIndex(activeIndex + offset)
      return { model: portfolioModels[modelIndex], modelIndex, offset }
    })
  }, [activeIndex, normalizeIndex])

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (wheelLock.current) return
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    if (Math.abs(delta) < 18) return
    wheelLock.current = true
    moveCarousel(delta > 0 ? 1 : -1)
    window.setTimeout(() => {
      wheelLock.current = false
    }, 650)
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number }, velocity: { x: number } }) => {
    const intent = info.offset.x + info.velocity.x * 0.18
    if (intent < -70) moveCarousel(1)
    if (intent > 70) moveCarousel(-1)
  }

  return (
    <section
      id="portfolio"
      className="overflow-hidden bg-black px-4 py-[88px] text-white md:px-8 md:py-[120px]"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="NTS spirits portfolio carousel"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') moveCarousel(1)
        if (event.key === 'ArrowLeft') moveCarousel(-1)
      }}
    >
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="mx-auto max-w-[1280px] text-center">
        <Badge>Portfolio</Badge>
        <h2 className="mx-auto mt-4 max-w-md text-[48px] font-bold leading-none tracking-[-0.03em] text-white">
          Four signatures. One quiet standard.
        </h2>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="relative mx-auto mt-16 h-[620px] max-w-[1280px] outline-none md:h-[660px]"
        onWheel={handleWheel}
        onMouseEnter={pauseAutoplay}
        onTouchStart={pauseAutoplay}
      >
        <motion.div
          className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragStart={pauseAutoplay}
          onDragEnd={handleDragEnd}
        >
          {visibleCards.map(({ model, modelIndex, offset }) => {
            const isActive = offset === 0
            const distance = Math.abs(offset)
            const x = `calc(-50% + ${offset * 444}px)`
            return (
              <motion.article
                key={modelIndex}
                aria-hidden={!isActive}
                aria-label={`${model.name}, ${model.tag}. ${model.desc}`}
                className="group absolute left-1/2 top-0 flex h-[540px] w-[min(420px,calc(100vw-40px))] select-none flex-col rounded-[32px] border border-[#E7E7E3] bg-white p-6 text-[#111] will-change-transform md:h-[580px]"
                initial={false}
                animate={{
                  x,
                  scale: isActive ? 1 : distance === 1 ? 0.9 : 0.82,
                  opacity: isActive ? 1 : distance === 1 ? 0.75 : 0,
                  filter: isActive ? 'blur(0px)' : distance === 1 ? 'blur(1.2px)' : 'blur(3px)',
                  zIndex: isActive ? 30 : distance === 1 ? 20 : 10,
                  boxShadow: isActive
                    ? '0 34px 80px rgba(0,0,0,0.42)'
                    : '0 18px 44px rgba(0,0,0,0.24)',
                }}
                whileHover={isActive ? { y: -6, scale: 1.03 } : { y: -3 }}
                transition={spring}
              >
                <span className="inline-flex w-fit rounded-full bg-[#B7FF3C] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#111]">
                  {model.tag}
                </span>
                <div className="mt-5 flex flex-1 items-center justify-center overflow-hidden rounded-[24px] border border-[#E7E7E3] bg-[#F7F7F7]">
                  <img
                    src={model.image}
                    alt={`${model.name} bottle`}
                    loading={isActive ? 'eager' : 'lazy'}
                    draggable={false}
                    className="h-full w-full scale-[1.22] object-contain drop-shadow-[0_28px_32px_rgba(0,0,0,0.22)] transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.28]"
                  />
                </div>
                <div className="pt-6">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#111]">{model.name}</h3>
                  <p className="mt-3 max-w-sm text-base font-normal leading-[1.7] text-[#444]">{model.desc}</p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        <button
          type="button"
          onClick={() => moveCarousel(-1)}
          className="absolute left-0 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#B7FF3C] md:left-6"
          aria-label="Previous portfolio item"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => moveCarousel(1)}
          className="absolute right-0 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#B7FF3C] md:right-6"
          aria-label="Next portfolio item"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.div>

      <div className="mx-auto mt-2 flex max-w-[1280px] items-center justify-center gap-2" aria-label={`Portfolio item ${activeIndex + 1} of ${total}`}>
        {portfolioModels.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => {
              pauseAutoplay()
              setActiveIndex(index)
            }}
            className="group h-5 rounded-full px-0.5 focus:outline-none focus:ring-2 focus:ring-[#B7FF3C]"
            aria-label={`Show ${item.name}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <span className={`block h-1.5 rounded-full transition-all duration-500 ${index === activeIndex ? 'w-10 bg-[#B7FF3C]' : 'w-5 bg-white/25 group-hover:bg-white/50'}`} />
          </button>
        ))}
      </div>
    </section>
  )
}

function SplitBanner() {
  return (
    <section className="bg-[#0A0A0A] px-5 py-[88px] md:px-8 md:py-[120px]">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[28px]">
        <img src={splitImage} alt="NTS production detail" className="h-[300px] w-full object-cover transition-transform duration-[800ms] hover:scale-[1.03] md:h-[420px]" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_58%,rgba(0,0,0,0.04)_100%)]" />
        <div className="absolute inset-x-6 top-1/2 flex -translate-y-1/2 items-center justify-between gap-6 text-white md:inset-x-10">
          <h2 className="max-w-xs text-[48px] font-bold leading-none tracking-[-0.03em]">46 years of work.</h2>
          <h2 className="max-w-xs text-right text-[48px] font-bold leading-none tracking-[-0.03em]">Yours for decades.</h2>
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="bg-[#F5F5F3] px-5 py-[88px] md:px-8 md:py-[120px]">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-lg text-center">
          <Badge>Process</Badge>
          <h2 className="mt-4 text-[48px] font-bold leading-none tracking-[-0.03em] text-[#111]">
            How spirit, blend, and bottle become a brand people remember.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {process.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group flex h-full min-h-[360px] flex-col rounded-[28px] border border-[#E7E7E3] bg-white p-8 text-[#111] transition-colors duration-300 hover:border-[#111]"
            >
              <SmallIcon path={item.icon} />
              <h3 className="mt-14 text-2xl font-semibold text-[#111]">{item.title}</h3>
              <p className="mt-4 text-base font-normal leading-[1.7] text-[#444]">{item.text}</p>
              <ul className="mt-6 space-y-2 text-base leading-[1.7] text-[#111]">
                {item.points.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#111]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t border-[#E7E7E3] pt-4 text-sm font-medium leading-6 text-[#444]">{item.note}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function Details() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.03])
  const tastingNotes = [
    ['Kiwi', 'bright and fresh'],
    ['Apple', 'crisp and smooth'],
    ['Orange', 'citrus with a clean finish'],
  ]
  const productionHighlights = [
    'Multi-stage filtration',
    'Consistent ABV control',
    'Batch-level quality checks',
    'Temperature-controlled bottling',
  ]

  return (
    <section id="details" className="bg-[#F5F5F3] px-5 py-[72px] md:px-8 md:py-[120px]">
      <motion.section
        ref={sectionRef}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="relative mx-auto flex min-h-[560px] w-full max-w-[1280px] items-end overflow-hidden rounded-[32px] bg-[#FF5A1F] md:min-h-[640px] md:items-center md:justify-end lg:min-h-[760px]"
      >
        <motion.img
          src={canaconaShowcaseImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          style={{ scale: backgroundScale }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.08)_45%,rgba(0,0,0,0.18)_100%)]" />

        <aside className="relative z-10 m-4 w-[calc(100%-32px)] rounded-[24px] border border-white/50 bg-white/95 p-6 text-[#111] shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl md:my-12 md:mr-6 md:w-[380px] md:rounded-[32px] md:p-8 lg:mr-12 lg:w-[420px] lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#6B6B6B]">Signature collection</p>
            <h3 className="mt-4 text-[32px] font-bold leading-[1.05] tracking-[-0.04em] text-[#111] md:text-[42px]">
              Crafted for repeatability, designed for recall.
            </h3>
            <p className="mt-5 text-[15px] font-normal leading-[1.75] text-[#444] md:text-base">
              Every CANACONA bottle is built around the same recipe discipline, quality controls, flavor profile, and visual identity. From filtration to bottling, the process is tuned for familiarity, so customers meet the same bright character, clean finish, and confident shelf presence every time they return to the label.
            </p>

            <div className="my-7 h-px bg-[#E7E7E3]" />

            <div className="space-y-4">
              {tastingNotes.map(([flavor, note]) => (
                <div key={flavor} className="flex items-baseline justify-between gap-6 border-b border-[#E7E7E3] pb-4 last:border-b-0 last:pb-0">
                  <p className="text-[15px] font-medium text-[#111]">{flavor}</p>
                  <p className="text-right text-[15px] font-medium text-[#444]">{note}</p>
                </div>
              ))}
            </div>

            <div className="my-7 h-px bg-[#E7E7E3]" />

            <ul className="grid gap-3">
              {productionHighlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-[#111]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#111]" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="my-7 h-px bg-[#E7E7E3]" />

            <blockquote className="text-base font-medium leading-[1.7] tracking-[-0.01em] text-[#111]">
              <span className="text-[17px] italic">"Consistency is not repetition. It is trust, delivered bottle after bottle."</span>
            </blockquote>

            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
              <a href="#portfolio" className="inline-flex w-full items-center justify-center rounded-full bg-[#111] px-6 py-3.5 text-[15px] font-semibold text-white transition-transform duration-300 hover:scale-[1.02]">
                Explore flavors
              </a>
              <a href="#contact" className="text-center text-[15px] font-medium text-[#111] opacity-80 transition-opacity duration-300 hover:opacity-100 md:text-left">
                Download spec sheet
              </a>
            </div>
          </motion.div>
        </aside>
      </motion.section>
    </section>
  )
}

function Marquee() {
  const words = ['Blended with care', 'Built for legacy', 'Goa production', 'South India network']
  return (
    <div className="flex h-10 items-center overflow-hidden bg-[#B7FF3C] text-[#111]">
      <style>{`@keyframes nts-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div className="flex w-max gap-10 whitespace-nowrap text-sm font-semibold" style={{ animation: 'nts-marquee 18s linear infinite' }}>
        {[...words, ...words, ...words, ...words].map((word, index) => (
          <span key={`${word}-${index}`}>{word}</span>
        ))}
      </div>
    </div>
  )
}

function Testimonial() {
  return (
    <section className="bg-[#F5F5F3] px-5 py-[120px] md:px-8 md:py-[152px]">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} className="mx-auto max-w-xl text-center">
        <Badge>Trade</Badge>
        <h2 className="mt-5 text-[48px] font-bold leading-tight tracking-[-0.03em] text-[#111]">
          "NTS understands the market before the bottle reaches the shelf."
        </h2>
        <p className="mt-6 text-base font-semibold text-[#111]">Distribution Partner</p>
        <p className="mt-1 text-sm text-[#444]">South India</p>
        <div className="mt-6 flex justify-center gap-2">
          <motion.span className="h-1.5 w-1.5 rounded-full bg-[#111]" animate={{ scale: [1, 1.35, 1] }} transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }} />
          <span className="h-1.5 w-1.5 rounded-full bg-[#111]/30 transition-colors duration-300 hover:bg-[#111]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#111]/30 transition-colors duration-300 hover:bg-[#111]" />
        </div>
      </motion.div>
    </section>
  )
}

function FounderStory() {
  return (
    <section id="workshop" className="bg-[#0A0A0A] px-5 py-[88px] text-white md:px-8 md:py-[120px]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-2">
        <div className="overflow-hidden rounded-[28px] border border-white/10 transition-colors duration-300 hover:border-white/40">
          <img src={founderImage} alt="NTS workshop and bottle development" className="aspect-[4/5] w-full object-cover transition-transform duration-[800ms] hover:scale-[1.03]" />
        </div>
        <div className="max-w-[620px] space-y-5 text-base font-normal leading-[1.7] text-white/90">
          <h2 className="text-[48px] font-bold leading-none tracking-[-0.03em] text-white">
            A focused house with no interest in ordinary.
          </h2>
          <p>
            NTS is intentionally focused. Fewer distractions mean more attention to blend discipline, packaging quality, and partner communication.
          </p>
          <p>
            No catalog clutter. No short-term noise. We work with brands and markets where long-term value matters.
          </p>
          <p className="border-t border-white/15 pt-5 font-semibold text-white">- House notes</p>
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  const bottleEase = [0.22, 1, 0.36, 1] as const
  const isMobile = useIsMobile()
  const leftBottles = [
    {
      image: newsletterBottleA,
      className: 'left-[12px] bottom-[-152px] w-[190px] md:left-[-62px] md:bottom-[-70px] md:w-[270px] lg:left-[58px] lg:bottom-[-48px] lg:w-[350px]',
      rotation: -10,
      x: isMobile ? -44 : -80,
      scale: 0.82,
      opacity: 1,
      delay: 0,
      float: [-6, 0, -6],
      duration: 9,
      z: 'z-[7]',
      blur: '',
    },
    {
      image: newsletterBottleC,
      className: 'left-[72px] bottom-[-104px] w-[132px] md:left-[-12px] md:top-[92px] md:bottom-auto md:w-[188px] lg:left-[70px] lg:top-[74px] lg:w-[248px]',
      rotation: -18,
      x: isMobile ? -32 : -48,
      scale: 0.86,
      opacity: 0.9,
      delay: 0.12,
      float: [-5, 0, -5],
      duration: 10,
      z: 'z-[6]',
      blur: '',
    },
    {
      image: newsletterBottleE,
      className: 'hidden md:block md:left-[150px] md:top-[154px] md:w-[140px] lg:left-[220px] lg:top-[142px] lg:w-[190px]',
      rotation: -8,
      x: -24,
      scale: 0.9,
      opacity: 0.55,
      delay: 0.24,
      float: [-4, 0, -4],
      duration: 11,
      z: 'z-[5]',
      blur: 'blur-[1.5px]',
    },
  ]
  const rightBottles = [
    {
      image: newsletterBottleB,
      className: 'right-[12px] bottom-[-152px] w-[190px] md:right-[-62px] md:bottom-[-70px] md:w-[270px] lg:right-[58px] lg:bottom-[-48px] lg:w-[350px]',
      rotation: 10,
      x: isMobile ? 44 : 80,
      scale: 0.82,
      opacity: 1,
      delay: 0.12,
      float: [0, -6, 0],
      duration: 9.5,
      z: 'z-[7]',
      blur: '',
    },
    {
      image: newsletterBottleD,
      className: 'right-[72px] bottom-[-104px] w-[132px] md:right-[-12px] md:top-[92px] md:bottom-auto md:w-[188px] lg:right-[70px] lg:top-[74px] lg:w-[248px]',
      rotation: 18,
      x: isMobile ? 32 : 48,
      scale: 0.86,
      opacity: 0.9,
      delay: 0.24,
      float: [0, -5, 0],
      duration: 10.5,
      z: 'z-[6]',
      blur: '',
    },
    {
      image: newsletterBottleF,
      className: 'hidden md:block md:right-[150px] md:top-[154px] md:w-[140px] lg:right-[220px] lg:top-[142px] lg:w-[190px]',
      rotation: 8,
      x: 20,
      scale: 0.9,
      opacity: 0.55,
      delay: 0.36,
      float: [0, -4, 0],
      duration: 12,
      z: 'z-[5]',
      blur: 'blur-[1.5px]',
    },
  ]
  const bottleShadow = isMobile
    ? 'drop-shadow(0 14px 24px rgba(0,0,0,0.12)) drop-shadow(0 0 24px rgba(255,255,255,0.14))'
    : 'drop-shadow(0 18px 40px rgba(0,0,0,0.12)) drop-shadow(0 0 24px rgba(255,255,255,0.14))'

  return (
    <section id="contact" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F7F5] px-4 py-24 md:px-8">
      {[...leftBottles, ...rightBottles].map((bottle, index) => (
        <motion.div
          key={`${bottle.className}-${index}`}
          className={`pointer-events-none absolute ${bottle.z} ${bottle.className}`}
          initial={{ opacity: 0, x: bottle.x, y: 24, rotate: bottle.rotation, scale: bottle.scale }}
          whileInView={{ opacity: bottle.opacity, x: 0, y: 0, rotate: bottle.rotation, scale: 1 }}
          transition={{ duration: 0.9, delay: bottle.delay, ease: bottleEase }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.img
            src={bottle.image}
            alt=""
            aria-hidden="true"
            className={`w-full select-none object-contain will-change-transform ${bottle.blur}`}
            animate={{ y: bottle.float }}
            transition={{ duration: bottle.duration, ease: 'easeInOut', repeat: Infinity, delay: 1.05 + bottle.delay }}
            style={{ filter: bottleShadow }}
          />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto w-full max-w-[760px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: bottleEase }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="inline-flex rounded-full bg-[#C7FF3A] px-[18px] py-2 text-sm font-bold uppercase tracking-[2px] text-[#111]">
            Updates
          </span>
          <h2 className="mx-auto mt-8 max-w-[700px] text-[clamp(56px,6vw,82px)] font-black leading-[0.95] tracking-[-0.06em] text-[#111]">
            New labels, production notes, partner updates. Nothing else.
          </h2>
        </motion.div>

        <div className="relative z-10 mt-10 flex justify-center">
          <motion.form
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: bottleEase }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative z-10 flex min-h-16 w-full max-w-[620px] items-center rounded-[32px] border border-black/[0.08] bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-colors duration-300 focus-within:border-[#111] max-[480px]:flex-col max-[480px]:items-stretch max-[480px]:rounded-[28px] max-[480px]:p-2"
          >
            <label className="sr-only" htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="Enter your email" className="h-[52px] min-w-0 flex-1 rounded-full bg-transparent pl-[26px] pr-3 text-lg text-[#111] outline-none placeholder:text-[#777] max-[480px]:w-full max-[480px]:pl-5" />
            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: bottleEase }}
              viewport={{ once: true, amount: 0.4 }}
              className="h-[52px] cursor-pointer rounded-full bg-[#111] px-[34px] text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#222] active:bg-[#111] max-[480px]:w-full"
            >
              Subscribe
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-white p-6 text-[#111]">
      <div className="relative overflow-hidden rounded-[48px] border border-[#ECECEC] bg-[#F5F5F3] px-6 pb-0 pt-6 md:px-12 md:pt-12">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <p className="max-w-[260px] text-lg font-semibold leading-snug tracking-[-0.02em] text-[#111]">
              Premium spirits, shaped with discipline and quiet ambition.
            </p>
          </div>

          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#6B6B6B]">Navigation</p>
            <div className="mt-5 flex flex-col gap-3 text-[15px] font-medium text-[#111]">
              {footerNavigation.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="w-fit opacity-60 transition-opacity duration-300 hover:opacity-100">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#6B6B6B]">Social</p>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {footerSocials.map(([icon, handle]) => (
                <a key={handle} href="#home" className="group flex items-center gap-3 opacity-60 transition-opacity duration-300 hover:opacity-100">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D8D8D4] text-[10px] font-bold text-[#111] transition-colors duration-300 group-hover:border-[#111]">
                    {icon}
                  </span>
                  <span className="text-[15px] font-medium text-[#6B6B6B]">{handle}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <a href="#contact" className="group flex items-start justify-between gap-6">
              <span>
                <span className="block text-[32px] font-semibold leading-none tracking-[-0.04em] text-[#FF5A2A]">Start a conversation</span>
                <span className="mt-3 block text-sm font-normal leading-6 text-[#444]">Manufacturing, distribution, and brand development partnerships.</span>
              </span>
              <FooterArrow />
            </a>
            <div className="my-6 h-px bg-[#E5E5E5]" />
            <a href="#portfolio" className="group flex items-start justify-between gap-6">
              <span>
                <span className="block text-[32px] font-semibold leading-none tracking-[-0.04em] text-[#111]">Explore portfolio</span>
                <span className="mt-3 block text-sm font-normal leading-6 text-[#444]">Four focused expressions built for modern premium shelves.</span>
              </span>
              <FooterArrow dark />
            </a>
          </div>
        </div>

        <div className="mt-12 h-[132px] overflow-hidden md:h-[176px] lg:h-[246px]">
          <div className="-ml-12 w-[120%] text-[160px] font-extrabold leading-[0.8] tracking-[-0.08em] text-black md:-ml-24 md:text-[220px] lg:-ml-36 lg:text-[320px]">
            NTS
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#E5E5E5] py-6 text-[13px] font-medium text-[#6B6B6B] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span>NTS Blenders and Distillers Pvt. Ltd. / 2026</span>
            <span aria-hidden="true">.</span>
            <a href="#contact" className="opacity-60 transition-opacity duration-300 hover:opacity-100">Privacy</a>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>Goa, India</span>
            <span aria-hidden="true">.</span>
            <span>18:30</span>
            <span aria-hidden="true">.</span>
            <span className="inline-flex items-center gap-1.5"><WeatherIcon /> 28°C</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterMinimal() {
  return (
    <footer className="bg-white px-5 pb-6 pt-8 text-[14px] font-medium leading-[1.4] tracking-[0.003em] text-[#2B2B2B] sm:px-8 lg:px-14 lg:text-[16px]">
      <div className="mx-auto max-w-[1280px] border-t border-[rgba(0,0,0,0.08)] pt-8">
        <div className="grid items-center gap-y-2 md:grid-cols-[minmax(0,1fr)_minmax(48px,0.35fr)_minmax(0,1fr)]">
          <div className="hidden min-w-0 items-center whitespace-nowrap md:flex">
            <span>NTS Blenders and Distillers Pvt. Ltd. / 2026</span>
            <span className="mx-3 text-[#7A7A7A]" aria-hidden="true">·</span>
            <a href="#contact" className="relative text-[#7A7A7A] transition-colors duration-300 after:absolute after:left-0 after:top-full after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:text-black hover:after:scale-x-100">
              Privacy
            </a>
          </div>

          <div aria-hidden="true" className="hidden md:block" />

          <div className="hidden min-w-0 items-center justify-end whitespace-nowrap text-[#7A7A7A] md:flex">
            <span>Goa, India</span>
            <span className="mx-3" aria-hidden="true">·</span>
            <span>18:30</span>
            <span className="mx-3" aria-hidden="true">·</span>
            <span>☀ 28°C</span>
          </div>

          <div className="min-w-0 whitespace-nowrap text-[#2B2B2B] md:hidden">
            NTS Blenders and Distillers Pvt. Ltd. / 2026
          </div>
          <div className="flex min-w-0 items-center whitespace-nowrap text-[#7A7A7A] md:hidden">
            <a href="#contact" className="relative transition-colors duration-300 after:absolute after:left-0 after:top-full after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:text-black hover:after:scale-x-100">
              Privacy
            </a>
            <span className="mx-2.5" aria-hidden="true">·</span>
            <span>Goa, India</span>
            <span className="mx-2.5" aria-hidden="true">·</span>
            <span>18:30</span>
            <span className="mx-2.5" aria-hidden="true">·</span>
            <span>☀ 28°C</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterPremium() {
  const navigationLinks = [
    ['About', '#about'],
    ['Portfolio', '#portfolio'],
    ['Process', '#process'],
    ['Contact', '#contact'],
  ]
  const socialLinks = [
    ['IN', 'Instagram'],
    ['LI', 'LinkedIn'],
    ['YT', 'YouTube'],
    ['X', 'X (Twitter)'],
  ]

  return (
    <footer className="bg-white px-5 py-6 md:px-8 lg:px-14">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto max-w-[1280px] overflow-hidden rounded-[40px] bg-[#F8F8F6] px-5 pb-10 pt-16 text-[#111] sm:px-8 md:px-10 lg:px-14 lg:pt-20"
      >
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.08fr_0.72fr_0.72fr_1fr] lg:gap-14">
          <div>
            <h2 className="max-w-[340px] text-[30px] font-semibold leading-[1.04] tracking-[-0.035em] text-[#111] md:text-[34px]">
              Premium spirits, shaped with discipline and quiet ambition.
            </h2>
            <p className="mt-5 max-w-[330px] text-[15px] font-normal leading-[1.75] text-[#5F5F5F]">
              Crafting exceptional spirits through precision, heritage, and innovation.
            </p>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8A8A8A]">Navigation</p>
            <nav className="mt-6 flex flex-col items-start gap-4 text-[15px] font-medium leading-none text-[#6A6A6A]">
              {navigationLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="relative transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] after:absolute after:left-0 after:top-[calc(100%+4px)] after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-black hover:after:scale-x-100"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8A8A8A]">Social</p>
            <div className="mt-6 flex flex-col items-start gap-4 text-[15px] font-medium leading-none text-[#6A6A6A]">
              {socialLinks.map(([icon, label]) => (
                <a
                  key={label}
                  href="#home"
                  className="group flex items-center gap-3 transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-black"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[10px] font-semibold text-[#555] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-black group-hover:bg-black group-hover:text-white">
                    {icon}
                  </span>
                  <span className="transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <a href="#contact" className="group flex items-start justify-between gap-6">
              <span>
                <span className="block text-[30px] font-semibold leading-none tracking-[-0.04em] text-[#FF5A2A] md:text-[34px]">
                  Start a conversation
                </span>
                <span className="mt-4 block max-w-[320px] text-[15px] font-normal leading-[1.7] text-[#5F5F5F]">
                  Manufacturing, distribution and brand development partnerships.
                </span>
              </span>
              <motion.span
                whileHover={{
                  scale: 1.08,
                  rotate: 45,
                  boxShadow: '0 16px 40px rgba(255,90,42,0.28)',
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#FF5A2A]/25 bg-white text-[#FF5A2A] transition-colors duration-[400ms] group-hover:border-[#FF5A2A]"
              >
                <ArrowIcon />
              </motion.span>
            </a>

            <div className="h-px bg-black/[0.08]" />

            <a href="#portfolio" className="group flex items-center justify-between gap-6">
              <span className="text-[24px] font-semibold leading-none tracking-[-0.035em] text-[#111]">
                Explore Portfolio
              </span>
              <motion.span
                whileHover={{
                  scale: 1.08,
                  rotate: 45,
                  boxShadow: '0 14px 34px rgba(17,17,17,0.12)',
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/[0.12] bg-white text-[#111] transition-colors duration-[400ms] group-hover:border-black"
              >
                <ArrowIcon />
              </motion.span>
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-[rgba(0,0,0,0.08)] pt-8">
          <div className="grid gap-4 text-left leading-[1.4] md:grid-cols-[minmax(0,1fr)_minmax(48px,0.35fr)_minmax(0,1fr)] md:items-center">
            <div className="flex min-w-0 flex-col gap-2 text-[#222] md:flex-row md:items-center md:gap-3">
              <span className="whitespace-nowrap text-[14px] font-medium tracking-[0.003em] md:text-[16px]">
                NTS Blenders and Distillers Pvt. Ltd. / 2026
              </span>
              <span className="hidden text-[#8A8A8A] md:inline" aria-hidden="true">·</span>
              <a href="#contact" className="relative w-fit text-[14px] font-medium text-[#7A7A7A] transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] after:absolute after:left-0 after:top-full after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-black hover:after:scale-x-100">
                Privacy
              </a>
            </div>

            <div aria-hidden="true" className="hidden md:block" />

            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[14px] font-medium text-[#7A7A7A] md:justify-end">
              <span>Goa, India</span>
              <span aria-hidden="true">·</span>
              <span>18:30</span>
              <span aria-hidden="true">·</span>
              <span>☀ 28°C</span>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

function FooterRedesign() {
  const portfolioLinks = [
    ['Our Spirits', '#portfolio'],
    ['Process', '#process'],
    ['Facility', '#details'],
    ['Partnerships', '#contact'],
  ]
  const exploreLinks = [
    ['About', '#about'],
    ['Workshop', '#workshop'],
    ['All Products', '#portfolio'],
    ['Careers', '#contact'],
  ]
  const socialLinks = [
    ['IG', 'Instagram', '@ntsdistillers'],
    ['X', 'X', '@ntsdistillers'],
    ['IN', 'LinkedIn', '@ntsdistillers'],
    ['YT', 'YouTube', '@ntsdistillers'],
  ]

  return (
    <footer className="bg-white px-5 py-6 md:px-8 lg:px-14">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto max-w-[1440px] overflow-hidden rounded-[24px] bg-[#EDEBE7] px-6 pb-0 pt-14 text-[#111] sm:px-8 md:px-12 md:pt-16 lg:px-14"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-[360px] font-serif text-[28px] font-medium leading-[1.08] tracking-[-0.025em] text-[#111]">
            Crafting spirits.
            <br />
            Rooted in Goa.
          </h2>
          <a href="#contact" className="inline-flex w-fit items-center justify-center rounded-full bg-[#111] px-7 py-3 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-black/30 focus:ring-offset-2 focus:ring-offset-[#EDEBE7]">
            Get in Touch
          </a>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#77736C]">Portfolio</h3>
            <nav className="mt-5 flex flex-col items-start gap-2.5 text-[14px] font-medium text-[#151515]">
              {portfolioLinks.map(([label, href]) => (
                <a key={label} href={href} className="relative w-fit after:absolute after:left-0 after:top-full after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#77736C]">Explore</h3>
            <nav className="mt-5 flex flex-col items-start gap-2.5 text-[14px] font-medium text-[#151515]">
              {exploreLinks.map(([label, href]) => (
                <a key={label} href={href} className="relative w-fit after:absolute after:left-0 after:top-full after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#77736C]">Say Hello</h3>
            <div className="mt-5 flex flex-col items-start gap-2.5 text-[14px] font-medium text-[#151515]">
              {socialLinks.map(([icon, label, handle]) => (
                <a key={label} href="#contact" className="group flex w-fit items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white/55 text-[10px] font-bold text-[#151515] transition-colors duration-300 group-hover:border-black">
                    {icon}
                  </span>
                  <span className="relative after:absolute after:left-0 after:top-full after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                    <span className="sr-only">{label} </span>
                    {handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-16">
          <p className="text-[13px] font-medium text-[#77736C]">
            © 2026 NTS Blenders and Distillers Pvt. Ltd. All rights reserved.
          </p>
          <div className="mt-5 h-[86px] overflow-hidden sm:h-[112px] md:h-[150px] lg:h-[194px]">
            <div className="flex whitespace-nowrap text-[76px] font-black lowercase leading-[0.78] tracking-[-0.09em] text-black min-[390px]:text-[86px] sm:text-[120px] md:text-[166px] lg:text-[222px] xl:text-[252px]" style={{ fontFamily: '"Inter Tight", "Plus Jakarta Sans", system-ui, sans-serif' }}>
              <span>nts</span>
              <span className="ml-[0.22em]">distillers</span>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

function App() {
  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#111]">
      <Hero />
      <Intro />
      <CompanyPortfolio />
      <OldTownStory />
      <Portfolio />
      <SplitBanner />
      <Process />
      <Details />
      <Marquee />
      <Testimonial />
      <FounderStory />
      <Newsletter />
      <FooterRedesign />
    </main>
  )
}

export default App
