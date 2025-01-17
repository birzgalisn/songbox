import useFavorites from '@/hooks/use-favorites';
import { TFavoritesData } from '@/lib/local-favorites';

export default function useIsFavorite({ type, item }: TFavoritesData) {
  const { hasSomeFavorites, data: favorites } = useFavorites();

  if (!hasSomeFavorites) {
    return false;
  }

  const currentFavorites = favorites[type] ?? [];

  const isFavorite = currentFavorites.some(
    (favorite) => favorite?.id === item?.id,
  );

  return isFavorite;
}
