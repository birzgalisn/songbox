import { use, useRef } from 'react';
import { z } from 'zod';
import useBackpressure from '@/hooks/use-backpressure';

export default function useBackpressureForm<T extends z.ZodRawShape>({
  schema,
  pathname,
  searchParams,
  backpressure = useBackpressure,
}: {
  schema: z.ZodObject<T>;
  pathname: string;
  searchParams: URLSearchParams;
  backpressure?: typeof useBackpressure;
}) {
  const suspenseRef = useRef(Promise.resolve());

  const { formRef, shouldSuspend, triggerUpdate } = backpressure();

  const handleAction = async (formData: FormData) => {
    const parsedSchema = schema.safeParse(Object.fromEntries(formData));

    if (!parsedSchema.success) {
      return;
    }

    const newSearchParams = {
      ...Object.fromEntries(searchParams),
      ...parsedSchema.data,
    } as const;

    const filteredSearchParams = Object.fromEntries(
      Object.entries(newSearchParams).filter(([, value]) => Boolean(value)),
    );

    const newUrl = `${pathname}?${new URLSearchParams(filteredSearchParams)}`;

    await triggerUpdate(newUrl);
  };

  if (shouldSuspend) {
    use(suspenseRef.current);
  }

  return [formRef, handleAction] as const;
}
