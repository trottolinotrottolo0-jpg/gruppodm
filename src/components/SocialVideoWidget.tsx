import { useEffect, useMemo, useRef } from 'react'

type Props = {
  count?: number
}

function clampCount(n: number) {
  return Math.max(3, Math.min(12, n))
}

export default function SocialVideoWidget({ count = 4 }: Props) {
  const safeCount = clampCount(count)
  const sectionRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const vProgressRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const hProgressRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const currentYRef = useRef(0)
  const targetYRef = useRef(0)
  const targetPctRef = useRef(0)
  const inViewRef = useRef(false)
  const hRafRef = useRef<number | null>(null)

  const items = useMemo(
    () =>
      Array.from({ length: safeCount }).map((_, i) => ({
        id: `social-${i + 1}`,
        title: `Video social #${i + 1}`,
        subtitle: 'Placeholder',
      })),
    [safeCount]
  )

  useEffect(() => {
    const section = sectionRef.current
    const overlay = overlayRef.current
    const vProgress = vProgressRef.current
    if (!section || !overlay || !vProgress) return

    const tick = () => {
      rafRef.current = null
      const current = currentYRef.current
      const target = targetYRef.current
      const next = current + (target - current) * 0.14
      currentYRef.current = next
      overlay.style.transform = `translate3d(0, ${next.toFixed(2)}px, 0)`
      vProgress.style.width = `${(targetPctRef.current * 100).toFixed(2)}%`
      if (Math.abs(target - next) > 0.5 && inViewRef.current) {
        rafRef.current = window.requestAnimationFrame(tick)
      }
    }

    const updateTargets = () => {
      const rect = section.getBoundingClientRect()
      const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1)
      const pct = Math.min(Math.max(-rect.top / scrollRange, 0), 1)
      targetPctRef.current = pct
      const maxLift = Math.min(420, Math.max(220, window.innerHeight * 0.34))
      targetYRef.current = (pct - 1) * maxLift
      if (rafRef.current === null) rafRef.current = window.requestAnimationFrame(tick)
    }

    const onScroll = () => {
      if (!inViewRef.current) return
      updateTargets()
    }

    let io: IntersectionObserver | null = null
    if (typeof IntersectionObserver === 'function') {
      io = new IntersectionObserver(
        (entries) => {
          inViewRef.current = !!entries[0]?.isIntersecting
          if (inViewRef.current) updateTargets()
        },
        { root: null, threshold: 0, rootMargin: '60% 0px 60% 0px' }
      )
      io.observe(section)
    } else {
      inViewRef.current = true
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateTargets()

    return () => {
      io?.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    const track = trackRef.current
    const bar = hProgressRef.current
    if (!track || !bar) return

    const tick = () => {
      hRafRef.current = null
      const max = Math.max(track.scrollWidth - track.clientWidth, 1)
      const pct = Math.min(Math.max(track.scrollLeft / max, 0), 1)
      bar.style.width = `${(pct * 100).toFixed(2)}%`
    }

    const onScroll = () => {
      if (hRafRef.current !== null) return
      hRafRef.current = window.requestAnimationFrame(tick)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    tick()
    return () => {
      track.removeEventListener('scroll', onScroll)
      if (hRafRef.current !== null) window.cancelAnimationFrame(hRafRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a1a]" style={{ height: '220vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#001a4d]/80 via-[#001a4d]/35 to-[#001a4d]/70" />

        <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-10 pt-10 pb-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-widest uppercase text-[#F5C400]">Social Video</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-2 leading-tight">Video social in arrivo</h2>
            <p className="text-white/60 mt-3 text-sm md:text-base">
              Scorri per vedere le card. Durante lo scroll verticale, le card si sovrappongono al video con effetto over the top.
            </p>
          </div>

          <div className="w-full">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div ref={vProgressRef} className="h-full bg-[#F5C400]" style={{ width: '0%' }} />
            </div>
          </div>
        </div>

        <div
          ref={overlayRef}
          className="absolute left-0 right-0 bottom-0 z-20 will-change-transform"
          style={{ transform: 'translate3d(0, 0px, 0)' }}
        >
          <div className="px-6 md:px-10">
            <div
              ref={trackRef}
              className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x overscroll-x-contain"
              aria-label="Video social"
            >
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="snap-start shrink-0 w-[190px] sm:w-[220px] md:w-[240px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm text-left"
                  aria-label={item.title}
                >
                  <div className="h-full w-full relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-bold text-sm">{item.title}</p>
                      <p className="text-white/60 text-xs mt-1">{item.subtitle}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="h-1 bg-white/15 rounded-full overflow-hidden">
              <div ref={hProgressRef} className="h-full bg-white/70" style={{ width: '0%' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
