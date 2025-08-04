"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src="/AMTycons_original.png"
                alt="AM Tycoons Logo"
                width={140}
                height={56}
                className="h-14 w-auto transition-all duration-500 group-hover:scale-105 filter drop-shadow-sm"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-red-400 dark:to-white">
                AM TYCOONS
              </div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-widest uppercase">
                Premium Auto Sales
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="relative text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-all duration-300 group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/browse" className="relative text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-all duration-300 group">
              Inventory
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="relative text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-all duration-300 group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="relative text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-all duration-300 group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Button 
              asChild 
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/contact">Get Quote</Link>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors duration-200 py-2">
                Home
              </Link>
              <Link href="/browse" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors duration-200 py-2">
                Inventory
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors duration-200 py-2">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors duration-200 py-2">
                Contact
              </Link>
              <Button asChild className="bg-red-600 hover:bg-red-700 mt-2">
                <Link href="/contact">Get Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

