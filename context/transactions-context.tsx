"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useListings } from "@/context/listings-context"
import { toast } from "sonner"

export type TransactionStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

export interface Transaction {
  id: string
  productId: string
  productTitle: string
  productImage: string
  price: number
  quantity: number
  total: number
  seller: string
  buyer: string
  status: TransactionStatus
  date: string
  previousStatus?: TransactionStatus // Track previous status for undo
}

interface TransactionsContextType {
  transactions: Transaction[]
  addTransaction: (productId: string, quantity: number) => boolean
  updateTransactionStatus: (transactionId: string, status: TransactionStatus) => TransactionStatus | undefined
  undoStatusUpdate: (transactionId: string) => void
  getTransactionsByStatus: (status: TransactionStatus) => Transaction[]
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined)

// Sample initial transactions with different states
const initialTransactions: Transaction[] = [
  {
    id: "t1",
    productId: "1",
    productTitle: "MacBook Pro 16-inch",
    productImage: "/placeholder.svg?height=300&width=300",
    price: 2399,
    quantity: 1,
    total: 2399,
    seller: "TechStore",
    buyer: "You",
    status: "delivered",
    date: "2023-12-15",
  },
  {
    id: "t2",
    productId: "5",
    productTitle: "Wireless Headphones",
    productImage: "/placeholder.svg?height=300&width=300",
    price: 199,
    quantity: 1,
    total: 199,
    seller: "AudioWorld",
    buyer: "You",
    status: "shipped",
    date: "2024-01-10",
  },
  {
    id: "t3",
    productId: "2",
    productTitle: "Leather Jacket",
    productImage: "/placeholder.svg?height=300&width=300",
    price: 199,
    quantity: 1,
    total: 199,
    seller: "FashionHub",
    buyer: "You",
    status: "pending",
    date: "2024-02-01",
  },
  {
    id: "t4",
    productId: "3",
    productTitle: "Smart Home Speaker",
    productImage: "/placeholder.svg?height=300&width=300",
    price: 129,
    quantity: 2,
    total: 258,
    seller: "HomeGadgets",
    buyer: "You",
    status: "processing",
    date: "2024-01-25",
  },
  {
    id: "t5",
    productId: "4",
    productTitle: "Vintage Coffee Table",
    productImage: "/placeholder.svg?height=300&width=300",
    price: 349,
    quantity: 1,
    total: 349,
    seller: "AntiqueFurniture",
    buyer: "You",
    status: "cancelled",
    date: "2023-11-05",
  },
  {
    id: "t6",
    productId: "7",
    productTitle: "Smartphone 13 Pro",
    productImage: "/placeholder.svg?height=300&width=300",
    price: 999,
    quantity: 1,
    total: 999,
    seller: "TechStore",
    buyer: "You",
    status: "delivered",
    date: "2023-10-20",
  },
  {
    id: "t7",
    productId: "8",
    productTitle: "Indoor Plant Collection",
    productImage: "/placeholder.svg?height=300&width=300",
    price: 89,
    quantity: 3,
    total: 267,
    seller: "GreenThumb",
    buyer: "You",
    status: "shipped",
    date: "2024-01-15",
  },
  {
    id: "t8",
    productId: "9",
    productTitle: "Web Development Services",
    productImage: "/placeholder.svg?height=300&width=300",
    price: 500,
    quantity: 1,
    total: 500,
    seller: "CodeMasters",
    buyer: "You",
    status: "processing",
    date: "2024-01-28",
  },
  {
    id: "t9",
    productId: "6",
    productTitle: "Designer Sunglasses",
    productImage: "/placeholder.svg?height=300&width=300",
    price: 149,
    quantity: 1,
    total: 149,
    seller: "FashionHub",
    buyer: "You",
    status: "pending",
    date: "2024-02-02",
  },
  {
    id: "t10",
    productId: "10",
    productTitle: "Graphic Design Package",
    productImage: "/placeholder.svg?height=300&width=300",
    price: 299,
    quantity: 1,
    total: 299,
    seller: "DesignPro",
    buyer: "You",
    status: "cancelled",
    date: "2023-12-10",
  },
]

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const { listings, updateListingStock } = useListings()

  // Initialize transactions from localStorage or use initial data
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions")
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    } else {
      setTransactions(initialTransactions)
    }
  }, [])

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions))
    }
  }, [transactions])

  // Add a new transaction and update stock
  const addTransaction = (productId: string, quantity: number): boolean => {
    const product = listings.find((item) => item.id === productId)

    if (!product) {
      console.error("Product not found")
      return false
    }

    // Update stock first
    const stockUpdateSuccess = updateListingStock(productId, quantity)

    if (!stockUpdateSuccess && product.category !== "services" && product.quantity !== undefined) {
      // Use the same toast style for errors (no variant)
      toast("Insufficient Stock", {
        description: `Sorry, there are only ${product.quantity} units available.`,
      })
      return false
    }

    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      productId,
      productTitle: product.title,
      productImage: product.image,
      price: product.price,
      quantity,
      total: product.price * quantity,
      seller: product.seller,
      buyer: "You",
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    }

    setTransactions((prev) => [newTransaction, ...prev])
    return true
  }

  // Update transaction status and return the previous status
  const updateTransactionStatus = (transactionId: string, status: TransactionStatus): TransactionStatus | undefined => {
    let previousStatus: TransactionStatus | undefined

    setTransactions((prev) =>
      prev.map((transaction) => {
        if (transaction.id === transactionId) {
          previousStatus = transaction.status
          return {
            ...transaction,
            status,
            previousStatus: transaction.status, // Store previous status for undo
          }
        }
        return transaction
      }),
    )

    return previousStatus
  }

  // Undo status update
  const undoStatusUpdate = (transactionId: string) => {
    setTransactions((prev) =>
      prev.map((transaction) => {
        if (transaction.id === transactionId && transaction.previousStatus) {
          return {
            ...transaction,
            status: transaction.previousStatus,
            previousStatus: undefined, // Clear previous status after undo
          }
        }
        return transaction
      }),
    )
  }

  // Get transactions by status
  const getTransactionsByStatus = (status: TransactionStatus) => {
    return transactions.filter((transaction) => transaction.status === status)
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransactionStatus,
        undoStatusUpdate,
        getTransactionsByStatus,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext)
  if (context === undefined) {
    throw new Error("useTransactions must be used within a TransactionsProvider")
  }
  return context
}

