import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const points = [
  {
    from: 0.05,
    to: 0.3,
    label: '01',
    title: 'Qualità certificata',
    text: 'Ogni scatola prodotta rispetta standard industriali italiani. Materiali selezionati, controllo qualità interno.',
  },
  {
    from: 0.3,
    to: 0.52,
    label: '02',
    title: 'Su misura per te',
    text: 'Dimensioni, stampa, materiale: personalizziamo ogni dettaglio in base alle tue esigenze specifiche.',
  },
  {
    from: 0.52,
    to: 0.74,
    label: '03',
    title: 'Consegna in 5-10 giorni',
    text: 'Produzione rapida e spedizione diretta in azienda. Rispettiamo i tuoi tempi di produzione.',
  },
  {
    from: 0.74,
    to: 0.96,
    label: '04',
    title: '100% Made in Italy',
    text: 'Progettiamo e produciamo a Roma dal 1988. Nessuna delocalizzazione, filiera corta e controllata.',
  },
]

export default function VideoScrub() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const durationRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)
  const latestPctRef = useRef(0)
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Preload video metadata
    video.preload = 'auto'
    video.pause()

    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const pct = Math.min(Math.max(scrolled / sectionHeight, 0), 1)

      latestPctRef.current = pct

      if (rafIdRef.current !== null) return
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null
        const pctNow = latestPctRef.current
        const duration = durationRef.current || video.duration

        if (duration) {
          const targetTime = pctNow * duration
          const fastSeek = (video as HTMLVideoElement & { fastSeek?: (time: number) => void }).fastSeek
          if (typeof fastSeek === 'function') fastSeek.call(video, targetTime)
          else video.currentTime = targetTime
        }

        setProgress((prev) => (Math.abs(prev - pctNow) < 0.001 ? prev : pctNow))

        const idx = points.findIndex((p) => pctNow >= p.from && pctNow <= p.to)
        setActiveIndex((prev) => (prev === idx ? prev : idx))
      })
    }

    const onLoadedMetadata = () => {
      durationRef.current = video.duration
      handleScroll()
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    if (video.readyState >= 1) onLoadedMetadata()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      window.removeEventListener('scroll', handleScroll)
      if (rafIdRef.current !== null) window.cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  const activePoint = activeIndex >= 0 ? points[activeIndex] : null

  return (
    <section ref={sectionRef} style={{ height: '400vh' }} className="relative bg-[#0a0a1a]">
      {/* STICKY CONTAINER */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* VIDEO */}
        <video
          ref={videoRef}
          src="/SCATOLA.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        {/* OVERLAY GRADIENTE */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a4d]/80 via-transparent to-[#001a4d]/40" />

        {/* PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10">
          <div className="h-full bg-[#F5C400] transition-none" style={{ width: `${progress * 100}%` }} />
        </div>

        {/* DOTS NAVIGAZIONE */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {points.map((p, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'bg-[#F5C400] scale-150' : progress >= p.from ? 'bg-white/60' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* TESTO PUNTO ATTIVO */}
        <div className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 max-w-sm z-20">
          <AnimatePresence mode="wait">
            {activePoint && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-[#F5C400] text-xs font-bold tracking-[4px] uppercase block mb-3">
                  {activePoint.label}
                </span>
                <h3 className="text-white font-black text-3xl md:text-4xl leading-tight mb-4">{activePoint.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{activePoint.text}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* LABEL SCROLL HINT — scompare dopo il primo punto */}
        <AnimatePresence>
          {progress < 0.04 && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
              <span className="text-white/50 text-xs tracking-widest uppercase">Scorri per scoprire</span>
              <div className="w-px h-8 bg-white/30 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
