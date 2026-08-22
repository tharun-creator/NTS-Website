import React from 'react'

const heroImage = '/banner/five-bottles-liquor-table-hero.jpeg'

export default function BannerSection() {
  return (
    <section
      className="relative h-[72vh] min-h-[560px] w-full overflow-hidden bg-[#030303] text-white sm:h-[78vh] md:h-[82vh] lg:h-[86vh] lg:max-h-[920px]"
      id="top"
      data-od-id="hero-single-image"
      aria-labelledby="home-hero-title"
    >
      <div className="absolute inset-0" data-parallax-speed="-0.08" data-parallax-scale="1.04">
        <img
          src={heroImage}
          alt="NTS Distillers bottle lineup on a table"
          className="h-full w-full object-cover object-[58%_center] sm:object-center"
          loading="eager"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.38)_34%,rgba(0,0,0,0.08)_62%,rgba(0,0,0,0)_100%)] sm:bg-[linear-gradient(90deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.24)_36%,rgba(0,0,0,0)_68%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0)_38%,rgba(255,255,255,0.12)_100%)]" />

      <div className="relative z-10 flex h-full items-start px-4 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16">
        <div className="max-w-[920px]">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-[#E9542E] sm:text-xs">
            Goa manufacturing / proprietary IMFL brands
          </p>
          <h1
            id="home-hero-title"
            className="mt-4 max-w-[10.8ch] font-serif text-[clamp(3.4rem,10.2vw,10.8rem)] font-black uppercase leading-[0.82] tracking-normal text-white drop-shadow-[0_18px_46px_rgba(0,0,0,0.72)]"
          >
            NTS Blenders, Built to Pour
          </h1>
          <p className="mt-5 max-w-xl font-sans text-sm font-bold leading-6 text-white/78 sm:text-base">
            NTS Blenders and Distillers brings Goa production discipline, contract bottling capacity, and label-forward whisky, brandy, rum, and vodka brands into one portfolio.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="/products"
              className="inline-flex min-h-12 items-center justify-center bg-[#E9542E] px-6 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-[#030303]"
            >
              View Brands
            </a>
            <a
              href="/distillery"
              className="inline-flex min-h-12 items-center justify-center border border-white/55 px-6 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#030303]"
            >
              See Facility
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
