import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Tarvee - AI-Powered Book Marketplace',
  description: 'An AI-powered book and notes marketplace for Computer Science students.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <FirebaseClientProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
