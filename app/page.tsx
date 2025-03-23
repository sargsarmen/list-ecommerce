"use client"

import { ProductGrid } from "@/components/product-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <ProductGrid />
      </div>
    </div>
  )
}

