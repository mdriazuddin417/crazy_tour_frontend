import { Card, CardContent } from "@/components/ui/card";
import { TourListing } from "@/lib/types";

import { Clock, MapPin, Star, Users } from "lucide-react";
const TourInfo = ({ listing }: { listing: Partial<TourListing> }) => {
    return (
        <div>
             <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {listing.title}
                  </h1>
                  <p className="text-gray-600 flex items-center gap-2 mt-2">
                    <MapPin className="w-4 h-4" />
                    {listing.city}, {listing.country}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">
                      {listing?.averageRating?.toFixed(1)}
                    </span>
                    <span className="text-gray-600">
                      ({listing.totalBookings} bookings)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>{listing.duration} hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>Max {listing.maxGroupSize} people</span>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
    );
};

export default TourInfo;