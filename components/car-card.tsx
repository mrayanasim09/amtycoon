import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CloudinaryImage } from "@/components/cloudinary-image"
import { MapPin, Calendar, Gauge, Star } from "lucide-react"
import type { Car } from "@/lib/types"

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
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

  return (
    <Link href={`/car/${car.id}`}>
      <Card className="overflow-hidden premium-card bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl cursor-pointer group">
        <div className="relative overflow-hidden">
          <CloudinaryImage
            src={car.images[0] || "/placeholder.svg?height=200&width=300"}
            alt={car.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            crop={{ type: "fill", source: true }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {car.year >= new Date().getFullYear() - 1 && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg animate-pulse">
              New
            </Badge>
          )}
          {car.price < 20000 && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
              Great Deal
            </Badge>
          )}
          
          {/* Rating overlay */}
          {car.rating && (
            <div className="absolute bottom-3 left-3 flex items-center bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 text-white text-sm">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              {car.rating.toFixed(1)}
            </div>
          )}
        </div>
        
        <CardContent className="p-5">
          <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">
            {car.title}
          </h3>
          <p className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-3">
            {formatPrice(car.price)}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-full px-2 py-1">
              <Calendar className="h-4 w-4 mr-1 text-red-500" />
              {car.year}
            </div>
            <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-full px-2 py-1">
              <Gauge className="h-4 w-4 mr-1 text-red-500" />
              {formatMileage(car.mileage)} mi
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-1 text-red-500" />
            {car.location}
          </div>
          
          {/* Hover effect indicator */}
          <div className="mt-3 h-1 bg-gradient-to-r from-red-600 to-red-700 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </CardContent>
      </Card>
    </Link>
  )
}
