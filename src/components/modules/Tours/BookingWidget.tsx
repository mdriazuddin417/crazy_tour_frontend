"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser, TourListing } from "@/lib/types";
import { createBookingService } from "@/services/booking/booking.service";


import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
const BookingWidget = ({
  listing,
  guide,
  userInfo,
}: {
  listing: Partial<TourListing>;
  userInfo: IUser;
  guide:IUser;
}) => {
  const [bookingDate, setBookingDate] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [notes, setNotes] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const router = useRouter();


  const handleBooking = async () => {

    if (!bookingDate) {
     toast.error("Please select a booking date");
      return;
    }

    try {
      toast.info("Creating your booking...");
      const totalPrice = (listing?.price || 0) * groupSize;
      const bookingBody = {
        touristId: userInfo?._id as string,
        guideId:guide?._id as string,
        tourListingId: listing?._id as string,
        requestedDate: new Date(bookingDate).toISOString(),
        groupSize,
        totalPrice,
        notes,
      };

      const bookingData = await createBookingService(bookingBody);

      console.log('bookingData',bookingData.data.paymentUrl);

      if (bookingData.success) {
        toast.success("Booking request sent successfully!");
        const newWindow = window.open(bookingData.data.paymentUrl, '_blank');
        if (!newWindow) {
          toast.error("Failed to open new window");
        }
      } else {
        toast.error(bookingData.message || "Failed to create booking");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to create booking");
    } finally {
      setIsBooking(false);
    }
  };

  const totalPrice = Number(listing?.price || 0) * groupSize;

  return (
    <div>
      <div>
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle className="text-2xl">${listing.price}</CardTitle>
            <p className="text-sm text-gray-600">per person</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {!userInfo?.email ? (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <Link
                    href={`/login?redirect=/tours/${listing._id}`}
                    className="font-bold hover:underline"
                  >
                    Log in
                  </Link>{" "}
                  to book this tour
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Group Size
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                      className="flex-1 py-2 text-gray-600 hover:text-gray-900"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center font-medium">
                      {groupSize}
                    </span>
                    <button
                      onClick={() =>
                        setGroupSize(
                          Math.min(Number(listing?.maxGroupSize), groupSize + 1)
                        )
                      }
                      className="flex-1 py-2 text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Max: {listing?.maxGroupSize} people
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or questions..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    rows={3}
                  />
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      ${listing?.price} × {groupSize}
                    </span>
                    <span className="font-medium">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-blue-600">${totalPrice}</span>
                  </div>
                </div>

                <Button
                  onClick={handleBooking}
                  disabled={isBooking || !bookingDate}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isBooking ? "Booking..." : "Request to Book"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  You won&apos;t be charged until the guide accepts your booking
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingWidget;
