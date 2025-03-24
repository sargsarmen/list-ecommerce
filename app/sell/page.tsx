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
import { DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"
import { useListings } from "@/context/listings-context"
import { toast } from "sonner"

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
  }).trim().min(1, { message: "Please select a category." }),
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
}).refine((data) => {
  if (data.category !== "services" && !data.condition) {
    return false;
  }
  return true;
}, {
  message: "Please select a condition",
  path: ["condition"],
}).refine((data) => {
  if (data.category !== "services" && !data.quantity) {
    return false;
  }
  return true;
}, {
  message: "Please select a quantity",
  path: ["quantity"],
});

// Default form values to ensure inputs remain controlled
const defaultFormValues = {
  title: "",
  description: "",
  category: "", // Empty string instead of undefined
  condition: "", // Empty string instead of undefined
  price: 0, // 0 instead of undefined
  quantity: 1,
  shippingOption: "flat",
}

export default function SellPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { addListing } = useListings()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  })

  const watchCategory = form.watch("category")
  const isService = watchCategory === "services"

  // Reset condition, quantity, and shipping option when category changes to services
  useEffect(() => {
    if (isService) {
      form.setValue("condition", "")
      form.setValue("quantity", isService ? 1 : form.getValues("quantity")) // Keep as 1 to maintain controlled state
      form.setValue("shippingOption", "")
    } else {
      if (!(form.getValues("quantity") ?? 0) || (form.getValues("quantity") ?? 0) < 1) {
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
      // Show toast notification
      toast("Listing Created Successfully!", {
        description: `Your ${isService ? "service" : "product"} "${values.title}" has been listed.`,
        action: {
          label: "View Listing",
          onClick: () => router.push(`/products/${newListingId}`),
        },
      })

      // Reset the form with consistent default values to maintain controlled inputs
      form.reset({
        ...defaultFormValues,
        // Ensure these fields have appropriate values based on the current state
        quantity: isService ? 1 : 1, // Always keep as 1 to maintain controlled state
        shippingOption: isService ? "" : "flat",
      })

      setIsSubmitting(false)
    }, 1500)
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
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || ""} // Ensure value is never undefined
                            >
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
                            <FormLabel className={!isService ? "form-label-required" : ''}>Condition</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || ""} // Ensure value is never undefined
                              disabled={isService}
                            >
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
                                  value={field.value || ""} // Ensure value is never undefined
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
                            <FormLabel className={!isService ? "form-label-required" : ''}>Quantity</FormLabel>
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
                                value={field.value || "flat"} // Ensure value is never undefined
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

