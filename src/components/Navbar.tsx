import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (location.pathname === '/') return null

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Chi Siamo', to: '/chi-siamo' },
    { label: 'Prodotti', to: '/prodotti' },
    { label: 'Servizi', to: '/servizi' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contatti', to: '/contatti' },
  ]

  const isActive = (to: string) => location.pathname === to

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <Link to="/" className="flex items-center">
          <span className="inline-flex rounded-md bg-white px-2 py-1">
            <img src="/logo.png" alt="Gruppo DM" className="h-10 w-auto object-contain" />
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-semibold transition-colors ${
                isActive(link.to)
                  ? scrolled
                    ? 'text-[#2D8C4E] border-b-2 border-[#2D8C4E] pb-0.5'
                    : 'text-[#F5C400] border-b-2 border-[#F5C400] pb-0.5'
                  : scrolled
                  ? 'text-[#003082] hover:text-[#2D8C4E]'
                  : 'text-white/80 hover:text-[#F5C400]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/contatti"
            className={`hidden md:block font-black text-sm px-5 py-2.5 rounded-lg transition ${
              scrolled
                ? 'bg-[#F5C400] text-[#003082] hover:bg-[#e6b800]'
                : 'bg-white/15 text-white border border-white/30 hover:bg-white/25'
            }`}
          >
            Richiedi Preventivo
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden transition-colors ${scrolled ? 'text-[#003082]' : 'text-white'}`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-semibold transition-colors ${
                isActive(link.to) ? 'text-[#2D8C4E]' : 'text-[#003082]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contatti"
            onClick={() => setMenuOpen(false)}
            className="bg-[#F5C400] text-[#003082] font-black text-sm px-4 py-2 rounded-lg text-center"
          >
            Richiedi Preventivo
          </Link>
        </div>
      )}
    </nav>
  )
}
