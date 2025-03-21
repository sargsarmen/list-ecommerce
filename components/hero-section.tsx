import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Buy & Sell Marketplace</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          The easiest way to buy and sell products or services online. Create listings, browse products, and manage
          transactions all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/sell">Start Selling</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

