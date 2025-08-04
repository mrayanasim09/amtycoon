"use client"

import { useState, useEffect } from "react"
import { CarCard } from "@/components/car-card"
import { FilterPanel } from "@/components/filter-panel"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getCars } from "@/lib/firebase"
import type { Car } from "@/lib/types"
import { useSearchParams } from "next/navigation"

export function ListingsContent() {
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const carsPerPage = 12
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await getCars()
        setCars(carsData)
        setFilteredCars(carsData)
      } catch (error) {
        console.error("Error fetching cars:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  useEffect(() => {
    const search = searchParams.get("search")
    const brand = searchParams.get("brand")
    const maxPrice = searchParams.get("maxPrice")

    let filtered = cars

    if (search) {
      filtered = filtered.filter(
        (car) =>
          car.title.toLowerCase().includes(search.toLowerCase()) ||
          car.make.toLowerCase().includes(search.toLowerCase()) ||
          car.model.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (brand) {
      filtered = filtered.filter((car) => car.make === brand)
    }

    if (maxPrice) {
      filtered = filtered.filter((car) => car.price <= Number.parseInt(maxPrice))
    }

    setFilteredCars(filtered)
    setCurrentPage(1)
  }, [searchParams, cars])

  const handleFilter = (filters: any) => {
    let filtered = cars

    if (filters.search) {
      filtered = filtered.filter(
        (car) =>
          car.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          car.make.toLowerCase().includes(filters.search.toLowerCase()) ||
          car.model.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    if (filters.make) {
      filtered = filtered.filter((car) => car.make === filters.make)
    }

    if (filters.minPrice) {
      filtered = filtered.filter((car) => car.price >= filters.minPrice)
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((car) => car.price <= filters.maxPrice)
    }

    if (filters.minYear) {
      filtered = filtered.filter((car) => car.year >= filters.minYear)
    }

    if (filters.maxYear) {
      filtered = filtered.filter((car) => car.year <= filters.maxYear)
    }

    if (filters.maxMileage) {
      filtered = filtered.filter((car) => car.mileage <= filters.maxMileage)
    }

    setFilteredCars(filtered)
    setCurrentPage(1)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  const indexOfLastCar = currentPage * carsPerPage
  const indexOfFirstCar = indexOfLastCar - carsPerPage
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar)
  const totalPages = Math.ceil(filteredCars.length / carsPerPage)

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/4">
        <FilterPanel onFilter={handleFilter} />
      </div>

      <div className="lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {indexOfFirstCar + 1}-{Math.min(indexOfLastCar, filteredCars.length)} of {filteredCars.length} cars
          </p>
        </div>

        {currentCars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No cars found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded ${
                        currentPage === page ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
