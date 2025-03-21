import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"

interface ProductReviewsProps {
  productId: string
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  // This would normally come from a database
  const reviews = [
    {
      id: "1",
      user: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "2023-12-15",
      title: "Excellent product, exceeded expectations",
      content:
        "I've been using this MacBook Pro for a month now and I'm extremely impressed. The performance is outstanding, especially for video editing and software development. Battery life is amazing too - I can work all day without needing to charge.",
      helpful: 24,
      verified: true,
    },
    {
      id: "2",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: "2023-12-10",
      title: "Great laptop, minor issues with ports",
      content:
        "Overall this is an excellent machine. The screen is gorgeous and performance is top-notch. My only complaint is that I wish it had more USB-C ports. I find myself using dongles more often than I'd like.",
      helpful: 12,
      verified: true,
    },
    {
      id: "3",
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "2023-11-28",
      title: "Best laptop I've ever owned",
      content:
        "The M2 chip is a game changer. Everything is lightning fast and the battery lasts forever. I'm a software developer and this machine handles everything I throw at it without breaking a sweat.",
      helpful: 18,
      verified: true,
    },
  ]

  const ratingDistribution = {
    5: 70,
    4: 20,
    3: 5,
    2: 3,
    1: 2,
  }

  const averageRating = 4.5

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>
        <Button>Write a Review</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="col-span-1">
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <div className="text-4xl font-bold mb-2">{averageRating}</div>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.floor(averageRating)
                      ? "fill-primary text-primary"
                      : star <= averageRating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4">Based on {reviews.length} reviews</p>

            <div className="w-full space-y-2">
              {Object.entries(ratingDistribution)
                .sort((a, b) => Number(b[0]) - Number(a[0]))
                .map(([rating, percentage]) => (
                  <div key={rating} className="flex items-center">
                    <div className="w-12 text-sm">{rating} stars</div>
                    <Progress value={percentage} className="h-2 flex-1 mx-2" />
                    <div className="w-8 text-sm text-right">{percentage}%</div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={review.user.avatar} alt={review.user.name} />
                      <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{review.user.name}</div>
                      <div className="text-xs text-muted-foreground">{review.date}</div>
                    </div>
                  </div>
                  {review.verified && (
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified Purchase</div>
                  )}
                </div>

                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                <h4 className="font-semibold mb-1">{review.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{review.content}</p>

                <div className="flex items-center text-sm">
                  <Button variant="ghost" size="sm">
                    Helpful ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm">
                    Report
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="outline">Load More Reviews</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

