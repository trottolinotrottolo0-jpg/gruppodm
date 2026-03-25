import ChiSiamoSection from '../components/ChiSiamo'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ChiSiamo() {
  return (
    <>
      <ChiSiamoSection />

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
                desc: 'Prima di avviare qualsiasi produzione realizziamo un campione fisico che ti inviamo per approvazione. Zero rischi, zero sprechi.',
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

      <section className="bg-[#003082] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '35+', label: 'Anni di esperienza', sub: 'Dal 1988 a Roma' },
              { num: '1.000+', label: 'Clienti attivi', sub: 'In tutta Italia' },
              { num: '50+', label: 'Referenze prodotto', sub: 'Standard e custom' },
              { num: '24h', label: 'Risposta preventivo', sub: 'Garantita sempre' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-[#F5C400] font-black text-5xl mb-2">{stat.num}</p>
                <p className="text-white font-bold text-base mb-1">{stat.label}</p>
                <p className="text-white/50 text-xs">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] py-28">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#F5C400] text-xs font-bold tracking-[3px] uppercase text-center mb-3">COSA DICONO I CLIENTI</p>
          <h2 className="font-black text-4xl text-[#1A1A2E] text-center mb-16">Parlano i risultati.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                nome: 'Marco Ferretti',
                azienda: 'Ferretti Logistics Srl',
                testo:
                  'Collaboriamo con Gruppo DM da 8 anni. Qualità costante, tempi rispettati e un team sempre disponibile. Non cambierei fornitore per nessun motivo.',
                stelle: 5,
              },
              {
                nome: 'Laura Bianchi',
                azienda: 'BianchiShop E-commerce',
                testo:
                  'Avevo bisogno di scatole personalizzate per il mio e-commerce. In 10 giorni avevo il prototipo, in 3 settimane la prima fornitura. Risultato eccellente.',
                stelle: 5,
              },
              {
                nome: 'Ing. Paolo Russo',
                azienda: 'Russo Industrie SpA',
                testo:
                  'Per i nostri espositori in fiera ci affidiamo sempre a loro. Progettazione professionale, materiali di qualità e consegne puntuali. Consigliato.',
                stelle: 5,
              },
            ].map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex mb-4">
                  {[...Array(rec.stelle)].map((_, j) => (
                    <span key={j} className="text-[#F5C400] text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{rec.testo}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#003082] flex items-center justify-center text-white font-bold text-sm">
                    {rec.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#1A1A2E]">{rec.nome}</p>
                    <p className="text-xs text-gray-400">{rec.azienda}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#003082] py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-white font-black text-4xl mb-4">Vuoi conoscerci meglio?</h2>
          <p className="text-white/70 text-base max-w-xl mx-auto mb-8">
            Raccontaci cosa devi spedire o esporre: ti rispondiamo entro 24 ore lavorative con una proposta su misura.
          </p>
          <Link
            to="/contatti"
            className="inline-flex items-center justify-center bg-[#F5C400] text-[#003082] font-black text-sm px-7 py-3 rounded-lg hover:brightness-95 transition"
          >
            Contattaci <span className="ml-2" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  )
}
