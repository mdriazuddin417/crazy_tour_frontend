'use client';

import { DateCell } from '@/components/shared/cell/DateCell';
import { StatusBadgeCell } from '@/components/shared/cell/StatusBadgeCell';
import { Column } from '@/components/shared/ManagementTable';
import { Badge } from '@/components/ui/badge';
import { TourListing } from '@/lib/types';

export const tourListingColumns: Column<TourListing>[] = [
  {
    header: 'Title',
    accessor: (listing) => (
      <span className='text-sm font-medium max-w-[200px] truncate'>
        {listing.title}
      </span>
    ),
    sortKey: 'title',
  },
  {
    header: 'Category',
    accessor: (listing) => <Badge variant='outline'>{listing.category}</Badge>,
    sortKey: 'category',
  },
  {
    header: 'Location',
    accessor: (listing) => (
      <div className='flex flex-col'>
        <span className='text-sm font-medium'>{listing.city}</span>
        <span className='text-xs text-muted-foreground'>{listing.country}</span>
      </div>
    ),
    sortKey: 'city',
  },
  {
    header: 'Guide ID',
    accessor: (listing) => (
      <span className='text-sm font-mono'>
        {listing.guideId?.slice(0, 8) || 'N/A'}
      </span>
    ),
    sortKey: 'guideId',
  },
  {
    header: 'Price',
    accessor: (listing) => (
      <span className='text-sm font-semibold'>${listing.price.toFixed(2)}</span>
    ),
    sortKey: 'price',
  },
  {
    header: 'Duration',
    accessor: (listing) => <span className='text-sm'>{listing.duration}h</span>,
    sortKey: 'duration',
  },
  {
    header: 'Max Group Size',
    accessor: (listing) => (
      <span className='text-sm font-medium'>{listing.maxGroupSize}</span>
    ),
    sortKey: 'maxGroupSize',
  },
  {
    header: 'Meeting Point',
    accessor: (listing) => (
      <span className='text-sm max-w-[150px] truncate'>
        {listing.meetingPoint}
      </span>
    ),
  },
  {
    header: 'Languages',
    accessor: (listing) => (
      <div className='flex flex-wrap gap-1'>
        {listing.languages && listing.languages.length > 0 ? (
          listing.languages.slice(0, 2).map((lang, idx) => (
            <Badge key={idx} variant='outline' className='text-xs'>
              {lang}
            </Badge>
          ))
        ) : (
          <span className='text-sm text-muted-foreground'>N/A</span>
        )}
        {listing.languages && listing.languages.length > 2 && (
          <span className='text-xs text-muted-foreground'>
            +{listing.languages.length - 2}
          </span>
        )}
      </div>
    ),
  },
  {
    header: 'Status',
    accessor: (listing) => (
      <StatusBadgeCell
        isDeleted={!listing.isActive}
        activeText='Active'
        deletedText='Inactive'
      />
    ),
    sortKey: 'isActive',
  },
  {
    header: 'Total Bookings',
    accessor: (listing) => (
      <span className='text-sm font-medium'>{listing.totalBookings || 0}</span>
    ),
    sortKey: 'totalBookings',
  },
  {
    header: 'Rating',
    accessor: (listing) => (
      <span className='text-sm font-medium'>
        {listing.averageRating
          ? `${listing.averageRating.toFixed(1)} ⭐`
          : 'N/A'}
      </span>
    ),
    sortKey: 'averageRating',
  },
  {
    header: 'Created',
    accessor: (listing) => <DateCell date={listing.createdAt} />,
    sortKey: 'createdAt',
  },
];
