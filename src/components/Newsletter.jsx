import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const newsletterBottleA = '/bottle-2/bottle (2).png'
const newsletterBottleB = '/bottle-2/bottle (1).png'
const newsletterBottleC = '/bottle-2/bottle (3).png'
const newsletterBottleD = '/bottle-2/bottle.png'
const newsletterBottleE = '/bottle-2/Product_bottle_3D_render_202607251455-removebg-preview.png'
const newsletterBottleF = '/1/Liquor_bottle_on_white_background_202607250547 (1).png'

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

export default function Newsletter() {
  const bottleEase = [0.22, 1, 0.36, 1]
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
    <section id="updates" className="relative flex min-h-[760px] items-center justify-center overflow-hidden bg-[#F4ECDF] px-4 py-24 md:px-8 border-t border-maroon/10">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(201,161,90,0.18),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.3),rgba(74,21,28,0.08))]" />
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
          <span className="inline-flex rounded-full border border-maroon/15 bg-white/60 px-[18px] py-2 text-xs font-bold uppercase tracking-[2px] text-coral-orange font-mono">
            Partner Notes
          </span>
          <h2 className="mx-auto mt-8 max-w-[700px] text-[clamp(36px,5.2vw,62px)] font-black leading-[1.02] tracking-normal text-maroon font-serif uppercase">
            Label launches, capacity updates, and partnership openings.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-maroon/70 font-sans">
            Occasional updates for distributors, private-label partners, and trade collaborators.
          </p>
        </motion.div>

        <div className="relative z-10 mt-10 flex justify-center">
          <motion.form
            onSubmit={(e) => {
              e.preventDefault()
              alert("Subscribed successfully!")
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: bottleEase }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative z-10 flex min-h-16 w-full max-w-[620px] items-center rounded-2xl border border-maroon/12 bg-white/88 p-1.5 shadow-[0_18px_60px_rgba(74,21,28,0.12)] transition-colors duration-300 focus-within:border-maroon max-[480px]:flex-col max-[480px]:items-stretch max-[480px]:rounded-2xl max-[480px]:p-2"
          >
            <label className="sr-only" htmlFor="email-newsletter">Email address</label>
            <input
              id="email-newsletter"
              type="email"
              required
              placeholder="Enter your email"
              className="h-[52px] min-w-0 flex-1 rounded-xl bg-transparent pl-[26px] pr-3 text-base text-maroon outline-none placeholder:text-maroon/45 max-[480px]:w-full max-[480px]:pl-5 font-sans"
            />
            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: bottleEase }}
              viewport={{ once: true, amount: 0.4 }}
              className="h-[52px] cursor-pointer rounded-xl bg-maroon px-[34px] text-xs font-bold text-cream transition-colors duration-300 hover:bg-coral-orange active:bg-maroon max-[480px]:w-full uppercase tracking-widest font-mono"
            >
              Subscribe
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
