import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Mail, Phone, ArrowUpRight } from 'lucide-react'

export default function FooterRedesign() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <footer className="w-full overflow-hidden bg-[#F5EFE6] text-[#150a09]" aria-label="Site footer" id="footer">
      {/* 1. High-Impact Top Banner Band (Inspired by reference design) */}
      <div className="w-full bg-[#E9542E] px-6 py-10 text-white sm:px-12 sm:py-14 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="font-serif text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
            Let’s work together
          </h2>

          <div className="flex flex-wrap items-center gap-6 text-xs font-extrabold uppercase tracking-widest sm:gap-10 sm:text-sm">
            <a
              href="mailto:Ntsdistillers@gmail.com"
              className="inline-flex items-center gap-2 border-b-2 border-white pb-1 transition-opacity hover:opacity-80"
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
            <a
              href="mailto:Ntsdistillers@gmail.com?subject=NTS B2B Proposal Request"
              className="inline-flex items-center gap-2 border-b-2 border-white pb-1 transition-opacity hover:opacity-80"
            >
              B2B Proposals
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Body */}
      <div className="mx-auto max-w-[1440px] px-6 pt-14 pb-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Social & Mail Logos, Newsletter, Terms */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-6">
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#150a09]/60">
                Connect With Us
              </p>
              
              {/* Instagram & Mail Logos */}
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#150a09]/20 bg-white text-[#150a09] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#E9542E] hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="mailto:Ntsdistillers@gmail.com"
                  aria-label="Send Email"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#150a09]/20 bg-white text-[#150a09] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#E9542E] hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a
                  href="tel:8925523801"
                  aria-label="Call NTS Distillers"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#150a09]/20 bg-white text-[#150a09] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#E9542E] hover:text-white"
                >
                  <Phone className="h-5 w-5" />
                </a>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-8 max-w-md">
                <p className="font-sans text-xs font-bold uppercase tracking-wider text-[#150a09]/70">
                  Join B2B Trade Updates
                </p>
                {subscribed ? (
                  <p className="mt-2 font-sans text-sm font-bold text-[#E9542E]">
                    ✓ Thank you for subscribing!
                  </p>
                ) : (
                  <form onSubmit={handleSubscribe} className="mt-2 flex items-center border-b border-[#150a09]/40 pb-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-transparent font-sans text-sm outline-none placeholder:text-[#150a09]/40"
                    />
                    <button
                      type="submit"
                      className="ml-2 font-sans text-xs font-black uppercase tracking-widest text-[#E9542E] hover:text-[#150a09]"
                    >
                      Join →
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Legal & Copyright */}
            <div className="flex flex-wrap items-center gap-6 font-sans text-xs font-medium text-[#150a09]/70">
              <span>© {new Date().getFullYear()} NTS Blenders and Distillers Pvt. Ltd.</span>
              <a href="#footer" className="hover:underline">Terms of Use</a>
              <a href="#footer" className="hover:underline">Privacy Policy</a>
            </div>
          </div>

          {/* Right Columns: Manufacturing & Corporate Locations */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-6">
            <div>
              <p className="font-sans text-xs font-extrabold uppercase tracking-wider text-[#150a09]">
                Goa Manufacturing Facility
              </p>
              <p className="mt-3 font-sans text-xs leading-relaxed text-[#150a09]/75">
                Main Distillery & High-Speed Bottling Unit<br />
                Goa Manufacturing Plant, India<br />
                <span className="font-semibold text-[#150a09]">Phone:</span> +91 8925523801<br />
                <span className="font-semibold text-[#150a09]">Email:</span> Ntsdistillers@gmail.com
              </p>
            </div>

            <div>
              <p className="font-sans text-xs font-extrabold uppercase tracking-wider text-[#150a09]">
                Pondicherry Commercial HQ
              </p>
              <p className="mt-3 font-sans text-xs leading-relaxed text-[#150a09]/75">
                Distribution & Commercial Headquarters<br />
                Shaping Alcobev since 1980<br />
                15+ Proprietary IMFL Brands<br />
                Contract Bottling & Blending Partners
              </p>
            </div>
          </div>

        </div>

        {/* 3. GIANT MASSIVE BRAND WORDMARK AT BOTTOM (Inspired by reference image) */}
        <div className="mt-14 w-full select-none overflow-hidden border-t border-[#150a09]/15 pt-4 text-center">
          <h2 className="font-serif text-[15.5vw] font-black uppercase leading-[0.78] tracking-tighter text-[#150a09]">
            NTS BLENDERS
          </h2>
        </div>
      </div>
    </footer>
  )
}
