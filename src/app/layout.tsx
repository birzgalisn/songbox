import type { Metadata } from 'next';
import Providers from '@/app/providers';
import Header from '@/components/header';
import './globals.css';

export const metadata = {
  title: 'Songbox: All your music in one place',
  description:
    'Search, discover and keep track of your favorite albums, artists, playlists, tracks, shows, episodes and audiobooks.',
} satisfies Metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="group min-h-dvh bg-gray-100 antialiased">
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
