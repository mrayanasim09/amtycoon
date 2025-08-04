"use client"

import { MessageCircle, Phone } from "lucide-react"
import { useState } from "react"

export function WhatsAppButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const phoneNumber = "+12135555555" // Replace with actual number
  const whatsappNumber = "+12135555555" // Replace with actual WhatsApp number

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in your car inventory. Can you help me find the perfect vehicle?")
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  const handlePhoneClick = () => {
    window.open(`tel:${phoneNumber}`, '_self')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded buttons */}
      <div className={`flex flex-col space-y-3 mb-3 transition-all duration-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <button
          onClick={handlePhoneClick}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Phone className="h-5 w-5 mr-2" />
          <span className="font-medium">Call Now</span>
        </button>
        
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          <span className="font-medium">WhatsApp</span>
        </button>
      </div>

      {/* Main toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      >
        <MessageCircle className={`h-6 w-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}

