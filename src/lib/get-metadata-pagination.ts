import { TError, TMetadata } from '@/schemas/spotify';
import getSafeSearchParam from '@/lib/get-safe-search-param';
import SEARCH_FIELDS from '@/constants/search-fields';

export default function getMetadataPagination(
  searchParams: URLSearchParams,
  data: Record<string, TMetadata> | TError,
) {
  if ('error' in data) {
    return {
      total: 0,
      page: 0,
      maxPage: 0,
      previous: null,
      next: null,
    } as const;
  }

  const { total, maxOffset } = Object.values(data).reduce(
    (acc, { total }) => ({
      total: acc.total + total,
      maxOffset: Math.max(acc.maxOffset, total),
    }),
    { total: 0, maxOffset: 0 },
  );

  const limit = getSafeSearchParam(searchParams, SEARCH_FIELDS.limit);
  const offset = getSafeSearchParam(searchParams, SEARCH_FIELDS.offset);

  const hasNext = offset + limit < maxOffset;
  const next = hasNext ? offset + limit : null;

  const hasPrevious = offset - limit >= 0;
  const previous = hasPrevious ? offset - limit : null;

  const page = Math.floor(offset / limit) + 1;
  const maxPage = Math.ceil(maxOffset / limit);

  return { total, page, maxPage, previous, next } as const;
}
