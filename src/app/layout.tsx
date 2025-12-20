import LoginSuccessToast from '@/components/shared/LoginSuccessToast';
import LogoutSuccessToast from '@/components/shared/LogoutSuccessToast';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import './globals.css';
export const dynamic = 'force-dynamic';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',           
});

export const metadata: Metadata = {
  title: 'Crazy Tour',
  description: 'A fun and engaging tour application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.variable}  antialiased`}
      >
        {children}
        <Toaster position='bottom-right' richColors />
        <Suspense fallback={null}>
          <LoginSuccessToast />
          <LogoutSuccessToast />
        </Suspense>
      </body>
    </html>
  );
}
