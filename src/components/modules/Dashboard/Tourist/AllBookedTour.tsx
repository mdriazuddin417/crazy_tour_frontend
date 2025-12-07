import { Button } from "@/components/ui/button";
import { Booking, BookingStatus, TourListing } from "@/lib/types";
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Clock as DurationIcon,
  MapPin,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";

const AllBookedTour = ({
  filteredBookings,
}: {
  filteredBookings: Booking[];
}) => {
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED:
        return "bg-green-100 text-green-800";
      case BookingStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case BookingStatus.COMPLETED:
        return "bg-blue-100 text-blue-800";
      case BookingStatus.CANCELLED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case BookingStatus.PENDING:
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case BookingStatus.CANCELLED:
        return <XCircle className="w-5 h-5 text-red-600" />;
      case BookingStatus.COMPLETED:
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
      {filteredBookings.map(
        (booking: Booking & { tourListingId: Partial<TourListing> }) => (
          <div
            key={booking._id}
            className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 "
          >
            {/* Image / Placeholder */}
            <div className="md:w-1/4 bg-gray-100 flex items-center justify-center">
              <img
                src={booking.tourListingId?.images?.[0] || "/tour-placeholder.jpg"}
                alt={booking.tourListingId?.title || "Tour"}
                className="w-full h-40 md:h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="md:w-3/4 p-6 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {booking?.tourListingId?.title || "Tour Name"}
                    </h3>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-red-500" />
                      {booking?.tourListingId?.city || "City"},{" "}
                      {booking?.tourListingId?.country || "Country"}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {getStatusIcon(booking.status)}
                    {booking.status.toUpperCase()}
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-5">
                  <div className="flex flex-col items-start">
                    <p className="text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> Date
                    </p>
                    <p className="font-semibold text-gray-900 mt-1">
                      {new Date(booking.requestedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-gray-500 flex items-center gap-1">
                      <Users className="w-4 h-4" /> Group Size
                    </p>
                    <p className="font-semibold text-gray-900 mt-1">
                      {booking.groupSize} people
                    </p>
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-gray-500 flex items-center gap-1">
                      <DurationIcon className="w-4 h-4" /> Duration
                    </p>
                    <p className="font-semibold text-gray-900 mt-1">
                      {booking?.tourListingId?.duration || "-"} hours
                    </p>
                  </div>
                  <div className="flex flex-col items-start">
                    <p
                      className="text-gray-500 flex items
              .center gap-1"
                    >
                      <DollarSign className="w-4 h-4" /> Total Price
                    </p>
                    <p className="font-semibold text-gray-900 mt-1">
                      ${booking.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                {booking.tourListingId && (
                  <Link href={`/tours/${booking.tourListingId._id}`}>
                    <Button size="sm" className="bg-blue-600 text-white">
                      View Tour
                    </Button>
                  </Link>
                )}
                {booking.status === BookingStatus.PENDING && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-red-600 text-white"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AllBookedTour;
