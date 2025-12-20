import InfoRow from '@/components/shared/InoRow';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { formatDateTime } from '@/lib/formatters';
import { TourListing } from '@/lib/types';

import {
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Image as ImageIcon,
  Languages,
  List,
  MapPin,
  Star,
  Users,
  XCircle,
} from 'lucide-react';

interface ITourListingViewDialogProps {
  open: boolean;
  onClose: () => void;
  tourListing: TourListing | null;
}

const TourListingViewDetailDialog = ({
  open,
  onClose,
  tourListing,
}: ITourListingViewDialogProps) => {
  if (!tourListing) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='min-w-5xl max-h-[90vh] flex flex-col p-0'>
        <DialogHeader className='px-6 pt-6 pb-4'>
          <DialogTitle>Tour Listing Details</DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto px-6 pb-6'>
          {/* Tour Listing Header */}
          <div className='flex flex-col sm:flex-row items-start gap-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg mb-6'>
            <div className='flex-1'>
              <h2 className='text-3xl font-bold mb-2'>{tourListing?.title}</h2>
              <div className='flex flex-wrap gap-2 mb-3'>
                <Badge variant='outline'>{tourListing?.category}</Badge>
                <Badge
                  variant={tourListing?.isActive ? 'default' : 'destructive'}
                  className='text-sm'
                >
                  {tourListing?.isActive ? (
                    <>
                      <CheckCircle2 className='h-3 w-3 mr-1' />
                      Active
                    </>
                  ) : (
                    <>
                      <XCircle className='h-3 w-3 mr-1' />
                      Inactive
                    </>
                  )}
                </Badge>
              </div>
              <p className='text-muted-foreground text-sm line-clamp-3'>
                {tourListing?.description}
              </p>
            </div>
          </div>

          {/* Information Grid */}
          <div className='space-y-6'>
            {/* Basic Information */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <List className='h-5 w-5 text-purple-600' />
                <h3 className='font-semibold text-lg'>Basic Information</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                <InfoRow label='Tour ID' value={tourListing?._id || 'N/A'} />
                <InfoRow
                  label='Guide ID'
                  value={tourListing?.guideId?.slice(0, 8) || 'N/A'}
                />
                <InfoRow label='Title' value={tourListing?.title || 'N/A'} />
                <InfoRow
                  label='Category'
                  value={tourListing?.category || 'N/A'}
                />
                <div className='md:col-span-2'>
                  <InfoRow
                    label='Description'
                    value={tourListing?.description || 'N/A'}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Location Information */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <MapPin className='h-5 w-5 text-red-600' />
                <h3 className='font-semibold text-lg'>Location</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                <InfoRow label='City' value={tourListing?.city || 'N/A'} />
                <InfoRow
                  label='Country'
                  value={tourListing?.country || 'N/A'}
                />
                <div className='md:col-span-2'>
                  <InfoRow
                    label='Meeting Point'
                    value={tourListing?.meetingPoint || 'N/A'}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Pricing & Duration */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <DollarSign className='h-5 w-5 text-green-600' />
                <h3 className='font-semibold text-lg'>Pricing & Duration</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                <div className='flex items-start gap-3'>
                  <DollarSign className='h-4 w-4 mt-1 text-muted-foreground' />
                  <InfoRow
                    label='Price'
                    value={`$${tourListing?.price.toFixed(2)}`}
                  />
                </div>
                <div className='flex items-start gap-3'>
                  <Clock className='h-4 w-4 mt-1 text-muted-foreground' />
                  <InfoRow
                    label='Duration'
                    value={`${tourListing?.duration} hours`}
                  />
                </div>
                <div className='flex items-start gap-3'>
                  <Users className='h-4 w-4 mt-1 text-muted-foreground' />
                  <InfoRow
                    label='Max Group Size'
                    value={tourListing?.maxGroupSize || 'N/A'}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Languages */}
            {tourListing?.languages && tourListing.languages.length > 0 && (
              <>
                <div>
                  <div className='flex items-center gap-2 mb-4'>
                    <Languages className='h-5 w-5 text-teal-600' />
                    <h3 className='font-semibold text-lg'>Languages</h3>
                  </div>
                  <div className='flex flex-wrap gap-2 bg-muted/50 p-4 rounded-lg'>
                    {tourListing.languages.map((lang, idx) => (
                      <Badge key={idx} variant='outline'>
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Itinerary */}
            {tourListing?.itinerary && tourListing.itinerary.length > 0 && (
              <>
                <div>
                  <div className='flex items-center gap-2 mb-4'>
                    <List className='h-5 w-5 text-orange-600' />
                    <h3 className='font-semibold text-lg'>Itinerary</h3>
                  </div>
                  <div className='bg-muted/50 p-4 rounded-lg'>
                    <ol className='list-decimal list-inside space-y-2'>
                      {tourListing.itinerary.map((item, idx) => (
                        <li key={idx} className='text-sm'>
                          {item}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Images */}
            {tourListing?.images && tourListing.images.length > 0 && (
              <>
                <div>
                  <div className='flex items-center gap-2 mb-4'>
                    <ImageIcon className='h-5 w-5 text-pink-600' />
                    <h3 className='font-semibold text-lg'>Images</h3>
                  </div>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4 bg-muted/50 p-4 rounded-lg'>
                    {tourListing.images.map((image, idx) => (
                      <div
                        key={idx}
                        className='aspect-video rounded-lg overflow-hidden border'
                      >
                        <img
                          src={image}
                          alt={`Tour image ${idx + 1}`}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Statistics */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <Star className='h-5 w-5 text-yellow-600' />
                <h3 className='font-semibold text-lg'>Statistics</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                <InfoRow
                  label='Total Bookings'
                  value={tourListing?.totalBookings || 0}
                />
                <div className='flex items-start gap-3'>
                  <Star className='h-4 w-4 mt-1 text-muted-foreground' />
                  <InfoRow
                    label='Average Rating'
                    value={
                      tourListing?.averageRating
                        ? `${tourListing.averageRating.toFixed(1)} ⭐`
                        : 'N/A'
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Information */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <Calendar className='h-5 w-5 text-indigo-600' />
                <h3 className='font-semibold text-lg'>Timestamps</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                <InfoRow
                  label='Created At'
                  value={formatDateTime(tourListing?.createdAt || '')}
                />
                <InfoRow
                  label='Last Updated'
                  value={formatDateTime(tourListing?.updatedAt || '')}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TourListingViewDetailDialog;
