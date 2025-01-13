import CredentialsBuilder from '@/lib/spotify/credentials/builder';
import { ClientCredentialsSchema, ErrorSchema } from '@/schemas/spotify';

export default class CredentialsClient {
  public static async renewAccessToken() {
    const response = await CredentialsClient.fetchAccessToken();
    return CredentialsClient.parseAccessTokenResponse(response);
  }

  private static async fetchAccessToken() {
    return fetch(CredentialsBuilder.buildRequest());
  }

  private static async parseAccessTokenResponse(
    response: Awaited<ReturnType<typeof CredentialsClient.fetchAccessToken>>,
  ) {
    const data = await response.json();
    const schema = response.ok ? ClientCredentialsSchema : ErrorSchema;
    return schema.parse(data);
  }
}
