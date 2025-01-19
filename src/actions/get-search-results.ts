import SEARCH_FIELDS from '@/constants/search-fields';
import SearchManager from '@/lib/spotify/search/manager';

export default async function getSearchResults(searchParams: URLSearchParams) {
  if (!searchParams.get(SEARCH_FIELDS.q)) {
    return null;
  }

  return SearchManager.get(searchParams);
}
