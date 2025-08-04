"use client"

import { useState } from "react"
import { X, Plus, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CloudinaryImage } from "@/components/cloudinary-image"
import type { Car } from "@/lib/types"

interface CarComparisonProps {
  availableCars: Car[]
  initialCar?: Car
}

export function CarComparison({ availableCars, initialCar }: CarComparisonProps) {
  const [selectedCars, setSelectedCars] = useState<Car[]>(initialCar ? [initialCar] : [])
  const [isOpen, setIsOpen] = useState(false)

  const addCarToComparison = (car: Car) => {
    if (selectedCars.length < 3 && !selectedCars.find(c => c.id === car.id)) {
      setSelectedCars([...selectedCars, car])
    }
  }

  const removeCarFromComparison = (carId: string) => {
    setSelectedCars(selectedCars.filter(car => car.id !== carId))
  }

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

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="fixed bottom-20 right-6 z-40 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl"
      >
        <Scale className="h-4 w-4 mr-2" />
        Compare Cars
        {selectedCars.length > 0 && (
          <Badge className="ml-2 bg-red-600">{selectedCars.length}</Badge>
        )}
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Scale className="h-5 w-5 mr-2" />
            Compare Cars ({selectedCars.length}/3)
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          {selectedCars.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Select cars to compare their features and specifications
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableCars.slice(0, 6).map((car) => (
                  <div
                    key={car.id}
                    className="border rounded-lg p-4 cursor-pointer hover:border-red-500 transition-colors"
                    onClick={() => addCarToComparison(car)}
                  >
                    <CloudinaryImage
                      src={car.images[0]}
                      alt={car.title}
                      width={200}
                      height={120}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <h4 className="font-semibold text-sm">{car.title}</h4>
                    <p className="text-red-600 font-bold">{formatPrice(car.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Car Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedCars.map((car) => (
                  <div key={car.id} className="relative">
                    <button
                      onClick={() => removeCarFromComparison(car.id)}
                      className="absolute top-2 right-2 z-10 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <CloudinaryImage
                      src={car.images[0]}
                      alt={car.title}
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <h3 className="font-bold mt-2">{car.title}</h3>
                    <p className="text-red-600 font-bold text-lg">{formatPrice(car.price)}</p>
                  </div>
                ))}
                
                {selectedCars.length < 3 && (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-32 flex items-center justify-center">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        // Show car selection modal
                      }}
                      className="text-gray-500"
                    >
                      <Plus className="h-6 w-6 mr-2" />
                      Add Car
                    </Button>
                  </div>
                )}
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Feature</th>
                      {selectedCars.map((car) => (
                        <th key={car.id} className="text-center p-3 font-semibold min-w-[200px]">
                          {car.make} {car.model}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Price</td>
                      {selectedCars.map((car) => (
                        <td key={car.id} className="p-3 text-center font-bold text-red-600">
                          {formatPrice(car.price)}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Year</td>
                      {selectedCars.map((car) => (
                        <td key={car.id} className="p-3 text-center">{car.year}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Mileage</td>
                      {selectedCars.map((car) => (
                        <td key={car.id} className="p-3 text-center">{formatMileage(car.mileage)} mi</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Location</td>
                      {selectedCars.map((car) => (
                        <td key={car.id} className="p-3 text-center">{car.location}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Rating</td>
                      {selectedCars.map((car) => (
                        <td key={car.id} className="p-3 text-center">
                          {car.rating ? `${car.rating.toFixed(1)} ⭐` : 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Actions</td>
                      {selectedCars.map((car) => (
                        <td key={car.id} className="p-3 text-center">
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            View Details
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

