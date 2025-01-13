import Mutex from '@/lib/mutex';

export default class CredentialsMutex {
  private static readonly mutexKey = 'spotify_access_token_mutex';
  private static readonly Mutex = Mutex;

  public static async withLock<T>(fn: (isLockAcquired: boolean) => Promise<T>) {
    return CredentialsMutex.Mutex.withLock(CredentialsMutex.mutexKey, fn);
  }
}
