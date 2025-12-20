import { Advantages } from "@/components/modules/Home/Advantages";
import FeaturedListings from "@/components/modules/Home/FeaturedListings";
import { Hero } from "@/components/modules/Home/Hero";

import ItWorks from "@/components/modules/Home/ItWorks";
import LocalGuide from "@/components/modules/Home/LocalGuide";
import { Newsletter } from "@/components/modules/Home/Newsletter";
import PopularDestination from "@/components/modules/Home/PopularDestination";
import ShareCity from "@/components/modules/Home/ShareCity";
import { Statistics } from "@/components/modules/Home/Statistics";
import { Testimonials } from "@/components/modules/Home/Testimonials";

export default function HomePage() {
  return (
    <main className="min-h-screen  bg-gradient-to-b from-teal-50 to-white">
      {/* Hero Section */}
      <Hero />

      {/* Popular Cities */}
      <PopularDestination />
      <Advantages />
      {/* Featured Tours */}
      <FeaturedListings />
      <Statistics />
      {/* How It Works */}
      <ItWorks />
      <Testimonials />
      {/* Why Choose Us */}
      <LocalGuide />
      <Newsletter />

      {/* CTA Section */}
      <ShareCity />
    </main>
  );
}
