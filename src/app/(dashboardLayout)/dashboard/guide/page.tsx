"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/db-mock";

import {
  BookingStatus,
  UserRole,
  type Booking,
  type TourListing,
} from "@/lib/types";
import { getListingsService } from "@/services/listing/listing.service";
import { CheckCircle, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GuideDashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [listings, setListings] = useState<TourListing[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!authLoading && (!user || user.role !== UserRole.GUIDE)) {
  //     router.push('/login');
  //   }
  // }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.id && user.role === UserRole.GUIDE) {
      Promise.all([fetchListings(), fetchBookings()]);
    }
  }, [user?.id, user?.role]);

  const fetchListings = async () => {
    try {
      const allListings = await getListingsService();
      setListings(allListings.data.data);
    } catch (error) {
      console.error("[v0] Failed to fetch listings:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      // const response = await fetch(`/api/bookings?guideId=${user?.id}`);
      // const data = await response.json();
      // if (data.success && Array.isArray(data.data)) {
      //   setBookings(data.data);
      // }
      setBookings(db.getBookingsByGuide(user?.id as string));
    } catch (error) {
      console.error("[v0] Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      // const response = await fetch(`/api/bookings/${bookingId}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: BookingStatus.CONFIRMED }),
      // });

      // if (response.ok) {
      //   await fetchBookings();
      // }
      db.updateBooking(bookingId, { status: BookingStatus.CONFIRMED });
      await fetchBookings();
    } catch (error) {
      console.error("[v0] Failed to accept booking:", error);
    }
  };

  const handleRejectBooking = async (bookingId: string) => {
    try {
      // const response = await fetch(`/api/bookings/${bookingId}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: BookingStatus.CANCELLED }),
      // });

      // if (response.ok) {
      //   await fetchBookings();
      // }
      db.updateBooking(bookingId, { status: BookingStatus.CANCELLED });
      await fetchBookings();
    } catch (error) {
      console.error("[v0] Failed to reject booking:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const pendingBookings = bookings.filter(
    (b) => b.status === BookingStatus.PENDING
  );
  const confirmedBookings = bookings.filter(
    (b) => b.status === BookingStatus.CONFIRMED
  );

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Guide Dashboard
            </h1>
            <p className="text-gray-600">Manage your tours and bookings</p>
          </div>
          <Link href="/dashboard/listings/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Tour
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading...</div>
        ) : (
          <div className="space-y-8">
            {/* Pending Bookings */}
            {pendingBookings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    Pending Booking Requests ({pendingBookings.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingBookings.map((booking) => (
                      <div key={booking.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-bold text-gray-900">
                              Booking Request
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {booking.groupSize} people •{" "}
                              {new Date(
                                booking.requestedDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <span className="font-bold text-blue-600">
                            ${booking.totalPrice}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAcceptBooking(booking.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleRejectBooking(booking.id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600"
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
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Confirmed Bookings ({confirmedBookings.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {confirmedBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 border rounded-lg bg-green-50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-gray-900">
                              Confirmed Booking
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {booking.groupSize} people •{" "}
                              {new Date(
                                booking.requestedDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <span className="font-bold text-green-600">
                            ${booking.totalPrice}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* My Tours */}
            <Card>
              <CardHeader>
                <CardTitle>My Tours ({listings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {listings.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">
                    No tours yet.{" "}
                    <Link
                      href="/dashboard/listings/new"
                      className="text-blue-600 hover:underline"
                    >
                      Create your first tour
                    </Link>
                  </p>
                ) : (
                  <div className="space-y-4">
                    {listings.map((listing) => (
                      <div key={listing.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-900">
                            {listing.title}
                          </h3>
                          <span className="text-sm font-medium text-blue-600">
                            ${listing.price}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {listing.description}
                        </p>
                        <div className="flex gap-2">
                          <Link href={`/tours/${listing.id}`}>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </Link>
                          <Link href={`/dashboard/listings/${listing.id}/edit`}>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
