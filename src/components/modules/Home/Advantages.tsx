import { Award, Calendar, DollarSign, Map } from "lucide-react"

const advantages = [
  {
    icon: DollarSign,
    title: "Lowest Price",
    description: "Best prices guaranteed",
  },
  {
    icon: Map,
    title: "Variety of Tours",
    description: "Diverse destinations",
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Simple reservation process",
  },
  {
    icon: Award,
    title: "Best Return Agency",
    description: "Top-rated service",
  },
]

export function Advantages() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-slate-800">Our Advantages</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover why thousands choose us for their Portugal adventures
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
                  <Icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-800">{advantage.title}</h3>
                <p className="text-sm text-gray-600">{advantage.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
