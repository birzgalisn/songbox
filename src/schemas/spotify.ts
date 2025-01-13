import { z } from 'zod';

import iso3166alpha2Codes from '@/constants/iso-3166-alpha-2-codes';
import searchTypes, { TSearchType } from '@/constants/search-types';

const nullableArray = <T>(schema: z.ZodType<T>) =>
  z
    .array(schema)
    .nullable()
    .transform((items) => items?.filter(Boolean));

const ExternalUrlsSchema = z.object({ spotify: z.string() });

export type TExternalUrls = z.infer<typeof ExternalUrlsSchema>;

const ImageObjectSchema = z.object({
  url: z.string(),
  height: z.number().nullable(),
  width: z.number().nullable(),
});

export type TImageObject = z.infer<typeof ImageObjectSchema>;

const RestrictionsSchema = z
  .object({
    reason: z.enum(['market', 'product', 'explicit']),
  })
  .optional();

export type TRestrictions = z.infer<typeof RestrictionsSchema>;

const AvailableMarketsSchema = z.array(z.enum(iso3166alpha2Codes)).optional();

export type TAvailableMarkets = z.infer<typeof AvailableMarketsSchema>;

const AlbumTypeSchema = z.enum(['album', 'single', 'compilation']);

export type TAlbumType = z.infer<typeof AlbumTypeSchema>;

const ReleaseDatePrecisionSchema = z.enum(['year', 'month', 'day']);

export type TReleaseDatePrecision = z.infer<typeof ReleaseDatePrecisionSchema>;

const ExternalIdsSchema = z.object({
  isrc: z.string().optional(),
  ean: z.string().optional(),
  upc: z.string().optional(),
});

export type TExternalIds = z.infer<typeof ExternalIdsSchema>;

const SimplifiedArtistObjectSchema = z
  .object({
    external_urls: ExternalUrlsSchema,
    href: z.string(),
    id: z.string(),
    name: z.string(),
    type: z.literal('artist'),
    uri: z.string(),
  })
  .nullable();

export type TSimplifiedArtistObject = z.infer<
  typeof SimplifiedArtistObjectSchema
>;

const MetadataSchema = z.object({
  href: z.string(),
  limit: z.number(),
  next: z.string().nullable(),
  offset: z.number(),
  previous: z.string().nullable(),
  total: z.number(),
});

export type TMetadata = z.infer<typeof MetadataSchema>;

const FollowersSchema = z
  .object({
    href: z.string().nullable(),
    total: z.number(),
  })
  .optional();

export type TFollowers = z.infer<typeof FollowersSchema>;

const CopyrightsSchema = z.array(
  z.object({ text: z.string(), type: z.string() }),
);

export type TCopyrights = z.infer<typeof CopyrightsSchema>;

const AlbumObjectSchema = z.object({
  album_type: AlbumTypeSchema,
  total_tracks: z.number(),
  available_markets: AvailableMarketsSchema,
  external_urls: ExternalUrlsSchema,
  href: z.string(),
  id: z.string(),
  images: z.array(ImageObjectSchema),
  name: z.string(),
  release_date: z.string(),
  release_date_precision: ReleaseDatePrecisionSchema,
  restrictions: RestrictionsSchema,
  type: z.literal('album'),
  uri: z.string(),
  artists: z.array(SimplifiedArtistObjectSchema),
});

export type TAlbumObject = z.infer<typeof AlbumObjectSchema>;

const TrackObjectSchema = z
  .object({
    album: AlbumObjectSchema,
    artists: z.array(SimplifiedArtistObjectSchema),
    available_markets: AvailableMarketsSchema,
    disc_number: z.number(),
    duration_ms: z.number(),
    explicit: z.boolean(),
    external_ids: ExternalIdsSchema,
    external_urls: ExternalUrlsSchema,
    href: z.string(),
    id: z.string(),
    is_playable: z.boolean(),
    linked_from: z.object({}).optional(),
    restrictions: RestrictionsSchema,
    name: z.string(),
    popularity: z.number(),
    preview_url: z.string().nullable(),
    track_number: z.number(),
    type: z.literal('track'),
    uri: z.string(),
    is_local: z.boolean(),
  })
  .nullable();

export type TTrackObject = z.infer<typeof TrackObjectSchema>;

