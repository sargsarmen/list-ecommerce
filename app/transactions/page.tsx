"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTransactions, type TransactionStatus } from "@/context/transactions-context"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { formatDistanceToNow } from "date-fns"
import { Undo2 } from "lucide-react"

export default function TransactionsPage() {
  const { transactions, updateTransactionStatus, undoStatusUpdate } = useTransactions()
  const [activeTab, setActiveTab] = useState<string>("all")
  const { toast } = useToast()

  // Get status badge color
  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Filter transactions based on active tab
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === "all") return true
    return transaction.status === activeTab
  })

  // Sort transactions by date (newest first)
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  // Handle status update with undo functionality
  const handleStatusUpdate = (transactionId: string, newStatus: TransactionStatus) => {
    const previousStatus = updateTransactionStatus(transactionId, newStatus)

    if (previousStatus) {
      toast({
        title: "Status Updated",
        description: `Transaction status has been updated to ${newStatus}`,
        action: (
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => {
              undoStatusUpdate(transactionId)
              toast({
                title: "Status Reverted",
                description: `Transaction status has been reverted to ${previousStatus}`,
              })
            }}
          >
            <Undo2 className="h-3.5 w-3.5" />
            Undo
          </Button>
        ),
      })
    }
  }

  // Count transactions by status
  const getStatusCount = (status: string) => {
    if (status === "all") return transactions.length
    return transactions.filter((t) => t.status === status).length
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Transactions</h1>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-6 mb-4">
          <TabsTrigger value="all">All ({getStatusCount("all")})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({getStatusCount("pending")})</TabsTrigger>
          <TabsTrigger value="processing">Processing ({getStatusCount("processing")})</TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({getStatusCount("shipped")})</TabsTrigger>
          <TabsTrigger value="delivered">Delivered ({getStatusCount("delivered")})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({getStatusCount("cancelled")})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {sortedTransactions.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No transactions found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {sortedTransactions.map((transaction) => (
                <Card key={transaction.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/4 p-4 flex items-center justify-center">
                        <div className="relative h-32 w-32">
                          <Image
                            src={transaction.productImage || "/placeholder.svg"}
                            alt={transaction.productTitle}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      </div>

                      <div className="w-full md:w-3/4 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <Link href={`/products/${transaction.productId}`} className="hover:underline">
                              <h3 className="font-semibold text-lg">{transaction.productTitle}</h3>
                            </Link>
                            <Badge className={getStatusColor(transaction.status)}>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                          </div>

                          <div className="text-sm text-muted-foreground mb-4">
                            <p>Order ID: {transaction.id}</p>
                            <p>Seller: {transaction.seller}</p>
                            <p>
                              Date: {transaction.date} (
                              {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })})
                            </p>
                          </div>

                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                ${transaction.price.toFixed(2)} x {transaction.quantity}
                              </p>
                              <p className="font-bold">Total: ${transaction.total.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {transaction.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(transaction.id, "processing")}
                              >
                                Process Order
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleStatusUpdate(transaction.id, "cancelled")}
                              >
                                Cancel
                              </Button>
                            </>
                          )}

                          {transaction.status === "processing" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(transaction.id, "shipped")}
                            >
                              Mark as Shipped
                            </Button>
                          )}

                          {transaction.status === "shipped" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(transaction.id, "delivered")}
                            >
                              Mark as Delivered
                            </Button>
                          )}

                          {transaction.status === "delivered" && (
                            <Button size="sm" variant="outline" disabled>
                              Completed
                            </Button>
                          )}

                          {transaction.status === "cancelled" && (
                            <Button size="sm" variant="outline" disabled>
                              Cancelled
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

