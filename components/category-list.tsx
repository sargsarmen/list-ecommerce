import Link from "next/link"
import { Laptop, Shirt, Home, Car, Smartphone, Utensils, Dumbbell, BookOpen } from "lucide-react"

const categories = [
  { name: "Electronics", icon: <Laptop className="h-6 w-6" />, href: "/category/electronics" },
  { name: "Clothing", icon: <Shirt className="h-6 w-6" />, href: "/category/clothing" },
  { name: "Home & Garden", icon: <Home className="h-6 w-6" />, href: "/category/home-garden" },
  { name: "Vehicles", icon: <Car className="h-6 w-6" />, href: "/category/vehicles" },
  { name: "Phones", icon: <Smartphone className="h-6 w-6" />, href: "/category/phones" },
  { name: "Food", icon: <Utensils className="h-6 w-6" />, href: "/category/food" },
  { name: "Sports", icon: <Dumbbell className="h-6 w-6" />, href: "/category/sports" },
  { name: "Books", icon: <BookOpen className="h-6 w-6" />, href: "/category/books" },
]

export function CategoryList() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors"
          >
            <div className="bg-muted rounded-full p-3 mb-2">{category.icon}</div>
            <span className="text-sm font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

