import { queryOptions } from '@tanstack/react-query';
import SearchQueryKey from '@/lib/search-query-key';
import getSearchResults from '@/actions/get-search-results';

export default function getSearchServerOptions(searchParams: URLSearchParams) {
  return queryOptions({
    queryKey: SearchQueryKey.getQueryKey(searchParams),
    queryFn: getSearchResults,
  });
}
