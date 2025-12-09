import DashboardNavbar from '@/components/modules/Dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/modules/Dashboard/DashboardSidebar';
import React from 'react';

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className='flex h-screen overflow-hidden'>
      <DashboardSidebar />
      <div className='flex flex-1 flex-col overflow-hidden'>
        <DashboardNavbar />
        <main className='flex-1 overflow-y-auto'>
          <div className=''>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default CommonDashboardLayout;
