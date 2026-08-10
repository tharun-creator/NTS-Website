import React from 'react'

const legacyBackground = '/images/Canacona_vodka_bottles_orange_ba…_202607231523.jpeg'

const canaconaVodkas = [
  {
    id: 'canacona-kiwi',
    name: 'Canacona Vodka - Zimmy Pop Kiwi',
    image: '/images/product-1_202607241330.png',
    flavor: 'Zimmy Pop Kiwi',
    type: 'Vodka',
    colorGradient: 'from-[#a3e635] to-[#4d7c0f]',
    abv: '37.5%',
    tagline: 'Crisp Electric Kiwi Blast',
    desc: 'An invigorating green vodka infusion with tart kiwi, smooth grain spirit refinement, and a refreshing citrus finish.',
    notes: 'Sweet kiwi pulp, zesty lime peel, smooth body.',
  },
  {
    id: 'canacona-apple',
    name: 'Canacona Vodka - Apple Blast Room',
    image: '/images/prodcut-2_202607241330.png',
    flavor: 'Apple Blast Room',
    type: 'Vodka',
    colorGradient: 'from-[#ef4444] to-[#7f1d1d]',
    abv: '37.5%',
    tagline: 'Orchard-Fresh Tart Red Apple',
    desc: 'A sweet-tart red apple vodka crafted with premium grain alcohol and natural apple essence.',
    notes: 'Freshly cut apples, subtle caramel, crisp tart finish.',
  },
  {
    id: 'canacona-orange',
    name: 'Canacona Vodka - Zimmy Twist Orange',
    image: '/images/prodcut-3_202607241330.png',
    flavor: 'Zimmy Twist Orange',
    type: 'Vodka',
    colorGradient: 'from-[#f97316] to-[#7c2d12]',
    abv: '37.5%',
    tagline: 'Zesty Sweet Orange Peel Burst',
    desc: 'A sun-drenched orange vodka with citrus oils, rich orange peel extracts, and an exceptionally smooth body.',
    notes: 'Sweet orange marmalade, zesty peel oil, clean citrus finish.',
  },
]

const distributedBrands = [
  {
    group: 'UB Group (CDL / Carew Phipson)',
    brands: ['Vin Grape', 'Top Rum', "Carew's Fine Brandy", 'Red Riband Vodka', "Booth's Gin", 'Kalyani Beer', 'UB Export Lager', 'Bullet Strong', 'Kingfisher'],
  },
  {
    group: "McDowell's Portfolio (UB Group)",
    brands: ["McDowell's Traveller Brandy & Whisky", 'Old Cask Rum', 'Blue Riband Gin', 'Duet', 'Tango', 'Golden Amber Brandy', "Men's Choice Whisky"],
  },
  {
    group: 'Shaw Wallace',
    brands: ['Haywards Fine Whisky', 'Punch Brandy', 'Haywards 5000 Beer', 'Haywards Lager', 'Haywards 2000', 'Royal Challenge Beer'],
  },
  {
    group: 'Other Major Portfolios',
    brands: ['Spencer & Co. brands', 'Zingaro Beer (Pondicherry)', 'Sand Piper Beer (Pondicherry)'],
  },
]

export default function LegacySections({ onQuickView }) {
  return (
    <>
      <section
        id="our-story"
        className="relative overflow-hidden border-t border-maroon/10 bg-cover bg-center bg-no-repeat py-16 sm:py-24"
        style={{ backgroundImage: "url('/images/Vodka_and_spirits_collection_lin._202607241659.jpeg')" }}
      >
        <div className="absolute inset-0 bg-cream/90 backdrop-blur-[1px] pointer-events-none" />

        <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-4 sm:px-12 lg:grid-cols-12 lg:gap-16">
          <div className="mx-auto flex w-full max-w-lg items-center justify-center lg:col-span-6">
            <img
              src="/images/tt.png"
              alt="NTS Blenders and Distillers premium products"
              className="h-auto w-full rounded-[2rem] border border-maroon/10 object-cover shadow-2xl"
            />
          </div>

          <div className="space-y-6 lg:col-span-6">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-coral-orange">OUR STORY</span>
            <h2 className="font-rye text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-maroon sm:text-5xl">
              Four Decades of Blending & Distilling Mastery
            </h2>
            <p className="font-sans text-sm font-medium leading-relaxed text-maroon/85">
              Born in 1980 in Pondicherry under the name <strong>NTS WINES</strong>, founded by <strong>Mr. N.T. Sambath</strong>, what started as a bold distribution venture has grown into a powerhouse spanning IMFL, beer, imported FMFL, and our own manufactured brands. Today, under <strong>Prashanth Sambath's</strong> leadership as Managing Director, NTS Blenders and Distillers Pvt. Ltd. stands as a trusted name with a rich, decades-deep history and an eye firmly on the future.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-3xl font-extrabold text-coral-orange">5.0</span>
              <div className="space-y-0.5">
                <div className="flex text-sm font-bold text-coral-orange">★★★★★</div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-maroon/80">Industry Certified Standards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="vodka-range"
        className="relative flex min-h-[620px] items-center overflow-hidden border-y border-maroon/10 bg-cover bg-center py-14 sm:py-20 lg:min-h-[650px]"
        style={{ backgroundImage: `url("${legacyBackground}")` }}
      >
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="relative hidden h-[450px] select-none sm:h-[550px] lg:col-span-4 lg:block lg:-translate-x-6 xl:-translate-x-20">
              {canaconaVodkas.map((vodka, index) => {
                const positionClass = index === 0 ? 'left-[8%] bottom-[5%]' : index === 1 ? 'left-[36%] bottom-[10%]' : 'right-[8%] bottom-[5%]'
                const label = index === 0 ? 'Kiwi Details' : index === 1 ? 'Apple Details' : 'Orange Details'
                return (
                  <button
                    key={vodka.id}
                    type="button"
                    onClick={() => onQuickView?.(vodka)}
                    className={`group absolute h-[80%] w-[25%] cursor-pointer rounded-3xl ${positionClass}`}
                    title={`View ${vodka.flavor}`}
                    aria-label={`View ${vodka.flavor}`}
                  >
                    <span className="absolute inset-0 flex items-center justify-center rounded-3xl border border-white/0 bg-white/0 transition-all duration-300 group-hover:border-white/10 group-hover:bg-white/5">
                      <span className="rounded-full bg-[#E9542E] px-3 py-1.5 text-[10px] font-bold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                        {label}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="space-y-6 rounded-[2rem] bg-white p-6 shadow-2xl sm:rounded-[2.5rem] sm:p-12 lg:col-span-6 lg:col-start-7">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E9542E]">DISTRIBUTION LEGACY</span>
              <h2 className="font-rye text-3xl font-extrabold uppercase leading-tight text-maroon sm:text-4xl lg:text-[40px]">
                Four Decades of Distribution & Market Leadership
              </h2>
              <p className="font-sans text-xs leading-relaxed text-maroon/70 sm:text-sm">
                Prior to manufacturing its own brands, NTS built its business distributing brands on behalf of major spirits groups in India. These include:
              </p>

              <div className="space-y-4 pt-2">
                {distributedBrands.map((group) => (
                  <div key={group.group} className="space-y-1 border-l-2 border-[#E9542E] py-1 pl-4">
                    <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#E9542E]">{group.group}</h4>
                    <p className="font-sans text-[11px] leading-relaxed text-maroon/80 sm:text-xs">{group.brands.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
