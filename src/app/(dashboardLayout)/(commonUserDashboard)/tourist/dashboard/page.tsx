/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import BookingTable from '@/components/modules/Dashboard/Admin/BookingManagement/BookingTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type Booking, type TourListing } from '@/lib/types';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { getBookingsService } from '@/services/booking/booking.service';
import { getListingByIdService } from '@/services/listing/listing.service';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TouristDashboardPage() {
  const [bookings, setBookings] = useState<
    (Booking & { tourListingId?: Partial<TourListing> })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    fetchUserAndBookings();
  }, []);

  const fetchUserAndBookings = async () => {
    try {
      const userInfo = await getUserInfo();

      const bookingsRes = await getBookingsService();

      if (bookingsRes.success && bookingsRes.data?.data) {
        // Filter bookings for current tourist
        const touristBookings = bookingsRes.data.data.filter(
          (booking: Booking) => (booking?.touristId as any)?._id === userInfo?._id
        );
        // Fetch tour listing details for each booking
        const bookingsWithListings = await Promise.all(
          touristBookings.map(async (booking: Booking) => {
            try {
              const listingRes = await getListingByIdService(
                booking.tourListingId
              );
              if (listingRes.success && listingRes.data) {
                return {
                  ...booking,
                  tourListingId: listingRes.data,
                };
              }
              return booking;
            } catch (error) {
              console.error(
                `Failed to fetch listing for booking ${booking._id}:`,
                error
              );
              return booking;
            }
          })
        );

        setBookings(bookingsWithListings);
      }
    } catch (error) {
      console.error('Failed to fetch user and bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const now = new Date();
  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.requestedDate);
    const isUpcoming = bookingDate > now;
    return activeTab === 'upcoming' ? isUpcoming : !isUpcoming;
  });

  // Calculate stats
  const upcomingCount = bookings.filter((b) => b.status == 'PENDING').length;
  const pastCount = bookings.filter((b) => b.status == 'COMPLETED').length;
  const totalSpent = bookings
    .filter((b) => b.status == 'COMPLETED')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <main className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>My Bookings</h1>
          <p className='text-gray-600'>
            Track your tour bookings and experiences
          </p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <Card>
            <CardContent className='pt-6'>
              <div className='text-sm font-medium text-gray-600 mb-1'>
                Upcoming Tours
              </div>
              <div className='text-3xl font-bold text-gray-900'>
                {upcomingCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <div className='text-sm font-medium text-gray-600 mb-1'>
                Completed Tours
              </div>
              <div className='text-3xl font-bold text-gray-900'>
                {pastCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <div className='text-sm font-medium text-gray-600 mb-1'>
                Total Spent
              </div>
              <div className='text-3xl font-bold text-green-600'>
                ${totalSpent.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className='text-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
            <p className='text-gray-600'>Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <Card>
            <CardContent className='p-12 text-center'>
              <p className='text-gray-600 mb-4 text-lg'>
                {activeTab === 'upcoming'
                  ? "You don't have any upcoming bookings yet"
                  : 'No completed tours yet'}
              </p>
              <Link href='/explore'>
                <Button className='gap-2'>Explore Tours</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <BookingTable bookings={filteredBookings?.slice(0, 4)} />
        )}
      </div>
    </main>
  );
}
