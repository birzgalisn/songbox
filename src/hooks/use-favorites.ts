import { isServer, useQuery } from '@tanstack/react-query';
import { TFavoritesKeys } from '@/schemas/spotify';
import LocalFavorites from '@/lib/local-favorites';

export default function useFavorites() {
  const { data = {}, ...rest } = useQuery({
    queryKey: [LocalFavorites.storageKey],
    queryFn: async () => {
      const favorites = LocalFavorites.getFavorites();
      return Promise.resolve(favorites);
    },
    enabled: !isServer,
  });

  const isFavoritesKey = (key: string): key is TFavoritesKeys => key in data;

  const hasSomeFavorites = Boolean(data)
    ? Object.keys(data).some(
        (key) => isFavoritesKey(key) && (data[key]?.length ?? 0) > 0,
      )
    : false;

  return { ...rest, data, hasSomeFavorites } as const;
}
