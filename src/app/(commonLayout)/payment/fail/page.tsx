'use client';

import { XCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const PaymentFailContent = () => {
  const params = useSearchParams();

  const transactionId = params.get('transactionId');
  const message = params.get('message');
  const amount = params.get('amount');
  const status = params.get('status');

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-6'>
      <div className='bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center animate-fadeIn'>
        <XCircle className='text-red-600 w-20 h-20 mx-auto mb-4' />

        <h1 className='text-3xl font-bold text-red-700 mb-2'>Payment Failed</h1>

        <p className='text-gray-600 mb-6'>{message}</p>

        <div className='text-left bg-red-50 p-5 rounded-xl mb-6 border border-red-200'>
          <p className='text-sm mb-1'>
            <strong>Transaction ID:</strong> {transactionId}
          </p>
          <p className='text-sm mb-1 text-red-600'>
            <strong>Status:</strong> {status}
          </p>
          <p className='text-sm'>
            <strong>Amount:</strong> ${amount}
          </p>
        </div>

        <Link
          href='/'
          className='inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition'
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default function PaymentFail() {
  return (
    <Suspense fallback={<div className='p-6 text-center'>Loading...</div>}>
      <PaymentFailContent />
    </Suspense>
  );
}
