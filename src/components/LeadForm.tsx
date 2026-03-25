import { useMemo, useState } from 'react'
import { motion, type Variants } from 'framer-motion'

type FormState = {
  nameCompany: string
  email: string
  vat: string
  phone: string
  productType: string
  description: string
}

const slideUpVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
} satisfies Variants

export default function LeadForm() {
  const initialState = useMemo<FormState>(
    () => ({
      nameCompany: '',
      email: '',
      vat: '',
      phone: '',
      productType: 'Scatole da trasporto',
      description: '',
    }),
    [],
  )

  const [form, setForm] = useState<FormState>(initialState)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const inputClassName =
    'w-full rounded-md bg-white/70 border border-brand-blue/20 px-3 py-2 text-sm text-brand-blue placeholder:text-brand-blue/50 outline-none focus:ring-2 focus:ring-brand-blue/25'

  return (
    <motion.section
      id="preventivo"
      className="bg-brand-yellow py-16 px-6"
      variants={slideUpVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-blue/60">
            CONTATTI
          </div>
          <h2 className="mt-3 text-3xl font-black text-brand-blue">Hai un progetto in mente?</h2>
          <p className="mt-3 text-brand-blue/70">
            Richiedi un preventivo gratuito. Risposta garantita entro 24 ore lavorative.
          </p>

          <form
            className="mt-8 grid grid-cols-1 gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              setIsSubmitted(true)
            }}
          >
            <input
              className={inputClassName}
              type="text"
              placeholder="Nome e azienda"
              value={form.nameCompany}
              onChange={(e) => setForm((s) => ({ ...s, nameCompany: e.target.value }))}
            />
            <input
              className={inputClassName}
              type="email"
              placeholder="Email aziendale"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            />
            <input
              className={inputClassName}
              type="text"
              placeholder="Partita IVA (obbligatorio per B2B)"
              value={form.vat}
              onChange={(e) => setForm((s) => ({ ...s, vat: e.target.value }))}
            />
            <input
              className={inputClassName}
              type="tel"
              placeholder="Telefono"
              value={form.phone}
              onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
            />
            <select
              className={inputClassName}
              value={form.productType}
              onChange={(e) => setForm((s) => ({ ...s, productType: e.target.value }))}
            >
              <option>Scatole da trasporto</option>
              <option>Espositori</option>
              <option>Packaging custom</option>
              <option>Imballaggi</option>
              <option>Altro</option>
            </select>
            <textarea
              className={inputClassName}
              rows={3}
              placeholder="Descrivi brevemente il progetto"
              value={form.description}
              onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
            />

            <button
              type="submit"
              className="w-full rounded-md bg-brand-blue py-3 text-sm font-bold text-white hover:brightness-95 transition"
            >
              Richiedi il preventivo gratuito →
            </button>

            {isSubmitted && (
              <div className="text-sm font-semibold text-brand-green">
                ✓ Richiesta inviata! Ti risponderemo entro 24 ore.
              </div>
            )}
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              '✓ Produzione italiana',
              '✓ Consegna 5-10 gg',
              '✓ Campioni gratuiti',
              '✓ Progettazione inclusa',
            ].map((t) => (
              <div
                key={t}
                className="rounded-[4px] bg-brand-blue/10 px-[10px] py-1 text-xs font-semibold text-brand-blue"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
