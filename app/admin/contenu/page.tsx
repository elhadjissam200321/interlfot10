'use client'

import { useState } from 'react'
import { Save, ChevronDown, ChevronUp } from 'lucide-react'

type Section = {
  id: string
  title: string
  fields: Field[]
}

type Field = {
  key: string
  label: string
  type: 'text' | 'textarea' | 'url'
  value: string
}

const defaultSections: Section[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    fields: [
      { key: 'nav_intro', label: 'Lien Introduction', type: 'text', value: 'Introduction' },
      { key: 'nav_products', label: 'Lien Produits', type: 'text', value: 'Produits' },
      { key: 'nav_collections', label: 'Lien Collections', type: 'text', value: 'Collections' },
      { key: 'nav_collabs', label: 'Lien Collaborations', type: 'text', value: 'Collaborations' },
      { key: 'nav_contact', label: 'Lien Contact', type: 'text', value: 'Contact' },
    ],
  },
  {
    id: 'header',
    title: 'Page d\'accueil — Hero',
    fields: [
      { key: 'hero_title', label: 'Titre principal', type: 'text', value: 'INTERloft' },
      { key: 'hero_subtitle', label: 'Sous-titre', type: 'text', value: 'Mobilier Contemporain' },
      { key: 'hero_cta', label: 'Texte du bouton CTA', type: 'text', value: 'Découvrir les collections' },
    ],
  },
  {
    id: 'introduction',
    title: 'Page Introduction',
    fields: [
      { key: 'intro_title', label: 'Titre', type: 'text', value: 'Notre histoire' },
      { key: 'intro_text', label: 'Texte principal', type: 'textarea', value: 'INTERloft est une marque marocaine dédiée au mobilier contemporain et à l\'aménagement d\'intérieurs modernes.' },
    ],
  },
  {
    id: 'contact_page',
    title: 'Page Contact',
    fields: [
      { key: 'contact_title', label: 'Titre de la page', type: 'text', value: 'Contactez-nous' },
      { key: 'contact_subtitle', label: 'Sous-titre', type: 'text', value: 'Notre équipe est à votre disposition.' },
      { key: 'contact_address', label: 'Adresse', type: 'textarea', value: 'Casablanca, Maroc' },
    ],
  },
  {
    id: 'footer',
    title: 'Footer',
    fields: [
      { key: 'footer_tagline', label: 'Tagline / description courte', type: 'text', value: 'Mobilier contemporain marocain.' },
      { key: 'footer_newsletter_title', label: 'Titre Newsletter', type: 'text', value: 'Interloft Newsletter' },
    ],
  },
  {
    id: 'buttons',
    title: 'Boutons & Labels',
    fields: [
      { key: 'btn_quote', label: 'Bouton demande info (produit)', type: 'text', value: 'Demander informations' },
      { key: 'lbl_materials', label: 'Label Matériaux', type: 'text', value: 'Matériaux' },
      { key: 'lbl_dimensions', label: 'Label Dimensions', type: 'text', value: 'Dimensions' },
      { key: 'lbl_empty_collection', label: 'Collection vide', type: 'text', value: 'Collection à venir' },
      { key: 'btn_view_collab', label: 'Bouton collaboration', type: 'text', value: 'Voir la collaboration' },
    ],
  },
]

export default function AdminContenu() {
  const [sections, setSections] = useState(defaultSections)
  const [openSection, setOpenSection] = useState<string | null>('navigation')
  const [saved, setSaved] = useState(false)

  function updateField(sectionId: string, key: string, value: string) {
    setSections(prev =>
      prev.map(s =>
        s.id === sectionId
          ? { ...s, fields: s.fields.map(f => f.key === key ? { ...f, value } : f) }
          : s
      )
    )
  }

  function handleSave() {
    // In production: save to Supabase/DB
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="p-6 md:p-10 pt-20 md:pt-10 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-light tracking-wide text-foreground mb-1">Contenu</h1>
          <p className="text-sm font-sans text-foreground/40 font-light">Modifier tous les textes du site.</p>
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

      <div className="flex flex-col gap-3">
        {sections.map(section => (
          <div key={section.id} className="bg-white rounded-xl border border-black/8 overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-black/[0.02] transition-colors"
            >
              <span className="text-sm font-sans font-light text-foreground tracking-wide">{section.title}</span>
              {openSection === section.id
                ? <ChevronUp size={16} strokeWidth={1.5} className="text-foreground/30" />
                : <ChevronDown size={16} strokeWidth={1.5} className="text-foreground/30" />
              }
            </button>

            {openSection === section.id && (
              <div className="px-6 pb-6 border-t border-black/5 pt-5 flex flex-col gap-4">
                {section.fields.map(f => (
                  <div key={f.key}>
                    <label className="block text-[10px] tracking-[0.2em] uppercase font-sans text-foreground/40 mb-2">
                      {f.label}
                    </label>
                    {f.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        value={f.value}
                        onChange={e => updateField(section.id, f.key, e.target.value)}
                        className="w-full px-3 py-2.5 bg-[#f7f6f4] border border-black/10 rounded-lg text-sm font-sans font-light text-foreground focus:outline-none focus:border-black/30 transition-colors resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={f.value}
                        onChange={e => updateField(section.id, f.key, e.target.value)}
                        className="w-full px-3 py-2.5 bg-[#f7f6f4] border border-black/10 rounded-lg text-sm font-sans font-light text-foreground focus:outline-none focus:border-black/30 transition-colors"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
