import TourListingFilter from '@/components/modules/Dashboard/Admin/TourListingManagement/TourListingFilter';
import TourListingTable from '@/components/modules/Dashboard/Admin/TourListingManagement/TourListingTable';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import TablePagination from '@/components/shared/TablePagination';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { queryStringFormatter } from '@/lib/formatters';
import { IUser, TourListing } from '@/lib/types';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { getListingsService } from '@/services/listing/listing.service';

import { Suspense } from 'react';

const AdminTourListingManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const userInfo = (await getUserInfo()) as IUser;
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const listingsResult = await getListingsService(queryString);

  // Handle different response structures
  const listingsData =
    listingsResult?.data?.data.filter(
      (listing: TourListing) => listing.guideId === userInfo?._id
    ) || [];
  const meta = listingsResult?.data?.meta || {
    page: 1,
    limit: 10,
    total: listingsData.length,
  };
  const totalPages = Math.ceil((meta.total || 1) / (meta.limit || 10));

  return (
    <div className='space-y-6'>
      <ManagementPageHeader
        title='Tour Listings Management'
        description='Manage all tour listings and their details'
      />

      {/* Search, Filters */}
      <TourListingFilter />

      <Suspense fallback={<TableSkeleton columns={14} rows={10} />}>
        <TourListingTable listings={listingsData} />
        <TablePagination
          currentPage={meta.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminTourListingManagementPage;
