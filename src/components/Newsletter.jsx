import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Reveal from './motion/Reveal'

export default function Newsletter() {
  const bottleEase = [0.22, 1, 0.36, 1]
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

  return (
    <section
      id="partner-notes"
      className="relative min-h-[560px] sm:min-h-[700px] lg:min-h-[780px] overflow-hidden bg-black text-white px-4 py-20 sm:py-28 md:px-8 border-t border-white/10 flex items-center justify-center select-none"
      data-od-id="partner-notes-newsletter"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[10vw] bg-gradient-to-r from-black/80 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[10vw] bg-gradient-to-l from-black/80 to-transparent" aria-hidden="true" />

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
          <Reveal as="h2" className="mx-auto mt-6 max-w-[850px] font-serif text-[clamp(2rem,10vw,4.4rem)] font-black uppercase leading-[1.02] tracking-tight text-white sm:text-[clamp(2.1rem,11vw,4.4rem)] sm:leading-[1.04]">
            TRADE-READY SPIRITS, BOTTLING CAPACITY, AND PARTNERSHIP OPPORTUNITIES.
          </Reveal>

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
              <div id="partner-chat-success" className="mt-4 flex items-start gap-3 rounded-xl border border-[#E9542E]/60 bg-[#E9542E]/10 px-5 py-4 text-left text-white shadow-[0_12px_36px_rgba(233,84,46,0.16)]" role="status" aria-live="polite">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#E9542E]" size={22} aria-hidden="true" />
                <div>
                  <p className="font-sans text-base font-bold">Thank you for submitting your email!</p>
                  <p className="mt-1 font-sans text-sm text-white/80">We'll contact you soon.</p>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
