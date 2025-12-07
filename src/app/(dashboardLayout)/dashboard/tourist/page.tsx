"use client";

import AllBookedTour from "@/components/modules/Dashboard/Tourist/AllBookedTour";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  IUser,
  type Booking
} from "@/lib/types";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getBookingsService } from "@/services/booking/booking.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TouristDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  // useEffect(() => {
  //   if (!authLoading && (!user || user.role !== UserRole.TOURIST)) {
  //     router.push('/login');
  //   }
  // }, [user, authLoading, router]);

  useEffect(() => {
    fetchUserAndListings();
    fetchBookings();
  }, []);

  const fetchUserAndListings = async () => {
    try {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    } catch (error) {
      console.error("[v0] Failed to fetch user and listings:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const bookingsRes = await getBookingsService();
      console.log("booking res", bookingsRes);

      if(bookingsRes.success) {
        setBookings(bookingsRes.data.data);
      }
    } catch (error) {
      console.error("[v0] Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const now = new Date();
  const filteredBookings = bookings.filter((booking) => {
    const isUpcoming = new Date(booking.requestedDate) > now;
    return activeTab === "upcoming" ? isUpcoming : !isUpcoming;
  });


  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600 mb-8">
          Track your tour bookings and experiences
        </p>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === "upcoming"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Upcoming Tours
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === "past"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Past Tours
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-600">
            Loading bookings...
          </div>
        ) : filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-600 mb-4">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming bookings yet"
                  : "No completed tours yet"}
              </p>
              <Link href="/explore">
                <Button>Explore Tours</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <AllBookedTour filteredBookings={filteredBookings}/>
        )}
      </div>
    </main>
  );
}
