'use client'

import { Heart } from 'lucide-react'
import { useFavorites } from '@/hooks/use-favorites'

interface FavoriteButtonProps {
    productId: string
    className?: string
}

export default function FavoriteButton({ productId, className = "" }: FavoriteButtonProps) {
    const { favorites, toggleFavorite, loading } = useFavorites()

    if (loading) return null

    const isFavorite = favorites.includes(productId)

    return (
        <button
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleFavorite(productId)
            }}
            className={`transition-all duration-300 hover:scale-110 ${className}`}
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
            <Heart
                size={20}
                strokeWidth={1.5}
                className={isFavorite ? "fill-primary text-primary" : "text-foreground/40 hover:text-foreground"}
            />
        </button>
    )
}
