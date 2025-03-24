"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTransactions, type TransactionStatus } from "@/context/transactions-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"
import { AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function TransactionsPage() {
  const { transactions, updateTransactionStatus, undoStatusUpdate } = useTransactions()
  const [transactionToCancel, setTransactionToCancel] = useState<string | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

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

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Handle opening the cancel confirmation dialog
  const handleOpenCancelDialog = (transactionId: string) => {
    setTransactionToCancel(transactionId)
    setIsConfirmOpen(true)
  }

  // Handle confirming the cancellation
  const handleConfirmCancel = () => {
    if (transactionToCancel) {
      const previousStatus = updateTransactionStatus(transactionToCancel, "cancelled")
      const transactionId = transactionToCancel // Store in local variable for closure

      // Use the same toast style as the buy operation (no variant specified)
      toast("Order Cancelled", {
        description: "The order has been cancelled successfully.",
        action: {
          label: "Undo",
          onClick: () => {
            undoStatusUpdate(transactionId)
            toast("Cancellation Undone", {
              description: "Order status has been reverted.",
            })
          },
        },
      })
    }

    // Close the dialog and reset the transaction to cancel
    setIsConfirmOpen(false)
    setTransactionToCancel(null)
  }

  // Handle status update with undo functionality
  const handleStatusUpdate = (transactionId: string, newStatus: TransactionStatus) => {
    const previousStatus = updateTransactionStatus(transactionId, newStatus)

    // Format the status for display
    const formattedStatus = newStatus.charAt(0).toUpperCase() + newStatus.slice(1)

    // Use the same toast style as the buy operation (no variant specified)
    toast("Status Updated", {
      description: `Transaction status has been updated to ${formattedStatus}`,
      action: {
        label: "Undo",
        onClick: () => {
          undoStatusUpdate(transactionId)
          toast("Status Reverted", {
            description: "Transaction status has been reverted.",
          })
        },
      },
    })
  }

  return (
    <>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">My Transactions</h1>

        {sortedTransactions.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">No transactions found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {sortedTransactions.map((transaction) => (
              <Card
                key={transaction.id}
                className="overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/50 hover:translate-y-[-2px] cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="grid max-sm:grid-rows-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    <div className="sm:col-span-1 relative  p-3 sm:p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-border">
                      <Image
                        src={transaction.productImage || "/placeholder.svg"}
                        alt={transaction.productTitle}
                        fill
                        className="object-cover rounded-md transition-transform hover:scale-105"
                      />
                    </div>
                    {/* Content container */}
                    <div className="sm:col-span-1 md:col-span-3 p-3 sm:p-4 flex flex-col justify-between">
                      <div>
                        {/* Title and status - better aligned on mobile */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-2">
                          <Link href={`/products/${transaction.productId}`} className="hover:underline">
                            <h3 className="font-semibold text-base sm:text-lg transition-colors hover:text-primary line-clamp-2">
                              {transaction.productTitle}
                            </h3>
                          </Link>
                          <Badge className={`${getStatusColor(transaction.status)} self-start sm:self-auto`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                        </div>

                        {/* Transaction details - more compact on mobile */}
                        <div className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 space-y-1">
                          <p>Order ID: {transaction.id}</p>
                          <p>Seller: {transaction.seller}</p>
                          <p>
                            Date: {transaction.date} (
                            {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })})
                          </p>
                        </div>

                        {/* Price information */}
                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                          <div>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              ${transaction.price.toFixed(2)} x {transaction.quantity}
                            </p>
                            <p className="font-bold text-sm sm:text-base">Total: ${transaction.total.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons - better layout on mobile */}
                      <div className="flex flex-wrap gap-2">
                        {transaction.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(transaction.id, "processing")}
                              className="transition-colors hover:bg-primary/10 text-xs sm:text-sm h-8 px-2 sm:px-3"
                            >
                              Process Order
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors text-xs sm:text-sm h-8 px-2 sm:px-3"
                              onClick={() => handleOpenCancelDialog(transaction.id)}
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
                            className="transition-colors hover:bg-primary/10 text-xs sm:text-sm h-8 px-2 sm:px-3"
                          >
                            Mark as Shipped
                          </Button>
                        )}

                        {transaction.status === "shipped" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(transaction.id, "delivered")}
                            className="transition-colors hover:bg-primary/10 text-xs sm:text-sm h-8 px-2 sm:px-3"
                          >
                            Mark as Delivered
                          </Button>
                        )}

                        {transaction.status === "delivered" && (
                          <Button size="sm" variant="outline" disabled className="text-xs sm:text-sm h-8 px-2 sm:px-3">
                            Completed
                          </Button>
                        )}

                        {transaction.status === "cancelled" && (
                          <Button size="sm" variant="outline" disabled className="text-xs sm:text-sm h-8 px-2 sm:px-3">
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
      </div>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="sm:max-w-[425px] max-w-[90vw] rounded-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Cancellation
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this order? This action can be undone, but may affect the seller.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)} className="sm:order-1 order-2">
              No, Keep Order
            </Button>
            <Button variant="destructive" onClick={handleConfirmCancel} className="sm:order-2 order-1">
              Yes, Cancel Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}