import RatelimiterClient from '@/lib/ratelimiter';

class SearchRatelimiter extends RatelimiterClient {
  private static readonly maxSearches = 10;
  private static readonly duration = '10 s';
  private static readonly key = '/search';
  private static instance: SearchRatelimiter;

  private constructor() {
    super(SearchRatelimiter.maxSearches, SearchRatelimiter.duration);
  }

  public static getInstance() {
    return (SearchRatelimiter.instance ??= new SearchRatelimiter());
  }

  public async limitSearch() {
    return super.limit(SearchRatelimiter.key);
  }

  public async enforceSearchLimit() {
    return super.enforceLimit(SearchRatelimiter.key);
  }
}

const searchRatelimiter = SearchRatelimiter.getInstance();

export type TSearchRatelimiter = typeof searchRatelimiter;

export default searchRatelimiter;
