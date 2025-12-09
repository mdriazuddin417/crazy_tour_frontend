import TourListingCard from "@/components/modules/Dashboard/GuidTours/TourListingCard";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Button } from "@/components/ui/button";
import { queryStringFormatter } from "@/lib/formatters";
import { IUser, TourListing } from "@/lib/types";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getListingsService } from "@/services/listing/listing.service";
import { Plus } from "lucide-react";
import Link from "next/link";


const GuideTourListings = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const userInfo = (await getUserInfo()) as IUser;

  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const listingsResult = await getListingsService(queryString);

  // Handle different response structures
  const listingsData =
    listingsResult?.data?.data.filter(
      (listing: TourListing) => listing.guideId === userInfo?._id
    ) || [];

    

  return (
    <div className="space-y-6 p-5">
      <ManagementPageHeader
        title="Tour Listings "
        description="All tour listings and their details"
      >
        <Link href="/guide/dashboard/listings/new"> 
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Tour
          </Button>
        </Link>
      </ManagementPageHeader>

      <div>
        {listingsData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              No tours found matching your criteria
            </p>
            <Link href="/guide/dashboard/listings/new">
              <Button className="gap-2">Create New Tour</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {listingsData.map((listing: TourListing) => (
              <TourListingCard listing={listing} key={listing?._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideTourListings;
