"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface MobileCollectionsMenuProps {
  onLinkClick: () => void
  label?: string
}

export default function MobileCollectionsMenu({ onLinkClick, label = 'Collections' }: MobileCollectionsMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [collections, setCollections] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)

  const fetchCollections = async () => {
    if (hasFetched) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/collections')
      const data = await res.json()
      setCollections(data)
      setHasFetched(true)
    } catch (error) {
      console.error('Failed to fetch collections:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = () => {
    if (!isExpanded) {
      fetchCollections()
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

      {/* Expandable collections */}
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
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/products/${collection.id}`}
                onClick={onLinkClick}
                className="text-sm tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-colors"
              >
                {collection.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  )
}