const SimplifiedAlbumObjectSchema = z
  .object({
    album_type: AlbumTypeSchema,
    total_tracks: z.number(),
    available_markets: AvailableMarketsSchema,
    external_urls: ExternalUrlsSchema,
    href: z.string(),
    id: z.string(),
    images: z.array(ImageObjectSchema),
    name: z.string(),
    release_date: z.string(),
    release_date_precision: ReleaseDatePrecisionSchema,
    restrictions: RestrictionsSchema,
    type: z.literal('album'),
    uri: z.string(),
    artists: z.array(SimplifiedArtistObjectSchema).nullable(),
  })
  .nullable();

export type TSimplifiedAlbumObject = z.infer<
  typeof SimplifiedAlbumObjectSchema
>;

const SimplifiedPlaylistObjectSchema = z
  .object({
    collaborative: z.boolean(),
    description: z.string(),
    external_urls: ExternalUrlsSchema,
    href: z.string(),
    id: z.string(),
    images: z.array(ImageObjectSchema),
    name: z.string(),
    owner: z.object({
      external_urls: ExternalUrlsSchema,
      followers: FollowersSchema,
      href: z.string(),
      id: z.string(),
      type: z.literal('user'),
      uri: z.string(),
      display_name: z.string().nullable(),
    }),
    public: z.boolean(),
    snapshot_id: z.string(),
    tracks: z.object({
      href: z.string().nullable(),
      total: z.number(),
    }),
    type: z.literal('playlist'),
    uri: z.string(),
  })
  .nullable();

export type TSimplifiedPlaylistObject = z.infer<
  typeof SimplifiedPlaylistObjectSchema
>;

const SimplifiedShowObjectSchema = z
  .object({
    available_markets: AvailableMarketsSchema,
    copyrights: CopyrightsSchema,
    description: z.string(),
    html_description: z.string(),
    explicit: z.boolean(),
    external_urls: ExternalUrlsSchema,
    href: z.string(),
    id: z.string(),
    images: z.array(ImageObjectSchema),
    is_externally_hosted: z.boolean().nullable(),
    languages: z.array(z.string()),
    media_type: z.string(),
    name: z.string(),
    publisher: z.string(),
    type: z.literal('show'),
    uri: z.string(),
    total_episodes: z.number(),
  })
  .nullable();

export type TSimplifiedShowObject = z.infer<typeof SimplifiedShowObjectSchema>;

const SimplifiedEpisodeObjectSchema = z
  .object({
    audio_preview_url: z.string().nullable(),
    description: z.string(),
    html_description: z.string(),
    duration_ms: z.number(),
    explicit: z.boolean(),
    external_urls: ExternalUrlsSchema,
    href: z.string(),
    id: z.string(),
    images: z.array(ImageObjectSchema),
    is_externally_hosted: z.boolean(),
    is_playable: z.boolean(),
    language: z.string().nullable(),
    languages: z.array(z.string()),
    name: z.string(),
    release_date: z.string(),
    release_date_precision: ReleaseDatePrecisionSchema,
    resume_point: z
      .object({
        fully_played: z.boolean(),
        resume_position_ms: z.number(),
      })
      .optional(),
    type: z.literal('episode'),
    uri: z.string(),
    restrictions: RestrictionsSchema,
  })
  .nullable();

export type TSimplifiedEpisodeObject = z.infer<
  typeof SimplifiedEpisodeObjectSchema
>;

const SimplifiedAudiobookObjectSchema = z
  .object({
    authors: z.array(z.object({ name: z.string() })),
    available_markets: AvailableMarketsSchema,
    copyrights: CopyrightsSchema,
    description: z.string(),
    html_description: z.string(),
    edition: z.string(),
    explicit: z.boolean(),
    external_urls: ExternalUrlsSchema,
    href: z.string(),
    id: z.string(),
    images: z.array(ImageObjectSchema),
    languages: z.array(z.string()),
    media_type: z.string(),
    name: z.string(),
    narrators: z.array(z.object({ name: z.string() })),
    publisher: z.string(),
    type: z.literal('audiobook'),
    uri: z.string(),
    total_chapters: z.number(),
  })
  .nullable();

export type TSimplifieldAudiobookObject = z.infer<
  typeof SimplifiedAudiobookObjectSchema
>;

export const ClientCredentialsSchema = z
  .object({
    access_token: z.string(),
    token_type: z.string(),
    expires_in: z.number(),
  })
  .transform(({ expires_in, ...data }) => ({
    ...data,
    expires_at: Date.now() + expires_in * 1000,
  }));

export type TClientCredentials = z.infer<typeof ClientCredentialsSchema>;

