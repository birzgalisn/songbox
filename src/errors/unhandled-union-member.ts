export default class UnhandledUnionMemberError extends Error {
  constructor(cause?: unknown) {
    super('Unhandled discriminated union member', { cause });
  }
}
