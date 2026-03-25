import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const links = [
    { label: 'Prodotti', to: '/prodotti' },
    { label: 'Servizi', to: '/servizi' },
    { label: 'Azienda', to: '/chi-siamo' },
    { label: 'Blog', to: '/blog' },
  ]

  return (
    <header className="sticky top-0 z-50">
      <nav
        className={[
          'bg-white text-brand-blue',
          'h-[52px] md:h-[56px]',
          'transition-shadow duration-200',
          isScrolled ? 'shadow-sm' : 'shadow-none',
        ].join(' ')}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            <span className="inline-flex rounded-md bg-white p-1">
              <img
                src="/logo.png"
                alt="Gruppo DM Packaging"
                className="h-8 w-auto md:h-9 object-contain"
              />
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium transition-colors text-brand-blue hover:text-brand-green"
              >
                {link.label}
              </Link>
            ))}
            <a href="/#gallery" className="text-sm font-medium transition-colors text-brand-blue hover:text-brand-green">
              Gallery
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/contatti"
              className="rounded-[4px] bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-blue hover:brightness-95 transition"
            >
              Richiedi Preventivo
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-[4px] p-2 text-brand-blue/90 hover:text-brand-blue hover:bg-brand-blue/5 transition"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={[
          'md:hidden overflow-hidden bg-white text-brand-blue border-t border-brand-blue/10',
          'transition-[max-height,opacity] duration-200',
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="px-4 pb-4">
          <div className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-[4px] px-3 py-2 text-sm font-medium transition text-brand-blue hover:bg-brand-blue/5 hover:text-brand-green"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/#gallery"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-[4px] px-3 py-2 text-sm font-medium transition text-brand-blue hover:bg-brand-blue/5 hover:text-brand-green"
            >
              Gallery
            </a>
          </div>

          <Link
            to="/contatti"
            onClick={() => setIsMenuOpen(false)}
            className="mt-3 inline-flex w-full items-center justify-center rounded-[4px] bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-blue hover:brightness-95 transition"
          >
            Richiedi Preventivo
          </Link>
        </div>
      </div>
    </header>
  )
}
