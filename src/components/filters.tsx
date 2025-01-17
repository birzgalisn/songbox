'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import searchFields from '@/constants/search-fields';
import searchTypes from '@/constants/search-types';
import useUpdateFilters from '@/hooks/use-update-filters';
import { Suspense } from 'react';

type TFiltersBase = { handler?: ReturnType<typeof useUpdateFilters> };

function FiltersBase({ handler }: TFiltersBase) {
  const dataPending = handler?.isPending ? '' : undefined;

  return (
    <div data-pending={dataPending}>
      <ToggleGroup
        type="multiple"
        disabled={Boolean(dataPending)}
        {...handler?.registerMultiple(searchFields.include)}
      >
        {searchTypes.map((type) => (
          <ToggleGroupItem
            key={`filters-type-${type}`}
            value={type}
            className="capitalize group-has-[[data-pending]]:pointer-events-none data-[state=on]:text-blue-600"
          >
            {type}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

function FiltersHandler() {
  const handler = useUpdateFilters();

  return <FiltersBase {...{ handler }} />;
}

export default function FiltersLoader() {
  return (
    <Suspense fallback={<FiltersBase />}>
      <FiltersHandler />
    </Suspense>
  );
}
