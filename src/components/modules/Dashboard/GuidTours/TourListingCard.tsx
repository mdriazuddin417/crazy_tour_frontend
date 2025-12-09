// This assumes you are inside a Next.js/React component file

import { Button } from "@/components/ui/button";
import { TourListing } from "@/lib/types";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";



const TourListingCard = ({ listing }: { listing: TourListing }) => {
  const {
    title,
    category,
    city,
    images,
    country,
    price,
    duration,
    maxGroupSize,
    meetingPoint,
    languages,
    averageRating,
    _id,
  } = listing;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <div className=" bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition duration-500 ease-in-out relative">
       <Link href={`/guide/dashboard/listings/${_id}`} className="absolute right-2 top-2 z-50"> 
          <Button className="gap-2" variant="outline" size={'sm'}> 
            <Edit className="w-4 h-4" />
          </Button>
        </Link>
      
      {/* Image Placeholder (for visual appeal in a real app) */}
      <div className="h-48 w-full relative bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
        <Image src={images[0]||'https://i.ibb.co.com/2qjhNvx/bg-1.jpg'} alt={title} fill className="absolute inset-0 w-full h-full object-cover" />
      </div>

      <div className="p-3">
        
        {/* Title and Category Badge */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-gray-900 leading-snug hover:text-indigo-600 transition duration-300">
            {title}
          </h2>
          <span className="ml-2 px-3 py-1 text-xs font-semibold uppercase rounded-full bg-orange-100 text-orange-800">
            {category}
          </span>
        </div>

        {/* Location and Rating */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
            </svg>
            <span className="font-medium">{city}, {country}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-0.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.62-.921 1.92 0l1.24 3.824a1 1 0 00.95.691h4.022c.969 0 1.371 1.24.588 1.81l-3.268 2.375a1 1 0 00-.364 1.118l1.24 3.824c.3.921-.755 1.688-1.54 1.118l-3.268-2.375a1 1 0 00-1.176 0l-3.268 2.375c-.784.57-1.838-.197-1.539-1.118l1.24-3.824a1 1 0 00-.364-1.118L2.02 9.252c-.783-.57-.381-1.81.588-1.81h4.022a1 1 0 00.95-.691l1.24-3.824z"></path>
            </svg>
            <span className="font-semibold text-gray-800">{averageRating.toFixed(1)}</span>
            <span className="text-xs text-gray-500"> (0 reviews)</span>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-2 gap-1 border-t border-b py-2 mb-2 text-sm">
          <div className="flex items-center text-gray-700">
            <span className="mr-2 text-indigo-500">⏱️</span>
            <p className="font-medium">{duration} Hours</p>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2 text-indigo-500">🧑‍🤝‍🧑</span>
            <p className="font-medium">Max {maxGroupSize} Guests</p>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2 text-indigo-500">🗣️</span>
            <p className="font-medium">{languages.join(', ')}</p>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2 text-indigo-500">📍</span>
            <p className="font-medium truncate" title={meetingPoint}>Meeting Point</p>
          </div>
        </div>

        {/* Price and Action Button */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-medium text-gray-500">Starting from</p>
            <p className="text-xl font-extrabold text-green-600">{formattedPrice}</p>
          </div>
          <Link href={`/tours/${_id}`}>
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300">
            View Details
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourListingCard;