"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useListings } from "@/context/listings-context"
import type { Listing } from "@/context/listings-context"

interface ProductGridProps {
  searchQuery?: string
  selectedCategories?: string[]
}

export function ProductGrid({ searchQuery = "", selectedCategories = [] }: ProductGridProps) {
  const { listings, searchListings, sortListings } = useListings()
  const [sortOption, setSortOption] = useState("featured")
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [displayedListings, setDisplayedListings] = useState<Listing[]>([])
  const [loadMore, setLoadMore] = useState(false)
  const itemsPerPage = 8

  // Apply filters and sorting
  useEffect(() => {
    // Apply search and filters
    const filtered = searchListings(searchQuery, {
      categories: selectedCategories,
      priceRange: [0, 5000], // Use a default price range since we removed the filter
    })

    // Apply sorting
    const sorted = sortListings(filtered, sortOption)

    setFilteredListings(sorted)

    // Reset pagination when filters change
    setLoadMore(false)
    setDisplayedListings(sorted.slice(0, itemsPerPage))
  }, [searchQuery, selectedCategories, sortOption, listings, searchListings, sortListings])

  // Handle load more
  const handleLoadMore = () => {
    setLoadMore(true)
    setDisplayedListings(filteredListings)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>
        <div className="flex items-center">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {displayedListings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
          <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedListings.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {!loadMore && filteredListings.length > itemsPerPage && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" onClick={handleLoadMore}>
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

