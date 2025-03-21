import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserDashboard } from "@/components/user-dashboard"
import { SellerDashboard } from "@/components/seller-dashboard"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      <Tabs defaultValue="buyer" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buyer">Buyer Dashboard</TabsTrigger>
          <TabsTrigger value="seller">Seller Dashboard</TabsTrigger>
        </TabsList>
        <TabsContent value="buyer">
          <UserDashboard />
        </TabsContent>
        <TabsContent value="seller">
          <SellerDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

