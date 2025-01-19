import { useTransition } from 'react';
import useSearchResults from '@/hooks/use-search-results';
import useUpdateSearchParams from '@/hooks/use-update-search-params';
import getMetadataPagination from '@/lib/get-metadata-pagination';
import SEARCH_FIELDS from '@/constants/search-fields';

export default function useSearchPagination() {
  const [isPending, startTransition] = useTransition();
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const { data: results = {} } = useSearchResults();

  const pagination = getMetadataPagination(searchParams, results);

  const nextPage = () =>
    pagination.next &&
    startTransition(() =>
      updateSearchParams(SEARCH_FIELDS.offset, pagination.next),
    );

  const previousPage = () =>
    pagination.previous !== null &&
    startTransition(() =>
      updateSearchParams(SEARCH_FIELDS.offset, pagination.previous),
    );

  return { ...pagination, isPending, nextPage, previousPage } as const;
}
