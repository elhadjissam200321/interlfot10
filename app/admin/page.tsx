import Link from 'next/link'
import { Package, Layers, FileText, Settings, ArrowRight } from 'lucide-react'

const cards = [
  {
    label: 'Produits',
    description: 'Gérer les produits, catégories, images et descriptions.',
    href: '/admin/produits',
    icon: Package,
    color: 'bg-amber-50',
  },
  {
    label: 'Collections',
    description: 'Créer et éditer les collections de produits.',
    href: '/admin/collections',
    icon: Layers,
    color: 'bg-blue-50',
  },
  {
    label: 'Contenu',
    description: 'Modifier les textes, header, footer, navigation, showrooms.',
    href: '/admin/contenu',
    icon: FileText,
    color: 'bg-green-50',
  },
  {
    label: 'Paramètres',
    description: 'Informations générales : contact, réseaux, branding.',
    href: '/admin/parametres',
    icon: Settings,
    color: 'bg-purple-50',
  },
]

export default function AdminDashboard() {
  return (
    <div className="p-6 md:p-10 pt-20 md:pt-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-light tracking-wide text-foreground mb-1">
          Tableau de bord
        </h1>
        <p className="text-sm font-sans text-foreground/40 font-light tracking-wide">
          Bienvenue dans l'interface d'administration Interloft.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map(({ label, description, href, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className="group bg-white rounded-xl border border-black/8 p-6 hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col gap-4"
          >
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
              <Icon size={18} strokeWidth={1.5} className="text-foreground/70" />
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-lg font-light tracking-wide text-foreground mb-1">{label}</h2>
              <p className="text-xs font-sans text-foreground/45 font-light tracking-wide leading-relaxed">{description}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-sans text-foreground/30 group-hover:text-foreground transition-colors tracking-wide">
              Gérer <ArrowRight size={12} strokeWidth={1.5} />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick stats */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Produits', value: '6' },
          { label: 'Collections', value: '5' },
          { label: 'Catégories', value: '6' },
          { label: 'Collaborations', value: '—' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-black/8 p-5">
            <p className="text-2xl font-serif font-light text-foreground">{value}</p>
            <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-foreground/35 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
