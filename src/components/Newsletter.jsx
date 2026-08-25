import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const newsletterBottleA = '/portfolio-images/old-town.png'
const newsletterBottleB = '/bottle-2/bottle (1).png'
const newsletterBottleC = '/portfolio-images/wanted.png'
const newsletterBottleD = '/bottle-2/bottle.png'
const newsletterBottleE = '/bottle-2/east-coast-premium-malt-whisky.png'
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
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChatRequest = (event) => {
    event.preventDefault()
    const value = email.trim()
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

    if (!isValidEmail) {
      setError('Enter a valid email address.')
      setIsSubmitted(false)
      return
    }

    setError('')
    setIsSubmitted(true)
  }

  const leftBottles = [
    {
      image: newsletterBottleA,
      className: 'hidden sm:block sm:left-[28px] sm:bottom-[22px] sm:w-[220px] md:left-[46px] md:bottom-[28px] md:w-[285px] lg:left-[76px] lg:bottom-[34px] lg:w-[350px] xl:left-[96px] xl:bottom-[38px] xl:w-[390px]',
      rotation: -8,
      x: isMobile ? -40 : -70,
      scale: 0.85,
      opacity: 0.98,
      delay: 0,
      float: [-6, 0, -6],
      duration: 9,
      z: 'z-[5]',
      blur: '',
    },
    {
      image: newsletterBottleC,
      className: 'hidden md:block md:left-[220px] md:top-[96px] md:w-[145px] lg:left-[292px] lg:top-[92px] lg:w-[178px] xl:left-[344px] xl:top-[86px] xl:w-[210px]',
      rotation: -5,
      x: isMobile ? -30 : -45,
      scale: 0.88,
      opacity: 0.82,
      delay: 0.12,
      float: [-5, 0, -5],
      duration: 10,
      z: 'z-[4]',
      blur: '',
    },
    {
      image: newsletterBottleE,
      className: 'hidden lg:block lg:left-[398px] lg:top-[108px] lg:w-[150px] xl:left-[510px] xl:top-[104px] xl:w-[180px]',
      rotation: 3,
      x: -24,
      scale: 0.9,
      opacity: 0.64,
      delay: 0.24,
      float: [-4, 0, -4],
      duration: 11,
      z: 'z-[3]',
      blur: '',
    },
  ]

  const rightBottles = [
    {
      image: newsletterBottleB,
      className: 'hidden sm:block sm:right-[28px] sm:bottom-[22px] sm:w-[220px] md:right-[46px] md:bottom-[28px] md:w-[285px] lg:right-[76px] lg:bottom-[34px] lg:w-[350px] xl:right-[96px] xl:bottom-[38px] xl:w-[390px]',
      rotation: 8,
      x: isMobile ? 40 : 70,
      scale: 0.85,
      opacity: 0.98,
      delay: 0.12,
      float: [0, -6, 0],
      duration: 9.5,
      z: 'z-[5]',
      blur: '',
    },
    {
      image: newsletterBottleD,
      className: 'hidden md:block md:right-[220px] md:top-[96px] md:w-[145px] lg:right-[292px] lg:top-[92px] lg:w-[178px] xl:right-[344px] xl:top-[86px] xl:w-[210px]',
      rotation: 5,
      x: isMobile ? 30 : 45,
      scale: 0.88,
      opacity: 0.82,
      delay: 0.24,
      float: [0, -5, 0],
      duration: 10.5,
      z: 'z-[4]',
      blur: '',
    },
    {
      image: newsletterBottleF,
      className: 'hidden lg:block lg:right-[398px] lg:top-[108px] lg:w-[150px] xl:right-[510px] xl:top-[104px] xl:w-[180px]',
      rotation: -3,
      x: 20,
      scale: 0.9,
      opacity: 0.64,
      delay: 0.36,
      float: [0, -4, 0],
      duration: 12,
      z: 'z-[3]',
      blur: '',
    },
  ]

  const bottleShadow = isMobile
    ? 'drop-shadow(0 14px 24px rgba(0,0,0,0.85))'
    : 'drop-shadow(0 22px 46px rgba(0,0,0,0.95))'

  return (
    <section
      id="partner-notes"
      className="relative min-h-[560px] sm:min-h-[700px] lg:min-h-[780px] overflow-hidden bg-black text-white px-4 py-20 sm:py-28 md:px-8 border-t border-white/10 flex items-center justify-center select-none"
      data-od-id="partner-notes-newsletter"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[10vw] bg-gradient-to-r from-black/80 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[10vw] bg-gradient-to-l from-black/80 to-transparent" aria-hidden="true" />

      {/* Floating Animated Bottles on Left & Right */}
      {[...leftBottles, ...rightBottles].map((bottle, index) => (
        <motion.div
          key={`${bottle.className}-${index}`}
          className={`pointer-events-none absolute ${bottle.z} ${bottle.className}`}
          initial={{ opacity: 0, x: bottle.x, y: 24, rotate: bottle.rotation, scale: bottle.scale }}
          whileInView={{ opacity: bottle.opacity, x: 0, y: 0, rotate: bottle.rotation, scale: 1 }}
          transition={{ duration: 0.9, delay: bottle.delay, ease: bottleEase }}
          viewport={{ once: true, amount: 0.3 }}
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

      {/* Center Main Stage Content */}
      <div className="relative z-20 mx-auto w-full max-w-[900px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: bottleEase }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Eyebrow Capsule */}
          <div className="flex justify-center">
            <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#E9542E] shadow-sm backdrop-blur-md">
              PARTNER NOTES
            </span>
          </div>

          {/* Bold Serif Headline */}
          <h2 className="mx-auto mt-6 max-w-[850px] font-serif text-[clamp(2.1rem,11vw,4.4rem)] font-black uppercase leading-[1.02] tracking-tight text-white sm:leading-[1.04]">
            TRADE-READY SPIRITS, BOTTLING CAPACITY, AND PARTNERSHIP OPPORTUNITIES.
          </h2>

        </motion.div>

        {/* Contact Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: bottleEase }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10"
        >
          <form onSubmit={handleChatRequest} className="mx-auto w-full max-w-xl" noValidate>
            <div className="relative flex flex-col items-center gap-2 rounded-3xl border border-white/20 bg-white/[0.06] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.72)] backdrop-blur-md transition-all focus-within:border-[#E9542E] focus-within:ring-2 focus-within:ring-[#E9542E]/30 sm:flex-row sm:rounded-full sm:pl-7">
              <label htmlFor="partner-chat-email" className="sr-only">
                Email address
              </label>
              <input
                id="partner-chat-email"
                type="email"
                required
                aria-describedby={error ? 'partner-chat-error' : isSubmitted ? 'partner-chat-success' : undefined}
                aria-invalid={error ? 'true' : undefined}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (error) setError('')
                  if (isSubmitted) setIsSubmitted(false)
                }}
                placeholder="Enter your email address"
                className="w-full bg-transparent px-3 py-3 font-sans text-sm text-white outline-none placeholder:text-white/60 sm:py-2 sm:text-base"
              />
              <button
                type="submit"
                className="min-h-12 w-full shrink-0 rounded-full bg-[#050505] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg transition-all duration-300 hover:bg-[#E9542E] hover:shadow-2xl active:scale-95 sm:w-auto"
              >
                Start chat
              </button>
            </div>
            {error && (
              <p id="partner-chat-error" className="mt-3 text-left font-sans text-sm font-semibold text-[#ff8f73]" role="alert">
                {error}
              </p>
            )}
            {isSubmitted && (
              <p id="partner-chat-success" className="mt-3 text-center font-sans text-sm font-semibold text-white/70" aria-live="polite">
                Thanks. We have your email and can follow up on the right trade conversation.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
