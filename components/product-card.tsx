import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Listing } from "@/context/listings-context"

interface ProductCardProps {
  product: Listing
}

export function ProductCard({ product }: ProductCardProps) {
  // Format the category for display (convert kebab-case to Title Case)
  const formatCategory = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:translate-y-[-2px]">
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              width={300}
              height={300}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
          </div>
        </Link>
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline">{formatCategory(product.category)}</Badge>
          <div className="flex items-center">
            <Star
              className={`h-4 w-4 ${product.rating > 0 ? "fill-primary text-primary" : "text-muted-foreground"} mr-1`}
            />
            <span className="text-sm">{product.rating > 0 ? product.rating.toFixed(1) : "New"}</span>
          </div>
        </div>
        <Link href={`/products/${product.id}`} className="group">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 transition-colors duration-200 group-hover:text-primary">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">Sold by {product.seller}</p>
        <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
      </CardContent>
    </Card>
  )
}

