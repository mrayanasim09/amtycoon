import { Shield, CheckCircle, Phone, Award, Clock, Users } from "lucide-react"

export function TrustBadges() {
  const badges = [
    {
      icon: CheckCircle,
      title: "Verified Listings",
      description: "All vehicles inspected & verified"
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Safe & protected payments"
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Always here to help you"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Premium vehicles only"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Fast replies to inquiries"
    },
    {
      icon: Users,
      title: "Trusted by 1000+",
      description: "Happy customers nationwide"
    }
  ]

  return (
    <section className="py-12 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Why Choose AM Tycoons?
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your trusted partner in finding the perfect vehicle
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon
            return (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-red-50 dark:bg-red-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-red-100 dark:group-hover:bg-red-900/40 transition-colors duration-300">
                  <IconComponent className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                  {badge.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {badge.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

