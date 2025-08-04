"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"
import { ReviewForm } from "@/components/review-form"
import { CloudinaryImage } from "@/components/cloudinary-image"
import type { Car } from "@/lib/types"
import { Phone, MessageCircle, MapPin, Calendar, Gauge, Cog } from "lucide-react"

interface CarDetailsProps {
  car: Car
}

export function CarDetails({ car }: CarDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("en-US").format(mileage)
  }

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the ${car.title} listed for ${formatPrice(car.price)}. Can you provide more details?`
    const whatsappUrl = `https://wa.me/${car.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCall = () => {
    window.location.href = `tel:${car.contact.phone}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="relative mb-4">
            <CloudinaryImage
              src={car.images[currentImageIndex] || "/placeholder.svg?height=400&width=600"}
              alt={car.title}
              width={600}
              height={400}
              className="w-full h-96 object-cover rounded-lg"
              crop={{ type: "fill", source: true }}
            />
            {car.year >= new Date().getFullYear() - 1 && (
              <Badge className="absolute top-4 left-4 bg-red-600">New</Badge>
            )}
          </div>

          {/* Image Thumbnails */}
          {car.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative h-20 rounded border-2 overflow-hidden ${
                    currentImageIndex === index ? "border-red-600" : "border-gray-200"
                  }`}
                >
                  <CloudinaryImage
                    src={image || "/placeholder.svg?height=80&width=120"}
                    alt={`${car.title} ${index + 1}`}
                    width={120}
                    height={80}
                    className="w-full h-full object-cover"
                    crop={{ type: "fill", source: true }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Car Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{car.title}</h1>
          <p className="text-4xl font-bold text-red-600 mb-6">{formatPrice(car.price)}</p>

          {/* Key Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-gray-500" />
              <span className="font-medium">Year:</span>
              <span className="ml-2">{car.year}</span>
            </div>
            <div className="flex items-center">
              <Gauge className="h-5 w-5 mr-2 text-gray-500" />
              <span className="font-medium">Mileage:</span>
              <span className="ml-2">{formatMileage(car.mileage)} mi</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-gray-500" />
              <span className="font-medium">Location:</span>
              <span className="ml-2">{car.location}</span>
            </div>
            <div className="flex items-center">
              <Cog className="h-5 w-5 mr-2 text-gray-500" />
              <span className="font-medium">VIN:</span>
              <span className="ml-2 text-sm">{car.vin || "Available upon request"}</span>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button onClick={handleWhatsApp} className="flex-1 bg-green-600 hover:bg-green-700" size="lg">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </Button>
            <Button
              onClick={handleCall}
              variant="outline"
              className="flex-1 border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
              size="lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <StarRating rating={car.rating} />
            <p className="text-sm text-gray-600 mt-1">
              {car.rating.toFixed(1)} out of 5 stars ({car.reviews.length} reviews)
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{car.description}</p>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {car.reviews.length > 0 ? (
            <div className="space-y-4">
              {car.reviews.map((review, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{review.name}</h4>
                    <StarRating rating={review.stars} size="sm" />
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(review.createdAt.seconds * 1000).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review this car!</p>
          )}

          <div className="mt-6">
            <ReviewForm carId={car.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
