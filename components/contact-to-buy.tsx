"use client"

import { Phone, MessageCircle, Calendar, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import type { Car } from "@/lib/types"

interface ContactToBuyProps {
  car: Car
  variant?: "card" | "inline" | "floating"
}

export function ContactToBuy({ car, variant = "card" }: ContactToBuyProps) {
  const [isInterested, setIsInterested] = useState(false)
  
  const phoneNumber = car.contact?.phone || "+12135555555"
  const whatsappNumber = car.contact?.whatsapp || "+12135555555"

  const handlePhoneCall = () => {
    window.open(`tel:${phoneNumber}`, '_self')
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in purchasing the ${car.title} (${car.year}) listed for ${formatPrice(car.price)}. Can we discuss the details?`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  const handleScheduleViewing = () => {
    const message = encodeURIComponent(
      `Hi! I'd like to schedule a viewing for the ${car.title} (${car.year}). When would be a good time?`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (variant === "inline") {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={handlePhoneCall}
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Phone className="h-4 w-4 mr-2" />
          Call to Buy Now
        </Button>
        <Button 
          onClick={handleWhatsApp}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          WhatsApp Us
        </Button>
      </div>
    )
  }

  if (variant === "floating") {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 z-40 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <p className="font-bold text-lg text-gray-900 dark:text-white">{formatPrice(car.price)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{car.title}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handlePhoneCall}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
            <Button 
              onClick={handleWhatsApp}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Ready to Buy This Car?
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Contact us directly to purchase or get more information
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={handlePhoneCall}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg py-3"
          >
            <Phone className="h-5 w-5 mr-3" />
            Call to Buy Now - {phoneNumber}
          </Button>

          <Button 
            onClick={handleWhatsApp}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg py-3"
          >
            <MessageCircle className="h-5 w-5 mr-3" />
            WhatsApp Us
          </Button>

          <Button 
            onClick={handleScheduleViewing}
            variant="outline"
            className="w-full border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-300 py-3"
          >
            <Calendar className="h-5 w-5 mr-3" />
            Schedule a Viewing
          </Button>

          <Button 
            onClick={() => setIsInterested(!isInterested)}
            variant="ghost"
            className={`w-full transition-all duration-300 ${
              isInterested 
                ? 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20' 
                : 'text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400'
            }`}
          >
            <Heart className={`h-4 w-4 mr-2 ${isInterested ? 'fill-current' : ''}`} />
            {isInterested ? 'Added to Favorites' : 'Save to Favorites'}
          </Button>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
            💡 <strong>Quick Response:</strong> We typically respond within 15 minutes during business hours
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

