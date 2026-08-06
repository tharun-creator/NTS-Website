import React, { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'nts_distillers_age_verified'
const MINIMUM_AGE = 21

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
  const [isVerified, setIsVerified] = useState(true)
  const [dob, setDob] = useState({ day: '', month: '', year: '' })
  const [error, setError] = useState('')
  const monthRef = useRef(null)
  const yearRef = useRef(null)

  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY)
    if (verified !== 'true') {
      setIsVerified(false)
    }
  }, [])

  useEffect(() => {
    if (isVerified) return undefined

    document.body.classList.add('age-gate-open')
    return () => document.body.classList.remove('age-gate-open')
  }, [isVerified])

  const handleDateChange = (field, value) => {
    const maxLength = field === 'year' ? 4 : 2
    const nextValue = value.replace(/\D/g, '').slice(0, maxLength)

    setDob((current) => ({
      ...current,
      [field]: nextValue,
    }))
    setError('')

    if (field === 'day' && nextValue.length === 2) {
      monthRef.current?.focus()
    }

    if (field === 'month' && nextValue.length === 2) {
      yearRef.current?.focus()
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (dob.day.length !== 2 || dob.month.length !== 2 || dob.year.length !== 4) {
      setError('Please enter your complete date of birth.')
      return
    }

    if (!isValidDate(dob.day, dob.month, dob.year)) {
      setError('Please enter a valid date of birth.')
      return
    }

    const dateOfBirth = new Date(Number(dob.year), Number(dob.month) - 1, Number(dob.day))

    if (getAge(dateOfBirth) < MINIMUM_AGE) {
      window.location.href = 'https://www.google.com'
      return
    }

    localStorage.setItem(STORAGE_KEY, 'true')
    setIsVerified(true)
  }

  if (isVerified) return null

  return (
    <div className="age-gate-page" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
      <div className="age-gate-modal">
        <form className="age-gate-modal-inner" onSubmit={handleSubmit} noValidate>
          <div className="age-gate-logo" aria-label="NTS Blenders and Distillers Pvt. Ltd.">
            <img
              src="/logo.png"
              alt="NTS Blenders and Distillers Pvt. Ltd. logo"
              className="age-gate-logo-mark"
            />
            <span className="age-gate-logo-main">NTS BLENDERS</span>
            <span className="age-gate-logo-sub">AND DISTILLERS PVT. LTD.</span>
          </div>

          <h1 className="age-gate-headline" id="age-gate-title">
            We&apos;ve been blending since 1980.{' '}
            <span>Tell us you&apos;ve been around a while too.</span>
          </h1>

          <div className="age-gate-date-row" aria-label="Date of birth">
            <div className="age-gate-date-box">
              <input
                aria-label="Day"
                autoComplete="bday-day"
                inputMode="numeric"
                maxLength={2}
                name="day"
                onChange={(event) => handleDateChange('day', event.target.value)}
                placeholder="DD"
                type="text"
                value={dob.day}
              />
            </div>

            <div className="age-gate-date-box">
              <input
                ref={monthRef}
                aria-label="Month"
                autoComplete="bday-month"
                inputMode="numeric"
                maxLength={2}
                name="month"
                onChange={(event) => handleDateChange('month', event.target.value)}
                placeholder="MM"
                type="text"
                value={dob.month}
              />
            </div>

            <div className="age-gate-date-box">
              <input
                ref={yearRef}
                aria-label="Year"
                autoComplete="bday-year"
                inputMode="numeric"
                maxLength={4}
                name="year"
                onChange={(event) => handleDateChange('year', event.target.value)}
                placeholder="YYYY"
                type="text"
                value={dob.year}
              />
            </div>
          </div>

          <p className="age-gate-consent">
            By clicking Enter, I agree to the Terms of Use. I understand that my personal information will
            be processed in accordance with the <a href="#contact">Privacy Policy</a>.
          </p>

          {error && (
            <p className="age-gate-error" role="alert">
              {error}
            </p>
          )}

          <button className="age-gate-enter" type="submit">
            Enter
          </button>

          <p className="age-gate-tagline">EMBRACE THE CRAFT · ENJOY RESPONSIBLY</p>

          <footer className="age-gate-footer">
            <nav className="age-gate-footer-links" aria-label="Age gate legal links">
              <a href="#contact">Terms of Use</a>
              <a href="#contact">Privacy Policy</a>
              <a href="#contact">Cookie Policy</a>
              <a href="#contact">Sustainability</a>
              <a href="#contact">Contact Us</a>
              <a href="#contact">FAQs</a>
              <a href="#contact">Pressroom</a>
              <a href="#contact">Accessibility</a>
            </nav>

            <p className="age-gate-distillery">NTS Blenders and Distillers · Pondicherry, India</p>

            <p className="age-gate-legal">
              NTS Blenders and Distillers Pvt. Ltd. and associated trademarks are owned or licensed by
              their respective rights holders. This website is intended only for adults of legal drinking
              age. Please do not share alcohol-related content with anyone under the legal drinking age.
            </p>

            <a className="age-gate-data-link" href="#contact">Do Not Sell or Share My Data</a>

            <div className="age-gate-legal-stack">
              <a href="#contact">Visit a responsible-drinking resource</a>
              <span>Trademark ownership remains with the respective rights holders.</span>
              <span>Products and packaging may vary by region.</span>
            </div>

            <p className="age-gate-ghost">NTS Blenders</p>
          </footer>
        </form>
      </div>

      <div className="age-gate-seal" aria-hidden="true">
        <span>NTS</span>
        <small>EST. 1980</small>
      </div>
    </div>
  )
}
