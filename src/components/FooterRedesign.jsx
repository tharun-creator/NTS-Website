import React from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function FooterRedesign() {
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

  const contactLinks = [
    ['PH', 'Phone', '+91 89255 23801', 'tel:8925523801'],
    ['EM', 'Email', 'Ntsdistillers@gmail.com', 'mailto:Ntsdistillers@gmail.com'],
    ['GO', 'Location', 'Canacona Industrial Estate, Goa', '#contact'],
  ]

  return (
    <footer className="bg-[#150A09] px-5 py-6 md:px-8 lg:px-14">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-cream/10 bg-[linear-gradient(145deg,#2C0F14,#150A09)] px-6 pb-0 pt-14 text-cream sm:px-8 md:px-12 md:pt-16 lg:px-14"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-[520px] font-serif text-[30px] font-semibold leading-[1.08] tracking-normal text-cream text-left md:text-[42px]">
            Four decades of spirits.
            <br />Built for the trade.
          </h2>

          <a
            href="#contact"
            className="inline-flex w-fit items-center justify-center rounded-full bg-coral-orange px-7 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-cream hover:text-maroon focus:outline-none focus:ring-2 focus:ring-coral-orange/60 focus:ring-offset-2 focus:ring-offset-bg-deep"
          >
            Start a Partnership
          </a>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 text-left">
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-soft">
              Portfolio
            </h3>
            <nav className="mt-5 flex flex-col items-start gap-2.5 text-[14px] font-medium text-cream/76">
              {portfolioLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="relative w-fit after:absolute after:left-0 after:top-full after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-soft">
              Explore
            </h3>
            <nav className="mt-5 flex flex-col items-start gap-2.5 text-[14px] font-medium text-cream/76">
              {exploreLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="relative w-fit after:absolute after:left-0 after:top-full after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-soft">
              Direct Contact
            </h3>
            <div className="mt-5 flex flex-col items-start gap-3 text-[14px] font-medium text-cream/76">
              {contactLinks.map(([icon, label, handle, href]) => (
                <a key={label} href={href} className="group flex w-fit items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cream/15 bg-cream/8 text-[10px] font-bold text-gold-soft transition-colors duration-300 group-hover:border-coral-orange">
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

        <div className="mt-14 md:mt-16 text-left">
          <p className="text-[13px] font-medium text-cream/45">
            © 2026 NTS Blenders and Distillers Pvt. Ltd. All rights reserved.
          </p>

          <div className="mt-5 h-[86px] overflow-hidden sm:h-[112px] md:h-[150px] lg:h-[194px]">
            <div
              className="flex whitespace-nowrap text-[64px] font-black uppercase leading-[0.78] tracking-normal text-cream/8 min-[390px]:text-[76px] sm:text-[108px] md:text-[152px] lg:text-[198px] xl:text-[226px]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              <span>NTS</span>
              <span className="ml-[0.18em]">Blenders</span>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
