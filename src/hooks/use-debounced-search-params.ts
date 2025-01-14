import useDebounce from '@/hooks/use-debounce';
import useUpdateSearchParams from '@/hooks/use-update-search-params';

export default function useDebouncedSearchParams(delay = 300) {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();

  const debouncedUpdateSearchParams = useDebounce(updateSearchParams, delay);

  return [searchParams, debouncedUpdateSearchParams] as const;
}
