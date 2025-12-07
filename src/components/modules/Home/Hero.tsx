import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import Link from "next/link"
const Hero = () => {
    return (
        <div>
            <section className="relative px-4 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Experience Travel <span className="text-blue-600">Like a Local</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with passionate local guides and discover authentic, personalized experiences in destinations
              around the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Explore Tours
                </Button>
              </Link>
              <Link href="/register?role=guide">
                <Button size="lg" variant="outline" className="px-8 bg-transparent">
                  Become a Guide
                </Button>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-12 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Where are you going?</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Start your journey with a local guide</p>
          </div>
        </div>
      </section>
        </div>
    );
};

export default Hero;