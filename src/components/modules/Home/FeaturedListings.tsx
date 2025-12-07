import { Card, CardContent } from "@/components/ui/card";
import { TourListing } from "@/lib/types";
import { getListingsService } from "@/services/listing/listing.service";
import { Clock, MapPin, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FeaturedListings = async() => {
    const allTourListings = await getListingsService();
    const featuredListings:TourListing[]=allTourListings?.data?.data?.slice(0,6) || [];
    const loading=false;
    const error=null;
    return (
        <div>
             <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Featured Tours</h2>

          {loading ? (
            <div className="text-center py-12 text-gray-600">Loading amazing tours for you...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">{error}</div>
          ) : featuredListings.length === 0 ? (
            <div className="text-center py-12 text-gray-600">No tours available yet</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <Link key={listing._id} href={`/tours/${listing._id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition h-full cursor-pointer py-0">
                    <div className="relative w-full h-48 bg-gray-200">
                      <Image
                        src={listing.images[0] || "/placeholder.svg"}
                        alt={listing.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-gray-900 line-clamp-2">{listing.title}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="w-4 h-4" />
                          {listing.city}, {listing.country}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{listing.averageRating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          {listing.duration}h
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="font-bold text-blue-600">${listing.price}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {listing.totalBookings}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
        </div>
    );
};

export default FeaturedListings;