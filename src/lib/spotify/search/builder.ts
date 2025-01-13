import CredentialsManager from '@/lib/spotify/credentials/manager';

export default class SearchBuilder {
  private static readonly url = 'https://api.spotify.com/v1/search';
  private static readonly method = 'GET';
  private static readonly Manager = CredentialsManager;

  public static async buildRequest(searchParams: URLSearchParams) {
    const headers = await SearchBuilder.getAuthorizationHeaders();
    return new Request(`${SearchBuilder.url}?${searchParams}`, {
      method: SearchBuilder.method,
      headers,
    });
  }

  private static async getAuthorizationHeaders() {
    const token = await SearchBuilder.Manager.obtainAccessToken();
    return new Headers({
      Authorization: `${token.token_type} ${token.access_token}`,
    });
  }
}
