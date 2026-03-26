import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Settings, ShoppingBag } from 'lucide-react'

const images = [
  'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1800&q=80',
]

const prodottiRapidi = [
  { nome: 'Scatola Americana Small', prezzo: '€0.45/pz', slug: 'scatola-americana-small' },
  { nome: 'Scatola E-commerce', prezzo: '€0.55/pz', slug: 'scatola-ecommerce' },
  { nome: 'Espositore da Banco', prezzo: '€2.50/pz', slug: 'espositore-banco' },
  { nome: 'Scatola Luxury', prezzo: '€4.50/pz', slug: 'scatola-luxury' },
]

export default function Hero() {
  const [activeImg, setActiveImg] = useState(0)
  const [activeTab, setActiveTab] = useState<'configuratore' | 'shop'>('configuratore')
  const [tipo, setTipo] = useState('')
  const [lunghezza, setLunghezza] = useState('')
  const [larghezza, setLarghezza] = useState('')
  const [altezza, setAltezza] = useState('')
  const [quantita, setQuantita] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const t = window.setInterval(() => setActiveImg((p) => (p + 1) % images.length), 4000)
    return () => window.clearInterval(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const prev = () => setActiveImg((p) => Math.max(0, p - 1))
  const next = () => setActiveImg((p) => Math.min(images.length - 1, p + 1))

  return (
    <section className="relative w-full overflow-hidden bg-[#001a4d]" style={{ height: '100vh', minHeight: '600px' }}>
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: activeImg === i ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-[#001a4d]/70" />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
            scrolled ? 'bg-white shadow-md border-b border-gray-200' : 'bg-transparent border-b border-white/10'
          }`}
        >
          <Link to="/" className="flex items-center gap-3 border-0 outline-none">
            <img src="/logo.png" alt="Gruppo DM" className="h-14 w-auto object-contain border-0 outline-none" />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', to: '/' },
              { label: 'Chi Siamo', to: '/chi-siamo' },
              { label: 'Prodotti', to: '/prodotti' },
              { label: 'Servizi', to: '/servizi' },
              { label: 'Blog', to: '/blog' },
              { label: 'Contatti', to: '/contatti' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold transition-colors ${
                  scrolled ? 'text-[#003082] hover:text-[#2D8C4E]' : 'text-white/80 hover:text-[#F5C400]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="w-32" />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="hidden md:flex flex-col items-center justify-center gap-6 px-5 border-r border-white/10">
            {['f', 'in', 'tw', 'yt'].map((s, i) => (
              <button
                key={i}
                type="button"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/70 transition text-sm lg:text-base font-bold"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-16 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-[#F5C400] rounded-full animate-pulse" />
                <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">
                  Packaging B2B · Roma · dal 1988
                </span>
              </div>
              <h1 className="text-white font-black text-5xl md:text-6xl leading-tight mb-4">
                Il packaging giusto
                <br />
                per il tuo <span className="text-[#F5C400]">business.</span>
              </h1>
              <p className="text-white/60 text-base max-w-md mx-auto mb-8">
                Scatole, espositori e imballaggi su misura.
                <br />
                Preventivo gratuito entro 24 ore.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  to="/prodotti"
                  className="bg-[#F5C400] text-[#003082] font-black px-6 py-3 rounded-lg hover:bg-[#e6b800] transition text-sm"
                >
                  Scopri i prodotti →
                </Link>
                <Link
                  to="/contatti"
                  className="border border-white/40 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition text-sm"
                >
                  Richiedi preventivo
                </Link>
              </div>
            </motion.div>

            <div className="flex items-center gap-4 mt-12">
              <button
                type="button"
                onClick={prev}
                disabled={activeImg === 0}
                className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-20 transition"
              >
                <ChevronLeft size={14} />
              </button>
              <div className="flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={`rounded-full transition-all ${activeImg === i ? 'w-6 h-2 bg-[#F5C400]' : 'w-2 h-2 bg-white/30'}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                disabled={activeImg === images.length - 1}
                className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-20 transition"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col w-80 border-l border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="flex border-b border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('configuratore')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === 'configuratore'
                    ? 'text-[#F5C400] border-b-2 border-[#F5C400]'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                <Settings size={14} /> Configura
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('shop')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === 'shop' ? 'text-[#F5C400] border-b-2 border-[#F5C400]' : 'text-white/40 hover:text-white/70'
                }`}
              >
                <ShoppingBag size={14} /> Shop
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <AnimatePresence mode="wait">
                {activeTab === 'configuratore' ? (
                  <motion.div
                    key="config"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col gap-4"
                  >
                    <p className="text-white font-bold text-sm">Configura la tua scatola</p>
                    <p className="text-white/40 text-xs">Inserisci le misure per un preventivo rapido</p>

                    <select
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#F5C400]"
                    >
                      <option value="">Tipo di scatola...</option>
                      <option>Scatola americana</option>
                      <option>Scatola con coperchio</option>
                      <option>Espositore</option>
                      <option>Packaging custom</option>
                    </select>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'L (cm)', val: lunghezza, set: setLunghezza },
                        { label: 'W (cm)', val: larghezza, set: setLarghezza },
                        { label: 'H (cm)', val: altezza, set: setAltezza },
                      ].map((f) => (
                        <div key={f.label}>
                          <label className="text-white/40 text-[10px] block mb-1">{f.label}</label>
                          <input
                            type="number"
                            value={f.val}
                            onChange={(e) => f.set(e.target.value)}
                            placeholder="0"
                            className="w-full bg-white/10 border border-white/20 text-white text-xs rounded-lg px-2 py-2 focus:outline-none focus:border-[#F5C400] text-center"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="text-white/40 text-[10px] block mb-1">Quantità (pz)</label>
                      <input
                        type="number"
                        value={quantita}
                        onChange={(e) => setQuantita(e.target.value)}
                        placeholder="es. 500"
                        className="w-full bg-white/10 border border-white/20 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-[#F5C400]"
                      />
                    </div>

                    {tipo && lunghezza && larghezza && altezza && quantita ? (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#F5C400]/15 border border-[#F5C400]/30 rounded-lg p-3"
                      >
                        <p className="text-[#F5C400] text-xs font-bold">Stima preventivo</p>
                        <p className="text-white text-xs mt-1 opacity-70">
                          {tipo} {lunghezza}×{larghezza}×{altezza}cm · {quantita} pz
                        </p>
                        <p className="text-white/50 text-[10px] mt-1">Prezzo finale via email entro 24h</p>
                      </motion.div>
                    ) : null}

                    <Link
                      to="/contatti"
                      className="w-full bg-[#F5C400] text-[#003082] font-black text-sm py-3 rounded-lg text-center hover:bg-[#e6b800] transition mt-2"
                    >
                      START — Richiedi preventivo
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key="shop"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col gap-3"
                  >
                    <p className="text-white font-bold text-sm">Prodotti disponibili</p>
                    <p className="text-white/40 text-xs">Ordina subito, consegna 5-10 gg</p>
                    {prodottiRapidi.map((p, i) => (
                      <Link
                        key={i}
                        to={`/prodotti/${p.slug}`}
                        className="flex items-center justify-between bg-white/10 border border-white/10 rounded-lg px-3 py-3 hover:bg-white/20 hover:border-white/30 transition group"
                      >
                        <div>
                          <p className="text-white text-xs font-semibold group-hover:text-[#F5C400] transition">
                            {p.nome}
                          </p>
                          <p className="text-white/40 text-[10px] mt-0.5">{p.prezzo}</p>
                        </div>
                        <span className="text-white/30 group-hover:text-[#F5C400] transition text-sm">→</span>
                      </Link>
                    ))}
                    <Link
                      to="/prodotti"
                      className="w-full border border-[#F5C400]/50 text-[#F5C400] font-bold text-xs py-3 rounded-lg text-center hover:bg-[#F5C400]/10 transition mt-2"
                    >
                      Vedi tutti i prodotti →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="flex items-center justify-between text-[10px] text-white/30">
                <span>35+ anni di esperienza</span>
                <span>Roma, Italia 🇮🇹</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
