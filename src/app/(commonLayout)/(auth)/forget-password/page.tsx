'use server';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import { Suspense } from 'react';

const ForgotPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='flex min-h-screen items-center justify-center'>
        <div className='w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg'>
          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Forget Password</h1>
            <p className='text-gray-500'>
             Enter your email address to reset your password
            </p>
          </div>
          <ForgotPasswordForm redirect={params.redirect} />
        </div>
      </div>
    </Suspense>
  );
};

export default ForgotPage;
