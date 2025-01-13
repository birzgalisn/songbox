import { isServer } from '@tanstack/react-query';
import {
  ParsedFavoritesSchema,
  TFavorites,
  TFavoritesKeys,
  TFavoritesValues,
} from '@/schemas/spotify';

export default class LocalFavorites {
  public static readonly storageKey = 'favorites';

  public static getFavorites() {
    if (isServer) {
      return {};
    }

    const rawFavorites = localStorage.getItem(this.storageKey) || '{}';

    return this.safeParseFavorites(rawFavorites);
  }

  public static addFavorite({
    type,
    item,
  }: {
    type: TFavoritesKeys;
    item: TFavoritesValues;
  }) {
    if (isServer) {
      return null;
    }

    const favorites = this.getFavorites();
    const updatedFavorites = this.updateFavoritesList(favorites, type, item);

    this.saveFavorites(updatedFavorites);

    return updatedFavorites;
  }

  public static removeFavorite({
    type,
    item,
  }: {
    type: TFavoritesKeys;
    item: TFavoritesValues;
  }) {
    if (isServer) {
      return null;
    }

    const favorites = this.getFavorites();
    const updatedFavorites = this.removeFavoriteFromList(favorites, type, item);

    this.saveFavorites(updatedFavorites);
    return updatedFavorites;
  }

  private static safeParseFavorites(rawFavorites: string) {
    try {
      return ParsedFavoritesSchema.parse(rawFavorites);
    } catch {
      return {};
    }
  }

  private static saveFavorites(favorites: TFavorites) {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(favorites, (_key, value) =>
        value instanceof Set ? [...value] : value,
      ),
    );
  }

  private static updateFavoritesList(
    favorites: TFavorites,
    type: TFavoritesKeys,
    item: TFavoritesValues,
  ) {
    const previousFavorites = favorites[type] || [];
    return {
      ...favorites,
      [type]: [...previousFavorites, item],
    } satisfies TFavorites;
  }

  private static removeFavoriteFromList(
    favorites: TFavorites,
    type: TFavoritesKeys,
    item: TFavoritesValues,
  ) {
    const previousFavorites = favorites[type] || [];
    return {
      ...favorites,
      [type]: previousFavorites.filter((favorite) => favorite?.id !== item?.id),
    } satisfies TFavorites;
  }
}
