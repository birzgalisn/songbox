export default class RetryAttemptsReachedError extends Error {
  constructor(cause?: unknown) {
    super('Retry attempts reached', { cause });
  }
}
