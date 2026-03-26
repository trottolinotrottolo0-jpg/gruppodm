import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Minus, Plus, Search, ShoppingCart, Star, X } from 'lucide-react'
import { categorie, ordinamenti, prodotti } from '../data/prodotti'

type CartItem = { id: number; nome: string; prezzo: number; qty: number; img: string }

type Categoria = (typeof categorie)[number]

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
} satisfies Variants

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
} satisfies Variants

const drawerVariants = {
  hidden: { x: 360, opacity: 1 },
  show: { x: 0, opacity: 1, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
  exit: { x: 360, opacity: 1, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
} satisfies Variants

function formatEuro(prezzo: number) {
  return `€${prezzo.toFixed(2)}`
}

function buildMailto(cart: CartItem[]) {
  const subject = 'Richiesta preventivo - ordine'
  const lines = cart.map((i) => `- ${i.nome} x${i.qty} = ${formatEuro(i.prezzo)} / pz`)
  const total = cart.reduce((acc, i) => acc + i.prezzo * i.qty, 0)
  const body = ['Ciao,', '', 'Vorrei richiedere un preventivo per questo ordine:', '', ...lines, '', `Totale indicativo: ${formatEuro(total)}`, ''].join(
    '\n',
  )
  return `mailto:info@gruppodm.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function isCategoria(value: string | null): value is Categoria {
  if (value === null) return false
  return categorie.includes(value as Categoria)
}

export default function Prodotti() {
  const location = useLocation()
  const initialParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const initialCategoriaParam = initialParams.get('categoria')
  const initialCategoria = isCategoria(initialCategoriaParam) ? initialCategoriaParam : 'Tutti'

  const [search, setSearch] = useState(() => initialParams.get('q') ?? '')
  const [categoria, setCategoria] = useState<string>(initialCategoria)
  const [ordinamento, setOrdinamento] = useState<string>('Rilevanza')
  const [soloDisponibili, setSoloDisponibili] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [addedId, setAddedId] = useState<number | null>(null)
  const addedTimeoutRef = useRef<number | null>(null)

  const risultati = useMemo(() => {
    const s = search.trim().toLowerCase()

    const filtered = prodotti.filter((p) => {
      if (soloDisponibili && !p.stock) return false
      if (categoria !== 'Tutti' && p.categoria !== categoria) return false
      if (!s) return true
      const hay = `${p.nome} ${p.categoria} ${p.misure}`.toLowerCase()
      return hay.includes(s)
    })

    const sorted = [...filtered]
    if (ordinamento === 'Prezzo crescente') sorted.sort((a, b) => a.prezzo - b.prezzo)
    if (ordinamento === 'Prezzo decrescente') sorted.sort((a, b) => b.prezzo - a.prezzo)
    if (ordinamento === 'Più recensiti') sorted.sort((a, b) => b.recensioni - a.recensioni)

    return sorted
  }, [categoria, ordinamento, search, soloDisponibili])

  const cartCount = cart.reduce((acc, i) => acc + i.qty, 0)
  const total = cart.reduce((acc, i) => acc + i.prezzo * i.qty, 0)

  function addToCart(id: number) {
    const p = prodotti.find((x) => x.id === id)
    if (!p || !p.stock) return

    setCart((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
      return [...prev, { id: p.id, nome: p.nome, prezzo: p.prezzo, qty: 1, img: p.img }]
    })

    setAddedId(id)
    if (addedTimeoutRef.current !== null) window.clearTimeout(addedTimeoutRef.current)
    addedTimeoutRef.current = window.setTimeout(() => setAddedId(null), 1500)
  }

  function inc(id: number) {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)))
  }

  function dec(id: number) {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(i.qty - 1, 0) } : i))
        .filter((i) => i.qty > 0),
    )
  }

  function remove(id: number) {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-[#001a4d] pt-36 pb-20">
        <img
          src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1800&q=80"
          alt="Linea prodotti e spedizioni"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#001a4d]/80" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <p className="text-[#F5C400] uppercase tracking-widest text-sm font-bold mb-4">I NOSTRI PRODOTTI</p>
          <h1 className="text-white font-black text-5xl leading-tight mb-5">Soluzioni packaging per ogni esigenza.</h1>
          <p className="text-white/60 text-base">Scopri il nostro catalogo e crea un ordine in pochi click.</p>
        </div>
      </section>

      <section className="sticky top-14 z-30 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cerca prodotto, categoria, misura..."
                className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:border-[#003082]"
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {categorie.map((c) => {
                  const active = categoria === c
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategoria(c)}
                      className={[
                        'rounded-full px-4 py-2 text-sm font-bold transition border',
                        active ? 'bg-[#003082] text-white border-[#003082]' : 'bg-white text-[#1A1A2E] border-gray-200 hover:bg-gray-50',
                      ].join(' ')}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
                <select
                  value={ordinamento}
                  onChange={(e) => setOrdinamento(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-[#1A1A2E] outline-none focus:border-[#003082]"
                >
                  {ordinamenti.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>

                <label className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A2E]">
                  <input
                    type="checkbox"
                    checked={soloDisponibili}
                    onChange={(e) => setSoloDisponibili(e.target.checked)}
                    className="h-4 w-4 accent-[#003082]"
                  />
                  Solo disponibili
                </label>

                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="relative inline-flex items-center justify-center gap-2 rounded-lg bg-[#003082] text-white px-4 py-2 text-sm font-black hover:brightness-110 transition"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Carrello
                  {cartCount > 0 ? (
                    <span className="absolute -right-2 -top-2 h-5 min-w-5 px-1 rounded-full bg-[#F5C400] text-[#003082] text-xs font-black inline-flex items-center justify-center">
                      {cartCount}
                    </span>
                  ) : null}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {risultati.map((p) => {
            const rounded = Math.round(p.rating)
            const isAdded = addedId === p.id
            return (
              <motion.div
                key={p.id}
                variants={cardVariants}
                className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.nome}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {p.badge ? (
                    <div className="absolute left-3 top-3">
                      <span
                        className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-black"
                        style={{
                          backgroundColor: p.badgeColor ?? '#F5C400',
                          color: (p.badgeColor ?? '#F5C400') === '#F5C400' ? '#003082' : '#ffffff',
                        }}
                      >
                        {p.badge}
                      </span>
                    </div>
                  ) : null}

                  {!p.stock ? (
                    <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                      <div className="text-white font-black text-sm">Esaurito</div>
                    </div>
                  ) : null}
                </div>

                <div className="p-4">
                  <div className="text-[#2D8C4E] uppercase tracking-widest text-[10px] font-black">{p.categoria}</div>
                  <Link to={`/prodotti/${p.slug}`} className="block mt-1 font-black text-sm text-[#1A1A2E] hover:text-[#003082] transition">
                    {p.nome}
                  </Link>
                  <div className="mt-2 text-xs text-gray-400">
                    <div>{p.misure}</div>
                    <div className="line-clamp-1">{p.materiale}</div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) =>
                        i < rounded ? (
                          <Star key={i} className="h-4 w-4 text-[#F5C400]" fill="#F5C400" />
                        ) : (
                          <Star key={i} className="h-4 w-4 text-gray-300" />
                        ),
                      )}
                      <span className="ml-1 text-xs font-bold text-gray-500">{p.rating.toFixed(1)}</span>
                    </div>
                    <div className="text-xs text-gray-400">{p.recensioni}</div>
                  </div>

                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <div className="font-black text-[#003082]">
                        {formatEuro(p.prezzo)} <span className="text-xs text-gray-400 font-bold">/ pz</span>
                      </div>
                      <div className="text-xs text-gray-400">Min. {p.quantitaMinima} pz</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!p.stock}
                    onClick={() => addToCart(p.id)}
                    className={[
                      'mt-4 w-full rounded-lg px-4 py-2 text-sm font-black transition',
                      p.stock ? 'bg-[#003082] text-white hover:brightness-110' : 'bg-gray-200 text-gray-500 cursor-not-allowed',
                    ].join(' ')}
                  >
                    {isAdded ? 'Aggiunto ✓' : 'Aggiungi al carrello'}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      <AnimatePresence>
        {cartOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setCartOpen(false)}
            />
            <motion.aside
              variants={drawerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <div className="font-black text-[#1A1A2E]">Il tuo carrello</div>
                <button type="button" onClick={() => setCartOpen(false)} className="p-2 rounded-md hover:bg-gray-100 transition">
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="flex-1 overflow-auto px-5 py-4">
                {cart.length === 0 ? (
                  <div className="text-sm text-gray-600">Il carrello è vuoto.</div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {cart.map((i) => (
                      <div key={i.id} className="flex gap-3 items-start">
                        <img src={i.img} alt={i.nome} className="h-12 w-12 rounded-lg object-cover border border-gray-100" />
                        <div className="min-w-0 flex-1">
                          <div className="font-black text-sm text-[#1A1A2E] truncate">{i.nome}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {formatEuro(i.prezzo)} · x{i.qty}
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => dec(i.id)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 transition"
                            >
                              <Minus className="h-4 w-4 text-gray-700" />
                            </button>
                            <div className="text-sm font-black text-[#1A1A2E] w-6 text-center">{i.qty}</div>
                            <button
                              type="button"
                              onClick={() => inc(i.id)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 transition"
                            >
                              <Plus className="h-4 w-4 text-gray-700" />
                            </button>
                            <button
                              type="button"
                              onClick={() => remove(i.id)}
                              className="ml-auto h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-gray-50 transition"
                              aria-label="Rimuovi"
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-gray-600">Totale</div>
                  <div className="font-black text-[#1A1A2E]">{formatEuro(total)}</div>
                </div>
                <a
                  href={buildMailto(cart)}
                  className={[
                    'mt-4 w-full inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-black transition',
                    cart.length > 0 ? 'bg-[#003082] text-white hover:brightness-110' : 'bg-gray-200 text-gray-500 pointer-events-none',
                  ].join(' ')}
                >
                  Richiedi preventivo per questo ordine <span className="ml-2" aria-hidden>→</span>
                </a>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
