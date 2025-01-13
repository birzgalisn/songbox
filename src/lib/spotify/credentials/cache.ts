import Redis from '@/lib/redis';
import TokenExpiredError from '@/errors/token-expired';
import { TClientCredentials } from '@/schemas/spotify';

export default class CredentialsCache {
  private static readonly cacheKey = 'spotify_access_token';
  private static readonly redis = Redis;

  public static async storeAccessToken(token: TClientCredentials) {
    return CredentialsCache.redis.set(CredentialsCache.cacheKey, token);
  }

  public static async getAccessToken() {
    return CredentialsCache.redis.get<TClientCredentials>(
      CredentialsCache.cacheKey,
    );
  }

  public static async getValidatedAccessToken() {
    const token = await CredentialsCache.getAccessToken();

    if (token && Date.now() < token.expires_at) {
      return token;
    }

    throw new TokenExpiredError();
  }
}
