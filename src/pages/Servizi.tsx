import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Servizi() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-[#001a4d] pt-36 pb-20">
        <img
          src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1800&q=80"
          alt="Servizi di progettazione e stampa"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#003082]/80" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <p className="text-[#F5C400] uppercase tracking-widest text-sm font-bold mb-4">I NOSTRI SERVIZI</p>
          <h1 className="text-white font-black text-5xl leading-tight mb-5">Dalla progettazione alla consegna.</h1>
          <p className="text-white/60 text-base">
            Un unico partner per design tecnico, stampa e logistica: tutto il necessario per far arrivare le tue scatole
            pronte all’uso.
          </p>
        </div>
      </section>

      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.15 }}
              variants={fadeInUp}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80"
                alt="Progettazione custom"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.15 }}
              variants={fadeInUp}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center rounded-full bg-brand-green/10 text-brand-green text-xs font-bold px-3 py-1 mb-4">
                Servizio
              </span>
              <h2 className="font-black text-3xl text-[#1A1A2E] mb-4">Progettazione su misura</h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                Il nostro team tecnico progetta ogni imballo partendo dalle tue esigenze. Dimensioni, materiali,
                resistenza: tutto viene calcolato e ottimizzato prima della produzione.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                {[
                  'Studio tecnico gratuito',
                  'Prototipo fisico prima della produzione',
                  'File esecutivi per la stampa inclusi',
                  'Revisioni illimitate',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4 text-brand-green mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contatti" className="inline-flex items-center gap-2 font-bold text-sm text-brand-blue">
                Richiedi progettazione <span aria-hidden>→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.15 }}
              variants={fadeInUp}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 md:order-1"
            >
              <span className="inline-flex items-center rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold px-3 py-1 mb-4">
                Servizio
              </span>
              <h2 className="font-black text-3xl text-[#1A1A2E] mb-4">Stampa digitale diretta</h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                Stampiamo direttamente sul cartone con tecnologia digitale ad alta risoluzione. Loghi, grafiche, testi:
                il tuo brand su ogni scatola, anche per piccole tirature.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                {['Da 1 pezzo senza minimi', 'Pantone e CMYK', 'File accettati: PDF, AI, EPS', 'Anteprima digitale inclusa'].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-brand-green mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
              <Link to="/contatti" className="inline-flex items-center gap-2 font-bold text-sm text-brand-green">
                Richiedi stampa <span aria-hidden>→</span>
              </Link>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.15 }}
              variants={fadeInUp}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 md:order-2 relative rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
                alt="Stampa digitale"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.15 }}
              variants={fadeInUp}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1617401177722-c8c8da1ced29?auto=format&fit=crop&w=800&q=80"
                alt="Consegna e logistica"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.15 }}
              variants={fadeInUp}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center rounded-full bg-[#F5C400]/20 text-[#1A1A2E] text-xs font-bold px-3 py-1 mb-4">
                Servizio
              </span>
              <h2 className="font-black text-3xl text-[#1A1A2E] mb-4">Consegna in tutta Italia</h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                Produciamo a Roma e consegniamo in tutta Italia in 5-10 giorni lavorativi. Per ordini urgenti, servizio
                express disponibile.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                {[
                  'Spedizione con corriere tracciato',
                  'Consegna 5-10 giorni lavorativi',
                  'Express disponibile su richiesta',
                  'Ritiro in sede possibile',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4 text-brand-green mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#1A1A2E] py-28">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#F5C400] text-xs font-bold tracking-[3px] uppercase text-center mb-3">COME LAVORIAMO</p>
          <h2 className="text-white font-black text-4xl text-center mb-4">Dal brief alla consegna, in 6 passi.</h2>
          <p className="text-white/50 text-center text-base mb-16 max-w-xl mx-auto">
            Ogni progetto segue un processo collaudato in 35 anni di esperienza.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                titolo: 'Brief',
                desc: 'Analizziamo la tua esigenza specifica, i volumi, le misure e i tempi richiesti.',
                img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80',
                colore: '#003082',
              },
              {
                num: '02',
                titolo: 'Progettazione',
                desc: 'Il team tecnico sviluppa struttura, materiali e grafica ottimizzati per la tua esigenza.',
                img: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80',
                colore: '#2D8C4E',
              },
              {
                num: '03',
                titolo: 'Prototipo',
                desc: 'Realizziamo un campione fisico prima della produzione. Lo ricevi in azienda per approvazione.',
                img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
                colore: '#b38900',
              },
              {
                num: '04',
                titolo: 'Approvazione',
                desc: 'Revisioni illimitate fino a quando non sei soddisfatto al 100%. Solo allora si parte.',
                img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80',
                colore: '#003082',
              },
              {
                num: '05',
                titolo: 'Produzione',
                desc: 'Produzione in serie nel nostro stabilimento a Roma. Controllo qualità su ogni lotto.',
                img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
                colore: '#2D8C4E',
              },
              {
                num: '06',
                titolo: 'Consegna',
                desc: 'Corriere tracciato in tutta Italia. Consegna in 5-10 giorni lavorativi direttamente in azienda.',
                img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
                colore: '#b38900',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden"
                style={{ minHeight: '340px' }}
              >
                <img
                  src={step.img}
                  alt={step.titolo}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${step.colore}f0 0%, ${step.colore}80 50%, transparent 100%)`,
                  }}
                />
                <div className="relative z-10 p-6 flex flex-col justify-between" style={{ minHeight: '340px' }}>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg self-start"
                    style={{ background: '#F5C400', color: '#003082' }}
                  >
                    {step.num}
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-white font-black text-2xl mb-2">{step.titolo}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-28">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#F5C400] text-xs font-bold tracking-[3px] uppercase text-center mb-3">I NOSTRI VANTAGGI</p>
          <h2 className="font-black text-4xl text-[#1A1A2E] text-center mb-4">Perché scegliere Gruppo DM</h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-16">
            35 anni di esperienza si traducono in vantaggi concreti per il tuo business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                titolo: 'Filiera completamente italiana',
                desc: 'Progettiamo, produciamo e consegniamo tutto internamente. Nessuna delocalizzazione, nessun intermediario. Controllo totale della qualità a ogni fase.',
                num: '01',
                colore: '#003082',
              },
              {
                titolo: 'Nessun minimo per i prodotti standard',
                desc: 'Hai bisogno di 10 scatole o di 10.000? Non importa. Serviamo sia il piccolo artigiano che la grande industria con la stessa cura.',
                num: '02',
                colore: '#2D8C4E',
              },
              {
                titolo: 'Prototipo fisico prima della produzione',
                desc: 'Prima di avviare qualsiasi produzione, realizziamo un campione fisico che ti inviamo per approvazione. Zero rischi, zero sprechi.',
                num: '03',
                colore: '#b38900',
              },
              {
                titolo: 'Risposta garantita in 24 ore',
                desc: 'Ogni richiesta di preventivo riceve una risposta entro 24 ore lavorative. Un commerciale dedicato segue ogni progetto dalla A alla Z.',
                num: '04',
                colore: '#003082',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-8 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-xl text-white"
                  style={{ background: item.colore }}
                >
                  {item.num}
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#1A1A2E] mb-2">{item.titolo}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5C400] py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-[#003082] font-black text-3xl mb-5">Pronto a iniziare?</h2>
          <Link
            to="/contatti"
            className="inline-flex items-center justify-center bg-[#003082] text-white font-bold text-sm px-7 py-3 rounded-lg hover:bg-[#002060] transition-colors"
          >
            Richiedi un preventivo <span className="ml-2" aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
