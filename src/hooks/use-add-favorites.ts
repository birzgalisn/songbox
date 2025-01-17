import { useMutation, useQueryClient } from '@tanstack/react-query';
import LocalFavorites, { TFavoriteData } from '@/lib/local-favorites';

export default function useAddFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TFavoriteData) => {
      const newFavorites = LocalFavorites.addFavorite(data);
      return Promise.resolve(newFavorites);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LocalFavorites.storageKey] });
    },
  });
}
