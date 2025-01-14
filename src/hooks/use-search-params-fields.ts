import useDebouncedSearchParams from '@/hooks/use-debounced-search-params';

export default function useSearchParamsFields() {
  const [searchParams, updateSearchParams] = useDebouncedSearchParams();
  const values = Object.fromEntries(searchParams);

  const registerInput = (key: string) => {
    const defaultValue = searchParams.get(key) ?? '';

    return {
      defaultValue,
      onChange(event: React.ChangeEvent<HTMLInputElement>) {
        return updateSearchParams(key, event.target.value);
      },
    } as const;
  };

  const registerGroup = (key: string) => {
    const defaultValue = (searchParams.get(key) ?? '')
      .split(',')
      .filter(Boolean);

    return {
      defaultValue,
      onValueChange(value: string[]) {
        return updateSearchParams(key, value);
      },
    } as const;
  };

  return { values, registerInput, registerGroup } as const;
}
