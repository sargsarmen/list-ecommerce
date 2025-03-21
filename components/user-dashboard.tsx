import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ShoppingBag, Heart, MessageCircle, CreditCard, Package, Clock, CheckCircle, AlertTriangle } from "lucide-react"

export function UserDashboard() {
  // Sample data - would come from API in real app
  const recentOrders = [
    {
      id: "ORD-123456",
      date: "2023-03-15",
      total: 249.99,
      status: "Delivered",
      items: 2,
    },
    {
      id: "ORD-123457",
      date: "2023-03-10",
      total: 129.99,
      status: "Shipped",
      items: 1,
    },
    {
      id: "ORD-123458",
      date: "2023-03-05",
      total: 59.99,
      status: "Processing",
      items: 1,
    },
  ]

  const savedItems = [
    {
      id: "1",
      title: "Wireless Headphones",
      price: 199.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      title: "Smart Watch",
      price: 299.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      title: "Bluetooth Speaker",
      price: 79.99,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Track and manage your recent purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.date} • {order.items} {order.items === 1 ? "item" : "items"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${order.total.toFixed(2)}</div>
                    <Badge
                      variant={
                        order.status === "Delivered" ? "default" : order.status === "Shipped" ? "outline" : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/orders">View All Orders</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saved Items</CardTitle>
            <CardDescription>Products you've saved for later</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savedItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="rounded-md mr-4"
                    />
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm">Add to Cart</Button>
                    <Button size="sm" variant="outline">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/wishlist">View Wishlist</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Orders</div>
                  <div className="text-2xl font-bold">12</div>
                </div>
              </div>

              <div className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Wishlist</div>
                  <div className="text-2xl font-bold">24</div>
                </div>
              </div>

              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Messages</div>
                  <div className="text-2xl font-bold">3</div>
                </div>
              </div>

              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Payment Methods</div>
                  <div className="text-2xl font-bold">2</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/account">Manage Account</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Processing</div>
                    <div className="text-sm text-muted-foreground">1</div>
                  </div>
                  <Progress value={25} className="h-2 mt-1" />
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Shipped</div>
                    <div className="text-sm text-muted-foreground">2</div>
                  </div>
                  <Progress value={50} className="h-2 mt-1" />
                </div>
              </div>

              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Delivered</div>
                    <div className="text-sm text-muted-foreground">9</div>
                  </div>
                  <Progress value={75} className="h-2 mt-1" />
                </div>
              </div>

              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">Returns</div>
                    <div className="text-sm text-muted-foreground">0</div>
                  </div>
                  <Progress value={0} className="h-2 mt-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

