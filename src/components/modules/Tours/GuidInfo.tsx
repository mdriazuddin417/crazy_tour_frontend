/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const GuidInfo = ({ guide }:any) => {
    return (
        <div>
            {guide && (
              <Card>
                <CardHeader>
                  <CardTitle>About Your Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 bg-gray-200 rounded-full overflow-hidden shrink-0">
                      {guide.profilePic && (
                        <Image
                          src={guide.profilePic}
                          alt={guide.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/profile/${guide._id}`}
                        className="font-bold text-gray-900 hover:text-blue-600"
                      >
                        {guide.name}
                      </Link>
                      {guide.verified && (
                        <p className="text-green-600 text-sm font-medium">
                          Verified Guide
                        </p>
                      )}
                      <p className="text-gray-600 text-sm mt-1">{guide.bio}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>{guide.totalToursGiven} tours</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {guide.averageRating?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
        </div>
    );
};

export default GuidInfo;