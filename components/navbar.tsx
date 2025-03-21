"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useTransactions } from "@/context/transactions-context"

export function Navbar() {
  const pathname = usePathname()
  const { transactions } = useTransactions()

  // Count pending transactions
  const pendingCount = transactions.filter(
    (t) => t.status === "pending" || t.status === "processing" || t.status === "shipped",
  ).length

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Sell", href: "/sell" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="mb-4">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-lg font-medium transition-colors ${
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    } hover:text-primary`}
                  >
                    {item.name}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link
                  href="/transactions"
                  className={`text-lg font-medium transition-colors ${
                    pathname === "/transactions" ? "text-primary" : "text-muted-foreground"
                  } hover:text-primary`}
                >
                  Transactions
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2 transition-opacity hover:opacity-80">
          <span className="hidden font-bold sm:inline-block">BuySell Marketplace</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative transition-colors hover:text-foreground ${
                pathname === item.href ? "text-foreground" : "text-muted-foreground"
              } after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center ml-auto space-x-1">
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

