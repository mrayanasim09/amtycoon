import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CarCard } from "@/components/car-card"
import { FilterPanel } from "@/components/filter-panel"
import { SmartSearch } from "@/components/smart-search"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { mockCars } from "@/lib/mock-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Browse Cars - AM Tycoons",
  description: "Browse our selection of quality used cars. Find your perfect vehicle at AM Tycoons.",
  keywords: "used cars, car dealership, browse cars, vehicles for sale, Los Angeles cars",
}

export default function BrowsePage() {
  // Filter only approved cars for public browsing
  const availableCars = mockCars.filter(car => car.approved !== false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse Our Cars
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover quality pre-owned vehicles from AM Tycoons. Each car is thoroughly inspected and comes with our quality guarantee.
          </p>
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
                Available Vehicles ({availableCars.length})
              </h2>
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Year: Newest First</option>
                <option>Mileage: Lowest First</option>
              </select>
            </div>

            {availableCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {availableCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No cars found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search criteria or check back later for new arrivals.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-lg mb-6">
            Contact us directly and we'll help you find your perfect vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+12135555555"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              📞 Call Now: (213) 555-5555
            </a>
            <a
              href="https://wa.me/12135555555"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <WhatsAppButton />
      <Footer />
    </div>
  )
}

