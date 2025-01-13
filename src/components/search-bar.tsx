'use client';

import searchTypes from '@/constants/search-types';
import searchFields from '@/constants/search-fields';
import useSearchParamsFields from '@/hooks/use-search-params-fields';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function SearchBar() {
  const handler = useSearchParamsFields();

  return (
    <div className="mb-8">
      <Input
        {...handler.registerInput(searchFields.query)}
        placeholder="Search for songs, artists, albums..."
        className="mb-4 flex-grow bg-white"
      />

      <ToggleGroup
        {...handler.registerGroup(searchFields.include)}
        type="multiple"
      >
        {searchTypes.map((type) => (
          <ToggleGroupItem
            key={`search-type-${type}`}
            value={type}
            className="capitalize data-[state=on]:text-blue-600"
          >
            {type}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
