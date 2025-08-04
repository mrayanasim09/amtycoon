"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CarCard } from "@/components/car-card"
import type { Car } from "@/lib/types"
import { mockCars } from "@/lib/mock-data"
import Link from "next/link"

interface SimilarCarsProps {
  currentCar: Car
  maxSuggestions?: number
}

export function SimilarCars({ currentCar, maxSuggestions = 3 }: SimilarCarsProps) {
  const [similarCars, setSimilarCars] = useState<Car[]>([])

  useEffect(() => {
    const findSimilarCars = () => {
      const priceRange = 5000 // ±$5,000
      const yearRange = 2 // ±2 years
      
      const filtered = mockCars.filter(car => {
        // Exclude the current car
        if (car.id === currentCar.id) return false
        
        // Only show approved cars
        if (car.approved === false) return false
        
        // Calculate similarity score
        let score = 0
        
        // Same make (highest priority)
        if (car.make.toLowerCase() === currentCar.make.toLowerCase()) {
          score += 10
        }
        
        // Similar price range
        if (Math.abs(car.price - currentCar.price) <= priceRange) {
          score += 5
        }
        
        // Similar year
        if (Math.abs(car.year - currentCar.year) <= yearRange) {
          score += 3
        }
        
        // Same model (bonus points)
        if (car.model.toLowerCase() === currentCar.model.toLowerCase()) {
          score += 8
        }
        
        // Return cars with score > 0
        return score > 0
      })
      
      // Sort by similarity score (calculated again for sorting)
      const sortedSimilar = filtered.sort((a, b) => {
        const scoreA = calculateScore(a)
        const scoreB = calculateScore(b)
        return scoreB - scoreA
      })
      
      setSimilarCars(sortedSimilar.slice(0, maxSuggestions))
    }
    
    const calculateScore = (car: Car) => {
      let score = 0
      if (car.make.toLowerCase() === currentCar.make.toLowerCase()) score += 10
      if (Math.abs(car.price - currentCar.price) <= 5000) score += 5
      if (Math.abs(car.year - currentCar.year) <= 2) score += 3
      if (car.model.toLowerCase() === currentCar.model.toLowerCase()) score += 8
      return score
    }
    
    findSimilarCars()
  }, [currentCar, maxSuggestions])

  if (similarCars.length === 0) {
    return null
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">🔍</span>
          Similar to this: {currentCar.year} {currentCar.make} {currentCar.model}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Compare with similar vehicles in our inventory
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarCars.map((car) => (
            <div key={car.id} className="relative">
              <CarCard car={car} />
              <div className="absolute top-2 right-2 z-10">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Similar
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        {similarCars.length >= maxSuggestions && (
          <div className="mt-6 text-center">
            <Button asChild variant="outline">
              <Link href="/browse">
                View More Similar Cars
              </Link>
            </Button>
          </div>
        )}
        
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-2">Why these cars are similar:</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Same or similar make and model</li>
            <li>• Within ±$5,000 price range</li>
            <li>• Within ±2 years of manufacture</li>
            <li>• Similar features and specifications</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

