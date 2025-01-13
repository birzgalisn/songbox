import { TError, TSearchResponse } from '@/schemas/spotify';
import searchFields from '@/constants/search-fields';

export default async function fetchSearchResults(
  searchParams: URLSearchParams,
): Promise<TSearchResponse | TError> {
  if (!searchParams || !searchParams.get(searchFields.query)) {
    return {};
  }

  return fetch(`/api/search?${searchParams}`).then((res) => res.json());
}
