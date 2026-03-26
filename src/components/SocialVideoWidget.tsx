import { useMemo } from 'react'

type Props = {
  count?: number
}

function clampCount(n: number) {
  return Math.max(3, Math.min(12, n))
}

export default function SocialVideoWidget({ count = 4 }: Props) {
  const safeCount = clampCount(count)

  const items = useMemo(
    () =>
      Array.from({ length: safeCount }).map((_, i) => ({
        id: `social-${i + 1}`,
        title: `Video social #${i + 1}`,
        subtitle: 'Placeholder',
      })),
    [safeCount]
  )

  return (
    <section className="relative bg-[#0a0a1a] py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#001a4d]/60 via-[#001a4d]/40 to-[#001a4d]/70" />
      <div className="relative z-10 px-6 md:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-widest uppercase text-[#F5C400]">Social Video</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-2 leading-tight">Video social in arrivo</h2>
          <p className="text-white/60 mt-3 text-sm md:text-base">Anteprima statica senza animazioni.</p>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="h-full w-full relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm">{item.title}</p>
                  <p className="text-white/60 text-xs mt-1">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
