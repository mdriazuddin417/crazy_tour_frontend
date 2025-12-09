/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ManagementTable from '@/components/shared/ManagementTable';

import { Booking } from '@/lib/types';
import { deleteBookingService } from '@/services/booking/booking.service';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { bookingColumns } from './bookingColumns';
import BookingFormDialog from './BookingFormDialog';
import BookingViewDetailDialog from './BookingViewDetailDialog';

interface BookingTableProps {
  bookings: Booking[] | { data?: Booking[]; meta?: any };
}

const BookingTable = ({ bookings }: BookingTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingBooking, setDeletingBooking] = useState<Booking | null>(null);
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle both array and object with data property
  const bookingsArray = Array.isArray(bookings)
    ? bookings
    : bookings?.data || [];

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (booking: Booking) => {
    setViewingBooking(booking);
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
  };

  const handleDelete = (booking: Booking) => {
    setDeletingBooking(booking);
  };

  const confirmDelete = async () => {
    if (!deletingBooking?._id) return;
    setIsDeleting(true);
    const result = await deleteBookingService(deletingBooking._id);
    setIsDeleting(false);
    if (result.success) {
      toast.success('Booking deleted successfully');
      setDeletingBooking(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to delete booking');
    }
  };

  return (
    <>
      <ManagementTable
        data={bookingsArray}
        columns={bookingColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(booking) => booking._id || String(Math.random())}
        emptyMessage='No bookings found'
      />

      {/* Edit Booking Form Dialog */}
      {editingBooking && (
        <BookingFormDialog
          open={!!editingBooking}
          onClose={() => setEditingBooking(null)}
          booking={editingBooking}
          onSuccess={() => {
            setEditingBooking(null);
            handleRefresh();
          }}
        />
      )}

      {/* View Booking Detail Dialog */}
      {viewingBooking && (
        <BookingViewDetailDialog
          open={!!viewingBooking}
          onClose={() => setViewingBooking(null)}
          booking={viewingBooking}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingBooking}
        onOpenChange={(open) => !open && setDeletingBooking(null)}
        onConfirm={confirmDelete}
        title='Delete Booking'
        description={`Are you sure you want to delete this booking? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default BookingTable;
