import { TError, TSearchResponse } from '@/schemas/spotify';
import SEARCH_FIELDS from '@/constants/search-fields';

export default async function fetchSearchResults(
  searchParams: URLSearchParams,
): Promise<TSearchResponse | TError> {
  if (!searchParams || !searchParams.get(SEARCH_FIELDS.q)) {
    return {};
  }

  return fetch(`/api/search?${searchParams}`).then((res) => res.json());
}
