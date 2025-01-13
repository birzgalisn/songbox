'use client';

import { queryOptions } from '@tanstack/react-query';
import SearchQueryKey from '@/lib/search-query-key';
import fetchSearchResults from '@/actions/fetch-search-results';

export default function getSearchClientOptions(searchParams: URLSearchParams) {
  return queryOptions({
    queryKey: SearchQueryKey.getQueryKey(searchParams),
    queryFn: () => fetchSearchResults(searchParams),
  });
}
