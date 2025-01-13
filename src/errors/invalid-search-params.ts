export default class InvalidSearchParamsError extends Error {
  constructor(cause?: unknown) {
    super('Invalid search parameters', { cause });
  }
}
