/* eslint-disable @typescript-eslint/no-explicit-any */
import BookingFilter from '@/components/modules/Dashboard/Admin/BookingManagement/BookingFilter';
import BookingTable from '@/components/modules/Dashboard/Admin/BookingManagement/BookingTable';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import TablePagination from '@/components/shared/TablePagination';
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

  const meta = bookingsResult?.data?.meta || {
    page: 1,
    limit: 10,
    total: bookingsData.length,
  };
  const totalPages = Math.ceil((meta.total || 1) / (meta.limit || 10));

  return (
    <div className='space-y-6 p-4 md:p-6'>
      <ManagementPageHeader
        title='My Booked Tours'
        description='All my booked tours'
      />

      {/* Search, Filters */}
      <BookingFilter />

      <Suspense fallback={<TableSkeleton columns={12} rows={10} />}>
        <BookingTable bookings={bookingsData} />
        <TablePagination
          currentPage={meta.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminBookingManagementPage;
