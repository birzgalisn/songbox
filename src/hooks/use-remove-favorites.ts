import { useMutation, useQueryClient } from '@tanstack/react-query';
import LocalFavorites, { TFavoriteData } from '@/lib/local-favorites';

export default function useRemoveFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TFavoriteData) => {
      const newFavorites = LocalFavorites.removeFavorite(data);
      return Promise.resolve(newFavorites);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LocalFavorites.storageKey] });
    },
  });
}
