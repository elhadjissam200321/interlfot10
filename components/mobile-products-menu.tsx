"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import type { Category } from '@/lib/data'

interface MobileProductsMenuProps {
  onLinkClick: () => void
  label?: string
}

export default function MobileProductsMenu({ onLinkClick, label = 'Produits' }: MobileProductsMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)

  const fetchCategories = async () => {
    if (hasFetched) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
      setHasFetched(true)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = () => {
    if (!isExpanded) {
      fetchCategories()
    }
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={handleToggle}
        className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity flex items-center gap-3 cursor-pointer"
      >
        {label}
        <ChevronDown
          size={20}
          strokeWidth={1}
          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expandable categories */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${isExpanded ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
          }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="w-4 h-4 border border-foreground/30 border-t-foreground rounded-full animate-spin" />
          </div>
        ) : (
          <nav className="flex flex-col items-center gap-4">
            <Link
              href="/produits"
              onClick={onLinkClick}
              className="text-sm tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-colors"
            >
              Tous les produits
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                onClick={onLinkClick}
                className="text-sm tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-colors"
              >
                {category.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  )
}
