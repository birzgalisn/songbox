'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TFavoritesKeys, TFavoritesValues } from '@/schemas/spotify';
import { Button } from '@/components/ui/button';
import useAddFavorites from '@/hooks/use-add-favorites';
import useRemoveFavorites from '@/hooks/use-remove-favorites';
import useIsFavorite from '@/hooks/use-is-favorite';

export default function MarkFavorite({
  type,
  item,
}: {
  type: TFavoritesKeys;
  item: TFavoritesValues;
}) {
  const isFavorite = useIsFavorite({ type, item });
  const addToFavorites = useAddFavorites();
  const removeFromFavorites = useRemoveFavorites();

  const handleFavorites = () => {
    const updater = isFavorite ? removeFromFavorites : addToFavorites;
    updater.mutate({ type, item });
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
      onClick={handleFavorites}
      className="ml-auto"
    >
      <Star
        className={cn('text-blue-500', {
          'fill-blue-400': isFavorite,
        })}
        aria-hidden="true"
        focusable="false"
      />
    </Button>
  );
}
