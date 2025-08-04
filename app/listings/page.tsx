import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { ListingsContent } from "@/components/listings-content"
import { WhatsAppButton } from "@/components/whatsapp-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Car Inventory - AM Tycoons",
  description: "Browse our complete inventory of quality used cars. Find your perfect vehicle from our extensive collection of inspected and verified automobiles.",
  keywords: "car inventory, used cars, car dealership, browse cars, AM Tycoons",
  openGraph: {
    title: "Car Inventory - AM Tycoons",
    description: "Browse our complete inventory of quality used cars.",
    type: "website",
  }
}

export default function ListingsPage() {
  const breadcrumbItems = [
    { label: "Inventory" }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Complete Inventory
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse through our extensive collection of quality used vehicles. Each car is thoroughly inspected and comes with our guarantee.
          </p>
        </div>

        <ListingsContent />
      </div>
      
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

