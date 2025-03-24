import type React from "react"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { ListingsProvider } from "@/context/listings-context"
import { TransactionsProvider } from "@/context/transactions-context"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ListingsProvider>
          <TransactionsProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
          </TransactionsProvider>
        </ListingsProvider>
      </body>
    </html>
  )
}

