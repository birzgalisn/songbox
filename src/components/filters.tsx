'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import searchFields from '@/constants/search-fields';
import searchTypes from '@/constants/search-types';
import useUpdateFilters from '@/hooks/use-update-filters';

export default function Filters() {
  const handler = useUpdateFilters();

  return (
    <div data-pending={handler.isPending ? '' : undefined}>
      <ToggleGroup
        type="multiple"
        {...handler.registerMultiple(searchFields.include)}
      >
        {searchTypes.map((type) => (
          <ToggleGroupItem
            key={`filters-type-${type}`}
            value={type}
            disabled={handler.isPending}
            className="capitalize group-has-[[data-pending]]:pointer-events-none data-[state=on]:text-blue-600"
          >
            {type}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
