import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/context/AuthContext';
import { AdminProvider } from '@/lib/context/AdminContext';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import ClientBody from './ClientBody';
import NextAuthProvider from '@/components/providers/NextAuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduConnect Africa - Connecting Nigerian Students with African Universities',
  description: 'Discover personalized university recommendations, qualification equivalency information, and education counseling services across Africa.',
  keywords: ['education', 'universities', 'Africa', 'Nigeria', 'study abroad', 'counseling'],
  authors: [{ name: 'EduConnect Africa' }],
  openGraph: {
    title: 'EduConnect Africa',
    description: 'Connecting Nigerian Students with African Universities',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClientBody className={inter.className}>
        <NextAuthProvider>
          <AuthProvider>
            <AdminProvider>
              {children}
              <Toaster />
              <SonnerToaster />
            </AdminProvider>
          </AuthProvider>
        </NextAuthProvider>
      </ClientBody>
    </html>
  );
}
