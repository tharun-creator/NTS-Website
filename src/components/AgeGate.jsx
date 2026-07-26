import React, { useState, useEffect } from 'react'

export default function AgeGate() {
  const [isVerified, setIsVerified] = useState(true) // Default to true while checking localStorage to avoid flashes

  useEffect(() => {
    const verified = localStorage.getItem('nts_distillers_age_verified')
    if (verified !== 'true') {
      setIsVerified(false)
    }
  }, [])

  const handleVerify = (verified) => {
    if (verified) {
      localStorage.setItem('nts_distillers_age_verified', 'true')
      setIsVerified(true)
    } else {
      window.location.href = 'https://www.google.com'
    }
  }

  if (isVerified) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-maroon/95 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-[2rem] bg-cream p-8 text-center shadow-2xl border-4 border-coral-orange/20 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-coral-orange/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-hot-pink/20 rounded-full blur-xl"></div>
        
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-maroon mb-2">NTS Blenders</h1>
        <p className="text-[10px] font-bold uppercase tracking-widest text-coral-orange mb-6">and Distillers Pvt. Ltd.</p>
        
        <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-maroon mb-6">
          Are you of legal drinking age?
        </h2>
        
        <p className="text-sm font-sans mb-8 text-maroon/85 leading-relaxed font-medium">
          You must be of legal drinking age in your country or state of residence to enter our site. NTS promotes responsible drinking.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleVerify(true)}
            className="flex-1 px-8 py-3.5 bg-maroon text-cream font-bold rounded-full hover:bg-coral-orange hover:text-white transition-all duration-300 uppercase tracking-widest text-[10px] shadow-md active:scale-95 transform"
          >
            Yes, I am
          </button>
          <button
            onClick={() => handleVerify(false)}
            className="flex-1 px-8 py-3.5 border border-maroon/40 text-maroon font-bold rounded-full hover:bg-maroon/10 transition-all duration-300 uppercase tracking-widest text-[10px] active:scale-95 transform"
          >
            No, I am not
          </button>
        </div>

        <p className="mt-8 text-[10px] text-maroon/80 uppercase tracking-widest font-mono font-bold">
          Enjoy responsibly • Age verification required
        </p>
      </div>
    </div>
  )
}
