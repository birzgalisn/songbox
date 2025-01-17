import { useState } from 'react';
import callAll from '@/lib/call-all';

export default function useBackpressureSearch({
  formRef,
  defaultValue,
}: {
  formRef: React.RefObject<HTMLFormElement | null>;
  defaultValue: string | null;
}) {
  const [search, setSearch] = useState(defaultValue || '');

  const handleSubmit = () => formRef.current?.requestSubmit();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    callAll(setSearch, handleSubmit)(event.target.value);

  return [search, handleSearch] as const;
}
