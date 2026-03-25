import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'

const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
} satisfies Variants

const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
} satisfies Variants

const stats = [
  { value: '1988', label: 'Anno di fondazione', valueClassName: 'text-brand-yellow' },
  { value: '35+', label: 'Anni di esperienza', valueClassName: 'text-brand-yellow' },
  { value: '1.000+', label: 'Clienti attivi', valueClassName: 'text-brand-yellow' },
  { value: '100%', label: 'Made in Italy', valueClassName: 'text-brand-green' },
] as const

export default function ChiSiamo() {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <>
      <section id="azienda" className="bg-brand-dark py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                LA NOSTRA STORIA
              </div>
              <h2 className="mt-4 text-4xl font-black leading-tight text-white">
                35 anni di packaging. Una sola promessa: qualità.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/70">
                Nata a Roma nel 1988 come piccolo scatolificio, Gruppo DM Packaging è oggi un punto di
                riferimento per aziende di tutta Italia. Non siamo un semplice fornitore: siamo la parte
                del processo che protegge, valorizza e trasporta il tuo prodotto.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Dalla progettazione alla consegna, ogni dettaglio è curato internamente. Questo ci
                permette di garantire qualità costante, tempi certi e un interlocutore unico per ogni
                esigenza.
              </p>

              <a
                href="#come-lavoriamo"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-yellow"
              >
                <span>Scopri come lavoriamo ↓</span>
                <span className="transition-transform duration-200 hover:translate-y-0.5">→</span>
              </a>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden h-48 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=800&q=80"
                  alt="Stabilimento produttivo Gruppo DM"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#003082]/30" />
                <div className="absolute bottom-3 left-3 bg-[#F5C400] text-[#003082] text-xs font-bold px-3 py-1 rounded">
                  Produzione italiana dal 1988
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {stats.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className={['text-3xl font-black', card.valueClassName].join(' ')}>
                      {card.value}
                    </div>
                    <div className="mt-2 text-sm text-white/70">{card.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="come-lavoriamo" className="bg-[#1A1A2E] py-28">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#F5C400] text-xs font-bold tracking-[3px] uppercase text-center mb-3">
            IL NOSTRO PROCESSO
          </p>
          <h2 className="text-white font-black text-4xl text-center mb-4">Dal brief alla consegna.</h2>
          <p className="text-white/50 text-center text-base mb-16 max-w-xl mx-auto">
            Ogni progetto segue un processo collaudato in 35 anni di esperienza. Nessuna sorpresa, solo risultati.
          </p>
          <div className="relative">
            {/* TRACK SCORREVOLE */}
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                className="flex"
                animate={{ x: `-${currentStep * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {[
                  {
                    num: '01',
                    titolo: 'Brief',
                    desc: 'Analizziamo la tua esigenza, i volumi, le misure e i tempi richiesti.',
                    img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
                    colore: '#003082',
                  },
                  {
                    num: '02',
                    titolo: 'Progettazione',
                    desc: 'Il team tecnico sviluppa struttura, materiali e grafica ottimizzati per la tua esigenza.',
                    img: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
                    colore: '#2D8C4E',
                  },
                  {
                    num: '03',
                    titolo: 'Prototipo',
                    desc: 'Realizziamo un campione fisico prima della produzione e te lo inviamo per approvazione.',
                    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
                    colore: '#b38900',
                  },
                  {
                    num: '04',
                    titolo: 'Approvazione',
                    desc: 'Revisioni illimitate fino alla tua completa soddisfazione. Solo allora si avvia la produzione.',
                    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
                    colore: '#003082',
                  },
                  {
                    num: '05',
                    titolo: 'Produzione',
                    desc: 'Produzione in serie nel nostro stabilimento a Roma con controllo qualità su ogni lotto.',
                    img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
                    colore: '#2D8C4E',
                  },
                  {
                    num: '06',
                    titolo: 'Consegna',
                    desc: 'Corriere tracciato in tutta Italia. Consegna in 5-10 giorni direttamente da te.',
                    img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
                    colore: '#b38900',
                  },
                ].map((step, i) => (
                  <div key={i} className="relative flex-shrink-0 w-full" style={{ height: '480px' }}>
                    <img src={step.img} alt={step.titolo} className="absolute inset-0 w-full h-full object-cover" />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, ${step.colore}f5 0%, ${step.colore}90 40%, transparent 100%)`,
                      }}
                    />
                    <div className="relative z-10 h-full flex flex-col justify-between p-10">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center font-black text-xl self-start"
                        style={{ background: '#F5C400', color: '#003082' }}
                      >
                        {step.num}
                      </div>
                      <div>
                        <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Passo {step.num} di 06</p>
                        <h3 className="text-white font-black text-5xl mb-4">{step.titolo}</h3>
                        <p className="text-white/80 text-lg leading-relaxed max-w-lg">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* FRECCE NAVIGAZIONE */}
            <button
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition disabled:opacity-30 disabled:cursor-not-allowed"
              type="button"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentStep((s) => Math.min(5, s + 1))}
              disabled={currentStep === 5}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition disabled:opacity-30 disabled:cursor-not-allowed"
              type="button"
            >
              →
            </button>

            {/* DOTS */}
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`transition-all rounded-full ${
                    currentStep === i ? 'w-8 h-2 bg-[#F5C400]' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                  type="button"
                />
              ))}
            </div>

            {/* COUNTER TESTO */}
            <p className="text-center text-white/40 text-sm mt-4">{currentStep + 1} / 6</p>
          </div>
        </div>
      </section>
    </>
  )
}
