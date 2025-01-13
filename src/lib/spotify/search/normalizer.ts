export default class SearchNormalizer {
  public static toStringRecord(
    input?: URLSearchParams | Record<string, unknown>,
  ) {
    if (!input) {
      return {};
    }

    const entries =
      input instanceof URLSearchParams
        ? Array.from(input.entries())
        : Object.entries(input);

    return Object.fromEntries(
      entries.map(([key, value]) => [key, SearchNormalizer.toString(value)]),
    );
  }

  public static toString(value: unknown) {
    return Boolean(value) ? String(value) : '';
  }
}
