import { Search, Star } from 'lucide-react';
import HeaderLink from '@/components/header-link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-6">
        <h1 className="text-3xl font-bold text-blue-600">Songbox</h1>

        <nav className="flex justify-end">
          <HeaderLink variant="ghost" href="/">
            <Search className="mr-2 size-5" />
            <span className="hidden sm:block">Search</span>
          </HeaderLink>

          <HeaderLink variant="ghost" href="/favorites">
            <Star className="mr-2 size-5" />
            <span className="hidden sm:block">Favorites</span>
          </HeaderLink>
        </nav>
      </div>
    </header>
  );
}
