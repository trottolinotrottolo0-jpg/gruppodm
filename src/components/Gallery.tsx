import { useMemo, useState } from 'react'
import { motion, type Variants } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
} satisfies Variants

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
} satisfies Variants

const filters = ['Tutti', 'Scatole', 'Espositori', 'Custom', 'Imballaggi'] as const
type Filter = (typeof filters)[number]

const items = [
  {
    name: 'Scatole kraft standard',
    category: 'Scatole',
    imageUrl:
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Espositore retail',
    category: 'Espositori',
    imageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Packaging personalizzato',
    category: 'Custom',
    imageUrl:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Scatole spedizione',
    category: 'Scatole',
    imageUrl:
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Gift box premium',
    category: 'Custom',
    imageUrl:
      'https://images.unsplash.com/photo-1612178537253-bccd437b730e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Imballaggi accessori',
    category: 'Imballaggi',
    imageUrl:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
  },
] as const

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Tutti')

  const visibleItems = useMemo(() => {
    const filtered =
      activeFilter === 'Tutti' ? items : items.filter((i) => i.category === activeFilter)
    return filtered.slice(0, 6)
  }, [activeFilter])

  return (
    <section id="gallery" className="bg-brand-gray py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-green">
            PORTFOLIO
          </div>
          <h2 className="mt-3 text-3xl font-black text-brand-dark">I nostri lavori</h2>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={[
                  'rounded-md px-3 py-2 text-sm font-semibold transition',
                  isActive
                    ? 'bg-brand-blue text-white'
                    : 'bg-white border border-gray-300 text-[#444] hover:bg-gray-50',
                ].join(' ')}
              >
                {filter}
              </button>
            )
          })}
        </div>

        <motion.div
          className="mt-8 grid grid-cols-3 gap-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
        >
          {visibleItems.map((item) => (
            <motion.div
              key={item.name}
              variants={itemVariants}
              className="relative rounded-lg overflow-hidden cursor-pointer group aspect-square"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#003082]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{item.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-[4px] bg-brand-blue px-5 py-3 text-sm font-bold text-white hover:brightness-95 transition"
          >
            Vedi tutta la gallery →
          </a>
        </div>
      </div>
    </section>
  )
}
