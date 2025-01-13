import SearchBuilder from '@/lib/spotify/search/builder';
import {
  ErrorSchema,
  SearchParamsSchema,
  SearchResponseSchema,
} from '@/schemas/spotify';
import SearchNormalizer from '@/lib/spotify/search/normalizer';
import InvalidSearchParamsError from '@/errors/invalid-search-params';

export default class SearchClient {
  private static readonly Builder = SearchBuilder;

  public static async search(searchParams: URLSearchParams) {
    const validatedQuery = SearchClient.validateQuery(searchParams);

    console.log('Making a request to the Spotify API:', validatedQuery);

    const response = await SearchClient.fetchQuery(validatedQuery);
    return SearchClient.parseQueryResponse(response);
  }

  private static validateQuery(searchParams: URLSearchParams) {
    const normalizedParams = SearchNormalizer.toStringRecord(searchParams);
    const validationParams = SearchParamsSchema.safeParse(normalizedParams);

    if (!validationParams.success) {
      throw new InvalidSearchParamsError();
    }

    return new URLSearchParams(
      SearchNormalizer.toStringRecord(validationParams.data),
    );
  }

  private static async fetchQuery(searchParams: URLSearchParams) {
    const request = await SearchClient.Builder.buildRequest(searchParams);
    return fetch(request);
  }

  private static async parseQueryResponse(
    response: Awaited<ReturnType<typeof this.fetchQuery>>,
  ) {
    const data = await response.json();
    const schema = response.ok ? SearchResponseSchema : ErrorSchema;
    return schema.parse(data);
  }
}
