import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const TestimonialsColumn = ({ className, testimonials, duration = 15 }) => {
  return (
    <div className={cn("overflow-hidden h-[600px] relative w-full max-w-xs", className)}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-7 rounded-xl border border-maroon/10 bg-white/90 shadow-sm hover:shadow-md transition-all max-w-xs w-full flex flex-col justify-between min-h-[180px]" 
                  key={`${index}-${i}`}
                >
                  <div className="text-xs text-maroon/80 font-sans leading-relaxed italic">
                    "{text}"
                  </div>
                  <div className="flex items-center gap-3 mt-5 border-t border-maroon/5 pt-4">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover border border-maroon/10"
                    />
                    <div className="flex flex-col text-left">
                      <div className="font-serif text-maroon text-xs font-bold tracking-tight leading-tight">{name}</div>
                      <div className="text-[10px] text-coral-orange font-mono font-semibold tracking-wider uppercase mt-0.5">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  )
}
