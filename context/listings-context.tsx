"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Listing {
  id: string
  title: string
  price: number
  image: string
  seller: string
  rating: number
  category: string
  condition?: string
  description: string
  quantity?: number
  shippingOption?: string
  date: string
  views: number
  likes: number
}

interface ListingsContextType {
  listings: Listing[]
  addListing: (listing: Omit<Listing, "id" | "seller" | "rating" | "date" | "views" | "likes" | "image">) => string
  updateListingStock: (listingId: string, quantityPurchased: number) => boolean
  searchListings: (
    query: string,
    filters: {
      categories: string[]
      priceRange: [number, number]
    },
  ) => Listing[]
  sortListings: (listings: Listing[], sortOption: string) => Listing[]
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined)

// Generate random stock for physical products
const generateRandomStock = (category: string): number | undefined => {
  if (category === "services") return undefined
  return Math.floor(Math.random() * 20) + 1 // Random stock between 1-20
}

// Initial sample listings data with random stock
const initialListings: Listing[] = [
  {
    id: "1",
    title: "MacBook Pro 16-inch",
    price: 2399,
    image: "/placeholder.svg?height=300&width=300",
    seller: "TechStore",
    rating: 4.9,
    category: "electronics",
    condition: "new",
    description: "The most powerful MacBook Pro ever is here. With the blazing-fast M2 Pro chip.",
    quantity: generateRandomStock("electronics"),
    date: "2023-12-01",
    views: 245,
    likes: 18,
  },
  {
    id: "2",
    title: "Leather Jacket",
    price: 199,
    image: "/placeholder.svg?height=300&width=300",
    seller: "FashionHub",
    rating: 4.7,
    category: "clothing",
    condition: "like-new",
    description: "Premium leather jacket, perfect for fall and winter.",
    quantity: generateRandomStock("clothing"),
    date: "2023-11-15",
    views: 187,
    likes: 12,
  },
  {
    id: "3",
    title: "Smart Home Speaker",
    price: 129,
    image: "/placeholder.svg?height=300&width=300",
    seller: "HomeGadgets",
    rating: 4.5,
    category: "electronics",
    condition: "new",
    description: "Voice-controlled smart speaker with premium sound quality.",
    quantity: generateRandomStock("electronics"),
    date: "2023-10-20",
    views: 132,
    likes: 8,
  },
  {
    id: "4",
    title: "Vintage Coffee Table",
    price: 349,
    image: "/placeholder.svg?height=300&width=300",
    seller: "AntiqueFurniture",
    rating: 4.8,
    category: "home-garden",
    condition: "good",
    description: "Beautiful vintage coffee table with solid wood construction.",
    quantity: generateRandomStock("home-garden"),
    date: "2023-09-05",
    views: 98,
    likes: 15,
  },
  {
    id: "5",
    title: "Wireless Headphones",
    price: 199,
    image: "/placeholder.svg?height=300&width=300",
    seller: "AudioWorld",
    rating: 4.6,
    category: "electronics",
    condition: "new",
    description: "Noise-cancelling wireless headphones with 30-hour battery life.",
    quantity: generateRandomStock("electronics"),
    date: "2023-08-12",
    views: 156,
    likes: 22,
  },
  {
    id: "6",
    title: "Designer Sunglasses",
    price: 149,
    image: "/placeholder.svg?height=300&width=300",
    seller: "FashionHub",
    rating: 4.4,
    category: "clothing",
    condition: "new",
    description: "Stylish designer sunglasses with UV protection.",
    quantity: generateRandomStock("clothing"),
    date: "2023-07-28",
    views: 112,
    likes: 9,
  },
  {
    id: "7",
    title: "Smartphone 13 Pro",
    price: 999,
    image: "/placeholder.svg?height=300&width=300",
    seller: "TechStore",
    rating: 4.9,
    category: "phones",
    condition: "new",
    description: "Latest smartphone with advanced camera system and all-day battery life.",
    quantity: generateRandomStock("phones"),
    date: "2023-06-15",
    views: 278,
    likes: 31,
  },
  {
    id: "8",
    title: "Indoor Plant Collection",
    price: 89,
    image: "/placeholder.svg?height=300&width=300",
    seller: "GreenThumb",
    rating: 4.7,
    category: "home-garden",
    condition: "new",
    description: "Set of 5 easy-care indoor plants perfect for any home.",
    quantity: generateRandomStock("home-garden"),
    date: "2023-05-22",
    views: 143,
    likes: 17,
  },
  {
    id: "9",
    title: "Web Development Services",
    price: 500,
    image: "/placeholder.svg?height=300&width=300",
    seller: "CodeMasters",
    rating: 4.9,
    category: "services",
    description: "Professional web development services. Custom websites built with the latest technologies.",
    date: "2023-04-10",
    views: 189,
    likes: 14,
  },
  {
    id: "10",
    title: "Graphic Design Package",
    price: 299,
    image: "/placeholder.svg?height=300&width=300",
    seller: "DesignPro",
    rating: 4.8,
    category: "services",
    description: "Complete graphic design package including logo, business cards, and social media assets.",
    date: "2023-03-05",
    views: 167,
    likes: 21,
  },
]

