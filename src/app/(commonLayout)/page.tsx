

import FeaturedListings from "@/components/modules/Home/FeaturedListings"
import Hero from "@/components/modules/Home/Hero"
import ItWorks from "@/components/modules/Home/ItWorks"
import LocalGuide from "@/components/modules/Home/LocalGuide"
import PopularDestination from "@/components/modules/Home/PopularDestination"
import ShareCity from "@/components/modules/Home/ShareCity"

export default function HomePage() {


  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <Hero/>

      {/* Popular Cities */}
     <PopularDestination/>

      {/* How It Works */}
     <ItWorks/>

      {/* Featured Tours */}
      <FeaturedListings/>

      {/* Why Choose Us */}
     <LocalGuide/>

      {/* CTA Section */}
      <ShareCity/>
    </main>
  )
}
