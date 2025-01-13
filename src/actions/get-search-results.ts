import getHeadersSearchParams from '@/actions/get-headers-search-params';
import searchFields from '@/constants/search-fields';
import SearchManager from '@/lib/spotify/search/manager';

export default async function getSearchResults() {
  const searchParams = await getHeadersSearchParams();

  if (!searchParams || !searchParams.get(searchFields.query)) {
    return null;
  }

  return SearchManager.get(searchParams);
}
