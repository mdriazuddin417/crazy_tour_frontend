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
import { Booking, BookingStatus } from '@/lib/types';

import {
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  User,
  Users,
} from 'lucide-react';

interface IBookingViewDialogProps {
  open: boolean;
  onClose: () => void;
  booking: Booking | null;
}

const getStatusBadge = (status: BookingStatus) => {
  const statusConfig = {
    [BookingStatus.PENDING]: {
      variant: 'outline' as const,
      className: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    },
    [BookingStatus.CONFIRMED]: {
      variant: 'default' as const,
      className: 'bg-green-50 text-green-700 border-green-200',
    },
    [BookingStatus.COMPLETED]: {
      variant: 'secondary' as const,
      className: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    [BookingStatus.CANCELLED]: {
      variant: 'destructive' as const,
      className: 'bg-red-50 text-red-700 border-red-200',
    },
  };

  const config = statusConfig[status] || statusConfig[BookingStatus.PENDING];

  return (
    <Badge variant={config.variant} className={config.className}>
      {status}
    </Badge>
  );
};

const BookingViewDetailDialog = ({
  open,
  onClose,
  booking,
}: IBookingViewDialogProps) => {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='min-w-5xl max-h-[90vh] flex flex-col p-0'>
        <DialogHeader className='px-6 pt-6 pb-4'>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto px-6 pb-6'>
          {/* Booking Header */}
          <div className='flex flex-col sm:flex-row items-start gap-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg mb-6'>
            <div className='flex-1'>
              <div className='flex items-center gap-3 mb-3'>
                <h2 className='text-3xl font-bold'>
                  Booking #{booking?._id?.slice(0, 8) || 'N/A'}
                </h2>
                {getStatusBadge(booking?.status)}
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Calendar className='h-4 w-4' />
                <span>
                  Requested: {formatDateTime(booking?.requestedDate || '')}
                </span>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className='space-y-6'>
            {/* Booking IDs */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <FileText className='h-5 w-5 text-purple-600' />
                <h3 className='font-semibold text-lg'>Booking Information</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                <InfoRow label='Booking ID' value={booking?._id || 'N/A'} />
                <InfoRow
                  label='Tour Listing ID'
                  value={
                    typeof booking?.tourListingId === 'string'
                      ? booking.tourListingId.slice(0, 8)
                      : booking?.tourListingId?._id?.slice(0, 8) || 'N/A'
                  }
                />
                <InfoRow
                  label='Tourist ID'
                  value={
                    typeof booking?.touristId === 'string'
                      ? booking.touristId.slice(0, 8)
                      : booking?.touristId?._id?.slice(0, 8) || 'N/A'
                  }
                />
                <InfoRow
                  label='Guide ID'
                  value={
                    typeof booking?.guideId === 'string'
                      ? booking.guideId.slice(0, 8)
                      : booking?.guideId?._id?.slice(0, 8) || 'N/A'
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Participants Information */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <User className='h-5 w-5 text-blue-600' />
                <h3 className='font-semibold text-lg'>Participants</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                <InfoRow
                  label='Tourist Name'
                  value={
                    typeof booking?.touristId === 'object' &&
                    booking?.touristId?.name
                      ? booking.touristId.name
                      : typeof booking?.touristId === 'string'
                      ? booking.touristId.slice(0, 8)
                      : 'N/A'
                  }
                />
                <InfoRow
                  label='Guide Name'
                  value={
                    typeof booking?.guideId === 'object' &&
                    booking?.guideId?.name
                      ? booking.guideId.name
                      : typeof booking?.guideId === 'string'
                      ? booking.guideId.slice(0, 8)
                      : 'N/A'
                  }
                />
                <div className='flex items-start gap-3'>
                  <Users className='h-4 w-4 mt-1 text-muted-foreground' />
                  <InfoRow
                    label='Group Size'
                    value={booking?.groupSize || 'N/A'}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Booking Details */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <Clock className='h-5 w-5 text-orange-600' />
                <h3 className='font-semibold text-lg'>Booking Details</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                <InfoRow label='Status' value={booking?.status || 'N/A'} />
                <InfoRow
                  label='Requested Date'
                  value={formatDateTime(booking?.requestedDate || '')}
                />
                {booking?.completedAt && (
                  <InfoRow
                    label='Completed At'
                    value={formatDateTime(booking.completedAt)}
                  />
                )}
              </div>
            </div>

            <Separator />

            {/* Pricing Information */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <DollarSign className='h-5 w-5 text-green-600' />
                <h3 className='font-semibold text-lg'>Pricing</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                <div className='flex items-start gap-3'>
                  <DollarSign className='h-4 w-4 mt-1 text-muted-foreground' />
                  <InfoRow
                    label='Total Price'
                    value={`$${booking?.totalPrice.toFixed(2)}`}
                  />
                </div>
                {booking?.paymentId && (
                  <div className='flex items-start gap-3'>
                    <CreditCard className='h-4 w-4 mt-1 text-muted-foreground' />
                    <InfoRow
                      label='Payment ID'
                      value={
                        typeof booking.paymentId === 'string'
                          ? booking.paymentId.slice(0, 8)
                          : booking.paymentId?.id?.slice(0, 8) || 'N/A'
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            {booking?.notes && (
              <>
                <Separator />
                <div>
                  <div className='flex items-center gap-2 mb-4'>
                    <FileText className='h-5 w-5 text-indigo-600' />
                    <h3 className='font-semibold text-lg'>Notes</h3>
                  </div>
                  <div className='bg-muted/50 p-4 rounded-lg'>
                    <p className='text-sm whitespace-pre-wrap'>
                      {booking.notes}
                    </p>
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Timestamps */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <Calendar className='h-5 w-5 text-gray-600' />
                <h3 className='font-semibold text-lg'>Timestamps</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                <InfoRow
                  label='Created At'
                  value={formatDateTime(booking?.createdAt || '')}
                />
                <InfoRow
                  label='Last Updated'
                  value={formatDateTime(booking?.updatedAt || '')}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingViewDetailDialog;
