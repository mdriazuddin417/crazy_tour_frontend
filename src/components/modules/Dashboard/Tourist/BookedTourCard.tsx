/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { BookingStatus } from "@/lib/types";
import { AddTouristReviewModal } from "./AddTouristReviewModal";

const BookedTourCard = ({ booking }: any) => {
  const {
    _id,
    touristId,
    guideId,
    tourListingId,
    status,
    requestedDate,
    groupSize,
    totalPrice,
    paymentId,
  } = booking;

  // Formatting date for display
  const formattedDate = new Date(requestedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Function to determine badge color based on status
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-3 bg-white rounded-xl shadow-2xl border border-gray-100 transition duration-300 hover:shadow-3xl">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-2 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          {tourListingId?.title}
        </h2>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
            status
          )}`}
        >
          {status}
        </span>
      </div>

      {/* Booking Details Grid */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm text-gray-700">
        {/* Row 1: Date & Location */}
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase">
            Tour Date
          </p>
          <p className="text-base font-semibold text-indigo-600">
            {formattedDate}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase">
            Location & Category
          </p>
          <p className="text-base font-medium">
            {tourListingId?.city} •{" "}
            <span className="text-orange-500">{tourListingId?.category}</span>
          </p>
        </div>

        {/* Row 2: Guide & Tourist */}
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase">
            Your Guide
          </p>
          <p className="font-medium text-gray-900">{guideId?.name}</p>
          <p className="text-xs text-gray-500 truncate">{guideId?.email}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase">
            Tourist Name
          </p>
          <p className="font-medium text-gray-900">{touristId?.name}</p>
          <p className="text-xs text-gray-500 truncate">{touristId?.email}</p>
        </div>

        {/* Row 3: Group Size & Booking ID */}
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase">
            Group Size
          </p>
          <p className="text-base font-medium">
            {groupSize} Person{groupSize > 1 ? "s" : ""}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase">
            Booking ID
          </p>
          <p className="text-xs font-mono text-gray-600 truncate">{_id}</p>
        </div>
      </div>

      {/* Footer Section: Price & Payment */}
      <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase">
            Total Paid
          </p>
          <p className="text-xl font-bold text-green-600">${totalPrice}</p>
          {status === "COMPLETED" && (
            <AddTouristReviewModal bookingItem={booking}>
              <Button className="mt-2" size={"sm"}>
                Add Review
              </Button>
            </AddTouristReviewModal>
          )}
        </div>
        <div className="text-right space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Payment Status
          </p>
          <span
            className={`inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md ${
              paymentId.status === "PAID"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <svg
              className="w-3 h-3 mr-1.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            {paymentId?.status}
          </span>
          <p className="text-xs text-gray-400 mt-1">
            Transaction: {paymentId?.transactionId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookedTourCard;
