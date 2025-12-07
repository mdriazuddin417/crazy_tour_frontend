'use client';

import InputFieldError from '@/components/shared/InputFieldError';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { TourCategory, TourListing } from '@/lib/types';
import { updateListingService } from '@/services/listing/listing.service';
import { useActionState, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface ITourListingFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tourListing?: TourListing;
}

async function updateTourListingAction(
  prevState: any,
  formData: FormData
): Promise<any> {
  const listingId = formData.get('listingId') as string;
  if (!listingId) {
    return { success: false, message: 'Listing ID is required' };
  }

  const data: any = {};
  const title = formData.get('title');
  const description = formData.get('description');
  const category = formData.get('category');
  const city = formData.get('city');
  const country = formData.get('country');
  const price = formData.get('price');
  const duration = formData.get('duration');
  const maxGroupSize = formData.get('maxGroupSize');
  const meetingPoint = formData.get('meetingPoint');
  const itinerary = formData.get('itinerary');
  const images = formData.get('images');
  const languages = formData.get('languages');
  const isActive = formData.get('isActive');

  if (title) data.title = title.toString();
  if (description) data.description = description.toString();
  if (category) data.category = category.toString();
  if (city) data.city = city.toString();
  if (country) data.country = country.toString();
  if (price) {
    const priceNum = parseFloat(price.toString());
    if (!isNaN(priceNum)) data.price = priceNum;
  }
  if (duration) {
    const durationNum = parseFloat(duration.toString());
    if (!isNaN(durationNum)) data.duration = durationNum;
  }
  if (maxGroupSize) {
    const sizeNum = parseInt(maxGroupSize.toString());
    if (!isNaN(sizeNum)) data.maxGroupSize = sizeNum;
  }
  if (meetingPoint) data.meetingPoint = meetingPoint.toString();
  if (itinerary) {
    data.itinerary = itinerary
      .toString()
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }
  if (images) {
    data.images = images
      .toString()
      .split('\n')
      .map((img) => img.trim())
      .filter((img) => img.length > 0);
  }
  if (languages) {
    data.languages = languages
      .toString()
      .split(',')
      .map((lang) => lang.trim())
      .filter((lang) => lang.length > 0);
  }
  if (isActive !== null) {
    data.isActive = isActive === 'true' || isActive === 'on';
  }

  const result = await updateListingService(listingId, data);
  return result;
}

