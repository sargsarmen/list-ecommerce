"use client"

import { useState } from "react"
import { ProductGrid } from "@/components/product-grid"
import { SearchFilters } from "@/components/search-filters"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <SearchFilters onSearch={setSearchQuery} onCategoryChange={setSelectedCategories} />
          </div>
          <div className="w-full md:w-3/4">
            <ProductGrid searchQuery={searchQuery} selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </div>
  )
}

