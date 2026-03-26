import { useEffect, useState } from 'react'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import * as QRCode from 'qrcode'

export default function Footer() {
  const [qrSvg, setQrSvg] = useState<string>('')

  useEffect(() => {
    const canonical =
      document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href?.trim() || window.location.origin
    const url = canonical.endsWith('/') ? canonical : `${canonical}/`
    let cancelled = false

    QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'H', width: 240, margin: 2 })
      .then((svg: string) => {
        if (cancelled) return
        setQrSvg(svg)
      })
      .catch(() => {
        if (cancelled) return
        setQrSvg('')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <footer className="bg-[#001a4d]">
      {/* BAND SUPERIORE CTA */}
      <div className="bg-[#F5C400] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[#003082] font-black text-xl">Pronto a iniziare il tuo progetto?</p>
            <p className="text-[#003082]/70 text-sm">Richiedi un preventivo gratuito — risposta garantita in 24 ore.</p>
          </div>
          <a
            href="/#preventivo"
            className="flex items-center gap-2 bg-[#003082] text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-[#002060] transition-colors whitespace-nowrap"
          >
            Richiedi Preventivo <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* CORPO FOOTER */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* COL 1 — Brand */}
          <div className="md:col-span-1">
            <div className="inline-flex rounded-md bg-white p-1 mb-4">
              <img src="/logo.png" alt="Gruppo DM Packaging" className="h-10 w-auto object-contain" />
            </div>
            <div className="text-white font-black text-xl mb-3">
              GRUPPO<span className="text-[#F5C400]">DM</span>
              <span className="block text-sm font-normal text-white/50 tracking-widest uppercase mt-1">Packaging</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Scatolificio e fornitore packaging B2B a Roma dal 1988. Progettazione, produzione e fornitura su misura
              per aziende italiane.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+390600000000"
                className="flex items-center gap-2 text-white/50 hover:text-[#F5C400] text-sm transition-colors"
              >
                <Phone size={14} /> +39 06 000 0000
              </a>
              <a
                href="mailto:info@gruppodm.it"
                className="flex items-center gap-2 text-white/50 hover:text-[#F5C400] text-sm transition-colors"
              >
                <Mail size={14} /> info@gruppodm.it
              </a>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin size={14} /> Roma, Italia
              </div>
            </div>
          </div>

          {/* COL 2 — Prodotti */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 pb-3 border-b border-[#F5C400]/30">
              Prodotti
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                'Scatole da trasporto',
                'Espositori & Display',
                'Packaging custom',
                'Imballaggi & Accessori',
                'Colompac EuroBox',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#F5C400]" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — Servizi */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 pb-3 border-b border-[#F5C400]/30">
              Servizi
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                'Progettazione custom',
                'Stampa digitale',
                'Preventivo gratuito',
                'Campioni gratuiti',
                'Configuratore (presto)',
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#F5C400]" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4 — QR Code + Azienda */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 pb-3 border-b border-[#F5C400]/30">
              Inquadra & Contattaci
            </h4>
            <div className="bg-white p-3 rounded-xl inline-block mb-4">
              <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
                {qrSvg ? (
                  <div className="w-full h-full [&_svg]:w-full [&_svg]:h-full" dangerouslySetInnerHTML={{ __html: qrSvg }} />
                ) : (
                  <div className="text-xs text-gray-400">Caricamento…</div>
                )}
              </div>
            </div>
            <p className="text-white/40 text-xs mb-6">
              Scansiona per richiedere<br />un preventivo rapido
            </p>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4 pb-3 border-b border-[#F5C400]/30">
              Azienda
            </h4>
            <ul className="flex flex-col gap-3">
              {['Chi siamo', 'Il processo produttivo', 'Sostenibilità', 'Blog & News'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">© 2026 Gruppo DM Packaging Srl — P.IVA 04717991006 — Roma</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Cookie Policy
            </a>
            <span className="text-[#F5C400]/60 text-xs">Made in Italy 🇮🇹</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
