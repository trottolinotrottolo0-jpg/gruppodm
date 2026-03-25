import { motion, type Variants } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} satisfies Variants

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
} satisfies Variants

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#001a4d] via-brand-blue to-[#004299] text-white">
      <img
        src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1800&q=80"
        alt="Packaging industriale"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        style={{ zIndex: 0 }}
      />

      <div className="pointer-events-none absolute right-6 top-6 hidden h-48 w-48 opacity-10 md:block">
        <div className="h-full w-full bg-[radial-gradient(circle,_#F5C400_1px,_transparent_1px)] bg-[length:16px_16px]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 pt-12 md:px-6 md:pt-16"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide"
          variants={itemVariants}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-yellow opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-yellow" />
          </span>
          <span className="text-white/90">Packaging B2B • Roma • dal 1988</span>
        </motion.div>

        <motion.h1
          className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-6xl"
          variants={itemVariants}
        >
          Il packaging giusto per il tuo{' '}
          <span className="text-brand-yellow">business.</span>
        </motion.h1>

        <motion.p className="mt-5 max-w-md text-base text-white/75" variants={itemVariants}>
          Scatole, espositori e imballaggi su misura. Progettazione e produzione per aziende italiane da
          35 anni. Risposta garantita entro 24 ore.
        </motion.p>

        <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" variants={itemVariants}>
          <a
            href="#preventivo"
            className="inline-flex items-center justify-center rounded-[4px] bg-brand-yellow px-5 py-3 text-sm font-bold text-brand-blue hover:brightness-95 transition"
          >
            Richiedi Preventivo →
          </a>
          <a
            href="#prodotti"
            className="inline-flex items-center justify-center rounded-[4px] border border-white/70 px-5 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
          >
            Scopri i prodotti
          </a>
        </motion.div>

        <motion.div
          className="mt-12 border-t border-white/15 pt-6"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-brand-yellow">35+</span>
              <span className="text-sm text-white/80">anni di esperienza</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-brand-yellow">1.000+</span>
              <span className="text-sm text-white/80">clienti attivi</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-brand-yellow">4</span>
              <span className="text-sm text-white/80">linee prodotto</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
