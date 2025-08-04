"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Los Angeles, CA",
    rating: 5,
    text: "Amazing experience! The team at AM Tycoons helped me find the perfect car within my budget. The process was smooth and transparent.",
    car: "2021 Honda Civic",
    image: "/placeholder-user.jpg"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    location: "Beverly Hills, CA",
    rating: 5,
    text: "Professional service and quality vehicles. I've bought two cars from them and both times exceeded my expectations.",
    car: "2020 BMW 3 Series",
    image: "/placeholder-user.jpg"
  },
  {
    id: 3,
    name: "Emily Chen",
    location: "Santa Monica, CA",
    rating: 5,
    text: "Honest pricing and no hidden fees. They really care about customer satisfaction. Highly recommend AM Tycoons!",
    car: "2019 Toyota Camry",
    image: "/placeholder-user.jpg"
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Pasadena, CA",
    rating: 5,
    text: "Found my dream car here! The inspection report was detailed and the warranty gave me peace of mind.",
    car: "2022 Audi A4",
    image: "/placeholder-user.jpg"
  }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with AM Tycoons.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card key={testimonial.id} className={`premium-card bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${index === currentIndex ? 'ring-2 ring-red-500' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-red-500 mr-3" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.location}</p>
                    <p className="text-xs text-red-600 dark:text-red-400">Purchased: {testimonial.car}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

