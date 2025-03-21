"use client"

import type React from "react"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Update the SearchFiltersProps interface to remove onPriceRangeChange
interface SearchFiltersProps {
  onSearch: (query: string) => void
  onCategoryChange: (categories: string[]) => void
}

// Update the component to remove priceRange state and handlers
export function SearchFilters({ onSearch, onCategoryChange }: SearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = [
    { id: "electronics", label: "Electronics" },
    { id: "clothing", label: "Clothing" },
    { id: "home-garden", label: "Home & Garden" },
    { id: "vehicles", label: "Vehicles" },
    { id: "phones", label: "Phones" },
    { id: "food", label: "Food" },
    { id: "sports", label: "Sports" },
    { id: "books", label: "Books" },
    { id: "services", label: "Services" },
  ]

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  // Handle category checkbox changes
  const handleCategoryChange = (category: string, checked: boolean) => {
    let newCategories: string[]

    if (checked) {
      newCategories = [...selectedCategories, category]
    } else {
      newCategories = selectedCategories.filter((c) => c !== category)
    }

    setSelectedCategories(newCategories)
    onCategoryChange(newCategories)
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
    onSearch("")
  }

  return (
    <div className="bg-background border rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9" onClick={clearSearch}>
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["categories"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked === true)}
                  />
                  <Label htmlFor={category.id}>{category.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

