/* eslint-disable @typescript-eslint/no-explicit-any */
import BookedTourCard from '@/components/modules/Dashboard/Tourist/BookedTourCard';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { queryStringFormatter } from '@/lib/formatters';
import { Booking } from '@/lib/types';
import { getBookingsService } from '@/services/booking/booking.service';
import { getUserInfo } from '@/services/user/user.service';

import { Suspense } from 'react';

const AdminBookingManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { data: user } = await getUserInfo();
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const bookingsResult = await getBookingsService(queryString);

  // Handle different response structures
  const bookingsData = bookingsResult?.data?.data?.filter(
    (listing: Booking) => (listing?.touristId as any)?._id === user?._id
  );

  console.log('bookingsData',bookingsData[0]);

  return (
    <div className='space-y-6 p-4 md:p-6'>
      <ManagementPageHeader
        title='My Booked Tours'
        description='All my booked tours'
      />

      <Suspense fallback={<TableSkeleton columns={12} rows={10} />}>
       <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
         {
          bookingsData?.map((booking: Booking) => (
           <BookedTourCard key={booking._id} booking={booking} />
          ))
        }
       </div>
      </Suspense>
    </div>
  );
};

export default AdminBookingManagementPage;
