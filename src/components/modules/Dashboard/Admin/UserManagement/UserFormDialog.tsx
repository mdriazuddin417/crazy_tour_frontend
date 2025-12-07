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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { IUser } from '@/lib/types';
import { updateUserService } from '@/services/user/user.service';
import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface IUserFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user?: IUser;
}

async function updateUserAction(
  prevState: any,
  formData: FormData
): Promise<any> {
  const userId = formData.get('userId') as string;
  if (!userId) {
    return { success: false, message: 'User ID is required' };
  }

  const data: any = {};
  const name = formData.get('name');
  const bio = formData.get('bio');
  const profilePic = formData.get('profilePic');
  const languagesSpoken = formData.get('languagesSpoken');
  const expertise = formData.get('expertise');
  const dailyRate = formData.get('dailyRate');

  if (name) data.name = name.toString();
  if (bio) data.bio = bio.toString();
  if (profilePic) data.profilePic = profilePic.toString();
  if (languagesSpoken) {
    data.languagesSpoken = languagesSpoken
      .toString()
      .split(',')
      .map((lang) => lang.trim())
      .filter((lang) => lang.length > 0);
  }
  if (expertise) {
    data.expertise = expertise
      .toString()
      .split(',')
      .map((exp) => exp.trim())
      .filter((exp) => exp.length > 0);
  }
  if (dailyRate) {
    const rate = parseFloat(dailyRate.toString());
    if (!isNaN(rate)) data.dailyRate = rate;
  }

  const result = await updateUserService(userId, data);
  return result;
}

const UserFormDialog = ({
  open,
  onClose,
  onSuccess,
  user,
}: IUserFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(updateUserAction, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || 'User updated successfully');
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

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='max-h-[90vh] flex flex-col p-0'>
        <DialogHeader className='px-6 pt-6 pb-4'>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className='flex flex-col flex-1 min-h-0'
        >
          <input type='hidden' name='userId' value={user._id} />
          <div className='flex-1 overflow-y-auto px-6 space-y-4 pb-4'>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='name'>Name</FieldLabel>
                <Input
                  id='name'
                  name='name'
                  placeholder='John Doe'
                  defaultValue={user.name || ''}
                  disabled={isPending}
                />
                <InputFieldError field='name' state={state} />
              </Field>

              <Field>
                <FieldLabel htmlFor='bio'>Bio</FieldLabel>
                <Textarea
                  id='bio'
                  name='bio'
                  placeholder='User bio...'
                  defaultValue={user.bio || ''}
                  disabled={isPending}
                  rows={3}
                />
                <InputFieldError field='bio' state={state} />
              </Field>

              <Field>
                <FieldLabel htmlFor='profilePic'>
                  Profile Picture URL
                </FieldLabel>
                <Input
                  id='profilePic'
                  name='profilePic'
                  type='url'
                  placeholder='https://example.com/image.jpg'
                  defaultValue={user.profilePic || ''}
                  disabled={isPending}
                />
                <InputFieldError field='profilePic' state={state} />
              </Field>

              <Field>
                <FieldLabel htmlFor='languagesSpoken'>
                  Languages Spoken (comma-separated)
                </FieldLabel>
                <Input
                  id='languagesSpoken'
                  name='languagesSpoken'
                  placeholder='English, Spanish, French'
                  defaultValue={user.languagesSpoken?.join(', ') || ''}
                  disabled={isPending}
                />
                <InputFieldError field='languagesSpoken' state={state} />
              </Field>

              {user.role === 'GUIDE' && (
                <>
                  <Field>
                    <FieldLabel htmlFor='expertise'>
                      Expertise (comma-separated categories)
                    </FieldLabel>
                    <Input
                      id='expertise'
                      name='expertise'
                      placeholder='FOOD, HISTORY, ART'
                      defaultValue={user.expertise?.join(', ') || ''}
                      disabled={isPending}
                    />
                    <InputFieldError field='expertise' state={state} />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor='dailyRate'>Daily Rate ($)</FieldLabel>
                    <Input
                      id='dailyRate'
                      name='dailyRate'
                      type='number'
                      step='0.01'
                      min='0'
                      placeholder='100.00'
                      defaultValue={user.dailyRate?.toString() || ''}
                      disabled={isPending}
                    />
                    <InputFieldError field='dailyRate' state={state} />
                  </Field>
                </>
              )}
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

export default UserFormDialog;
