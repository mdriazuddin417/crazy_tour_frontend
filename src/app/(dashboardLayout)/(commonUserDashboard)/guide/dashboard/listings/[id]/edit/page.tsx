"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import type { IUser, TourListing } from "@/lib/types";
import {
  getListingByIdService,
  updateListingService,
} from "@/services/listing/listing.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<TourListing>>({});

  useEffect(() => {
    (async () => {
      const { id: paramId } = await params;
      setId(paramId);

      try {
        const data = await getListingByIdService(paramId);

        if (data.success) {
          setFormData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const body = {
      ...formData,
      guideId: (formData?.guideId as Partial<IUser>)._id,
    };

    try {
      const data = await updateListingService(id, body);
      console.log("data", data);

      if (data.success) {
        router.push("/guide/dashboard/listings");
      } else {
        toast.error("Failed to update listing");
      }
    } catch (error) {
      console.error("Failed to update listing:", error);
      toast.error("Error updating listing");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Tour</h1>
        <p className="text-gray-600 mb-8">Update your tour information</p>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Tour Title
                </label>
                <Input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Price per Person
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-600">
                      $
                    </span>
                    <Input
                      type="number"
                      value={formData.price || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                      className="pl-8"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Duration (hours)
                  </label>
                  <Input
                    type="number"
                    value={formData.duration || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Max Group Size
                </label>
                <Input
                  type="number"
                  value={formData.maxGroupSize || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxGroupSize: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Meeting Point
                </label>
                <Input
                  type="text"
                  value={formData.meetingPoint || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, meetingPoint: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.isActive || false}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <label
                    htmlFor="active"
                    className="text-sm font-medium text-gray-900"
                  >
                    Tour is Active
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  {submitting ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
