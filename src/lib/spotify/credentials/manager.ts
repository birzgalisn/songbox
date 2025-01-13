import CredentialsClient from '@/lib/spotify/credentials/client';
import CredentialsCache from '@/lib/spotify/credentials/cache';
import CredentialsMutex from '@/lib/spotify/credentials/mutex';
import Retry from '@/lib/retry';
import TokenRetrieveError from '@/errors/token-retrieve';

export default class CredentialsManager {
  private static readonly Cache = CredentialsCache;
  private static readonly Mutex = CredentialsMutex;

  public static async obtainAccessToken() {
    try {
      return await CredentialsManager.Cache.getValidatedAccessToken();
    } catch (error) {
      const updatedToken = await CredentialsManager.Mutex.withLock(
        (isLockAcquired) => {
          if (isLockAcquired) {
            console.log('Renewing access token');

            return CredentialsClient.renewAccessToken();
          }
          return Retry.exponentialRetry(
            CredentialsManager.Cache.getValidatedAccessToken,
          );
        },
      );

      if ('error' in updatedToken) {
        throw new TokenRetrieveError(error);
      }

      await CredentialsManager.Cache.storeAccessToken(updatedToken);

      return updatedToken;
    }
  }
}
