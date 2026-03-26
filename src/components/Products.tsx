import { motion, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} satisfies Variants

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
} satisfies Variants

const products = [
  {
    title: 'Scatole da Trasporto',
    tagline: 'Spedizione, e-commerce, magazzino',
    imageUrl:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    overlayClassName: 'bg-[#003082]/75',
  },
  {
    title: 'Espositori & Display',
    tagline: 'Retail, POS, fiere',
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    overlayClassName: 'bg-[#2D8C4E]/75',
  },
  {
    title: 'Packaging Custom',
    tagline: 'Progetti su misura con stampa',
    imageUrl:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    overlayClassName: 'bg-[#1A1A2E]/80',
  },
  {
    title: 'Imballaggi & Accessori',
    tagline: 'Film, nastri, materiali protettivi',
    imageUrl:
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    overlayClassName: 'bg-[#b38900]/75',
  },
] as const

const MotionLink = motion.create(Link)

export default function Products() {
  return (
    <section id="prodotti" className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-green">
            LE NOSTRE SOLUZIONI
          </div>
          <h2 className="mt-3 text-3xl font-black text-brand-dark">Quattro linee, un interlocutore.</h2>
          <p className="mt-3 text-base text-brand-dark/70">
            Dalla scatola standard al progetto completamente personalizzato.
          </p>
        </div>

        <motion.div
          className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
        >
          {products.map((p) => (
            <MotionLink
              key={p.title}
              to={`/prodotti?categoria=${encodeURIComponent(p.title)}`}
              variants={cardVariants}
              className="relative rounded-xl overflow-hidden h-48 cursor-pointer group"
            >
              <img
                src={p.imageUrl}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className={['absolute inset-0', p.overlayClassName].join(' ')} />

              <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                →
              </div>
              <div className="relative z-10 p-5 h-full flex flex-col justify-end">
                <div className="text-base font-bold text-white">{p.title}</div>
                <div className="mt-2 text-sm text-white/70">{p.tagline}</div>
              </div>
            </MotionLink>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
