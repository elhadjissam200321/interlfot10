'use client'

import { useState } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'

const defaultSettings = {
  phone: '+212 660-252070',
  email: 'contact@interloft.ma',
  instagram: 'https://instagram.com/interloft',
  whatsapp: '212660252070',
  footer_text: 'Interloft',
  showrooms: ['Casablanca (en cours)', 'Marrakech (en cours)', 'Rabat (en cours)'],
}

export default function AdminParametres() {
  const [settings, setSettings] = useState(defaultSettings)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    // In production: save to Supabase/DB
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function addShowroom() {
    setSettings(s => ({ ...s, showrooms: [...s.showrooms, ''] }))
  }

  function updateShowroom(i: number, val: string) {
    setSettings(s => ({ ...s, showrooms: s.showrooms.map((r, idx) => idx === i ? val : r) }))
  }

  function removeShowroom(i: number) {
    setSettings(s => ({ ...s, showrooms: s.showrooms.filter((_, idx) => idx !== i) }))
  }

  return (
    <div className="p-6 md:p-10 pt-20 md:pt-10 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-light tracking-wide text-foreground mb-1">Paramètres</h1>
          <p className="text-sm font-sans text-foreground/40 font-light">Informations de contact et branding global.</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-sans font-light tracking-wide rounded-lg transition-all ${
            saved ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-black/80'
          }`}
        >
          <Save size={15} strokeWidth={1.5} />
          {saved ? 'Enregistré !' : 'Enregistrer'}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Contact */}
        <Section title="Contact">
          <Field label="Téléphone" value={settings.phone} onChange={v => setSettings(s => ({ ...s, phone: v }))} />
          <Field label="Email" value={settings.email} onChange={v => setSettings(s => ({ ...s, email: v }))} />
          <Field label="WhatsApp (numéro sans +)" value={settings.whatsapp} onChange={v => setSettings(s => ({ ...s, whatsapp: v }))} />
        </Section>

        {/* Réseaux sociaux */}
        <Section title="Réseaux sociaux">
          <Field label="Lien Instagram" value={settings.instagram} onChange={v => setSettings(s => ({ ...s, instagram: v }))} />
        </Section>

        {/* Showrooms */}
        <Section title="Showrooms">
          <div className="flex flex-col gap-3">
            {settings.showrooms.map((room, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={room}
                  onChange={e => updateShowroom(i, e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-[#f7f6f4] border border-black/10 rounded-lg text-sm font-sans font-light text-foreground focus:outline-none focus:border-black/30 transition-colors"
                  placeholder="Ex: Casablanca — Maarif"
                />
                <button
                  onClick={() => removeShowroom(i)}
                  className="p-2 rounded-lg text-foreground/40 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} strokeWidth={1.5} />
                </button>
              </div>
            ))}
            <button
              onClick={addShowroom}
              className="flex items-center gap-2 text-sm font-sans font-light text-foreground/40 hover:text-foreground transition-colors"
            >
              <Plus size={14} strokeWidth={1.5} />
              Ajouter un showroom
            </button>
          </div>
        </Section>

        {/* Footer */}
        <Section title="Footer">
          <Field label="Texte copyright" value={settings.footer_text} onChange={v => setSettings(s => ({ ...s, footer_text: v }))} />
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-black/8 p-6">
      <h2 className="text-[10px] tracking-[0.25em] uppercase font-sans text-foreground/35 mb-5">{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.2em] uppercase font-sans text-foreground/40 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 bg-[#f7f6f4] border border-black/10 rounded-lg text-sm font-sans font-light text-foreground focus:outline-none focus:border-black/30 transition-colors"
      />
    </div>
  )
}
