'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react'
import { products as localProducts, categories as localCategories } from '@/lib/data'

type Product = typeof localProducts[0]

const emptyProduct: Omit<Product, 'id'> = {
  slug: '',
  name: '',
  category: 'canapes',
  description: '',
  materials: [],
  dimensions: '',
  image: '',
  gallery: [],
}

export default function AdminProduits() {
  const [items, setItems] = useState<Product[]>(localProducts)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Product | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyProduct)
  const [materialsInput, setMaterialsInput] = useState('')

  const filtered = items.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  function openNew() {
    setIsNew(true)
    setEditing(null)
    setForm(emptyProduct)
    setMaterialsInput('')
  }

  function openEdit(p: Product) {
    setEditing(p)
    setIsNew(false)
    setForm({ slug: p.slug, name: p.name, category: p.category, description: p.description, materials: p.materials, dimensions: p.dimensions, image: p.image, gallery: p.gallery })
    setMaterialsInput(p.materials.join(', '))
  }

  function closeModal() {
    setEditing(null)
    setIsNew(false)
  }

  function handleSave() {
    const materials = materialsInput.split(',').map(s => s.trim()).filter(Boolean)
    if (isNew) {
      const newProduct: Product = { ...form, id: String(Date.now()), materials }
      setItems(prev => [newProduct, ...prev])
    } else if (editing) {
      setItems(prev => prev.map(p => p.id === editing.id ? { ...editing, ...form, materials } : p))
    }
    closeModal()
  }

  function handleDelete(id: string) {
    if (confirm('Supprimer ce produit ?')) {
      setItems(prev => prev.filter(p => p.id !== id))
    }
  }

  return (
    <div className="p-6 md:p-10 pt-20 md:pt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-light tracking-wide text-foreground mb-1">Produits</h1>
          <p className="text-sm font-sans text-foreground/40 font-light">{items.length} produit{items.length > 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-black text-white text-sm font-sans font-light tracking-wide rounded-lg hover:bg-black/80 transition-colors"
        >
          <Plus size={16} strokeWidth={1.5} />
          Nouveau produit
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-xs">
        <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" />
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-black/10 rounded-lg text-sm font-sans font-light text-foreground placeholder-foreground/30 focus:outline-none focus:border-black/30 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-black/8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/8">
                <th className="text-left px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase font-sans text-foreground/35 font-normal">Nom</th>
                <th className="text-left px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase font-sans text-foreground/35 font-normal hidden sm:table-cell">Catégorie</th>
                <th className="text-left px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase font-sans text-foreground/35 font-normal hidden lg:table-cell">Dimensions</th>
                <th className="text-right px-5 py-3.5 text-[10px] tracking-[0.2em] uppercase font-sans text-foreground/35 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-sm font-sans font-light text-foreground">{p.name}</p>
                    <p className="text-[10px] font-sans text-foreground/35 mt-0.5 tracking-wide">{p.slug}</p>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-black/5 text-[10px] tracking-[0.1em] uppercase font-sans text-foreground/60">
                      {localCategories.find(c => c.id === p.category)?.label || p.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <p className="text-xs font-sans font-light text-foreground/50">{p.dimensions}</p>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-2 rounded-lg text-foreground/40 hover:text-foreground hover:bg-black/5 transition-colors"
                        title="Modifier"
                      >
                        <Pencil size={14} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 rounded-lg text-foreground/40 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-sm font-sans text-foreground/30 font-light">
                    Aucun produit trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {(isNew || editing) && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/30" onClick={closeModal} />
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-black/8 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-serif text-xl font-light tracking-wide">
                {isNew ? 'Nouveau produit' : 'Modifier le produit'}
              </h2>
              <button onClick={closeModal} className="text-foreground/40 hover:text-foreground transition-colors">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-5">
              <Field label="Nom" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
              <Field label="Slug (URL)" value={form.slug} onChange={v => setForm(f => ({ ...f, slug: v }))} />
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase font-sans text-foreground/40 mb-2">Catégorie</label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value as any }))}
                  className="w-full px-3 py-2.5 bg-[#f7f6f4] border border-black/10 rounded-lg text-sm font-sans font-light text-foreground focus:outline-none focus:border-black/30 transition-colors"
                >
                  {localCategories.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
              <Field label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} multiline />
              <Field label="Matériaux (séparés par virgule)" value={materialsInput} onChange={setMaterialsInput} />
              <Field label="Dimensions" value={form.dimensions} onChange={v => setForm(f => ({ ...f, dimensions: v }))} />
              <Field label="Image principale (URL)" value={form.image} onChange={v => setForm(f => ({ ...f, image: v }))} />
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={closeModal} className="px-4 py-2.5 text-sm font-sans font-light text-foreground/50 hover:text-foreground transition-colors">
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-black text-white text-sm font-sans font-light tracking-wide rounded-lg hover:bg-black/80 transition-colors"
                >
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
  const cls = "w-full px-3 py-2.5 bg-[#f7f6f4] border border-black/10 rounded-lg text-sm font-sans font-light text-foreground placeholder-foreground/30 focus:outline-none focus:border-black/30 transition-colors resize-none"
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
