import { CarCard } from "@/components/car-card"
import { getFeaturedCars } from "@/lib/firebase"

export async function FeaturedCars() {
  let cars = []

  try {
    cars = await getFeaturedCars()
  } catch (error) {
    console.error("Error loading featured cars:", error)
    cars = []
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Vehicles</h2>
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No featured cars available at the moment. Please check back later!</p>
          </div>
        )}
      </div>
    </section>
  )
}
