import SearchClient from '@/lib/spotify/search/client';
import SearchRateLimiter from '@/lib/spotify/search/ratelimiter';

export default class SearchManager {
  private static readonly Limiter = SearchRateLimiter;
  private static readonly Client = SearchClient;

  public static async get(searchParams = new URLSearchParams()) {
    try {
      await SearchManager.Limiter.enforceSearchLimit();

      return await SearchManager.Client.search(searchParams);
    } catch (error) {
      if (error instanceof Error) {
        return { error: { message: error.message } };
      }

      return { error: { message: 'An unexpected error happened' } };
    }
  }
}
