import UserFilter from '@/components/modules/Dashboard/Admin/UserManagement/UserFilter';
import UserTable from '@/components/modules/Dashboard/Admin/UserManagement/UserTable';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import TablePagination from '@/components/shared/TablePagination';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllUsersService } from '@/services/admin/admin.service';

import { Suspense } from 'react';

const AdminUsersManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const usersResult = await getAllUsersService(queryString);

  // Handle different response structures
  const usersData = usersResult?.data?.data || usersResult?.data || [];
  const meta = usersResult?.data?.meta || {
    page: 1,
    limit: 10,
    total: usersData.length,
  };
  const totalPages = Math.ceil((meta.total || 1) / (meta.limit || 10));

  return (
    <div className='space-y-6'>
      <ManagementPageHeader
        title='Users Management'
        description='Manage all users including tourists, guides, and admins'
      />

      {/* Search, Filters */}
      <UserFilter />

      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <UserTable users={usersData} />
        <TablePagination
          currentPage={meta.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminUsersManagementPage;
