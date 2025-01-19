'use client';

import { Suspense } from 'react';
import useSearchResults from '@/hooks/use-search-results';
import Loading from '@/components/loading';
import List from '@/components/list';
import Pagination from '@/components/pagination';

function ResultsHandler() {
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
    <>
      <List>
        {Object.entries(results).map(([group, result]) => (
          <List.Group
            key={group}
            group={group}
            items={result.items}
            head={
              <List.Group.Head>
                Matching {group} ({result.total})
              </List.Group.Head>
            }
          />
        ))}
      </List>

      <Pagination />
    </>
  );
}

export default function ResultsLoader() {
  return (
    <Suspense fallback={<Loading />}>
      <ResultsHandler />
    </Suspense>
  );
}
