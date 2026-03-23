'use client'

import { useFavorites } from '@/hooks/use-favorites'
import { useProducts } from '@/hooks/use-products'
import Link from 'next/link'
import Image from 'next/image'
import FavoriteButton from '@/components/favorite-button'
import { useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

export default function FavoritesList() {
    const { favorites, loading: favoritesLoading, refetch } = useFavorites()
    const { products, loading: productsLoading } = useProducts()

    const loading = favoritesLoading || productsLoading

    useEffect(() => {
        refetch()
    }, [refetch])

    if (loading) return <div className="py-8 text-center text-sm opacity-50 font-sans">Chargement...</div>

    const favoriteProducts = products.filter(p => favorites.includes(p.id))

    if (favoriteProducts.length === 0) {
        return (
            <div className="py-8">
                <p className="text-sm text-muted-foreground mb-4">
                    Vous n'avez pas encore de favoris.
                </p>
                <Link
                    href="/products"
                    className="inline-block text-xs tracking-[0.15em] uppercase text-foreground underline underline-offset-4 hover:opacity-70"
                >
                    Explorer les produits
                </Link>
            </div>
        )
    }

    return (
        <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            className="w-full"
        >
            <CarouselContent className="-ml-4">
                {favoriteProducts.map((product) => (
                    <CarouselItem key={product.id} className="pl-4 basis-1/2 md:basis-1/3">
                        <div className="group relative">
                            <Link href={`/products/${product.category}/${product.slug}`} className="block">
                                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="mt-2 font-serif text-sm">{product.name}</h3>
                            </Link>
                            <div className="absolute top-2 right-2">
                                <FavoriteButton productId={product.id} />
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
