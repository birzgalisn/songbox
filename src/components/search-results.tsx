'use client';

import useSearchResults from '@/hooks/use-search-results';
import Artists from '@/components/artists';
import Albums from '@/components/albums';

export default function SearchResults() {
  const { data: results = {} } = useSearchResults();

  if (!results) {
    return null;
  }

  if ('error' in results) {
    return (
      <p className="text-center">
        {results.error?.message || 'Something unexpected happened'}
      </p>
    );
  }

  return (
    <ol className="flex flex-col gap-2">
      <Artists
        artists={results.artists?.items}
        head={
          <Artists.Head>
            Matching artists ({results.artists?.total})
          </Artists.Head>
        }
      />

      <Albums
        albums={results.albums?.items}
        head={
          <Albums.Head>Matching albums ({results.albums?.total})</Albums.Head>
        }
      />
    </ol>
  );
}
