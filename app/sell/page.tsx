"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { DollarSign, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useListings } from "@/context/listings-context"

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  condition: z.string().optional(),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  description: z
    .string()
    .min(20, {
      message: "Description must be at least 20 characters.",
    })
    .max(2000, {
      message: "Description must not exceed 2000 characters.",
    }),
  quantity: z.coerce
    .number()
    .int()
    .positive({
      message: "Quantity must be a positive integer.",
    })
    .optional(),
  shippingOption: z.string().optional(),
})

export default function SellPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedData, setSubmittedData] = useState<(z.infer<typeof formSchema> & { id?: string }) | null>(null)
  const router = useRouter()
  const { addListing } = useListings()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      quantity: 1,
      shippingOption: "flat", // Set default shipping option to "flat"
    },
  })

  const watchCategory = form.watch("category")
  const isService = watchCategory === "services"

  // Reset condition, quantity, and shipping option when category changes to services
  useEffect(() => {
    if (isService) {
      form.setValue("condition", undefined)
      form.setValue("quantity", undefined)
      form.setValue("shippingOption", undefined)
    } else {
      if (!form.getValues("quantity")) {
        form.setValue("quantity", 1)
      }
      if (!form.getValues("shippingOption")) {
        form.setValue("shippingOption", "flat")
      }
    }
  }, [isService, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Add the new listing to the global state and get the new listing ID
    const newListingId = addListing({
      title: values.title,
      price: values.price,
      category: values.category,
      condition: values.condition,
      description: values.description,
      quantity: values.quantity,
      shippingOption: values.shippingOption,
    })

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setSubmittedData({
        ...values,
        id: newListingId, // Store the ID with the submitted data
      })
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  if (isSuccess && submittedData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">Listing Created Successfully!</CardTitle>
            <CardDescription className="text-center">
              Your {isService ? "service" : "product"} has been listed and is now visible to potential buyers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{submittedData.title}</h3>
                  <p className="text-muted-foreground">
                    ${typeof submittedData.price === "number" ? submittedData.price.toFixed(2) : "0.00"}
                  </p>
                </div>
                <Button variant="outline" onClick={() => router.push(`/products/${submittedData.id}`)}>
                  View Listing
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                form.reset()
                setIsSuccess(false)
                setSubmittedData(null)
              }}
            >
              Create Another Listing
            </Button>
            <Button onClick={() => router.push("/")}>Go to Home Page</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Updated custom styles for form validation
  // Ensuring labels don't change color on validation errors
  const customFormStyles = `
    .form-label-required::after {
      content: " *";
      color: #dc2626;
    }
    
    /* Override any styles that might change label color */
    .form-item-invalid .form-label,
    [data-invalid] .form-label,
    [data-invalid] + .form-label,
    .form-item-invalid label,
    [data-invalid] label,
    [data-invalid] + label {
      color: inherit !important;
    }
    
    /* Only change the border color of inputs */
    .form-item-invalid .form-input,
    .form-item-invalid input,
    .form-item-invalid textarea,
    .form-item-invalid select,
    .form-item-invalid .select-trigger,
    [data-invalid] {
      border-color: #dc2626 !important;
    }
  `

  return (
    <div className="container mx-auto px-4 py-8">
      <style jsx global>
        {customFormStyles}
      </style>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Create a New Listing</h1>
        <p className="text-muted-foreground mb-8">Fill out the details below to list your item for sale.</p>

        <Card>
          <CardHeader>
            <CardTitle>Create Listing</CardTitle>
            <CardDescription>
              Provide information about your {isService ? "service" : "product"} to help buyers find it.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                {/* Product Details Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field, fieldState }) => (
                        <FormItem className={fieldState.invalid ? "form-item-invalid" : ""}>
                          <FormLabel className="form-label-required">Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={
                                isService
                                  ? "e.g., Professional Web Design Services"
                                  : "e.g., Apple MacBook Pro 16-inch (2023)"
                              }
                              {...field}
                              className={`form-input ${fieldState.invalid ? "border-[#dc2626]" : ""}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field, fieldState }) => (
                          <FormItem className={fieldState.invalid ? "form-item-invalid" : ""}>
                            <FormLabel className="form-label-required">Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className={`form-input ${fieldState.invalid ? "border-[#dc2626]" : ""}`}>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="electronics">Electronics</SelectItem>
                                <SelectItem value="clothing">Clothing</SelectItem>
                                <SelectItem value="home-garden">Home & Garden</SelectItem>
                                <SelectItem value="vehicles">Vehicles</SelectItem>
                                <SelectItem value="phones">Phones</SelectItem>
                                <SelectItem value="food">Food</SelectItem>
                                <SelectItem value="sports">Sports</SelectItem>
                                <SelectItem value="books">Books</SelectItem>
                                <SelectItem value="services">Services</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="condition"
                        render={({ field, fieldState }) => (
                          <FormItem className={fieldState.invalid ? "form-item-invalid" : ""}>
                            <FormLabel>Condition</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isService}>
                              <FormControl>
                                <SelectTrigger className={`form-input ${fieldState.invalid ? "border-[#dc2626]" : ""}`}>
                                  <SelectValue
                                    placeholder={isService ? "Not applicable for services" : "Select condition"}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="like-new">Like New</SelectItem>
                                <SelectItem value="good">Good</SelectItem>
                                <SelectItem value="fair">Fair</SelectItem>
                                <SelectItem value="poor">Poor</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field, fieldState }) => (
                        <FormItem className={fieldState.invalid ? "form-item-invalid" : ""}>
                          <FormLabel className="form-label-required">Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={
                                isService
                                  ? "Describe your service in detail. Include what you offer, your experience, and any other relevant information."
                                  : "Describe your item in detail. Include features, specifications, and any defects or wear."
                              }
                              className={`min-h-[150px] form-input ${fieldState.invalid ? "border-[#dc2626]" : ""}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                {/* Pricing & Shipping Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Pricing {!isService && "& Shipping"}</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field, fieldState }) => (
                          <FormItem className={fieldState.invalid ? "form-item-invalid" : ""}>
                            <FormLabel className="form-label-required">Price ($)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type="number"
                                  step="0.01"
                                  className={`pl-9 form-input ${fieldState.invalid ? "border-[#dc2626]" : ""}`}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field, fieldState }) => (
                          <FormItem className={fieldState.invalid ? "form-item-invalid" : ""}>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                disabled={isService}
                                className={`form-input ${fieldState.invalid ? "border-[#dc2626]" : ""}`}
                                {...field}
                                // Convert undefined or null to empty string to maintain controlled state
                                value={field.value === undefined || field.value === null ? "" : field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {!isService && (
                      <FormField
                        control={form.control}
                        name="shippingOption"
                        render={({ field, fieldState }) => (
                          <FormItem className={`space-y-3 ${fieldState.invalid ? "form-item-invalid" : ""}`}>
                            <FormLabel className="form-label-required">Shipping Options</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="space-y-3"
                              >
                                <div className="flex items-center space-x-2 border rounded-lg p-3">
                                  <RadioGroupItem value="flat" id="flat" />
                                  <Label htmlFor="flat" className="flex-1 cursor-pointer">
                                    <div className="font-medium">Flat Rate</div>
                                    <div className="text-sm text-muted-foreground">Charge a fixed shipping fee</div>
                                  </Label>
                                  <div className="font-medium">$5.99</div>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-lg p-3">
                                  <RadioGroupItem value="pickup" id="pickup" />
                                  <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                                    <div className="font-medium">Local Pickup Only</div>
                                    <div className="text-sm text-muted-foreground">Buyer must pick up the item</div>
                                  </Label>
                                  <div className="font-medium">$0.00</div>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Listing..." : "Create Listing"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}

