export default class TokenExpiredError extends Error {
  constructor(cause?: unknown) {
    super('Token expired', { cause });
  }
}
