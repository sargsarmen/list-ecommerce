import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Package,
  DollarSign,
  TrendingUp,
  Users,
  BarChart,
  ShoppingCart,
  Eye,
  MessageSquare,
  Heart,
  Settings,
} from "lucide-react"

export function SellerDashboard() {
  // Sample data - would come from API in real app
  const activeListings = [
    {
      id: "1",
      title: "MacBook Pro 16-inch",
      price: 2399,
      image: "/placeholder.svg?height=80&width=80",
      views: 245,
      likes: 18,
      status: "Active",
    },
    {
      id: "2",
      title: "Wireless Headphones",
      price: 199,
      image: "/placeholder.svg?height=80&width=80",
      views: 187,
      likes: 12,
      status: "Active",
    },
    {
      id: "3",
      title: "Smart Watch",
      price: 299,
      image: "/placeholder.svg?height=80&width=80",
      views: 132,
      likes: 8,
      status: "Active",
    },
  ]

  const recentSales = [
    {
      id: "S-123456",
      date: "2023-03-15",
      product: "MacBook Pro 16-inch",
      buyer: "John Smith",
      amount: 2399,
      status: "Completed",
    },
    {
      id: "S-123457",
      date: "2023-03-10",
      product: "Wireless Headphones",
      buyer: "Sarah Johnson",
      amount: 199,
      status: "Shipped",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                  <h3 className="text-2xl font-bold">$4,289.00</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500 font-medium">+12.5%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Package className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500 font-medium">+3</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Orders</p>
                  <h3 className="text-2xl font-bold">28</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500 font-medium">+8</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customers</p>
                  <h3 className="text-2xl font-bold">19</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500 font-medium">+5</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Listings</CardTitle>
            <CardDescription>Manage your current product listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeListings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center">
                    <Image
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      width={80}
                      height={80}
                      className="rounded-md mr-4"
                    />
                    <div>
                      <div className="font-medium">{listing.title}</div>
                      <div className="text-sm text-muted-foreground">${listing.price.toFixed(2)}</div>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <div className="flex items-center mr-3">
                          <Eye className="h-3 w-3 mr-1" />
                          {listing.views} views
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {listing.likes} likes
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge>{listing.status}</Badge>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <Link href="/listings">View All Listings</Link>
            </Button>
            <Button>
              <Link href="/sell">Create New Listing</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Track your recent transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">{sale.product}</div>
                    <div className="text-sm text-muted-foreground">
                      {sale.date} • Buyer: {sale.buyer}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${sale.amount.toFixed(2)}</div>
                    <Badge
                      variant={
                        sale.status === "Completed" ? "default" : sale.status === "Shipped" ? "outline" : "secondary"
                      }
                    >
                      {sale.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/sales">View All Sales</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">Conversion Rate</div>
                  <div className="text-sm font-medium">8.5%</div>
                </div>
                <Progress value={8.5} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">Response Rate</div>
                  <div className="text-sm font-medium">92%</div>
                </div>
                <Progress value={92} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">Seller Rating</div>
                  <div className="text-sm font-medium">4.8/5</div>
                </div>
                <Progress value={96} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">On-time Shipping</div>
                  <div className="text-sm font-medium">98%</div>
                </div>
                <Progress value={98} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Recent buyer inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">John Smith</div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Is this MacBook still available? Does it come with the original charger?
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Reply
                </Button>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">Sarah Johnson</div>
                  <div className="text-xs text-muted-foreground">Yesterday</div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Would you accept $180 for the wireless headphones?</p>
                <Button size="sm" variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Reply
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/messages">View All Messages</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" asChild>
              <Link href="/sell">
                <Package className="mr-2 h-4 w-4" />
                Create New Listing
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/analytics">
                <BarChart className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/promotions">
                <DollarSign className="mr-2 h-4 w-4" />
                Create Promotion
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Store Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