const TourListingFormDialog = ({
  open,
  onClose,
  onSuccess,
  tourListing,
}: ITourListingFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    updateTourListingAction,
    null
  );
  const [category, setCategory] = useState<string>(tourListing?.category || '');
  const [isActive, setIsActive] = useState<boolean>(
    tourListing?.isActive ?? true
  );

  // Update state when tourListing changes
  useEffect(() => {
    if (tourListing) {
      setCategory(tourListing.category || '');
      setIsActive(tourListing.isActive ?? true);
    }
  }, [tourListing]);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || 'Tour listing updated successfully');
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

  if (!tourListing) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='max-h-[90vh] flex flex-col p-0'>
        <DialogHeader className='px-6 pt-6 pb-4'>
          <DialogTitle>Edit Tour Listing</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className='flex flex-col flex-1 min-h-0'
        >
          <input type='hidden' name='listingId' value={tourListing._id} />
          <div className='flex-1 overflow-y-auto px-6 space-y-4 pb-4'>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='title'>Title</FieldLabel>
                <Input
                  id='title'
                  name='title'
                  placeholder='Amazing City Tour'
                  defaultValue={tourListing.title || ''}
                  disabled={isPending}
                />
                <InputFieldError field='title' state={state} />
              </Field>

              <Field>
                <FieldLabel htmlFor='description'>Description</FieldLabel>
                <Textarea
                  id='description'
                  name='description'
                  placeholder='Tour description...'
                  defaultValue={tourListing.description || ''}
                  disabled={isPending}
                  rows={4}
                />
                <InputFieldError field='description' state={state} />
              </Field>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Field>
                  <FieldLabel htmlFor='category'>Category</FieldLabel>
                  <input type='hidden' name='category' value={category} />
                  <Select
                    value={category}
                    onValueChange={setCategory}
                    disabled={isPending}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(TourCategory).map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputFieldError field='category' state={state} />
                </Field>

                <Field>
                  <FieldLabel htmlFor='price'>Price ($)</FieldLabel>
                  <Input
                    id='price'
                    name='price'
                    type='number'
                    step='0.01'
                    min='0'
                    placeholder='100.00'
                    defaultValue={tourListing.price?.toString() || ''}
                    disabled={isPending}
                  />
                  <InputFieldError field='price' state={state} />
                </Field>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Field>
                  <FieldLabel htmlFor='city'>City</FieldLabel>
                  <Input
                    id='city'
                    name='city'
                    placeholder='New York'
                    defaultValue={tourListing.city || ''}
                    disabled={isPending}
                  />
                  <InputFieldError field='city' state={state} />
                </Field>

                <Field>
                  <FieldLabel htmlFor='country'>Country</FieldLabel>
                  <Input
                    id='country'
                    name='country'
                    placeholder='USA'
                    defaultValue={tourListing.country || ''}
                    disabled={isPending}
                  />
                  <InputFieldError field='country' state={state} />
                </Field>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Field>
                  <FieldLabel htmlFor='duration'>Duration (hours)</FieldLabel>
                  <Input
                    id='duration'
                    name='duration'
                    type='number'
                    step='0.5'
                    min='0.5'
                    placeholder='3'
                    defaultValue={tourListing.duration?.toString() || ''}
                    disabled={isPending}
                  />
                  <InputFieldError field='duration' state={state} />
                </Field>

                <Field>
                  <FieldLabel htmlFor='maxGroupSize'>Max Group Size</FieldLabel>
                  <Input
                    id='maxGroupSize'
                    name='maxGroupSize'
                    type='number'
                    min='1'
                    placeholder='10'
                    defaultValue={tourListing.maxGroupSize?.toString() || ''}
                    disabled={isPending}
                  />
                  <InputFieldError field='maxGroupSize' state={state} />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor='meetingPoint'>Meeting Point</FieldLabel>
                <Input
                  id='meetingPoint'
                  name='meetingPoint'
                  placeholder='Central Park, Main Entrance'
                  defaultValue={tourListing.meetingPoint || ''}
                  disabled={isPending}
                />
                <InputFieldError field='meetingPoint' state={state} />
              </Field>

              <Field>
                <FieldLabel htmlFor='languages'>
                  Languages (comma-separated)
                </FieldLabel>
                <Input
                  id='languages'
                  name='languages'
                  placeholder='English, Spanish, French'
                  defaultValue={tourListing.languages?.join(', ') || ''}
                  disabled={isPending}
                />
                <InputFieldError field='languages' state={state} />
              </Field>

              <Field>
                <FieldLabel htmlFor='itinerary'>
                  Itinerary (one item per line)
                </FieldLabel>
                <Textarea
                  id='itinerary'
                  name='itinerary'
                  placeholder='Visit landmark 1&#10;Visit landmark 2&#10;Lunch break'
                  defaultValue={tourListing.itinerary?.join('\n') || ''}
                  disabled={isPending}
                  rows={5}
                />
                <InputFieldError field='itinerary' state={state} />
              </Field>

              <Field>
                <FieldLabel htmlFor='images'>
                  Image URLs (one URL per line)
                </FieldLabel>
                <Textarea
                  id='images'
                  name='images'
                  placeholder='https://example.com/image1.jpg&#10;https://example.com/image2.jpg'
                  defaultValue={tourListing.images?.join('\n') || ''}
                  disabled={isPending}
                  rows={4}
                />
                <InputFieldError field='images' state={state} />
              </Field>

              <Field>
                <input
                  type='hidden'
                  name='isActive'
                  value={isActive ? 'true' : 'false'}
                />
                <div className='flex items-center gap-2'>
                  <Checkbox
                    id='isActive'
                    checked={isActive}
                    onCheckedChange={(checked) => setIsActive(checked === true)}
                    disabled={isPending}
                  />
                  <FieldLabel htmlFor='isActive' className='cursor-pointer'>
                    Tour is Active
                  </FieldLabel>
                </div>
                <InputFieldError field='isActive' state={state} />
              </Field>
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

export default TourListingFormDialog;
