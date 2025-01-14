import searchFields from '@/constants/search-fields';
import SearchManager from '@/lib/spotify/search/manager';

export default async function getSearchResults(searchParams: URLSearchParams) {
  if (!searchParams.get(searchFields.query)) {
    return null;
  }

  return SearchManager.get(searchParams);
}
