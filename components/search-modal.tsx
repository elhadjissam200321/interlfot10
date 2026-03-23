"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X } from 'lucide-react'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchProduct {
  id: string
  slug: string
  name: string
  category: string
  image: string
}

interface SearchCategory {
  id: string
  label: string
  image: string
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{ products: SearchProduct[]; categories: SearchCategory[] }>({
    products: [],
    categories: [],
  })
  const [popularCategories, setPopularCategories] = useState<SearchCategory[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
      fetchPopularCategories()
    }
    if (!isOpen) {
      setQuery('')
      setResults({ products: [], categories: [] })
    }
  }, [isOpen])

  const fetchPopularCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (res.ok) {
        const data: SearchCategory[] = await res.json()
        setPopularCategories(data)
      }
    } catch {
      // silently fail
    }
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery)

    if (!searchQuery.trim()) {
      setResults({ products: [], categories: [] })
      return
    }

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      if (res.ok) {
        const data = await res.json()
        setResults({
          products: data.products || [],
          categories: data.categories || [],
        })
      }
    } catch {
      setResults({ products: [], categories: [] })
    }
  }

  const handleProductClick = (product: SearchProduct) => {
    onClose()
    router.push(`/products/${product.category}/${product.slug}`)
  }

  const handleCategoryClick = (category: SearchCategory) => {
    onClose()
    router.push(`/products/${category.id}`)
  }

  const hasResults = results.products.length > 0 || results.categories.length > 0

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 md:pt-32">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-background shadow-2xl">
        {/* Search input */}
        <div className="flex items-center border-b border-border">
          <Search size={20} strokeWidth={1.5} className="ml-6 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Rechercher un produit, une collection..."
            className="flex-1 px-4 py-5 text-lg bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={onClose}
            className="p-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fermer"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query && !hasResults && (
            <div className="p-8 text-center text-muted-foreground">
              <p className="text-sm">Aucun resultat pour "{query}"</p>
            </div>
          )}

          {/* Categories */}
          {results.categories.length > 0 && (
            <div className="p-4 border-b border-border">
              <p className="px-2 mb-3 text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Collections
              </p>
              <div className="flex flex-wrap gap-2">
                {results.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className="px-4 py-2 text-sm bg-secondary hover:bg-accent transition-colors"
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Products */}
          {results.products.length > 0 && (
            <div className="p-4">
              <p className="px-2 mb-3 text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Produits
              </p>
              <div className="space-y-2">
                {results.products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="w-full flex items-center gap-4 p-3 hover:bg-secondary transition-colors text-left"
                  >
                    <div className="relative w-16 h-16 bg-secondary flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-lg text-foreground truncate">
                        {product.name}
                      </p>
                      <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                        {product.category.replace(/-/g, ' ')}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick links when no search */}
          {!query && (
            <div className="p-6">
              <p className="px-2 mb-4 text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Collections populaires
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {popularCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products/${category.id}`}
                    onClick={onClose}
                    className="relative aspect-[4/3] overflow-hidden group"
                  >
                    <Image
                      src={category.image}
                      alt={category.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/20 transition-colors" />
                    <div className="absolute inset-0 flex items-end p-3">
                      <span className="text-xs tracking-[0.15em] uppercase text-background">
                        {category.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
