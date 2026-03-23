'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { collections as localCollections } from '@/lib/data'

type Collection = typeof localCollections[0]

const empty: Collection = { id: '', label: '', description: '', href: '' }

export default function AdminCollections() {
  const [items, setItems] = useState<Collection[]>(localCollections)
  const [editing, setEditing] = useState<Collection | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [form, setForm] = useState<Collection>(empty)

  function openNew() { setIsNew(true); setEditing(null); setForm(empty) }
  function openEdit(c: Collection) { setIsNew(false); setEditing(c); setForm({ ...c }) }
  function closeModal() { setEditing(null); setIsNew(false) }

  function handleSave() {
    if (isNew) {
      setItems(prev => [...prev, { ...form, href: `/collections/${form.id}` }])
    } else if (editing) {
      setItems(prev => prev.map(c => c.id === editing.id ? { ...form, href: `/collections/${form.id}` } : c))
    }
    closeModal()
  }

  function handleDelete(id: string) {
    if (confirm('Supprimer cette collection ?')) setItems(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="p-6 md:p-10 pt-20 md:pt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-light tracking-wide text-foreground mb-1">Collections</h1>
          <p className="text-sm font-sans text-foreground/40 font-light">{items.length} collection{items.length > 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-black text-white text-sm font-sans font-light tracking-wide rounded-lg hover:bg-black/80 transition-colors"
        >
          <Plus size={16} strokeWidth={1.5} />
          Nouvelle collection
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map(c => (
          <div key={c.id} className="bg-white rounded-xl border border-black/8 p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-serif text-lg font-light text-foreground">{c.label}</p>
                <p className="text-[10px] tracking-[0.15em] uppercase font-sans text-foreground/30 mt-0.5">{c.id}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => openEdit(c)} className="p-2 rounded-lg text-foreground/40 hover:text-foreground hover:bg-black/5 transition-colors">
                  <Pencil size={13} strokeWidth={1.5} />
                </button>
                <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg text-foreground/40 hover:text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 size={13} strokeWidth={1.5} />
                </button>
              </div>
            </div>
            <p className="text-xs font-sans font-light text-foreground/45 leading-relaxed">{c.description}</p>
            <p className="text-[10px] font-sans text-foreground/25 tracking-wide">{c.href}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(isNew || editing) && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/30" onClick={closeModal} />
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md shadow-2xl overflow-hidden">
            <div className="border-b border-black/8 px-6 py-4 flex items-center justify-between">
              <h2 className="font-serif text-xl font-light tracking-wide">
                {isNew ? 'Nouvelle collection' : 'Modifier'}
              </h2>
              <button onClick={closeModal} className="text-foreground/40 hover:text-foreground transition-colors">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-5">
              <Field label="ID (slug URL)" value={form.id} onChange={v => setForm(f => ({ ...f, id: v }))} />
              <Field label="Nom affiché" value={form.label} onChange={v => setForm(f => ({ ...f, label: v }))} />
              <Field label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} multiline />
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={closeModal} className="px-4 py-2.5 text-sm font-sans font-light text-foreground/50 hover:text-foreground">Annuler</button>
                <button onClick={handleSave} className="px-5 py-2.5 bg-black text-white text-sm font-sans font-light rounded-lg hover:bg-black/80 transition-colors">
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  const cls = "w-full px-3 py-2.5 bg-[#f7f6f4] border border-black/10 rounded-lg text-sm font-sans font-light text-foreground focus:outline-none focus:border-black/30 transition-colors resize-none"
  return (
    <div>
      <label className="block text-[10px] tracking-[0.2em] uppercase font-sans text-foreground/40 mb-2">{label}</label>
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} className={cls} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} className={cls} />
      }
    </div>
  )
}
