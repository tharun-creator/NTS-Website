import React from 'react'
import { Search } from 'lucide-react'

export default function ProductCard({ product, onAddToCart, onQuickView }) {
  const { name, price, type, dosage, graphic, colorGradient, badgeText, description } = product

  return (
    <div className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-card border border-maroon/5 flex flex-col justify-between relative overflow-hidden">
      {badgeText && (
        <span className="absolute top-6 left-6 z-10 bg-maroon text-cream text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
          {badgeText}
        </span>
      )}

      <span className="absolute top-6 right-6 z-10 bg-cream text-maroon text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
        ${price.toFixed(2)}
      </span>

      <div
        onClick={() => onQuickView && onQuickView(product)}
        className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${colorGradient} flex items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] cursor-pointer`}
      >
        <div className="absolute w-24 h-24 bg-white/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>

        {product.removedBgImage ? (
          <img
            src={product.removedBgImage}
            alt={name}
            className="h-[85%] object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 select-none"
          />
        ) : (
          <div className="text-4xl font-black text-white filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)] select-none transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            {graphic || 'NTS'}
          </div>
        )}
      </div>

      <div className="mt-4 flex-1 flex flex-col justify-between">
        <div onClick={() => onQuickView && onQuickView(product)} className="cursor-pointer">
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-[10px] font-bold font-sans uppercase tracking-widest text-maroon/80">
              {type} | {dosage}
            </span>
          </div>
          <h3 className="font-serif text-lg font-bold uppercase tracking-tight text-maroon mb-2 leading-tight group-hover:text-coral-orange transition-colors">
            {name}
          </h3>
          <p className="text-xs text-maroon/85 font-sans line-clamp-2 leading-relaxed mb-4 font-medium">
            {description}
          </p>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 py-3 bg-cream text-maroon font-extrabold rounded-full group-hover:bg-maroon group-hover:text-cream transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] border border-maroon/15 hover:border-transparent active:scale-[0.98] transform"
          >
            <span>Add to Inquiry</span>
          </button>
          <button
            onClick={() => onQuickView && onQuickView(product)}
            className="px-4 py-3 bg-maroon/5 text-maroon hover:bg-[#E9542E] hover:text-white font-extrabold rounded-full transition-all duration-300 text-[10px] uppercase tracking-widest active:scale-[0.98] transform"
            title="View Details"
            aria-label={`View details for ${name}`}
          >
            <Search size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
