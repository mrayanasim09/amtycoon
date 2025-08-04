"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Car } from "@/lib/types"

interface SmartSearchProps {
  cars: Car[]
  onSearch?: (query: string) => void
  placeholder?: string
}

export function SmartSearch({ cars, onSearch, placeholder = "Search by make, model, year, or keyword..." }: SmartSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Car[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // Popular search terms
  const popularSearches = [
    "Honda Civic", "Toyota Camry", "BMW", "Mercedes", "Under $20k", "2022", "Low Mileage"
  ]

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (query.length > 1) {
      const filtered = cars.filter(car => 
        car.title.toLowerCase().includes(query.toLowerCase()) ||
        car.make.toLowerCase().includes(query.toLowerCase()) ||
        car.model.toLowerCase().includes(query.toLowerCase()) ||
        car.year.toString().includes(query) ||
        car.location.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
      
      setSuggestions(filtered)
      setIsOpen(true)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [query, cars])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
      
      onSearch?.(searchQuery)
      setQuery(searchQuery)
      setIsOpen(false)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setSuggestions([])
    setIsOpen(false)
    onSearch?.("")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query)
            }
          }}
          className="pl-10 pr-10 py-3 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-400 rounded-xl shadow-lg"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-2xl border-0 bg-white dark:bg-gray-800">
          <CardContent className="p-0">
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Search Results
                </div>
                {suggestions.map((car) => (
                  <Link
                    key={car.id}
                    href={`/car/${car.id}`}
                    className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-16 h-12 bg-gray-200 dark:bg-gray-600 rounded mr-3 flex-shrink-0">
                      {/* Car thumbnail would go here */}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{car.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {car.year} • {car.location} • {formatPrice(car.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && query.length <= 1 && (
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Recent Searches
                </div>
                <div className="p-3 space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            {query.length <= 1 && (
              <div className="p-3">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                  Popular Searches
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors duration-200"
                      onClick={() => handleSearch(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {query.length > 1 && suggestions.length === 0 && (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                <p>No cars found for "{query}"</p>
                <p className="text-sm mt-1">Try searching for make, model, or year</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

