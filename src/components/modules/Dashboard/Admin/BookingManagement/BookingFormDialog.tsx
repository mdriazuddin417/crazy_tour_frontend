'use client';

import InputFieldError from '@/components/shared/InputFieldError';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Booking, BookingStatus } from '@/lib/types';
import { updateBookingService } from '@/services/booking/booking.service';
import { useActionState, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface IBookingFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  booking?: Booking;
}

async function updateBookingAction(
  prevState: any,
  formData: FormData
): Promise<any> {
  const bookingId = formData.get('bookingId') as string;
  if (!bookingId) {
    return { success: false, message: 'Booking ID is required' };
  }

  const status = formData.get('status') as BookingStatus;
  if (!status) {
    return { success: false, message: 'Status is required' };
  }

  const result = await updateBookingService(bookingId, { status });
  return result;
}

const BookingFormDialog = ({
  open,
  onClose,
  onSuccess,
  booking,
}: IBookingFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    updateBookingAction,
    null
  );
  const [status, setStatus] = useState<BookingStatus>(
    booking?.status || BookingStatus.PENDING
  );

  // Update state when booking changes
  useEffect(() => {
    if (booking) {
      setStatus(booking.status || BookingStatus.PENDING);
    }
  }, [booking]);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || 'Booking updated successfully');
      if (formRef.current) {
        formRef.current.reset();
      }
      onSuccess();
      onClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  const handleClose = () => {
    formRef.current?.reset();
    onClose();
  };

  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='max-h-[90vh] flex flex-col p-0'>
        <DialogHeader className='px-6 pt-6 pb-4'>
          <DialogTitle>Edit Booking Status</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className='flex flex-col flex-1 min-h-0'
        >
          <input type='hidden' name='bookingId' value={booking._id || ''} />
          <div className='flex-1 overflow-y-auto px-6 space-y-4 pb-4'>
            <FieldGroup>
              <div className='bg-muted/50 p-4 rounded-lg space-y-2 mb-4'>
                <p className='text-sm text-muted-foreground'>Booking ID</p>
                <p className='text-sm font-mono'>{booking._id || 'N/A'}</p>
              </div>

              <Field>
                <FieldLabel htmlFor='status'>Status</FieldLabel>
                <input type='hidden' name='status' value={status} />
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as BookingStatus)}
                  disabled={isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(BookingStatus).map((stat) => (
                      <SelectItem key={stat} value={stat}>
                        {stat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <InputFieldError field='status' state={state} />
              </Field>

              <div className='bg-muted/50 p-4 rounded-lg space-y-2'>
                <p className='text-sm text-muted-foreground'>Requested Date</p>
                <p className='text-sm'>
                  {new Date(booking.requestedDate).toLocaleString()}
                </p>
              </div>

              <div className='bg-muted/50 p-4 rounded-lg space-y-2'>
                <p className='text-sm text-muted-foreground'>Group Size</p>
                <p className='text-sm'>{booking.groupSize}</p>
              </div>

              <div className='bg-muted/50 p-4 rounded-lg space-y-2'>
                <p className='text-sm text-muted-foreground'>Total Price</p>
                <p className='text-sm font-semibold'>
                  ${booking.totalPrice.toFixed(2)}
                </p>
              </div>
            </FieldGroup>
          </div>

          <div className='flex justify-end gap-2 px-6 py-4 border-t bg-gray-50'>
            <Button
              type='button'
              variant='outline'
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingFormDialog;
