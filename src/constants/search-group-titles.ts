import { TSearchResponse } from '@/schemas/spotify';

const searchGroupTitles: Record<keyof TSearchResponse, string> = Object.freeze({
  tracks: 'Tracks',
  artists: 'Artists',
  albums: 'Albums',
  playlists: 'Playlists',
  shows: 'Shows',
  episodes: 'Episodes',
  audiobooks: 'Audiobooks',
} as const);

export default searchGroupTitles;
