'use client';

import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ManagementTable from '@/components/shared/ManagementTable';

import { TourListing } from '@/lib/types';
import { deleteListingService } from '@/services/listing/listing.service';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import TourListingFormDialog from './TourListingFormDialog';
import TourListingViewDetailDialog from './TourListingViewDetailDialog';
import { tourListingColumns } from './tourListingColumns';

interface TourListingTableProps {
  listings: TourListing[] | { data?: TourListing[]; meta?: any };
}

const TourListingTable = ({ listings }: TourListingTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingListing, setDeletingListing] = useState<TourListing | null>(
    null
  );
  const [viewingListing, setViewingListing] = useState<TourListing | null>(
    null
  );
  const [editingListing, setEditingListing] = useState<TourListing | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle both array and object with data property
  const listingsArray = Array.isArray(listings)
    ? listings
    : listings?.data || [];

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (listing: TourListing) => {
    setViewingListing(listing);
  };

  const handleEdit = (listing: TourListing) => {
    setEditingListing(listing);
  };

  const handleDelete = (listing: TourListing) => {
    setDeletingListing(listing);
  };

  const confirmDelete = async () => {
    // TODO: Implement delete functionality
    if (!deletingListing?._id) return;
    setIsDeleting(true);
    const result = await deleteListingService(deletingListing._id);
    setIsDeleting(false);
    if (result.success) {
      toast.success('Tour listing deleted successfully');
      setDeletingListing(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to delete tour listing');
    }
  };

  return (
    <>
      <ManagementTable
        data={listingsArray}
        columns={tourListingColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(listing) => listing._id}
        emptyMessage='No tour listings found'
      />

      {/* Edit Tour Listing Form Dialog */}
      {editingListing && (
        <TourListingFormDialog
          open={!!editingListing}
          onClose={() => setEditingListing(null)}
          tourListing={editingListing}
          onSuccess={() => {
            setEditingListing(null);
            handleRefresh();
          }}
        />
      )}

      {/* View Tour Listing Detail Dialog */}
      {viewingListing && (
        <TourListingViewDetailDialog
          open={!!viewingListing}
          onClose={() => setViewingListing(null)}
          tourListing={viewingListing}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingListing}
        onOpenChange={(open) => !open && setDeletingListing(null)}
        onConfirm={confirmDelete}
        title='Delete Tour Listing'
        description={`Are you sure you want to delete "${deletingListing?.title}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default TourListingTable;
