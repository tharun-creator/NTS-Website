import React from "react"
import { motion } from "framer-motion"
import { TestimonialsColumn } from "./ui/testimonials-columns-1"

const testimonialsList = [
  {
    text: "NTS Blenders has been our trusted contract bottling partner for over 5 years. Their state-of-the-art facility in Goa and strict compliance with excise policies made our expansion seamless.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    name: "Vikram Goel",
    role: "VP Supply Chain, Premier Spirits",
  },
  {
    text: "The blend consistency of Old Town Whisky is exceptional. Our retail partners across South India report high repeat purchases and stable margins.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    name: "Rajesh K.",
    role: "Partner, Trinity Distributors",
  },
  {
    text: "NTS Blenders' automated bottling lines and QA lab ensures zero-defect batches. Highly reliable, responsive, and professional B2B management team.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    name: "Priya Nair",
    role: "Technical Auditor, SafeBottlers",
  },
  {
    text: "The smooth finish of Wanted 999 VSOP Brandy is a consumer favorite. Outstanding label design and product depth in the premium brandy segment.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    name: "Arthur Fernandes",
    role: "Beverage Director, Goa Lounges",
  },
  {
    text: "Superb manufacturing agility. When we needed a high-volume run of dark rum blends for a festival season, NTS delivered ahead of schedule.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    name: "Devendra Shah",
    role: "Operations Lead, Coastal Spirits",
  },
  {
    text: "The sugar cane rum they produce has a clean, unique maritime character. A stellar addition to our boutique craft spirits portfolio.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    name: "Samantha D'Souza",
    role: "Curator, The Craft Spirit Co.",
  },
  {
    text: "Having audited their Goa industrial estate facility, NTS excels in safety compliance, FDA standards, and labor welfare protocols.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    name: "Dr. Anil R.",
    role: "Quality Assurance Consultant",
  },
  {
    text: "A legacy brand built on trust. Mr. Prashanth Sambath continues to honor Mr. N.T. Sambath's high-quality standards in every blend.",
    image: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=150&auto=format&fit=crop&q=80",
    name: "K. Raghavan",
    role: "Retired Excise Officer",
  },
  {
    text: "Excellent warehouse capacity and strategic location in Goa. Logistics are smooth, customs compliance is impeccable.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    name: "Sana Sheikh",
    role: "Head of B2B Logistics",
  },
]

const firstColumn = testimonialsList.slice(0, 3)
const secondColumn = testimonialsList.slice(3, 6)
const thirdColumn = testimonialsList.slice(6, 9)

export default function Testimonials() {
  return (
    <section className="bg-cream py-16 sm:py-24 relative overflow-hidden border-t border-maroon/10">
      {/* Background glow overlay matching theme */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[70%] h-[30%] bg-coral-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-12 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center mb-14"
        >
          <div className="flex justify-center">
            <span className="text-[11px] font-bold uppercase tracking-widest text-coral-orange bg-maroon/5 px-4 py-1.5 rounded-full">
              B2B PARTNER FEEDBACK
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase text-maroon mt-5 leading-tight tracking-normal">
            What our partners say
          </h2>
          <p className="text-sm text-maroon/70 font-sans leading-relaxed mt-4">
            See how NTS Blenders and Distillers Pvt. Ltd. delivers unmatched value in contract manufacturing, quality blending, and distribution support.
          </p>
        </motion.div>

        {/* Scroll columns with linear top/bottom mask fade */}
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[640px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={26} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={32} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={28} />
        </div>
      </div>
    </section>
  )
}
