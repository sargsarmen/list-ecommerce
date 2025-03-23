"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { useListings } from "@/context/listings-context"
import type { Listing } from "@/context/listings-context"

export function ProductGrid() {
  const { listings } = useListings()
  const [displayedListings, setDisplayedListings] = useState<Listing[]>([])

  // Set all listings to be displayed
  useEffect(() => {
    setDisplayedListings(listings)
  }, [listings])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      {displayedListings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedListings.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

