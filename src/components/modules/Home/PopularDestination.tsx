import { TourListing } from "@/lib/types";
import { getListingsService } from "@/services/listing/listing.service";
import Link from "next/link";
import DestinationCard from "./DestinationCard";

const PopularDestination = async () => {
  const allTourListings = await getListingsService();

  return (
    <div>
      <section className="px-4 py-16 bg-white">
        <div className=" container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Popular Destinations
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-5">
            {allTourListings?.data?.data
              ?.slice(0, 8)
              ?.map((item: TourListing) => (
                <Link key={item._id} href={`/explore?city=${item.city}`}>
                  <DestinationCard destination={item} />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopularDestination;
