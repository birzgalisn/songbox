import { useSearchParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import getSearchClientOptions from '@/query-options/search/client';

export default function useSearchResults() {
  const searchParams = useSearchParams();

  return useSuspenseQuery(getSearchClientOptions(searchParams));
}
