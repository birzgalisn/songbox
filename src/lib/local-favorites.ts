import { isServer } from '@tanstack/react-query';
import {
  ParsedFavoritesSchema,
  TFavorites,
  TFavoritesKeys,
  TFavoritesValues,
} from '@/schemas/spotify';

export type TFavoritesData = {
  type: TFavoritesKeys;
  item: TFavoritesValues;
};

export default class LocalFavorites {
  public static readonly key = 'favorites';

  public static getFavorites() {
    if (isServer) {
      return {};
    }

    const rawFavorites = localStorage.getItem(LocalFavorites.key);
    return ParsedFavoritesSchema.safeParse(rawFavorites)?.data || {};
  }

  public static addFavorite(data: TFavoritesData) {
    return LocalFavorites.updateFavorites(
      data,
      LocalFavorites.addToFavoritesList,
    );
  }

  public static removeFavorite(data: TFavoritesData) {
    return LocalFavorites.updateFavorites(
      data,
      LocalFavorites.removeFromFavoritesList,
    );
  }

  private static setFavorites(favorites: TFavorites) {
    if (isServer) {
      return {};
    }

    localStorage.setItem(LocalFavorites.key, JSON.stringify(favorites));
  }

  private static updateFavorites(
    data: TFavoritesData,
    updater:
      | typeof LocalFavorites.addToFavoritesList
      | typeof LocalFavorites.removeFromFavoritesList,
  ) {
    if (isServer) {
      return {};
    }

    const favorites = LocalFavorites.getFavorites();
    const updatedFavorites = updater(favorites, data);
    LocalFavorites.setFavorites(updatedFavorites);

    return updatedFavorites;
  }

  private static addToFavoritesList(
    favorites: TFavorites,
    { type, item }: TFavoritesData,
  ) {
    return {
      ...favorites,
      [type]: [...(favorites[type] || []), item],
    } satisfies TFavorites;
  }

  private static removeFromFavoritesList(
    favorites: TFavorites,
    { type, item }: TFavoritesData,
  ) {
    return {
      ...favorites,
      [type]: (favorites[type] || []).filter(
        (favorite) => favorite?.id !== item?.id,
      ),
    } satisfies TFavorites;
  }
}