export const SearchParamsSchema = z
  .object({
    q: z.string(),
    type: z
      .string()
      .optional()
      .transform(
        (type = '') =>
          type
            .split(',')
            .filter((value) => searchTypes.includes(value as TSearchType))
            .join(',') || searchTypes.join(','),
      ),
    market: z
      .string()
      .optional()
      .transform(
        (market = '') =>
          `${iso3166alpha2Codes.find((iso) => iso === market) || 'US'}`,
      ),
    limit: z
      .string()
      .optional()
      .transform((limit) => `${Number(limit) || 9}`),
    offset: z
      .string()
      .optional()
      .transform((offset) => `${Number(offset) || 0}`),
    include_external: z.string().optional(),
  })
  .transform(({ include_external, ...data }) => ({
    ...data,
    ...(include_external === 'audio' && { include_external }),
  }));

export type TSearchParams = z.infer<typeof SearchParamsSchema>;

export const TracksSchema = z.object({
  ...MetadataSchema.shape,
  items: nullableArray(TrackObjectSchema),
});

export type TTracks = z.infer<typeof TracksSchema>;

export const ArtistSchema = z
  .object({
    external_urls: ExternalUrlsSchema,
    followers: FollowersSchema,
    genres: z.array(z.string()),
    href: z.string(),
    id: z.string(),
    images: z.array(ImageObjectSchema),
    name: z.string(),
    popularity: z.number(),
    type: z.literal('artist'),
    uri: z.string(),
  })
  .nullable();

export type TArtist = z.infer<typeof ArtistSchema>;

export const ArtistsSchema = z.object({
  ...MetadataSchema.shape,
  items: nullableArray(ArtistSchema),
});

export type TAritsts = z.infer<typeof ArtistsSchema>;

export const AlbumsSchema = z.object({
  ...MetadataSchema.shape,
  items: nullableArray(SimplifiedAlbumObjectSchema),
});

export type TAlbums = z.infer<typeof AlbumsSchema>;

export const PlaylistsSchema = z.object({
  ...MetadataSchema.shape,
  items: nullableArray(SimplifiedPlaylistObjectSchema),
});

export type TPlaylists = z.infer<typeof PlaylistsSchema>;

export const ShowsSchema = z.object({
  ...MetadataSchema.shape,
  items: nullableArray(SimplifiedShowObjectSchema),
});

export type TShows = z.infer<typeof ShowsSchema>;

export const EpisodesSchema = z.object({
  ...MetadataSchema.shape,
  items: nullableArray(SimplifiedEpisodeObjectSchema),
});

export type TEpisdoes = z.infer<typeof EpisodesSchema>;

export const AudiobooksSchema = z.object({
  ...MetadataSchema.shape,
  items: nullableArray(SimplifiedAudiobookObjectSchema),
});

export type TAudiobooks = z.infer<typeof AudiobooksSchema>;

export const SearchResponseSchema = z.object({
  tracks: TracksSchema.optional(),
  artists: ArtistsSchema.optional(),
  albums: AlbumsSchema.optional(),
  playlists: PlaylistsSchema.optional(),
  shows: ShowsSchema.optional(),
  episodes: EpisodesSchema.optional(),
  audiobooks: AudiobooksSchema.optional(),
});

export type TSearchResponse = z.infer<typeof SearchResponseSchema>;

export const ErrorSchema = z.object({
  error: z.object({
    status: z.number(),
    message: z.string(),
  }),
});

export type TError = z.infer<typeof ErrorSchema>;

export const FavoritesSchema = z.object({
  tracks: z.array(TrackObjectSchema).optional(),
  albums: z.array(SimplifiedAlbumObjectSchema).optional(),
  artists: z.array(ArtistSchema).optional(),
  playlists: z.array(SimplifiedPlaylistObjectSchema).optional(),
  shows: z.array(SimplifiedShowObjectSchema).optional(),
  episodes: z.array(SimplifiedEpisodeObjectSchema).optional(),
  audiobooks: z.array(SimplifiedAudiobookObjectSchema).optional(),
});

export type TFavorites = z.infer<typeof FavoritesSchema>;

export type TFavoritesKeys = keyof TFavorites;

export type TFavoritesValues = NonNullable<
  TFavorites[keyof TFavorites]
>[number];

export const ParsedFavoritesSchema = z
  .string()
  .transform((favoritesString, ctx) => {
    try {
      return JSON.parse(favoritesString);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid JSON',
      });
      return z.never;
    }
  })
  .pipe(FavoritesSchema);

export type TParsedFavorites = z.infer<typeof ParsedFavoritesSchema>;
