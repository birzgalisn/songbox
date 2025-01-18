import type { Metadata } from 'next';
import Favorites from '@/components/favorites';

export const metadata = {
  title: 'Songbox: Favorites',
} satisfies Metadata;

export default function FavoritesPage() {
  return <Favorites />;
}
