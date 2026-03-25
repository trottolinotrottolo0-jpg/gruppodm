import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Shield, Truck, RotateCcw, ChevronRight, Minus, Plus } from 'lucide-react'
import { prodotti } from '../data/prodotti'

export default function SchedaProdotto() {
  const { slug } = useParams()
  const prodotto = prodotti.find((p) => p.slug === slug)
  const [qty, setQty] = useState<number>(prodotto?.quantitaMinima || 1)
  const [activeTab, setActiveTab] = useState('Specifiche')
  const [thumb, setThumb] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  if (!prodotto)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-black text-[#1A1A2E]">Prodotto non trovato</p>
        <Link to="/prodotti" className="text-[#003082] underline text-sm">
          ← Torna ai prodotti
        </Link>
      </div>
    )

  const correlati = prodotti.filter((p) => p.slug !== slug).slice(0, 4)
  const tabs = ['Specifiche', 'Descrizione', 'Spedizione']

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#001a4d] pt-36 pb-16">
        <img src={prodotto.img} alt={prodotto.nome} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-[#001a4d]/70" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4 flex-wrap">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link to="/prodotti" className="hover:text-white">
              Prodotti
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/70">{prodotto.categoria}</span>
            <ChevronRight size={12} />
            <span className="text-white">{prodotto.nome}</span>
          </div>
          <h1 className="text-white font-black text-4xl md:text-5xl">{prodotto.nome}</h1>
          <p className="text-white/60 mt-2">
            {prodotto.categoria} · {prodotto.misure}
          </p>
        </div>
      </section>

      {/* SEZIONE PRINCIPALE */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* COLONNA SINISTRA — Immagini */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100">
              <img src={prodotto.img} alt={prodotto.nome} className="w-full h-full object-cover" />
              {prodotto.badge && (
                <span
                  className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded"
                  style={{ background: prodotto.badgeColor || '#003082' }}
                >
                  {prodotto.badge}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  onClick={() => setThumb(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    thumb === i ? 'border-[#003082]' : 'border-gray-200'
                  }`}
                >
                  <img src={prodotto.img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* COLONNA DESTRA — Acquisto */}
          <div>
            <p className="text-xs font-bold text-[#2D8C4E] uppercase tracking-widest">{prodotto.categoria}</p>
            <h2 className="font-black text-3xl text-[#1A1A2E] mt-1">{prodotto.nome}</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(prodotto.rating)
                        ? 'text-[#F5C400] fill-[#F5C400]'
                        : 'text-gray-200 fill-gray-200'
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {prodotto.rating} ({prodotto.recensioni} recensioni)
              </span>
            </div>

            <div className="border-t border-gray-100 my-4" />

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-[#003082]">€{prodotto.prezzo.toFixed(2)}</span>
              <span className="text-gray-400 text-sm">/ pz + IVA</span>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mt-4">
              <p className="text-sm text-gray-500">Totale per {qty} pz:</p>
              <p className="text-xl font-black text-[#003082]">€{(prodotto.prezzo * qty).toFixed(2)}</p>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold text-[#1A1A2E] mb-2">Quantità:</p>
              <div className="flex items-center">
                <button
                  onClick={() => setQty((q) => Math.max(prodotto.quantitaMinima, q - 1))}
                  className="border rounded-l-lg px-3 py-2 hover:bg-gray-50"
                  type="button"
                >
                  <Minus size={14} />
                </button>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Math.max(prodotto.quantitaMinima, Number(e.target.value)))}
                  className="border-y w-16 text-center py-2 text-sm focus:outline-none"
                />
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="border rounded-r-lg px-3 py-2 hover:bg-gray-50"
                  type="button"
                >
                  <Plus size={14} />
                </button>
                <span className="text-xs text-gray-400 ml-3">Min. {prodotto.quantitaMinima} pz</span>
              </div>
            </div>

            <button className="w-full mt-4 py-4 bg-[#F5C400] text-[#003082] font-black rounded-xl flex items-center justify-center gap-2 hover:bg-[#e6b800] transition">
              <ShoppingCart size={18} /> Aggiungi al carrello
            </button>
            <button className="w-full mt-2 py-3 border-2 border-[#003082] text-[#003082] font-bold rounded-xl hover:bg-[#003082] hover:text-white transition">
              Richiedi preventivo personalizzato
            </button>

            <div className="mt-6 flex flex-col gap-3">
              {[
                { icon: <Truck size={18} className="text-[#2D8C4E]" />, text: 'Consegna 5-10 giorni lavorativi' },
                { icon: <Shield size={18} className="text-[#003082]" />, text: 'Qualità certificata Made in Italy' },
                { icon: <RotateCcw size={18} className="text-[#b38900]" />, text: 'Campioni gratuiti disponibili' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  {b.icon} {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE DETTAGLI CON TAB */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }} className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="flex border-b border-gray-200 mb-6 gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-semibold transition-all ${
                      activeTab === tab ? 'border-b-2 border-[#003082] text-[#003082]' : 'text-gray-400'
                    }`}
                    type="button"
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'Specifiche' && (
                <table className="w-full text-sm rounded-xl overflow-hidden">
                  {[
                    ['Categoria', prodotto.categoria],
                    ['Misure', prodotto.misure],
                    ['Materiale', prodotto.materiale],
                    ['Quantità minima', `${prodotto.quantitaMinima} pz`],
                    ['Prezzo unitario', `€${prodotto.prezzo.toFixed(2)}`],
                    ['Disponibilità', prodotto.stock ? 'Disponibile' : 'Esaurito'],
                    ['Produzione', 'Made in Italy'],
                    ['Personalizzabile', 'Sì, con stampa digitale'],
                  ].map(([k, v], i) => (
                    <tr key={k} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-medium text-gray-500 w-40">{k}</td>
                      <td className="px-4 py-3 text-gray-800">{v}</td>
                    </tr>
                  ))}
                </table>
              )}

              {activeTab === 'Descrizione' && (
                <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                  <p>
                    La {prodotto.nome} è realizzata in {prodotto.materiale} di alta qualità, progettata per garantire massima protezione durante il trasporto e lo stoccaggio.
                  </p>
                  <p>
                    Disponibile nelle misure {prodotto.misure}, è ideale per aziende che cercano soluzioni di packaging affidabili e professionali.
                  </p>
                  <p>
                    Tutti i nostri prodotti sono realizzati in Italia con materiali certificati. Possibilità di personalizzazione grafica con stampa digitale diretta.
                  </p>
                </div>
              )}

              {activeTab === 'Spedizione' && (
                <div className="space-y-4">
                  {[
                    { icon: <Truck size={20} className="text-[#2D8C4E]" />, titolo: 'Tempi di consegna', testo: '5-10 giorni lavorativi dalla conferma ordine' },
                    { icon: <Shield size={20} className="text-[#003082]" />, titolo: 'Corriere tracciato', testo: 'Spedizione con corriere in tutta Italia' },
                    { icon: <RotateCcw size={20} className="text-[#b38900]" />, titolo: 'Express disponibile', testo: 'Servizio urgente su richiesta' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-100">
                      {item.icon}
                      <div>
                        <p className="font-semibold text-sm text-[#1A1A2E]">{item.titolo}</p>
                        <p className="text-sm text-gray-500">{item.testo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FORM LATERALE */}
            <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 sticky top-24 self-start">
              <h3 className="font-bold text-lg text-[#1A1A2E] mb-4">Richiedi informazioni</h3>
              {submitted ? (
                <div className="bg-[#E6F4EC] border border-[#2D8C4E] rounded-xl p-4 text-sm text-[#2D8C4E] font-semibold">
                  ✓ Richiesta inviata! Ti risponderemo entro 24h.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <input
                    placeholder="Nome e azienda"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003082]"
                  />
                  <input placeholder="Email" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003082]" />
                  <input
                    placeholder="Telefono"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003082]"
                  />
                  <textarea
                    placeholder="Descrivi la tua esigenza"
                    rows={3}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003082] resize-none"
                  />
                  <button
                    onClick={() => setSubmitted(true)}
                    className="w-full py-3 bg-[#003082] text-white font-bold rounded-lg text-sm hover:bg-[#002060] transition"
                    type="button"
                  >
                    Invia richiesta →
                  </button>
                  <p className="text-xs text-gray-400 text-center">✓ Risposta entro 24h · ✓ Preventivo gratuito</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CORRELATI */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }} className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-black text-2xl text-[#1A1A2E] mb-6">Potrebbe interessarti anche</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {correlati.map((p) => (
              <Link
                to={`/prodotti/${p.slug}`}
                key={p.id}
                className="group block border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm text-[#1A1A2E] leading-tight">{p.nome}</p>
                  <p className="text-[#003082] font-bold text-sm mt-1">
                    €{p.prezzo.toFixed(2)} / pz
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
