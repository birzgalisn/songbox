import { queryOptions } from '@tanstack/react-query';
import SearchQueryKey from '@/lib/search-query-key';
import getSearchResults from '@/actions/get-search-results';

export default function getSearchServerOptions(awaitedSearchParams: {
  [key: string]: string;
}) {
  const searchParams = new URLSearchParams(awaitedSearchParams);

  return queryOptions({
    queryKey: SearchQueryKey.getQueryKey(searchParams),
    queryFn: () => getSearchResults(searchParams),
  });
}
