export default class TokenRetrieveError extends Error {
  constructor(cause?: unknown) {
    super('Error while retrieving token', { cause });
  }
}
