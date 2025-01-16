import { useTransition } from 'react';
import useUpdateSearchParams from '@/hooks/use-update-search-params';

export default function useUpdateFilters() {
  const [isPending, startTransition] = useTransition();

  const [searchParams, updateSearchParams] = useUpdateSearchParams();

  const values = Object.fromEntries(searchParams);

  const registerSingle = (key: string) => {
    const defaultValue = searchParams.get(key) ?? '';

    return {
      defaultValue,
      onChange(event: React.ChangeEvent<HTMLInputElement>) {
        return startTransition(() =>
          updateSearchParams(key, event.target.value),
        );
      },
    } as const;
  };

  const registerMultiple = (key: string) => {
    const defaultValue = (searchParams.get(key) ?? '')
      .split(',')
      .filter(Boolean);

    return {
      defaultValue,
      onValueChange(value: string[]) {
        return startTransition(() => updateSearchParams(key, value));
      },
    } as const;
  };

  return {
    isPending,
    values,
    registerSingle,
    registerMultiple,
  } as const;
}