export const ListingsProvider = ({ children }: { children: ReactNode }) => {
  const [listings, setListings] = useState<Listing[]>([])

  // Initialize listings from localStorage or use initial data
  useEffect(() => {
    const savedListings = localStorage.getItem("listings")
    if (savedListings) {
      setListings(JSON.parse(savedListings))
    } else {
      setListings(initialListings)
    }
  }, [])

  // Save listings to localStorage whenever they change
  useEffect(() => {
    if (listings.length > 0) {
      localStorage.setItem("listings", JSON.stringify(listings))
    }
  }, [listings])

  // Add a new listing
  const addListing = (listing: Omit<Listing, "id" | "seller" | "rating" | "date" | "views" | "likes" | "image">) => {
    const id = `${Date.now()}`
    const newListing: Listing = {
      ...listing,
      id, // Generate a unique ID
      seller: "Your Store", // Default seller name
      rating: 0, // New listings start with no rating
      date: new Date().toISOString().split("T")[0], // Current date
      views: 0,
      likes: 0,
      image: "/placeholder.svg?height=300&width=300", // Default image
    }

    setListings((prevListings) => [newListing, ...prevListings])
    return id // Return the ID so it can be used for navigation
  }

  // Update listing stock when items are purchased
  const updateListingStock = (listingId: string, quantityPurchased: number): boolean => {
    let success = false

    setListings((prevListings) =>
      prevListings.map((listing) => {
        if (listing.id === listingId) {
          // Skip stock update for services or if quantity is undefined
          if (listing.category === "services" || listing.quantity === undefined) {
            success = true
            return listing
          }

          // Check if enough stock is available
          if (listing.quantity >= quantityPurchased) {
            success = true
            return {
              ...listing,
              quantity: listing.quantity - quantityPurchased,
            }
          }

          // Not enough stock
          return listing
        }
        return listing
      }),
    )

    return success
  }

  // Search and filter listings
  const searchListings = (query: string, filters: { categories: string[]; priceRange: [number, number] }) => {
    return listings.filter((listing) => {
      // Search by title or description
      const matchesSearch =
        query === "" ||
        listing.title.toLowerCase().includes(query.toLowerCase()) ||
        listing.description.toLowerCase().includes(query.toLowerCase())

      // Filter by category
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(listing.category)

      // Filter by price range
      const matchesPrice = listing.price >= filters.priceRange[0] && listing.price <= filters.priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })
  }

  // Sort listings
  const sortListings = (listingsToSort: Listing[], sortOption: string) => {
    const sortedListings = [...listingsToSort]

    switch (sortOption) {
      case "price-low":
        return sortedListings.sort((a, b) => a.price - b.price)
      case "price-high":
        return sortedListings.sort((a, b) => b.price - a.price)
      case "newest":
        return sortedListings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      case "rating":
        return sortedListings.sort((a, b) => b.rating - a.rating)
      case "featured":
      default:
        // For featured, we'll use a combination of rating and date
        return sortedListings.sort((a, b) => {
          const scoreA = a.rating * 10 + new Date(a.date).getTime() / 1000000000
          const scoreB = b.rating * 10 + new Date(b.date).getTime() / 1000000000
          return scoreB - scoreA
        })
    }
  }

  return (
    <ListingsContext.Provider value={{ listings, addListing, updateListingStock, searchListings, sortListings }}>
      {children}
    </ListingsContext.Provider>
  )
}

export const useListings = () => {
  const context = useContext(ListingsContext)
  if (context === undefined) {
    throw new Error("useListings must be used within a ListingsProvider")
  }
  return context
}

