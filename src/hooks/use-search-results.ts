import { useSearchParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import getSearchClientOptions from '@/query-options/search/client';
import searchFields from '@/constants/search-fields';

export default function useSearchResults() {
  const searchParams = useSearchParams();
  const hasQueryKey = searchParams.has(searchFields.query);

  const result = useSuspenseQuery(getSearchClientOptions(searchParams));
  const isLoading = hasQueryKey ? result.isLoading : false;

  return { ...result, isLoading } as const;
}
