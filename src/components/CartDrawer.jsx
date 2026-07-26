import React, { useState } from 'react'

export default function CartDrawer({ isOpen, onClose, cartItems, removeFromCart }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Inquiry Sent to md@ntsdistillers.com!\n\nDetails:\nCompany: ${formData.company}\nItems Requested: ${cartItems.map(i => i.name).join(', ')}`)
    onClose()
  }

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-maroon/40 backdrop-blur-sm transition-opacity" 
      />

      <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-cream text-maroon flex flex-col shadow-2xl transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="p-6 border-b border-maroon/10 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold uppercase tracking-wide">Inquiry Portfolio</h2>
            <p className="text-[10px] text-maroon/80 uppercase tracking-widest font-sans font-bold">Manufacturing & Sample Requests</p>
          </div>
          <button 
            onClick={onClose}
            className="w-11 h-11 rounded-full bg-maroon/5 text-maroon hover:bg-maroon hover:text-cream flex items-center justify-center transition-all text-sm font-bold active:scale-95"
            aria-label="Close Inquiry Drawer"
          >
            ✕
          </button>
        </div>

        {/* B2B Status Info */}
        <div className="bg-coral-orange text-cream px-6 py-3.5 text-xs text-center font-sans tracking-wide">
          <p className="font-semibold">🤝 DIRECT DISTILLERY CONTRACT MANUFACTURING</p>
          <p className="text-[10px] opacity-95 mt-0.5 font-bold">Goa Industrial Estate • 3 Operational Production Lines</p>
        </div>

        {/* Selected Products list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-coral-orange mb-3">Selected Products for Inquiry</h3>
            {cartItems.length === 0 ? (
              <p className="text-xs text-maroon/80 italic font-medium">No products selected yet. Click "Add to Inquiry" on any brand to request technical details or samples.</p>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-2xl shadow-sm border border-maroon/5">
                    <span className="text-2xl">{item.graphic}</span>
                    <div className="flex-1">
                      <h4 className="font-serif text-xs font-bold uppercase tracking-tight text-maroon">{item.name}</h4>
                      <p className="text-[9px] text-maroon/70 font-sans font-semibold">{item.type} • {item.dosage}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] text-coral-orange underline font-sans font-bold px-2 py-1"
                      aria-label={`Remove ${item.name} from inquiry`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-maroon/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-coral-orange">Partnership Details</h3>
            
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-maroon/80 block mb-1">Your Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2.5 rounded-xl border border-maroon/20 bg-white text-xs text-maroon focus:outline-none focus:border-coral-orange font-medium"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-maroon/80 block mb-1">Corporate Email</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-2.5 rounded-xl border border-maroon/20 bg-white text-xs text-maroon focus:outline-none focus:border-coral-orange font-medium"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-maroon/80 block mb-1">Company / Group</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2.5 rounded-xl border border-maroon/20 bg-white text-xs text-maroon focus:outline-none focus:border-coral-orange font-medium"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-maroon/60 block mb-1">Partnership Notes / Requirements</label>
              <textarea 
                className="w-full h-20 px-4 py-2.5 rounded-xl border border-maroon/15 bg-white text-xs text-maroon focus:outline-none focus:border-coral-orange"
                placeholder="E.g., Contract bottling, blending capacity needed, or bulk spirits supply..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 bg-maroon text-cream font-bold rounded-full hover:bg-coral-orange hover:text-white transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-xs shadow-md"
            >
              Submit B2B Proposal
            </button>
          </form>
        </div>

        {/* Contact direct info */}
        <div className="p-6 border-t border-maroon/10 bg-white/60 text-center space-y-2">
          <div className="flex justify-center gap-6 text-[10px] font-bold uppercase tracking-wide text-maroon/70">
            <span>md@ntsdistillers.com</span>
            <span>8925523801</span>
          </div>
        </div>
      </div>
    </div>
  )
}
