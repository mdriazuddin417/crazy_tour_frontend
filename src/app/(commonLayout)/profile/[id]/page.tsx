"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser, type Review, UserRole } from "@/lib/types";
import { getReviewByGuidIdService } from "@/services/review/review.service";
import { getUserByIdService } from "@/services/user/user.service";
import { BadgeCheck, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string>("");
  const [user, setUser] = useState<IUser | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { id: paramId } = await params;
      setId(paramId);

      try {
        const userRes = await getUserByIdService(paramId);

        if (userRes.success) {
          setUser(userRes.data);

          if (userRes.data.role === UserRole.GUIDE) {
            const reviewsRes = await getReviewByGuidIdService(paramId);
            if (reviewsRes.success) {
              setReviews(reviewsRes.data.data);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        User not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* <div className="relative w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                {user.profilePic && (
                  <Image src={user.profilePic || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                )}
              </div> */}
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary overflow-hidden">
                {user.profilePic ? (
                  // If profilePic is a URL
                  // You may swap for next/image if desired
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user.name?.charAt(0)?.toUpperCase() || "U"
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user.name}
                  </h1>
                  {user.verified && (
                    <BadgeCheck className="w-6 h-6 text-green-600" />
                  )}
                </div>

                <p className="text-gray-600 mb-4">{user.bio}</p>

                <div className="flex flex-wrap gap-6 mb-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Languages</p>
                    <div className="flex gap-2 mt-1">
                      {user.languagesSpoken.map((lang: string) => (
                        <span
                          key={lang}
                          className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {user.role === UserRole.GUIDE && (
                    <>
                      <div>
                        <p className="text-sm text-gray-600">Hourly Rate</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          ${user.dailyRate}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-lg">
                            {user.averageRating?.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Tours Completed</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {user.totalToursGiven}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guide Specific Info */}
        {user.role === UserRole.GUIDE && user.expertise && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Areas of Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {user.expertise.map((exp: string) => (
                  <span
                    key={exp}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reviews Section */}
        {user.role === UserRole.GUIDE && reviews.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Guest Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review,index) => (
                  <div
                    key={index}
                    className="pb-4 border-b last:border-b-0"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          Guest Review
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {user.role === UserRole.GUIDE && reviews.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">
                No reviews yet. This guide is new!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
