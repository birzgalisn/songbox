import { Skeleton } from '@/components/ui/skeleton';

export default function Loading({ count = 5 }) {
  const loaders = Array.from({ length: count }, () => 0);

  return (
    <div className="flex w-full flex-col gap-4">
      {loaders.map((base, baseIndex) => {
        const key = base + baseIndex;

        return (
          <Skeleton key={`search-skeleton-${key}`} className="h-12 w-full" />
        );
      })}
    </div>
  );
}
