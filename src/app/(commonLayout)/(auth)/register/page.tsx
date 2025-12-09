'use client';
import RegisterForm from '@/components/register-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const RegisterPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
        <div className='w-full max-w-xl'>
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter your information below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </Suspense>
  );
};

export default RegisterPage;
