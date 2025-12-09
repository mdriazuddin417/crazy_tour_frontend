
'use client';

import { DateCell } from '@/components/shared/cell/DateCell';
import { Column } from '@/components/shared/ManagementTable';
import { Badge } from '@/components/ui/badge';
import { Booking, BookingStatus, IUser, Payment, TourListing } from '@/lib/types';

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

export const bookingColumns: Column<Booking>[] = [
  {
    header: 'Title',
    accessor: (booking) => (
      <span className='text-sm font-mono'>
        {(booking?.tourListingId as Partial<TourListing>)?.title || 'N/A'}
      </span>
    ),
    sortKey: '_id',
  },
  {
    header: 'Tourist Name',
    accessor: (booking) => (
      <span className='text-sm font-mono'>
        {(booking?.touristId as  Partial<IUser>)?.name || 'N/A'}
      </span>
    ),
    sortKey: 'touristId',
  },
  {
    header: 'Guide Name',
    accessor: (booking) => (
      <span className='text-sm font-mono'>
        {(booking?.guideId as Partial<IUser>)?.name || 'N/A'}
      </span>
    ),
    sortKey: 'guideId',
  },

  {
    header: 'Status',
    accessor: (booking) => getStatusBadge(booking.status),
    sortKey: 'status',
  },
  {
    header: 'Requested Date',
    accessor: (booking) => <DateCell date={booking.requestedDate} />,
    sortKey: 'requestedDate',
  },
  {
    header: 'Group Size',
    accessor: (booking) => (
      <span className='text-sm font-medium'>{booking.groupSize}</span>
    ),
    sortKey: 'groupSize',
  },
  {
    header: 'Total Price',
    accessor: (booking) => (
      <span className='text-sm font-semibold'>
        ${booking.totalPrice.toFixed(2)}
      </span>
    ),
    sortKey: 'totalPrice',
  },
  {
    header: 'Payment Status',
    accessor: (booking) => (
      <span className='text-sm font-mono text-muted-foreground'>
        {(booking?.paymentId as Partial<Payment>)?.status || 'N/A'}
      </span>
    ),
  },
  {
    header: 'Completed At',
    accessor: (booking) =>
      booking.updatedAt ? (
        <DateCell date={booking.updatedAt} />
      ) : (
        <span className='text-sm text-muted-foreground'>N/A</span>
      ),
    sortKey: 'updatedAt',
  },
  {
    header: 'Created At',
    accessor: (booking) => <DateCell date={booking.createdAt} />,
    sortKey: 'createdAt',
  },
];
