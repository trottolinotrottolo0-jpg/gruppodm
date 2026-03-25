import { useMemo, useState } from 'react'
import { motion, type Variants } from 'framer-motion'

type Quantity =
  | 'Meno di 100 pz'
  | '100-500 pz'
  | '500-1000 pz'
  | 'Oltre 1000 pz'

type ProductType =
  | 'Scatole da trasporto'
  | 'Espositori'
  | 'Packaging custom'
  | 'Imballaggi'
  | 'Altro'

type FormState = {
  contactName: string
  companyName: string
  email: string
  phone: string
  vat: string
  productType: ProductType
  quantity: Quantity
  description: string
  gdprAccepted: boolean
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
} satisfies Variants

export default function PreventivoDedicato() {
  const initialState = useMemo<FormState>(
    () => ({
      contactName: '',
      companyName: '',
      email: '',
      phone: '',
      vat: '',
      productType: 'Scatole da trasporto',
      quantity: '100-500 pz',
      description: '',
      gdprAccepted: false,
    }),
    [],
  )

  const [form, setForm] = useState<FormState>(initialState)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const inputClassName =
    'w-full rounded-md border border-brand-blue/20 bg-white px-3 py-3 text-sm text-brand-dark placeholder:text-brand-dark/50 outline-none focus:ring-2 focus:ring-brand-blue/20'

  return (
    <motion.section
      className="bg-white"
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="h-2 bg-brand-blue" />

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto w-fit rounded-md bg-[#E8EFF8] px-4 py-2 text-sm text-brand-blue">
            📱 Hai scansionato il nostro QR code — benvenuto!
          </div>

          <h2 className="mt-6 text-4xl font-black text-brand-blue">
            Richiedi il tuo preventivo personalizzato
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-[#666]">
            Compila il form in 2 minuti. Il nostro team ti risponde entro 24 ore lavorative con una
            proposta su misura.
          </p>

          <div className="mx-auto mt-6 h-1 w-[60px] rounded-[2px] bg-brand-yellow" />
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          {isSubmitted && (
            <div className="mb-6 rounded-md border border-brand-green bg-[#E6F4EC] px-4 py-3 text-sm text-brand-dark">
              ✓ Richiesta inviata con successo! Riceverai una risposta entro 24 ore lavorative
              all&apos;indirizzo email indicato.
            </div>
          )}

          <form
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault()
              setIsSubmitted(true)
              setForm(initialState)
            }}
          >
            <input
              className={inputClassName}
              placeholder="Nome referente"
              value={form.contactName}
              onChange={(e) => setForm((s) => ({ ...s, contactName: e.target.value }))}
              type="text"
            />
            <input
              className={inputClassName}
              placeholder="Ragione sociale / Azienda"
              value={form.companyName}
              onChange={(e) => setForm((s) => ({ ...s, companyName: e.target.value }))}
              type="text"
            />
            <input
              className={inputClassName}
              placeholder="Email aziendale"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              type="email"
            />
            <input
              className={inputClassName}
              placeholder="Telefono"
              value={form.phone}
              onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
              type="tel"
            />

            <input
              className={['md:col-span-2', inputClassName].join(' ')}
              placeholder="Partita IVA"
              value={form.vat}
              onChange={(e) => setForm((s) => ({ ...s, vat: e.target.value }))}
              type="text"
            />

            <select
              className={inputClassName}
              value={form.productType}
              onChange={(e) => setForm((s) => ({ ...s, productType: e.target.value as ProductType }))}
            >
              <option>Scatole da trasporto</option>
              <option>Espositori</option>
              <option>Packaging custom</option>
              <option>Imballaggi</option>
              <option>Altro</option>
            </select>

            <select
              className={inputClassName}
              value={form.quantity}
              onChange={(e) => setForm((s) => ({ ...s, quantity: e.target.value as Quantity }))}
            >
              <option>Meno di 100 pz</option>
              <option>100-500 pz</option>
              <option>500-1000 pz</option>
              <option>Oltre 1000 pz</option>
            </select>

            <textarea
              className={['md:col-span-2', inputClassName].join(' ')}
              placeholder="Descrivi il progetto o la necessità"
              rows={4}
              value={form.description}
              onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
            />

            <label className="md:col-span-2 flex items-start gap-3 rounded-md border border-brand-blue/10 bg-brand-blue/5 px-4 py-3 text-sm text-brand-dark">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-brand-blue"
                checked={form.gdprAccepted}
                onChange={(e) => setForm((s) => ({ ...s, gdprAccepted: e.target.checked }))}
              />
              <span>Accetto il trattamento dei dati personali ai sensi del GDPR</span>
            </label>

            <button
              type="submit"
              className="md:col-span-2 w-full rounded-md bg-brand-blue py-4 text-base font-bold text-white hover:brightness-95 transition"
            >
              Invia richiesta preventivo →
            </button>
          </form>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: '🔒',
                title: 'Dati protetti GDPR',
                text: 'I tuoi dati vengono gestiti in modo sicuro.',
              },
              {
                icon: '⚡',
                title: 'Risposta in 24h',
                text: 'Ricevi un contatto rapido dal nostro team.',
              },
              {
                icon: '📦',
                title: 'Campioni gratuiti disponibili',
                text: 'Valuta materiali e soluzioni prima di produrre.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-4xl">{item.icon}</div>
                <div className="mt-3 font-bold text-brand-blue">{item.title}</div>
                <div className="mt-2 text-sm text-[#666]">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
