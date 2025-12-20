import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TourListing } from "@/lib/types";

const AboutTour = ({ listing }: { listing: Partial<TourListing> }) => {
    return (
        <div>
            <Card>
              <CardHeader>
                <CardTitle>About This Tour</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{listing.description}</p>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Itinerary</h3>
                  <ul className="space-y-2">
                    {listing?.itinerary?.map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-teal-600 font-bold">
                          {idx + 1}.
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-bold text-gray-900 mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {listing?.languages?.map((lang: string) => (
                      <span
                        key={lang}
                        className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Meeting Point
                  </h3>
                  <p className="text-gray-700">{listing.meetingPoint}</p>
                </div>
              </CardContent>
            </Card>
        </div>
    );
};

export default AboutTour;