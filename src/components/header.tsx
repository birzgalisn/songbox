import { Search, Star } from 'lucide-react';
import HeaderLinkWithSuspense from '@/components/header-link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-6">
        <h1 className="text-3xl font-semibold text-blue-600">Songbox</h1>

        <nav className="flex justify-end">
          <HeaderLinkWithSuspense variant="ghost" href="/" aria-label="Search">
            <Search className="size-5 sm:mr-2" aria-hidden="true" />
            <span className="hidden sm:block">Search</span>
          </HeaderLinkWithSuspense>

          <HeaderLinkWithSuspense
            variant="ghost"
            href="/favorites"
            aria-label="Favorites"
          >
            <Star className="size-5 sm:mr-2" aria-hidden="true" />
            <span className="hidden sm:block">Favorites</span>
          </HeaderLinkWithSuspense>
        </nav>
      </div>
    </header>
  );
}
