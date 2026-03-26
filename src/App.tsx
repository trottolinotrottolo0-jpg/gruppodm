import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home.tsx'
import Prodotti from './pages/Prodotti.tsx'
import SchedaProdotto from './pages/SchedaProdotto.tsx'
import ChiSiamo from './pages/ChiSiamo.tsx'
import Servizi from './pages/Servizi.tsx'
import Blog from './pages/Blog.tsx'
import Contatti from './pages/Contatti.tsx'
import { prodotti } from './data/prodotti'

function normalizeSkuToId(raw: string | undefined) {
  if (!raw) return null
  const digits = raw.replaceAll(/[^0-9]/g, '')
  if (!digits) return null
  const id = Number(digits)
  return Number.isFinite(id) && id > 0 ? id : null
}

function ShortProductRedirect() {
  const { sku } = useParams()
  const location = useLocation()
  const id = normalizeSkuToId(sku)
  const p = id ? prodotti.find((x) => x.id === id) : undefined
  if (!p) return <Navigate to="/prodotti" replace />
  return <Navigate to={`/prodotti/${p.slug}${location.search}`} replace />
}

function StructuredProductRedirect() {
  const { sku, slug } = useParams()
  const location = useLocation()
  const id = normalizeSkuToId(sku)
  const bySlug = slug ? prodotti.find((x) => x.slug === slug) : undefined
  const byId = id ? prodotti.find((x) => x.id === id) : undefined
  const p = bySlug && (!id || bySlug.id === id) ? bySlug : byId
  if (!p) return <Navigate to="/prodotti" replace />
  return <Navigate to={`/prodotti/${p.slug}${location.search}`} replace />
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/p/:sku" element={<ShortProductRedirect />} />
          <Route path="/prodotto/:sku/:slug" element={<StructuredProductRedirect />} />
          <Route path="/prodotti" element={<Prodotti />} />
          <Route path="/prodotti/:slug" element={<SchedaProdotto />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contatti" element={<Contatti />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
