import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { CarImageCarousel } from "@/components/car-image-carousel"
import { ContactToBuy } from "@/components/contact-to-buy"
import { CarComparison } from "@/components/car-comparison"
import { SimilarCars } from "@/components/similar-cars"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Calendar, 
  Gauge, 
  MapPin, 
  Fuel, 
  Cog, 
  Palette, 
  Shield, 
  FileText,
  Star,
  Heart,
  Share2,
  ExternalLink
} from "lucide-react"
import { mockCars } from "@/lib/mock-data"
import type { Metadata } from "next"

interface CarPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: CarPageProps): Promise<Metadata> {
  const car = mockCars.find(c => c.id === params.id)
  
  if (!car) {
    return {
      title: "Car Not Found - AM Tycoons",
      description: "The requested vehicle could not be found."
    }
  }

  return {
    title: `${car.title} - AM Tycoons`,
    description: `${car.title} for sale at AM Tycoons. ${car.year} model with ${car.mileage.toLocaleString()} miles. Located in ${car.location}. Contact us for more details.`,
    keywords: `${car.make}, ${car.model}, ${car.year}, used car, car dealership, ${car.location}`,
    openGraph: {
      title: `${car.title} - AM Tycoons`,
      description: `${car.title} for sale. ${car.year} model with ${car.mileage.toLocaleString()} miles.`,
      images: car.images.map(img => ({ url: img })),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${car.title} - AM Tycoons`,
      description: `${car.title} for sale. ${car.year} model with ${car.mileage.toLocaleString()} miles.`,
      images: car.images,
    }
  }
}

export default function CarPage({ params }: CarPageProps) {
  const car = mockCars.find(c => c.id === params.id)
  
  if (!car) {
    notFound()
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

  const breadcrumbItems = [
    { label: "Inventory", href: "/listings" },
    { label: car.title }
  ]

  const specifications = [
    { icon: Calendar, label: "Year", value: car.year.toString() },
    { icon: Gauge, label: "Mileage", value: `${formatMileage(car.mileage)} miles` },
    { icon: MapPin, label: "Location", value: car.location },
    { icon: Fuel, label: "Fuel Type", value: car.fuelType || "Gasoline" },
    { icon: Cog, label: "Transmission", value: car.transmission || "Automatic" },
    { icon: Palette, label: "Color", value: car.color || "Not specified" },
  ]

  const features = [
    "Air Conditioning", "Power Steering", "Power Windows", "ABS Brakes",
    "Airbags", "Bluetooth Connectivity", "Backup Camera", "Cruise Control",
    "Keyless Entry", "Premium Sound System", "Leather Seats", "Sunroof"
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Car Images */}
            <CarImageCarousel images={car.images} carTitle={car.title} />
            
            {/* Car Details */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {car.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                    {car.rating && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{car.rating.toFixed(1)} Rating</span>
                      </div>
                    )}
                    <span>•</span>
                    <span>Stock #: {car.id.toUpperCase()}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-red-600">{formatPrice(car.price)}</span>
                {car.year >= new Date().getFullYear() - 1 && (
                  <Badge className="bg-blue-600">New Arrival</Badge>
                )}
                {car.price < 20000 && (
                  <Badge className="bg-green-600">Great Deal</Badge>
                )}
              </div>

              {/* Quick Actions */}
              <ContactToBuy car={car} variant="inline" />
            </div>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cog className="h-5 w-5 mr-2" />
                  Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {specifications.map((spec, index) => {
                    const IconComponent = spec.icon
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <IconComponent className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{spec.label}</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{spec.value}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features & Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vehicle History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Vehicle History & Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Clean Vehicle History</h4>
                    <p className="text-sm text-green-600 dark:text-green-300">No accidents reported • Single owner • Regular maintenance</p>
                  </div>
                  <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                    <FileText className="h-4 w-4 mr-2" />
                    View Full Report
                  </Button>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Get VIN Report (Carfax/AutoCheck)
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ContactToBuy car={car} />
            
            {/* Financing Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Financing Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Down Payment</label>
                  <input 
                    type="number" 
                    placeholder="$5,000"
                    className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Loan Term</label>
                  <select className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600">
                    <option>36 months</option>
                    <option>48 months</option>
                    <option>60 months</option>
                    <option>72 months</option>
                  </select>
                </div>
                <Button className="w-full">Calculate Payment</Button>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Monthly Payment</p>
                  <p className="text-2xl font-bold text-red-600">$389/mo</p>
                </div>
              </CardContent>
            </Card>

            {/* Similar Cars */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCars.filter(c => c.id !== car.id && c.make === car.make).slice(0, 3).map((similarCar) => (
                    <div key={similarCar.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="w-16 h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{similarCar.title}</h4>
                        <p className="text-red-600 font-bold">{formatPrice(similarCar.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Cars Section */}
        <SimilarCars currentCar={car} maxSuggestions={3} />
      </div>

      {/* Floating Contact Bar */}
      <ContactToBuy car={car} variant="floating" />
      
      {/* Car Comparison */}
      <CarComparison availableCars={mockCars} initialCar={car} />
      
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

