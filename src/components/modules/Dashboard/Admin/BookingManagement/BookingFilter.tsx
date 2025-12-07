"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { BookingStatus } from "@/lib/types";

const BookingFilter = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search bookings by ID, tourist, guide..." />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="touristId" placeholder="Filter by Tourist ID" />
        <SearchFilter paramName="guideId" placeholder="Filter by Guide ID" />
        <SearchFilter paramName="tourListingId" placeholder="Filter by Tour Listing ID" />
        <SelectFilter
          paramName="status"
          placeholder="Filter by status"
          options={[
            { value: BookingStatus.PENDING, label: "Pending" },
            { value: BookingStatus.CONFIRMED, label: "Confirmed" },
            { value: BookingStatus.COMPLETED, label: "Completed" },
            { value: BookingStatus.CANCELLED, label: "Cancelled" },
          ]}
        />
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default BookingFilter;
