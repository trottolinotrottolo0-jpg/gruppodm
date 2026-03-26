import { useEffect, useMemo, useRef, useState } from 'react'

type SocialVideo = {
  id: string
  platform: 'youtube' | 'instagram' | 'tiktok' | 'facebook'
  title: string
  url: string
  embedUrl: string
  thumbnailUrl: string
}

type Props = {
  count?: number
  layout?: 'grid' | 'carousel'
  autoplay?: boolean
}

type FeedResponse = { items: SocialVideo[] }

function clampCount(n: number) {
  return Math.max(4, Math.min(12, n))
}

function canEmbed(platform: SocialVideo['platform']) {
  return platform === 'youtube'
}

export default function SocialVideoWidget({ count = 6, layout = 'grid', autoplay = false }: Props) {
  const safeCount = clampCount(count)
  const rootRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [items, setItems] = useState<SocialVideo[]>([])
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        setIsInView(!!entries[0]?.isIntersecting)
      },
      { root: null, threshold: 0, rootMargin: '200px 0px 200px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return
    let cancelled = false

    fetch(`/api/social/videos?count=${safeCount}`)
      .then((r) => (r.ok ? (r.json() as Promise<FeedResponse>) : Promise.reject(new Error('Bad response'))))
      .then((data) => {
        if (cancelled) return
        setItems(Array.isArray(data.items) ? data.items : [])
      })
      .catch(() => {
        if (cancelled) return
        setItems([])
      })

    return () => {
      cancelled = true
    }
  }, [isInView, safeCount])

  useEffect(() => {
    if (!openId) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openId])

  const openItem = useMemo(() => items.find((v) => v.id === openId) || null, [items, openId])

  return (
    <section ref={rootRef} className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#2D8C4E]">Social</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mt-1">Video dal nostro mondo</h2>
          </div>
          <a href="/blog" className="text-sm font-semibold text-[#003082] hover:underline">
            Scopri di più →
          </a>
        </div>

        {layout === 'carousel' ? (
          <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => (canEmbed(item.platform) ? setOpenId(item.id) : window.open(item.url, '_blank', 'noopener,noreferrer'))}
                className="group relative shrink-0 w-[260px] sm:w-[300px] aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50 text-left"
                aria-label={item.title}
              >
                <img src={item.thumbnailUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-xs font-semibold line-clamp-2">{item.title}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => (canEmbed(item.platform) ? setOpenId(item.id) : window.open(item.url, '_blank', 'noopener,noreferrer'))}
                className="group relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50 text-left"
                aria-label={item.title}
              >
                <img src={item.thumbnailUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-xs font-semibold line-clamp-2">{item.title}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        <noscript>
          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-600">Apri i nostri canali:</p>
            <ul className="list-disc pl-5 text-sm">
              <li>
                <a href="https://www.youtube.com" rel="noreferrer" target="_blank">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" rel="noreferrer" target="_blank">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com" rel="noreferrer" target="_blank">
                  TikTok
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com" rel="noreferrer" target="_blank">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </noscript>
      </div>

      {openItem ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Chiudi"
            onClick={() => setOpenId(null)}
          />
          <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-black border border-white/10">
            <div className="aspect-video w-full">
              <iframe
                src={
                  autoplay && openItem.platform === 'youtube'
                    ? `${openItem.embedUrl}?autoplay=1&mute=1&playsinline=1`
                    : openItem.embedUrl
                }
                title={openItem.title}
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 bg-[#0a0a1a]">
              <div className="flex items-center justify-between gap-4">
                <p className="text-white font-semibold text-sm">{openItem.title}</p>
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  className="text-white/70 hover:text-white text-sm font-semibold"
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
