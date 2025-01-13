import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useUpdateSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = <V = number | string>(
    key: string,
    value: V | V[],
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const newValue = Array.isArray(value) ? value.join(',') : `${value}`;

    if (newValue) {
      newSearchParams.set(key, newValue);
    } else {
      newSearchParams.delete(key);
    }

    router.replace(`${pathname}?${newSearchParams}`);
  };

  return [searchParams, updateSearchParams] as const;
}
