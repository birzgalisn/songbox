import SEARCH_FIELDS from '@/constants/search-fields';
import getSafeSearchParam from '@/lib/get-safe-search-param';

export default class SearchQueryKey {
  private static readonly key = 'search';

  public static getQueryKey(searchParams: URLSearchParams) {
    const q = getSafeSearchParam(searchParams, SEARCH_FIELDS.q);
    const type = getSafeSearchParam(searchParams, SEARCH_FIELDS.type);
    const limit = getSafeSearchParam(searchParams, SEARCH_FIELDS.limit);
    const offset = getSafeSearchParam(searchParams, SEARCH_FIELDS.offset);

    return [SearchQueryKey.key, q, type, limit, offset] as const;
  }
}
