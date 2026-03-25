import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Mail, MessageCircle, Minus, MapPin, Phone, Plus } from 'lucide-react'

export default function Contatti() {
  const [nome, setNome] = useState('')
  const [cognome, setCognome] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [azienda, setAzienda] = useState('')
  const [piva, setPiva] = useState('')
  const [oggetto, setOggetto] = useState('Richiesta preventivo')
  const [messaggio, setMessaggio] = useState('')
  const [gdpr, setGdpr] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const fadeInUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  } satisfies Variants

  const faqs = [
    {
      q: 'Qual è la quantità minima per un ordine?',
      a: 'Non abbiamo minimi fissi per la maggior parte dei prodotti standard. Per prodotti personalizzati, la quantità minima varia in base alla lavorazione richiesta.',
    },
    {
      q: 'Quanto tempo ci vuole per ricevere un preventivo?',
      a: 'Rispondiamo entro 24 ore lavorative dalla ricezione della richiesta. Per progetti urgenti, chiamaci direttamente.',
    },
    {
      q: 'Fate spedizioni in tutta Italia?',
      a: "Sì, consegniamo in tutta Italia con corriere tracciato. I tempi di consegna variano da 5 a 10 giorni lavorativi dalla conferma dell'ordine.",
    },
    {
      q: 'Posso richiedere un campione prima di ordinare?',
      a: 'Assolutamente sì. Offriamo campioni gratuiti su quasi tutta la gamma standard. Per prodotti personalizzati, produciamo un prototipo a costo ridotto.',
    },
    {
      q: 'Accettate ordini urgenti?',
      a: 'Sì, gestiamo ordini urgenti con servizio express. Contattaci direttamente per telefono per valutare la fattibilità in base ai carichi di produzione.',
    },
  ] as const

  return (
    <div>
      <section className="relative overflow-hidden bg-[#001a4d] pt-36 pb-20">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1800&q=80"
          alt="Contatti e assistenza clienti"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#003082]/80" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <p className="text-[#F5C400] uppercase tracking-widest text-sm font-bold mb-4">CONTATTI</p>
          <h1 className="text-white font-black text-5xl leading-tight mb-5">Parliamo del tuo progetto.</h1>
          <p className="text-white/60 text-base">Siamo a Roma. Rispondiamo entro 24 ore lavorative.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.15 }}
              variants={fadeInUp}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-xl text-[#1A1A2E] mb-6"
            >
              Dove siamo
            </motion.h2>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4 bg-[#F5F5F5] rounded-xl p-4">
                <MapPin className="h-5 w-5 text-brand-blue mt-0.5" />
                <div>
                  <div className="font-bold text-[#1A1A2E]">Roma, Italia</div>
                  <div className="text-sm text-gray-600">Indirizzo: Via Example 123, 00100 Roma</div>
                </div>
              </div>
              <div className="flex gap-4 bg-[#F5F5F5] rounded-xl p-4">
                <Phone className="h-5 w-5 text-brand-green mt-0.5" />
                <div>
                  <div className="font-bold text-[#1A1A2E]">+39 06 000 0000</div>
                  <div className="text-sm text-gray-600">Lun-Ven 9:00-18:00</div>
                </div>
              </div>
              <div className="flex gap-4 bg-[#F5F5F5] rounded-xl p-4">
                <Mail className="h-5 w-5 text-brand-blue mt-0.5" />
                <div>
                  <div className="font-bold text-[#1A1A2E]">info@gruppodm.it</div>
                  <div className="text-sm text-gray-600">Risposta entro 24h</div>
                </div>
              </div>
              <a href="#" className="flex gap-4 bg-[#F5F5F5] rounded-xl p-4 hover:brightness-95 transition">
                <MessageCircle className="h-5 w-5 text-brand-green mt-0.5" />
                <div>
                  <div className="font-bold text-[#1A1A2E]">Scrivici su WhatsApp</div>
                  <div className="text-sm text-gray-600">Risposta rapida in orario lavorativo</div>
                </div>
              </a>
            </div>

            <h3 className="font-bold text-xl text-[#1A1A2E] mt-10 mb-4">Orari</h3>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {[
                { day: 'Lunedì-Venerdì', hours: '9:00 - 18:00' },
                { day: 'Sabato', hours: '9:00 - 13:00' },
                { day: 'Domenica', hours: 'Chiuso' },
              ].map((row) => (
                <div key={row.day} className="flex justify-between border-b border-gray-100 px-4 py-3 text-sm">
                  <span className="text-[#1A1A2E] font-semibold">{row.day}</span>
                  <span className="text-gray-600">{row.hours}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="text-sm font-bold text-[#1A1A2E] mb-3">Scansiona per contattarci subito</div>
              <div className="bg-white p-3 rounded-xl inline-block">
                <div className="w-24 h-24 bg-[#003082] rounded grid grid-cols-3 grid-rows-3 gap-1 p-2">
                  <div className="bg-white rounded-sm col-span-1"></div>
                  <div className="bg-[#003082] rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-[#003082] rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-[#003082] rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-[#003082] rounded-sm"></div>
                  <div className="bg-white rounded-sm col-span-1"></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.15 }}
              variants={fadeInUp}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-gray-100 shadow-md rounded-2xl p-8"
            >
              <div className="font-bold text-xl text-[#1A1A2E]">Inviaci un messaggio</div>
              <div className="text-sm text-gray-500 mb-6">Ti ricontattiamo entro 24 ore lavorative.</div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!gdpr) return
                  setSubmitted(true)
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                    className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
                  />
                  <input
                    value={cognome}
                    onChange={(e) => setCognome(e.target.value)}
                    placeholder="Cognome"
                    className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    className="sm:col-span-2 rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
                  />
                  <input
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Telefono"
                    className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
                  />
                  <input
                    value={azienda}
                    onChange={(e) => setAzienda(e.target.value)}
                    placeholder="Azienda"
                    className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
                  />
                  <input
                    value={piva}
                    onChange={(e) => setPiva(e.target.value)}
                    placeholder="Partita IVA"
                    className="sm:col-span-2 rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
                  />
                  <select
                    value={oggetto}
                    onChange={(e) => setOggetto(e.target.value)}
                    className="sm:col-span-2 rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue bg-white"
                  >
                    <option>Richiesta preventivo</option>
                    <option>Informazioni prodotti</option>
                    <option>Collaborazione</option>
                    <option>Altro</option>
                  </select>
                  <textarea
                    value={messaggio}
                    onChange={(e) => setMessaggio(e.target.value)}
                    placeholder="Messaggio"
                    rows={5}
                    className="sm:col-span-2 rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-brand-blue resize-none"
                  />
                  <label className="sm:col-span-2 flex items-start gap-3 text-sm text-gray-600">
                    <input type="checkbox" checked={gdpr} onChange={(e) => setGdpr(e.target.checked)} className="mt-1" />
                    <span>Accetto il trattamento dei dati personali (GDPR)</span>
                  </label>
                  <button
                    type="submit"
                    className="sm:col-span-2 w-full rounded-lg bg-brand-blue text-white py-4 font-bold text-sm hover:brightness-95 transition"
                  >
                    Invia
                  </button>
                </div>
              </form>

              <AnimatePresence>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35 }}
                    className="mt-5 text-brand-green font-bold text-sm"
                  >
                    Messaggio inviato! Ti ricontattiamo entro 24h.
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-0">
        <div
          role="button"
          tabIndex={0}
          onClick={() => window.open('https://maps.google.com/?q=Roma+Italia', '_blank')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') window.open('https://maps.google.com/?q=Roma+Italia', '_blank')
          }}
          className="bg-[#E8EFF8] h-[300px] flex flex-col items-center justify-center text-center cursor-pointer hover:brightness-[0.98] transition"
        >
          <MapPin className="h-12 w-12 text-brand-blue" />
          <div className="mt-3 text-[#1A1A2E] font-bold">Siamo a Roma</div>
          <div className="text-sm text-gray-600">Clicca per aprire in Google Maps</div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.15 }}
            variants={fadeInUp}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-center text-[#1A1A2E] font-black text-3xl mb-10"
          >
            Domande frequenti
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div key={faq.q} className="border-b border-gray-200">
                  <button
                    type="button"
                    onClick={() => setOpenFaq((v) => (v === idx ? null : idx))}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-bold text-[#1A1A2E]">{faq.q}</span>
                    {isOpen ? <Minus className="h-5 w-5 text-[#1A1A2E]" /> : <Plus className="h-5 w-5 text-[#1A1A2E]" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden pb-5"
                      >
                        <div className="text-sm text-gray-700 leading-relaxed">{faq.a}</div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
