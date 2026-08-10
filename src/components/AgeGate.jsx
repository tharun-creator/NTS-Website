import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const STORAGE_KEY = 'nts_distillers_age_verified'
const MINIMUM_AGE = 18

function getAge(dateOfBirth) {
  const today = new Date()
  let age = today.getFullYear() - dateOfBirth.getFullYear()
  const monthDelta = today.getMonth() - dateOfBirth.getMonth()

  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < dateOfBirth.getDate())) {
    age -= 1
  }

  return age
}

function isValidDate(day, month, year) {
  const parsedDay = Number(day)
  const parsedMonth = Number(month)
  const parsedYear = Number(year)
  const date = new Date(parsedYear, parsedMonth - 1, parsedDay)

  return (
    date.getFullYear() === parsedYear &&
    date.getMonth() === parsedMonth - 1 &&
    date.getDate() === parsedDay
  )
}

export default function AgeGate() {
  const [isVerified, setIsVerified] = useState(() => {
    if (typeof window === 'undefined') return true
    return localStorage.getItem(STORAGE_KEY) === 'true'
  })
  const [dob, setDob] = useState({ day: '', month: '', year: '' })
  const [error, setError] = useState('')

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 100 }, (_, index) => String(currentYear - index))
  }, [])

  useEffect(() => {
    if (isVerified) return undefined

    document.body.classList.add('age-gate-open')
    return () => document.body.classList.remove('age-gate-open')
  }, [isVerified])

  const handleDateChange = (field, value) => {
    setDob((current) => ({
      ...current,
      [field]: value,
    }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!dob.day || !dob.month || !dob.year) {
      setError('Select your complete date of birth to continue.')
      return
    }

    if (!isValidDate(dob.day, dob.month, dob.year)) {
      setError('Please select a valid date of birth.')
      return
    }

    const dateOfBirth = new Date(Number(dob.year), Number(dob.month) - 1, Number(dob.day))

    if (getAge(dateOfBirth) < MINIMUM_AGE) {
      setError('You are not eligible to proceed to the website.')
      return
    }

    localStorage.setItem(STORAGE_KEY, 'true')
    setIsVerified(true)
  }

  if (isVerified) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[radial-gradient(circle_at_20%_20%,rgba(233,84,46,0.24),transparent_30%),radial-gradient(circle_at_82%_72%,rgba(201,161,90,0.18),transparent_32%),linear-gradient(135deg,#150A09,#4A151C_54%,#2C0F14)] p-4 text-cream sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <motion.form
        className="relative w-full max-w-[620px] overflow-hidden rounded-lg border border-gold/35 bg-[#2C0F14]/92 p-6 text-center shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-md sm:p-10"
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-coral-orange to-gold" />

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-gold/45 bg-cream p-3 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
          <img src="/logo.png" alt="NTS Blenders and Distillers logo" className="h-full w-full object-contain" />
        </div>

        <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
          NTS Blenders and Distillers Pvt. Ltd.
        </p>
        <h1 id="age-gate-title" className="mt-4 font-rye text-3xl leading-tight text-cream sm:text-5xl">
          Verify Your Age
        </h1>
        <p className="mx-auto mt-4 max-w-md font-lora text-sm leading-7 text-cream/72">
          Please confirm your date of birth before entering this spirits portfolio.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3" aria-label="Date of birth">
          <label className="block text-left">
            <span className="font-mono text-[10px] uppercase tracking-widest text-cream/58">Day</span>
            <select
              aria-label="Day"
              autoComplete="bday-day"
              className="mt-2 h-12 w-full rounded-md border border-gold/25 bg-cream px-3 font-sans text-sm font-bold text-maroon outline-none transition-colors focus:border-coral-orange"
              name="day"
              onChange={(event) => handleDateChange('day', event.target.value)}
              value={dob.day}
            >
              <option value="">DD</option>
              {Array.from({ length: 31 }, (_, index) => {
                const day = String(index + 1).padStart(2, '0')
                return <option key={day} value={day}>{day}</option>
              })}
            </select>
          </label>

          <label className="block text-left">
            <span className="font-mono text-[10px] uppercase tracking-widest text-cream/58">Month</span>
            <select
              aria-label="Month"
              autoComplete="bday-month"
              className="mt-2 h-12 w-full rounded-md border border-gold/25 bg-cream px-3 font-sans text-sm font-bold text-maroon outline-none transition-colors focus:border-coral-orange"
              name="month"
              onChange={(event) => handleDateChange('month', event.target.value)}
              value={dob.month}
            >
              <option value="">MM</option>
              {Array.from({ length: 12 }, (_, index) => {
                const month = String(index + 1).padStart(2, '0')
                return <option key={month} value={month}>{month}</option>
              })}
            </select>
          </label>

          <label className="block text-left">
            <span className="font-mono text-[10px] uppercase tracking-widest text-cream/58">Year</span>
            <select
              aria-label="Year"
              autoComplete="bday-year"
              className="mt-2 h-12 w-full rounded-md border border-gold/25 bg-cream px-3 font-sans text-sm font-bold text-maroon outline-none transition-colors focus:border-coral-orange"
              name="year"
              onChange={(event) => handleDateChange('year', event.target.value)}
              value={dob.year}
            >
              <option value="">YYYY</option>
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </label>
        </div>

        {error && (
          <p className="mt-4 rounded-md border border-coral-orange/40 bg-coral-orange/12 px-4 py-3 font-sans text-xs font-bold uppercase tracking-wide text-coral-orange" role="alert">
            {error}
          </p>
        )}

        <button
          className="mt-7 inline-flex w-full max-w-xs items-center justify-center rounded-full bg-coral-orange px-7 py-4 font-sans text-xs font-black uppercase tracking-[0.22em] text-cream transition-all duration-200 hover:-translate-y-0.5 hover:bg-cream hover:text-maroon active:scale-[0.98]"
          type="submit"
        >
          Enter
        </button>

        <p className="mx-auto mt-6 max-w-md font-sans text-[11px] leading-5 text-cream/52">
          This website is intended only for adults of legal drinking age. Enjoy responsibly.
        </p>
      </motion.form>
    </motion.div>
  )
}
