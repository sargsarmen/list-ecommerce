import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, MessageCircle, Store } from "lucide-react"

interface Seller {
  id: string
  name: string
  rating: number
  reviews: number
  location: string
  joinedDate: string
  verified: boolean
}

interface SellerInfoProps {
  seller: Seller
}

export function SellerInfo({ seller }: SellerInfoProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3">
        <div className="flex flex-col items-center p-6 border rounded-lg">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt={seller.name} />
            <AvatarFallback className="text-2xl">{seller.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <h3 className="text-xl font-semibold mb-1">{seller.name}</h3>

          {seller.verified && <Badge className="mb-2">Verified Seller</Badge>}

          <div className="flex items-center mb-4">
            <Star className="h-4 w-4 fill-primary text-primary mr-1" />
            <span className="font-medium">{seller.rating}</span>
            <span className="text-muted-foreground ml-1">({seller.reviews} reviews)</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{seller.location}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Member since {seller.joinedDate}</span>
          </div>

          <div className="w-full space-y-2">
            <Button className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Seller
            </Button>
            <Button variant="outline" className="w-full">
              <Store className="mr-2 h-4 w-4" />
              View Store
            </Button>
          </div>
        </div>
      </div>

      <div className="md:w-2/3">
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">About the Seller</h3>

          <p className="text-muted-foreground mb-6">
            TechStore is a premier retailer of high-quality electronics and tech accessories. We specialize in offering
            the latest Apple products, gaming gear, and smart home devices. With over 5 years in the business, we pride
            ourselves on excellent customer service and competitive pricing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Response Rate</h4>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-sm text-muted-foreground">Usually responds within 2 hours</p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Shipping</h4>
              <div className="text-2xl font-bold">Fast</div>
              <p className="text-sm text-muted-foreground">Ships within 1 business day</p>
            </div>
          </div>

          <h4 className="font-semibold mb-3">Seller Policies</h4>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-6">
            <li>30-day returns accepted</li>
            <li>Buyer pays return shipping</li>
            <li>Warranty included on all new items</li>
            <li>Secure payment processing</li>
          </ul>

          <Button variant="outline">See All Items from This Seller</Button>
        </div>
      </div>
    </div>
  )
}

