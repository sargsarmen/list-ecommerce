"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useTransactions } from "@/context/transactions-context"
import { useState, useEffect } from "react"

export function Navbar() {
  const pathname = usePathname()
  const { transactions } = useTransactions()
  const [isScrolled, setIsScrolled] = useState(false)

  // Count pending transactions
  const pendingCount = transactions.filter(
    (t) => t.status === "pending" || t.status === "processing" || t.status === "shipped",
  ).length

  const navItems = [
    { name: "Products", href: "/" },
    { name: "Sell", href: "/sell" },
  ]

  // Add scroll event listener to change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background"
        } border-b`}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center text-lg font-medium transition-colors ${pathname === item.href ? "text-primary" : "text-muted-foreground"
                        } hover:text-primary`}
                    >
                      {item.name === "Products" && <ShoppingBag className="mr-2 h-5 w-5" />}
                      {item.name === "Sell" && <Package className="mr-2 h-5 w-5" />}
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
            <ShoppingBag className="h-6 w-6 hidden sm:inline-block" />
            <span className="font-bold text-lg sm:text-xl">BuySell</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative transition-colors hover:text-foreground ${pathname === item.href ? "text-foreground" : "text-muted-foreground"
                } after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative hover:bg-primary/10" asChild>
            <Link href="/transactions">
              <Package className="h-5 w-5" />
              {pendingCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  {pendingCount}
                </Badge>
              )}
              <span className="sr-only">Transactions</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

