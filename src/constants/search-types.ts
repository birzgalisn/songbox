const SEARCH_TYPES = Object.freeze([
  'album',
  'artist',
  'playlist',
  'track',
  'show',
  'episode',
  'audiobook',
] as const);

export type TSearchType = (typeof SEARCH_TYPES)[number];

export default SEARCH_TYPES;
