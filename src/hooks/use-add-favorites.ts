import { useMutation, useQueryClient } from '@tanstack/react-query';
import LocalFavorites, { TFavoritesData } from '@/lib/local-favorites';

export default function useAddFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TFavoritesData) => {
      const newFavorites = LocalFavorites.addFavorite(data);
      return Promise.resolve(newFavorites);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LocalFavorites.key] });
    },
  });
}
