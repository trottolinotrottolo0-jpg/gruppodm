import { useMemo, useState } from 'react'
import { motion, type Variants } from 'framer-motion'

const articoli = [
  {
    id: 1,
    categoria: 'Guide',
    titolo: 'Come scegliere la scatola giusta per la tua spedizione',
    excerpt:
      'Peso, dimensioni, fragilità del contenuto: ecco i parametri da considerare per non sbagliare imballo e risparmiare sui costi di spedizione.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    data: '15 Gennaio 2026',
    minuti: 4,
  },
  {
    id: 2,
    categoria: 'Tendenze',
    titolo: "Packaging sostenibile: come ridurre l'impatto ambientale senza rinunciare alla qualità",
    excerpt:
      'Cartone riciclato, inchiostri a base acqua, design minimal: le soluzioni eco-friendly che stanno trasformando il settore packaging.',
    img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
    data: '8 Gennaio 2026',
    minuti: 6,
  },
  {
    id: 3,
    categoria: 'B2B',
    titolo: 'Espositore in cartone vs espositore in plastica: quale conviene per il tuo brand?',
    excerpt:
      'Analisi comparativa di costi, impatto visivo, personalizzazione e sostenibilità tra le due soluzioni più usate nel retail.',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    data: '2 Gennaio 2026',
    minuti: 5,
  },
  {
    id: 4,
    categoria: 'Guide',
    titolo: 'Stampa su scatole: differenze tra serigrafia, flexografia e stampa digitale',
    excerpt:
      'Ogni tecnica ha vantaggi specifici in base alla tiratura, al tipo di superficie e al budget. Guida pratica per scegliere quella giusta.',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    data: '20 Dicembre 2025',
    minuti: 7,
  },
  {
    id: 5,
    categoria: 'Tendenze',
    titolo: "Unboxing experience: perché il packaging è parte del prodotto",
    excerpt:
      "I brand di successo lo sanno: il momento in cui il cliente apre la scatola è un'opportunità di marketing. Come sfruttarla al meglio.",
    img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    data: '12 Dicembre 2025',
    minuti: 5,
  },
  {
    id: 6,
    categoria: 'B2B',
    titolo: "Come ottimizzare i costi di packaging per l'e-commerce",
    excerpt:
      'Dimensioni giuste, peso ridotto, materiali smart: strategie pratiche per abbattere i costi di imballo senza compromettere la protezione.',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80',
    data: '5 Dicembre 2025',
    minuti: 6,
  },
] as const

const filters = ['Tutti', 'Guide', 'Tendenze', 'B2B'] as const
type Filter = (typeof filters)[number]

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
} satisfies Variants

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
} satisfies Variants

function badgeClassName(categoria: string) {
  if (categoria === 'Guide') return 'bg-brand-blue/10 text-brand-blue'
  if (categoria === 'Tendenze') return 'bg-brand-green/10 text-brand-green'
  if (categoria === 'B2B') return 'bg-[#F5C400]/20 text-[#1A1A2E]'
  return 'bg-gray-100 text-gray-700'
}

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Tutti')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const visibleArticles = useMemo(() => {
    if (activeFilter === 'Tutti') return [...articoli]
    return articoli.filter((a) => a.categoria === activeFilter)
  }, [activeFilter])

  const featured = visibleArticles[0]
  const rest = visibleArticles.slice(1)

  return (
    <div>
      <section className="relative overflow-hidden bg-[#001a4d] pt-36 pb-20">
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1800&q=80"
          alt="Risorse e guide sul packaging"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1A1A2E]/85" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <p className="text-[#F5C400] uppercase tracking-widest text-sm font-bold mb-4">BLOG & NEWS</p>
          <h1 className="text-white font-black text-4xl leading-tight mb-5">Risorse e guide sul packaging B2B</h1>
          <p className="text-white/60 text-base">Articoli pratici, guide tecniche e tendenze del settore.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={[
                  'rounded-md px-3 py-2 text-sm font-semibold transition',
                  isActive ? 'bg-brand-blue text-white' : 'bg-white border border-gray-300 text-[#444] hover:bg-gray-50',
                ].join(' ')}
              >
                {filter}
              </button>
            )
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        {featured ? (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.15 }}
            variants={itemVariants}
            className="border border-gray-100 rounded-xl shadow-sm overflow-hidden bg-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-video overflow-hidden">
                <img src={featured.img} alt={featured.titolo} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col">
                <span className={['inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold', badgeClassName(featured.categoria)].join(' ')}>
                  {featured.categoria}
                </span>
                <h2 className="mt-4 text-[#1A1A2E] font-black text-2xl leading-tight">{featured.titolo}</h2>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{featured.excerpt}</p>
                <div className="mt-5 text-xs text-gray-500">
                  {featured.data} · {featured.minuti} min lettura
                </div>
                <div className="mt-6">
                  <a href="#" className="inline-flex items-center gap-2 font-bold text-sm text-brand-blue">
                    Leggi l&apos;articolo <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="border border-gray-100 rounded-xl shadow-sm bg-white p-8 text-sm text-gray-700">
            Nessun articolo disponibile per questo filtro.
          </div>
        )}

        {rest.length > 0 ? (
          <motion.div
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.15 }}
          >
            {rest.map((a) => (
              <motion.div
                key={a.id}
                variants={itemVariants}
                className="border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden bg-white group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={a.img}
                    alt={a.titolo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className={['inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold', badgeClassName(a.categoria)].join(' ')}>
                    {a.categoria}
                  </span>
                  <h3 className="mt-3 text-[#1A1A2E] font-black text-lg leading-snug">{a.titolo}</h3>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">{a.excerpt}</p>
                  <div className="mt-4 text-xs text-gray-500">
                    {a.data} · {a.minuti} min
                  </div>
                  <div className="mt-5">
                    <a href="#" className="inline-flex items-center gap-2 font-bold text-sm text-brand-blue">
                      Leggi <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </section>

      <section className="bg-[#F5F5F5] py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-[#1A1A2E] font-black text-2xl mb-3">Resta aggiornato</h2>
          <p className="text-gray-600 text-sm mb-7">
            Guide pratiche e novità sul packaging direttamente nella tua inbox.
          </p>
          {isSubscribed ? (
            <div className="text-brand-green font-bold text-sm">Iscrizione completata. Grazie!</div>
          ) : (
            <form
              className="flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-xl mx-auto"
              onSubmit={(e) => {
                e.preventDefault()
                if (!newsletterEmail.trim()) return
                setIsSubscribed(true)
              }}
            >
              <input
                type="email"
                placeholder="Email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-blue bg-white"
              />
              <button
                type="submit"
                className="rounded-lg bg-brand-blue text-white font-bold text-sm px-6 py-3 hover:brightness-95 transition"
              >
                Iscriviti
              </button>
            </form>
          )}
          <p className="mt-3 text-xs text-gray-500">Nessuno spam. Cancellazione in un click.</p>
        </div>
      </section>
    </div>
  )
}
