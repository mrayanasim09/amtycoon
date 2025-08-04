import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CarCard } from "@/components/car-card"
import { FilterPanel } from "@/components/filter-panel"
import { SmartSearch } from "@/components/smart-search"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockCars } from "@/lib/mock-data"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Inventory - AM Tycoons",
  description: "Browse our complete selection of quality pre-owned vehicles at AM Tycoons. Find your perfect car today.",
  keywords: "car inventory, used cars, car dealership, browse cars, AM Tycoons",
}

export default function InventoryPage() {
  // Show only approved cars for customer browsing
  const allCars = mockCars
  const approvedCars = allCars.filter(car => car.approved !== false)
  const pendingCars = allCars.filter(car => car.approved === false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Inventory
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse our complete selection of quality pre-owned vehicles.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Cars</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{allCars.length}</p>
              </div>
              <div className="text-4xl">🚗</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available for Sale</p>
                <p className="text-3xl font-bold text-green-600">{approvedCars.length}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SmartSearch />
        </div>

        {/* Filter and Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <FilterPanel />
          </div>

          {/* Car Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Available Vehicles ({approvedCars.length})
              </h2>
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Year: Newest First</option>
                <option>Mileage: Lowest First</option>
                <option>Date Added: Newest First</option>
              </select>
            </div>

            {approvedCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {approvedCars.map((car) => (
                  <div key={car.id} className="relative">
                    <CarCard car={car} />
                    <div className="absolute top-2 right-2 z-10">
                      <Badge className="bg-green-500 text-white">
                        Live
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No approved vehicles
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Add new vehicles through the admin portal to get started.
                </p>
                <Button asChild>
                  <Link href="/admin">
                    Add New Vehicle
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <WhatsAppButton />
      <Footer />
    </div>
  )
}

