import { ProductCard } from "@/components/product-card"

interface RelatedProductsProps {
  category: string
  currentProductId: string
}

export function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  // This would normally come from a database, filtered by category and excluding current product
  const relatedProducts = [
    {
      id: "2",
      title: "Wireless Noise-Cancelling Headphones",
      price: 349,
      image: "/placeholder.svg?height=300&width=300",
      seller: "AudioWorld",
      rating: 4.7,
      category: "Electronics",
    },
    {
      id: "3",
      title: "Smartphone 13 Pro",
      price: 999,
      image: "/placeholder.svg?height=300&width=300",
      seller: "TechStore",
      rating: 4.8,
      category: "Electronics",
    },
    {
      id: "4",
      title: "Wireless Charging Pad",
      price: 59,
      image: "/placeholder.svg?height=300&width=300",
      seller: "GadgetZone",
      rating: 4.5,
      category: "Electronics",
    },
    {
      id: "5",
      title: "Smart Watch Series 7",
      price: 399,
      image: "/placeholder.svg?height=300&width=300",
      seller: "TechStore",
      rating: 4.6,
      category: "Electronics",
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

