"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { TourCategory } from "@/lib/types";

const TourListingFilter = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search listings by title, city, country..." />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="city" placeholder="Filter by city" />
        <SearchFilter paramName="country" placeholder="Filter by country" />
        <SearchFilter paramName="guideId" placeholder="Filter by Guide ID" />
        <SelectFilter
          paramName="category"
          placeholder="Filter by category"
          options={[
            { value: TourCategory.FOOD, label: "Food" },
            { value: TourCategory.HISTORY, label: "History" },
            { value: TourCategory.ART, label: "Art" },
            { value: TourCategory.ADVENTURE, label: "Adventure" },
            { value: TourCategory.NIGHTLIFE, label: "Nightlife" },
            { value: TourCategory.SHOPPING, label: "Shopping" },
            { value: TourCategory.PHOTOGRAPHY, label: "Photography" },
            { value: TourCategory.CULTURE, label: "Culture" },
          ]}
        />
        <SelectFilter
          paramName="isActive"
          placeholder="Filter by status"
          options={[
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ]}
        />
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default TourListingFilter;
