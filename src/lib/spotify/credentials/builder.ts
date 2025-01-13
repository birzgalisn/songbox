import Encoder from '@/lib/encoder';

export default class CredentialsBuilder {
  private static readonly url = 'https://accounts.spotify.com/api/token';
  private static readonly method = 'POST';
  private static readonly contentType = 'application/x-www-form-urlencoded';
  private static readonly tokenType = 'Basic';
  private static readonly grantType = 'client_credentials';

  public static buildRequest() {
    return new Request(CredentialsBuilder.url, {
      method: CredentialsBuilder.method,
      headers: CredentialsBuilder.getRequestHeaders(),
      body: CredentialsBuilder.getRequestBody(),
    });
  }

  private static getRequestAuthorization() {
    const data = Encoder.encode(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
    );
    return `${CredentialsBuilder.tokenType} ${data}`;
  }

  private static getRequestHeaders() {
    return new Headers({
      'Content-Type': CredentialsBuilder.contentType,
      Authorization: CredentialsBuilder.getRequestAuthorization(),
    });
  }

  private static getRequestBody() {
    return new URLSearchParams({ grant_type: CredentialsBuilder.grantType });
  }
}
