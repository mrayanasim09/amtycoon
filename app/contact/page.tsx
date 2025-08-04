import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { ContactContent } from "@/components/contact-content"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { FAQSection } from "@/components/faq-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - AM Tycoons",
  description: "Get in touch with AM Tycoons. Visit our Los Angeles location, call us, or send us a message. We're here to help you find your perfect vehicle.",
  keywords: "contact, AM Tycoons, car dealership, Los Angeles, phone, address",
  openGraph: {
    title: "Contact Us - AM Tycoons",
    description: "Get in touch with AM Tycoons. We're here to help you find your perfect vehicle.",
    type: "website",
  }
}

export default function ContactPage() {
  const breadcrumbItems = [
    { label: "Contact" }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact AM Tycoons
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Ready to find your perfect drive? Get in touch with our team today.
          </p>
        </div>

        <ContactContent />
      </div>
      
      <FAQSection />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

