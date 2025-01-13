export default class RatelimitError extends Error {
  constructor(cause?: unknown) {
    super('Rate limit reached', { cause });
  }
}
