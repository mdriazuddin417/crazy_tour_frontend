'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { UserRole } from '@/lib/types';
import { registerUser } from '@/services/auth/registerUsert';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import InputFieldError from './shared/InputFieldError';
import { Button } from './ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const [role, setRole] = useState<UserRole>(UserRole.TOURIST);
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <FieldGroup>
        <div className='space-y-3'>
          <label className='text-sm font-medium'>I am a...</label>
          <div className='flex gap-3'>
            <button
              type='button'
              onClick={() => setRole(UserRole.TOURIST)}
              className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition ${
                role === UserRole.TOURIST
                  ? 'border-teal-600 bg-teal-50 text-teal-900'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Tourist
            </button>
            <button
              type='button'
              onClick={() => setRole(UserRole.GUIDE)}
              className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition ${
                role === UserRole.GUIDE
                  ? 'border-teal-600 bg-teal-50 text-teal-900'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Guide
            </button>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Name */}
          <Field>
            <FieldLabel htmlFor='name'>Full Name</FieldLabel>
            <Input id='name' name='name' type='text' placeholder='John Doe' />
            <InputFieldError field='name' state={state} />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor='email'>Email</FieldLabel>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='m@example.com'
            />
            <InputFieldError field='email' state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <Input id='password' name='password' type='password' />

            <InputFieldError field='password' state={state} />
          </Field>
          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor='confirmPassword'>Confirm Password</FieldLabel>
            <Input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
            />

            <InputFieldError field='confirmPassword' state={state} />
          </Field>

          {/* Address */}
          <Field>
            <FieldLabel htmlFor='address'>Address</FieldLabel>
            <Input
              id='address'
              name='address'
              type='text'
              placeholder='123 Main St, City, Country'
            />
            <InputFieldError field='address' state={state} />
          </Field>
        </div>
        {/* Hidden role input */}
        <input type='hidden' name='role' value={role} />
        <FieldGroup className='mt-4'>
          <Field>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Creating Account...' : 'Create Account'}
            </Button>

            <FieldDescription className='px-6 text-center'>
              Already have an account?{' '}
              <a href='/login' className='text-teal-600 hover:underline'>
                Sign in
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
