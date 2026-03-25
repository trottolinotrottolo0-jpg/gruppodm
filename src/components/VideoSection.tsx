import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'

const fadeInVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
} satisfies Variants

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.section
      className="bg-brand-dark py-20 text-white"
      variants={fadeInVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-yellow/70">
            COME LAVORIAMO
          </div>
          <h2 className="mt-3 text-3xl font-black text-white">Dalla progettazione alla consegna</h2>
          <p className="mt-3 text-white/55">
            35 anni di know-how in un video. Scopri il nostro processo produttivo.
          </p>
        </div>

        <div className="mt-10">
          <div className="mx-auto max-w-2xl">
            <div
              className="relative rounded-xl overflow-hidden max-w-2xl mx-auto cursor-pointer"
              style={{ aspectRatio: '16/9' }}
              onClick={() => setIsPlaying(true)}
            >
              {!isPlaying ? (
                <>
                  <img
                    src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
                    alt="Video aziendale Gruppo DM"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#003082]/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#F5C400] rounded-full flex items-center justify-center shadow-lg">
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderTop: '12px solid transparent',
                          borderBottom: '12px solid transparent',
                          borderLeft: '20px solid #003082',
                          marginLeft: '4px',
                        }}
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white text-sm opacity-75">
                    ▶ Guarda il video aziendale — 2 min
                  </div>
                </>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  className="w-full h-full"
                  allow="autoplay"
                  allowFullScreen
                />
              )}
            </div>

            <div className="mt-3 text-center text-sm text-white/40">Durata: 2 minuti</div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
