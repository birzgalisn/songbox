import { useState } from 'react';

export default function useBackpressureSearch({
  formRef,
  defaultValue,
}: {
  formRef: React.RefObject<HTMLFormElement | null>;
  defaultValue: string | null;
}) {
  const [search, setSearch] = useState(defaultValue || '');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    formRef.current?.requestSubmit();
  };

  return [search, handleSearch] as const;
}
