import React from 'react'
import { ArrowUpRight, CircleDot, Droplets, FlaskConical, Gauge, PackageCheck, Printer, ScanLine, ShieldCheck } from 'lucide-react'
import { machineryList } from '../data/siteData'

const machineryIcons = [Droplets, Gauge, CircleDot, ShieldCheck, ScanLine, Printer, PackageCheck, FlaskConical]

export default function HomeProofSection() {
  return (
    <section className="home-proof-section" aria-label="Machinery Base">
      <div className="home-proof-section__inner home-proof-section__inner--machinery">
        <div className="home-proof-section__machinery">
          <p>Machinery Base</p>
          <ul>
            {machineryList.map((item, index) => {
              const Icon = machineryIcons[index]
              return (
                <li key={item}>
                  <Icon className="home-proof-section__machinery-icon" size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              )
            })}
          </ul>
          <a href="/distillery">
            View Distillery
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
