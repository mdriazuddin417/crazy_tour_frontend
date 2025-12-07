"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { UserRole } from "@/lib/types";

const UserFilter = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search users by name or email..." />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="email" placeholder="Filter by email" />
        <SelectFilter
          paramName="role"
          placeholder="Filter by role"
          options={[
            { value: UserRole.TOURIST, label: "Tourist" },
            { value: UserRole.GUIDE, label: "Guide" },
            { value: UserRole.ADMIN, label: "Admin" },
          ]}
        />
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default UserFilter;
