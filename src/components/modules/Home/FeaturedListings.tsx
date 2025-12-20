import { TourListing } from "@/lib/types";
import { getListingsService } from "@/services/listing/listing.service";
import Link from "next/link";
import FeatureTourCard from "./FeatureTourCard";

const FeaturedListings = async() => {
    const allTourListings = await getListingsService();
    const featuredListings:TourListing[]=allTourListings?.data?.data?.slice(0,8) || [];
    const loading=false;
    const error=null;
    return (
        <div>
             <section className="px-4 py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Featured Tours</h2>

          {loading ? (
            <div className="text-center py-12 text-gray-600">Loading amazing tours for you...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">{error}</div>
          ) : featuredListings.length === 0 ? (
            <div className="text-center py-12 text-gray-600">No tours available yet</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredListings.map((listing) => (
                <Link key={listing._id} href={`/tours/${listing._id}`}>
                 <FeatureTourCard tour={listing}/>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
        </div>
    );
};

export default FeaturedListings;