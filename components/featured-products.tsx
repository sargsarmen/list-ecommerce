import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

const featuredProducts = [
  {
    id: "1",
    title: "MacBook Pro 16-inch",
    price: 2399,
    image: "/placeholder.svg?height=300&width=300",
    seller: "TechStore",
    rating: 4.9,
    category: "Electronics",
  },
  {
    id: "2",
    title: "Leather Jacket",
    price: 199,
    image: "/placeholder.svg?height=300&width=300",
    seller: "FashionHub",
    rating: 4.7,
    category: "Clothing",
  },
  {
    id: "3",
    title: "Smart Home Speaker",
    price: 129,
    image: "/placeholder.svg?height=300&width=300",
    seller: "HomeGadgets",
    rating: 4.5,
    category: "Electronics",
  },
  {
    id: "4",
    title: "Vintage Coffee Table",
    price: 349,
    image: "/placeholder.svg?height=300&width=300",
    seller: "AntiqueFurniture",
    rating: 4.8,
    category: "Home & Garden",
  },
]

export function FeaturedProducts() {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <Button variant="outline" asChild>
          <Link href="/products">View All</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

