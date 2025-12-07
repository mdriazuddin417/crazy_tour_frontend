
import AboutTour from "@/components/modules/Tours/AboutTour";
import BookingWidget from "@/components/modules/Tours/BookingWidget";
import GuidInfo from "@/components/modules/Tours/GuidInfo";
import TourInfo from "@/components/modules/Tours/TourInfo";
import { IUser } from "@/lib/types";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getListingByIdService } from "@/services/listing/listing.service";

import Image from "next/image";

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;
  console.log('id',id);
  const tourListingData = await getListingByIdService(id);
  const listing = tourListingData.data;
  const guide=tourListingData.data.guideId;
    const userInfo = (await getUserInfo()) as IUser;


  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={listing?.images[0] || "/placeholder.svg"}
                alt={listing?.title || "Tour Image"}
                fill
                className="object-cover"
              />
            </div>

            {/* Tour Info */}
           <TourInfo listing={listing}/>

            {/* Description */}
            <AboutTour listing={listing} />

            {/* Guide Profile */}
           <GuidInfo guide={guide}/>
          </div>

          {/* Booking Widget */}
          <BookingWidget listing={listing} userInfo={userInfo} guide={guide}/>
        </div>
      </div>
    </main>
  );
}
