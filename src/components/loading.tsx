import { Skeleton } from '@/components/ui/skeleton';
import Group from '@/components/group';

export default function Loading({ groups = 2, placeholders = 2 }) {
  const loadingGroups = Array.from({ length: groups }, () => 0);

  return (
    <ol className="flex flex-col gap-2">
      {loadingGroups.map((base, baseIndex) => {
        const groupKey = base + baseIndex;

        const loadingPlaceholders = Array.from(
          { length: placeholders },
          () => 0,
        );

        return (
          <Group
            key={`loading-group-${groupKey}`}
            head={<Skeleton className="h-7 w-1/4" />}
          >
            {loadingPlaceholders.map((placeholder, placeholderIndex) => {
              const placeholderKey = placeholder + placeholderIndex;

              return (
                <Skeleton
                  key={`loading-group-${groupKey}-placeholder-${placeholderKey}`}
                  className="h-40 w-full"
                />
              );
            })}
          </Group>
        );
      })}
    </ol>
  );
}
