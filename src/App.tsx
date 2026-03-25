import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Prodotti from './pages/Prodotti'
import SchedaProdotto from './pages/SchedaProdotto'
import ChiSiamo from './pages/ChiSiamo'
import Servizi from './pages/Servizi'
import Blog from './pages/Blog'
import Contatti from './pages/Contatti'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
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
