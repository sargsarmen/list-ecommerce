"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ShoppingCart, Star, Minus, Plus, AlertCircle } from "lucide-react"
import { useListings, type Listing } from "@/context/listings-context"
import { useTransactions } from "@/context/transactions-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ProductPage({ params }: { params: { id: string } }) {
  // Access the id directly from params
  const productId = params.id

  const { listings } = useListings()
  const { addTransaction } = useTransactions()
  const [product, setProduct] = useState<Listing | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  // Format the category for display (convert kebab-case to Title Case)
  const formatCategory = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  useEffect(() => {
    // Find the product with the matching ID
    const foundProduct = listings.find((item) => item.id === productId)

    if (foundProduct) {
      setProduct(foundProduct)
    }

    setIsLoading(false)
  }, [listings, productId])

  // Handle product not found
  if (!isLoading && !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/")}>Return to Home</Button>
      </div>
    )
  }

  // Show loading state
  if (isLoading || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading product...</p>
      </div>
    )
  }

  // Check if the product is a service
  const isService = product.category === "services"

  // Check if product is out of stock
  const isOutOfStock = !isService && product.quantity !== undefined && product.quantity <= 0

  // Determine max quantity based on product availability
  const maxQuantity = isService ? 1 : product.quantity || 0

  // Handle quantity change
  const incrementQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // Handle buy now
  const handleBuyNow = () => {
    const success = addTransaction(product.id, quantity)

    if (success) {
      toast("Purchase Successful", {
        description: `You've purchased ${isService ? "the" : quantity} ${isService ? "service" : quantity > 1 ? "units" : "unit"} of ${product.title}`,
      })

      router.push("/") // Redirect to home page instead of transactions
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Product Image */}
        <div className="border rounded-lg overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={600}
            height={600}
            className="w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <Badge variant="outline" className="mb-2">
            {formatCategory(product.category)}
          </Badge>

          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Star
                className={`h-4 w-4 ${product.rating > 0 ? "fill-primary text-primary" : "text-muted-foreground"} mr-1`}
              />
              <span className="font-medium">{product.rating > 0 ? product.rating.toFixed(1) : "New"}</span>
              {product.rating > 0 && <span className="text-muted-foreground ml-1">rating</span>}
            </div>

            {product.condition && !isService && (
              <div className="text-muted-foreground ml-4">
                Condition: <span className="text-foreground">{product.condition}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {isService && <span className="text-muted-foreground ml-2">per service</span>}
          </div>

          <div className="mb-6">
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {!isService && (
            <>
              {isOutOfStock ? (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Out of Stock</AlertTitle>
                  <AlertDescription>This item is currently out of stock. Please check back later.</AlertDescription>
                </Alert>
              ) : (
                <p className={`mb-6 ${product.quantity && product.quantity < 5 ? "text-amber-600" : "text-green-600"}`}>
                  {product.quantity && product.quantity < 5
                    ? `Low Stock! Only ${product.quantity} left`
                    : `In Stock (${product.quantity} available)`}
                </p>
              )}
            </>
          )}

          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Sold by {product.seller}</p>
          </div>

          <div className="flex flex-col space-y-4">
            {!isService && !isOutOfStock && (
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity:
                </label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-8 w-8"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= maxQuantity}
                    className="h-8 w-8"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}

            <Button className="w-full" size="lg" onClick={handleBuyNow} disabled={isOutOfStock}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {isOutOfStock ? "Out of Stock" : "Buy Now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

