'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Package,
  Layers,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'

const nav = [
  { label: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
  { label: 'Produits', href: '/admin/produits', icon: Package },
  { label: 'Collections', href: '/admin/collections', icon: Layers },
  { label: 'Contenu', href: '/admin/contenu', icon: FileText },
  { label: 'Paramètres', href: '/admin/parametres', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 h-16 border-b border-black/8 shrink-0 ${collapsed ? 'justify-center' : ''}`}>
        {!collapsed && (
          <span className="font-serif text-lg font-light tracking-widest uppercase text-foreground">
            Admin
          </span>
        )}
        {!collapsed && (
          <span className="text-[9px] tracking-[0.2em] uppercase text-foreground/30 font-sans ml-1">
            Interloft
          </span>
        )}
        <button
          onClick={() => setCollapsed(v => !v)}
          className="ml-auto hidden md:flex items-center justify-center w-6 h-6 rounded text-foreground/40 hover:text-foreground transition-colors"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-0.5 overflow-y-auto">
        {nav.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans font-light tracking-wide transition-all ${
              isActive(href)
                ? 'bg-black text-white'
                : 'text-foreground/60 hover:text-foreground hover:bg-black/5'
            } ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? label : undefined}
          >
            <Icon size={16} strokeWidth={1.5} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className={`px-4 py-4 border-t border-black/8 shrink-0 ${collapsed ? 'flex justify-center' : ''}`}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans text-foreground/30 hover:text-foreground transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          <ExternalLink size={12} strokeWidth={1.5} />
          {!collapsed && 'Voir le site'}
        </a>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-white border-b border-black/8">
        <span className="font-serif text-base font-light tracking-widest uppercase">Admin — Interloft</span>
        <button onClick={() => setMobileOpen(v => !v)} className="text-foreground/60 hover:text-foreground">
          {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-64 bg-white h-full shadow-xl pt-14">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/30" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-black/8 h-screen sticky top-0 transition-all duration-300 ${
          collapsed ? 'w-[60px]' : 'w-56'
        }`}
      >
        <SidebarContent />
      </aside>

    </>
  )
}
