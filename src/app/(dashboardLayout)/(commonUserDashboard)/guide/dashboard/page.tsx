'use client';

import TourListingCard from '@/components/modules/Dashboard/GuidTours/TourListingCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingStatus, type Booking, type TourListing } from '@/lib/types';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { getBookingsService } from '@/services/booking/booking.service';
import { getListingsService } from '@/services/listing/listing.service';
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Plus,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function GuideDashboardPage() {
  const [listings, setListings] = useState<TourListing[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userInfo, listingsRes, bookingsRes] = await Promise.all([
        getUserInfo(),
        getListingsService(),
        getBookingsService(),
      ]);

      if (listingsRes.success && listingsRes.data?.data) {
        // Filter listings for current guide
        const guideListings = listingsRes.data.data.filter(
          (listing: TourListing) => listing.guideId === userInfo?._id
        );
   
        setListings(guideListings);
      }

      console.log('bookingsRes',bookingsRes);

      if (bookingsRes.success && bookingsRes.data?.data) {
        // Filter bookings for current guide
        const guideBookings = bookingsRes.data.data.filter(
          (booking: Booking) => booking.guideId === userInfo?._id
        );
             console.log('bookingsRes.data.data',bookingsRes.data.data);
        setBookings(guideBookings);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: BookingStatus.CONFIRMED }),
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Failed to accept booking:', error);
    }
  };

  const handleRejectBooking = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: BookingStatus.CANCELLED }),
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Failed to reject booking:', error);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const pendingBookings = bookings.filter(
    (b) => b.status === BookingStatus.PENDING
  );
  const confirmedBookings = bookings.filter(
    (b) => b.status === BookingStatus.CONFIRMED
  );

  const totalRevenue = bookings
    .filter(
      (b) =>
        b.status === BookingStatus.COMPLETED ||
        b.status === BookingStatus.CONFIRMED
    )
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const activeListings = listings.filter((l) => l.isActive).length;

  return (
    <main className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Guide Dashboard
            </h1>
            <p className='text-gray-600 mt-1'>Manage your tours and bookings</p>
          </div>
          <Link href='/guide/dashboard/listings/new'>
            <Button className='gap-2'>
              <Plus className='w-4 h-4' />
              Create Tour
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-600'>
                Active Tours
              </CardTitle>
              <TrendingUp className='h-4 w-4 text-blue-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-gray-900'>
                {activeListings}
              </div>
              <p className='text-xs text-gray-500 mt-1'>
                {listings.length} total tours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-600'>
                Pending Requests
              </CardTitle>
              <Clock className='h-4 w-4 text-yellow-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-gray-900'>
                {pendingBookings.length}
              </div>
              <p className='text-xs text-gray-500 mt-1'>
                Awaiting your response
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-600'>
                Confirmed Bookings
              </CardTitle>
              <CheckCircle className='h-4 w-4 text-green-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-gray-900'>
                {confirmedBookings.length}
              </div>
              <p className='text-xs text-gray-500 mt-1'>Upcoming tours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-600'>
                Total Revenue
              </CardTitle>
              <DollarSign className='h-4 w-4 text-green-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-gray-900'>
                ${totalRevenue.toFixed(2)}
              </div>
              <p className='text-xs text-gray-500 mt-1'>
                From completed bookings
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-8'>
          {/* Pending Bookings */}
          {pendingBookings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Clock className='w-5 h-5 text-yellow-600' />
                  Pending Booking Requests ({pendingBookings.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {pendingBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className='p-4 border rounded-lg bg-yellow-50 border-yellow-200'
                    >
                      <div className='flex justify-between items-start mb-4'>
                        <div className='flex-1'>
                          <p className='font-bold text-gray-900'>
                            Booking Request
                          </p>
                          <div className='flex flex-wrap gap-4 mt-2 text-sm text-gray-600'>
                            <span className='flex items-center gap-1'>
                              <Users className='w-4 h-4' />
                              {booking.groupSize} people
                            </span>
                            <span className='flex items-center gap-1'>
                              <Calendar className='w-4 h-4' />
                              {new Date(
                                booking.requestedDate
                              ).toLocaleDateString()}
                            </span>
                            {booking.notes && (
                              <span className='text-gray-500'>
                                Note: {booking.notes}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className='font-bold text-blue-600 text-lg'>
                          ${booking.totalPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          onClick={() => handleAcceptBooking(booking._id || '')}
                          size='sm'
                          className='bg-green-600 hover:bg-green-700'
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleRejectBooking(booking._id || '')}
                          size='sm'
                          variant='outline'
                          className='text-red-600 border-red-600 hover:bg-red-50'
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Confirmed Bookings */}
          {confirmedBookings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <CheckCircle className='w-5 h-5 text-green-600' />
                  Confirmed Bookings ({confirmedBookings.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {confirmedBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className='p-4 border rounded-lg bg-green-50 border-green-200'
                    >
                      <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                          <p className='font-bold text-gray-900'>
                            Confirmed Booking
                          </p>
                          <div className='flex flex-wrap gap-4 mt-2 text-sm text-gray-600'>
                            <span className='flex items-center gap-1'>
                              <Users className='w-4 h-4' />
                              {booking.groupSize} people
                            </span>
                            <span className='flex items-center gap-1'>
                              <Calendar className='w-4 h-4' />
                              {new Date(
                                booking.requestedDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <span className='font-bold text-green-600 text-lg'>
                          ${booking.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* My Tours */}

          <div>
            {listings.length === 0 ? (
              <div className='text-center py-12'>
                <p className='text-gray-600 mb-4'>
                  No tours yet. Create your first tour to get started!
                </p>
                <Link href='/dashboard/listings/new'>
                  <Button className='gap-2'>
                    <Plus className='w-4 h-4' />
                    Create Your First Tour
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {listings?.slice(0,4).map((listing: TourListing) => (
              <TourListingCard listing={listing} key={listing?._id} />
            ))}
          </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
