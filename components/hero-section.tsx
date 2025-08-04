import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-24 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-red-400 dark:to-white">
                Find Your
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">Perfect Car</span>
            </h1>
          </div>
          
          <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
              Premium quality used cars with detailed inspections
              <br />
              <span className="text-red-600 dark:text-red-400 font-medium">and comprehensive warranties</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <Link href="/browse">Explore Inventory</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 border-gray-300 dark:border-gray-600 hover:border-red-600 dark:hover:border-red-400 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <Link href="/contact">Schedule Visit</Link>
            </Button>
          </div>
          
          <div className="mt-16 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Quality Inspected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <span>Warranty Included</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <span>Financing Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
    </section>
  )
}
