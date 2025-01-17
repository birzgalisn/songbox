import { useState } from 'react';
import callAll from '@/lib/call-all';
import useDebounce from '@/hooks/use-debounce';

export default function useDebouncedBackpressureSearch({
  formRef,
  defaultValue,
  delay = 300,
}: {
  formRef: React.RefObject<HTMLFormElement | null>;
  defaultValue: string | null;
  delay?: number;
}) {
  const [search, setSearch] = useState(defaultValue || '');

  const handleSubmit = () => formRef.current?.requestSubmit();

  const debouncedSubmit = useDebounce(handleSubmit, delay);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    callAll(setSearch, debouncedSubmit)(event.target.value);

  return [search, handleSearch] as const;
}
