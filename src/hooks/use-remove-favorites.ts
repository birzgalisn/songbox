import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TFavoritesKeys, TFavoritesValues } from '@/schemas/spotify';
import LocalFavorites from '@/lib/local-favorites';

export default function useRemoveFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      type: TFavoritesKeys;
      item: TFavoritesValues;
    }) => {
      const newFavorites = LocalFavorites.removeFavorite(data);
      return Promise.resolve(newFavorites);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LocalFavorites.storageKey] });
    },
  });
}
