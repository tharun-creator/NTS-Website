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
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#150a09]/75 backdrop-blur-md p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <motion.form
        className="relative w-full max-w-[600px] overflow-hidden rounded-3xl border-2 border-[#3E1F18]/20 bg-[#F5EFE6] p-8 text-center shadow-[0_30px_90px_rgba(21,10,9,0.45)] sm:p-12"
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        onSubmit={handleSubmit}
        noValidate
      >
        {/* NTS Emblem Seal Logo */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105">
          <img src="/logo.png" alt="NTS Blenders and Distillers logo" className="h-full w-full object-contain filter drop-shadow-[0_8px_20px_rgba(62,31,24,0.3)]" />
        </div>

        <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#E9542E]">
          NTS BLENDERS AND DISTILLERS PVT. LTD.
        </p>
        <h1 id="age-gate-title" className="mt-3 font-serif text-3xl font-black uppercase leading-none text-[#3E1F18] sm:text-5xl">
          VERIFY YOUR AGE
        </h1>
        <p className="mx-auto mt-4 max-w-md font-sans text-sm font-medium leading-relaxed text-[#3E1F18]/80">
          Please confirm your date of birth before entering this spirits portfolio.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3" aria-label="Date of birth">
          <label className="block text-left">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#3E1F18]/75">Day</span>
            <select
              aria-label="Day"
              autoComplete="bday-day"
              className="mt-2 h-12 w-full rounded-lg border border-[#3E1F18]/30 bg-white px-3 font-sans text-sm font-bold text-[#3E1F18] outline-none transition-colors focus:border-[#E9542E]"
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
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#3E1F18]/75">Month</span>
            <select
              aria-label="Month"
              autoComplete="bday-month"
              className="mt-2 h-12 w-full rounded-lg border border-[#3E1F18]/30 bg-white px-3 font-sans text-sm font-bold text-[#3E1F18] outline-none transition-colors focus:border-[#E9542E]"
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
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#3E1F18]/75">Year</span>
            <select
              aria-label="Year"
              autoComplete="bday-year"
              className="mt-2 h-12 w-full rounded-lg border border-[#3E1F18]/30 bg-white px-3 font-sans text-sm font-bold text-[#3E1F18] outline-none transition-colors focus:border-[#E9542E]"
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
          <p className="mt-4 rounded-md border border-[#E9542E]/50 bg-[#E9542E]/15 px-4 py-3 font-sans text-xs font-bold uppercase tracking-wide text-[#E9542E]" role="alert">
            {error}
          </p>
        )}

        <button
          className="mt-8 inline-flex w-full max-w-xs items-center justify-center rounded-full bg-[#E9542E] px-7 py-4 font-sans text-xs font-black uppercase tracking-[0.22em] text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3E1F18] hover:text-white active:scale-[0.98]"
          type="submit"
        >
          ENTER
        </button>

        <p className="mx-auto mt-6 max-w-md font-sans text-[11px] leading-5 text-[#3E1F18]/65 font-medium">
          This website is intended only for adults of legal drinking age. Enjoy responsibly.
        </p>
      </motion.form>
    </motion.div>
  )
}
