
import { Card, CardContent } from "@/components/ui/card";
import { TourListing } from "@/lib/types";
import { getListingsService } from "@/services/listing/listing.service";
import Image from "next/image";
import Link from "next/link";


const PopularDestination = async() => {
    const allTourListings = await getListingsService();
    return (
        <div>
          <section className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Popular Destinations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTourListings?.data?.data?.slice(0,6)?.map((item: TourListing) => (
              <Link key={item._id} href={`/explore?city=${item.city}`}>
                <Card className="overflow-hidden hover:shadow-lg transition cursor-pointer h-full py-0">
                  <div className="relative w-full h-48 bg-gray-200">
                    <Image src={item.images[0] || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-gray-900">{item.city}</h3>
                    <p className="text-sm text-gray-600">{item.country}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>  
        </div>
    );
};

export default PopularDestination;