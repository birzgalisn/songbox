import searchFields from '@/constants/search-fields';

export default class SearchQueryKey {
  private static readonly key = 'search';

  public static getQueryKey(searchParams: URLSearchParams) {
    const q = searchParams.get(searchFields.query) ?? '';
    const type = searchParams.get(searchFields.include) ?? '';

    return [SearchQueryKey.key, q, type] as const;
  }
}
