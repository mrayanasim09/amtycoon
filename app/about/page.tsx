import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { AboutContent } from "@/components/about-content"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TrustBadges } from "@/components/trust-badges"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - AM Tycoons",
  description: "Learn about AM Tycoons, your trusted partner in finding quality used vehicles. Discover our story, mission, and commitment to customer satisfaction.",
  keywords: "about, AM Tycoons, car dealership, company, mission, Los Angeles",
  openGraph: {
    title: "About Us - AM Tycoons",
    description: "Learn about AM Tycoons, your trusted partner in finding quality used vehicles.",
    type: "website",
  }
}

export default function AboutPage() {
  const breadcrumbItems = [
    { label: "About" }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About AM Tycoons
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your trusted partner in finding the perfect vehicle since day one.
          </p>
        </div>

        <AboutContent />
      </div>
      
      <TestimonialsSection />
      <TrustBadges />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

