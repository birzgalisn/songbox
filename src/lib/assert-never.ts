import UnhandledUnionMemberError from '@/errors/unhandled-union-member';

export default function assertNever(value: never): never {
  throw new UnhandledUnionMemberError(value);
}
