'use client';

import Form from 'next/form';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { z } from 'zod';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useCursorFocus from '@/hooks/use-cursor-focus';
import useBackpressureForm from '@/hooks/use-backpressure-form';
import useDebouncedBackpressureSearch from '@/hooks/use-debounced-backpressure-search';
import LoadingSpinner from '@/components/loading-spinner';
import SEARCH_FIELDS from '@/constants/search-fields';

const SearchSchema = z.object({
  [SEARCH_FIELDS.q]: z.string(),
  [SEARCH_FIELDS.offset]: z.string(),
});

type TSearchBase = {
  pathname?: string;
  searchParams?: URLSearchParams;
};

function SearchBase({
  pathname = '',
  searchParams = new URLSearchParams(),
}: TSearchBase) {
  const inputRef = useCursorFocus();

  const [formRef, handleAction] = useBackpressureForm({
    schema: SearchSchema,
    pathname,
    searchParams,
  });

  const [search, handleSearch] = useDebouncedBackpressureSearch({
    formRef,
    defaultValue: searchParams.get(SEARCH_FIELDS.q),
  });

  return (
    <Form
      ref={formRef}
      action={handleAction}
      className="relative flex w-full flex-1 flex-shrink-0 rounded shadow-sm"
    >
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      <Label htmlFor={SEARCH_FIELDS.q} className="sr-only">
        Search
      </Label>
      <Input
        ref={inputRef}
        id={SEARCH_FIELDS.q}
        name={SEARCH_FIELDS.q}
        value={search}
        onChange={handleSearch}
        placeholder="Search for songs, artists, albums..."
        className="w-full overflow-hidden border-0 bg-white px-10 py-6 text-base focus-visible:ring-0"
      />
      <Input name={SEARCH_FIELDS.offset} className="hidden" />
      <LoadingSpinner />
    </Form>
  );
}

function SearchHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return <SearchBase {...{ pathname, searchParams }} />;
}

export default function SearchLoader() {
  return (
    <Suspense fallback={<SearchBase />}>
      <SearchHandler />
    </Suspense>
  );
}
