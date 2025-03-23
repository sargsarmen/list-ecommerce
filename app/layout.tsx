import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { ListingsProvider } from "@/context/listings-context"
import { TransactionsProvider } from "@/context/transactions-context"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ListingsProvider>
          <TransactionsProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </TransactionsProvider>
        </ListingsProvider>
      </body>
    </html>
  )
}

