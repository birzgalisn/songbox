export default class RatelimitError extends Error {
  constructor(cause?: unknown) {
    super('Searching too fast. Please wait a moment and try again', { cause });
  }
}
