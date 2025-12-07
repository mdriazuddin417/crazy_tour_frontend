"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { TourListing } from "@/lib/types";
import { getListingsService } from "@/services/listing/listing.service";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ListingsPage() {
  const  user  = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    profilePhoto: "https://i.ibb.co.com/2qjhNvx/bg-1.jpg",
    contactNumber: "1234567890",
    address: "123 Main St, City, Country",
  }
  const [listings, setListings] = useState<TourListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchListings();
    }
  }, [user?.id]);

  const fetchListings = async () => {
    try {
      const allListings = await getListingsService();
      console.log('allListings.data.data',allListings.data.data);
      setListings(allListings.data.data);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;

    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchListings();
      }
    } catch (error) {
      console.error("Failed to delete listing:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tours</h1>
            <p className="text-gray-600">
              Manage and create your tour listings
            </p>
          </div>
          <Link href="/dashboard/listings/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create New Tour
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading listings...</div>
        ) : listings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-600 mb-4">
                You haven't created any tours yet
              </p>
              <Link href="/dashboard/listings/new">
                <Button>Create Your First Tour</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {listings.map((listing) => (
              <Card key={listing.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">
                        {listing.title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {listing.description}
                      </p>
                      <div className="flex gap-4 mt-3 text-sm text-gray-600">
                        <span>
                          {listing.city}, {listing.country}
                        </span>
                        <span>•</span>
                        <span>${listing.price} per person</span>
                        <span>•</span>
                        <span>{listing.duration} hours</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Status</div>
                      <div
                        className={`text-sm font-medium mt-1 ${
                          listing.isActive ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        {listing.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Link href={`/tours/${listing.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 bg-transparent"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/listings/${listing.id}/edit`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 bg-transparent"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 gap-2 bg-transparent"
                      onClick={() => handleDelete(listing.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
