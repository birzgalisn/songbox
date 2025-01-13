import useFavorites from '@/hooks/use-favorites';
import { TFavoritesKeys, TFavoritesValues } from '@/schemas/spotify';

export default function useIsFavorite({
  type,
  item,
}: {
  type: TFavoritesKeys;
  item: TFavoritesValues;
}) {
  const { data: favorites } = useFavorites();

  const currentFavorites = favorites?.[type] ?? [];
  const isFavorite = currentFavorites.some(
    (favorite) => favorite?.id === item?.id,
  );

  return isFavorite;
}
