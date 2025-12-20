/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

import { TOUR_CATEGORIES } from '@/lib/constants';
import { TourListing } from '@/lib/types';
import { getListingsService } from '@/services/listing/listing.service';
import { Clock, MapPin, Star, Users } from 'lucide-react';

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<TourListing[]>([]);
  const [allcities, setAllcities] = useState<Partial<TourListing>[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    category: searchParams.get('category') || '',
    language: searchParams.get('language') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.category) params.append('category', filters.category);
      if (filters.language) params.append('language', filters.language);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

      const response = await getListingsService(params.toString());
      if (response.success) {
        setListings(response?.data?.data);
      }
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchListingsCities = async () => {
  try {
    setLoading(true);
    const response = await getListingsService('fields=city,country');
    
    if (response.success && response?.data?.data) {
      const cityData = response.data.data;

      // 1. Create a Set to track unique city-country combinations
      const uniqueCities = new Set();
      
      // 2. Map and filter the original data
      const uniqueCityList = cityData.reduce((acc: any[], currentCity:any) => {
        // Create a unique key (e.g., "Paris-France")
        const key = `${currentCity.city}-${currentCity.country}`;
        
        // Check if the key is already in the Set
        if (!uniqueCities.has(key)) {
          // If not, add the key to the Set
          uniqueCities.add(key);
          // And add the city object to the accumulator array
          acc.push(currentCity);
        }
        return acc;
      }, []); // Initialize accumulator as an empty array

      // 3. Set the state with the unique list
      setAllcities(uniqueCityList);
    }
  } catch (error) {
    console.error('Failed to fetch listings:', error);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchListingsCities();
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>Explore Tours</h1>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Filters Sidebar */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-sm p-6 space-y-6 sticky top-24'>
              <div>
                <label className='block text-sm font-medium text-gray-900 mb-2'>
                  City
                </label>
                <select
                  value={filters.city}
                  onChange={(e) =>
                    setFilters({ ...filters, city: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
                >
                  <option value=''>All Cities</option>
                  {allcities?.map((city,index) => (
                    <option
                      key={index}
                      value={city?.city}
                    >
                      {city.city}, {city?.country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-900 mb-2'>
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
                >
                  <option value=''>All Categories</option>
                  {Object.entries(TOUR_CATEGORIES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-900 mb-2'>
                  Price Range
                </label>
                <div className='space-y-2'>
                  <Input
                    type='number'
                    placeholder='Min'
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, minPrice: e.target.value })
                    }
                  />
                  <Input
                    type='number'
                    placeholder='Max'
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, maxPrice: e.target.value })
                    }
                  />
                </div>
              </div>

              <Button
                variant='outline'
                className='w-full bg-transparent'
                onClick={() =>
                  setFilters({
                    city: '',
                    category: '',
                    language: '',
                    minPrice: '',
                    maxPrice: '',
                  })
                }
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className='lg:col-span-3'>
            {loading ? (
              <div className='text-center py-12'>Loading tours...</div>
            ) : listings.length === 0 ? (
              <div className='text-center py-12'>
                <p className='text-gray-600 text-lg mb-4'>
                  No tours found matching your criteria
                </p>
                <Button
                  onClick={() =>
                    setFilters({
                      city: '',
                      category: '',
                      language: '',
                      minPrice: '',
                      maxPrice: '',
                    })
                  }
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                {listings.map((listing) => (
                  <Link key={listing._id} href={`/tours/${listing._id}`}>
                    <Card className='overflow-hidden hover:shadow-lg transition h-full cursor-pointer py-0'>
                      <div className='relative w-full h-48 bg-gray-200'>
                        <Image
                          src={listing.images[0] || '/placeholder.svg'}
                          alt={listing.title}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <CardContent className='p-4 space-y-3'>
                        <div>
                          <h3 className='font-bold text-gray-900 line-clamp-2'>
                            {listing.title}
                          </h3>
                          <p className='text-sm text-gray-600 flex items-center gap-1 mt-1'>
                            <MapPin className='w-4 h-4' />
                            {listing.city}, {listing.country}
                          </p>
                        </div>

                        <p className='text-sm text-gray-600 line-clamp-2'>
                          {listing.description}
                        </p>

                        <div className='flex items-center justify-between text-sm pt-2 border-t'>
                          <div className='flex items-center gap-2'>
                            <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                            <span className='font-medium'>
                              {listing.averageRating.toFixed(1)}
                            </span>
                            <span className='text-gray-500'>
                              ({listing.totalBookings})
                            </span>
                          </div>
                          <div className='flex items-center gap-1 text-gray-600'>
                            <Clock className='w-4 h-4' />
                            {listing.duration}h
                          </div>
                        </div>

                        <div className='flex items-center justify-between pt-2 border-t'>
                          <span className='font-bold text-teal-600 text-lg'>
                            ${listing.price}
                          </span>
                          <span className='text-xs text-gray-500 flex items-center gap-1'>
                            <Users className='w-3 h-3' />
                            Max {listing.maxGroupSize}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
