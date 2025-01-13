const searchTypes = Object.freeze([
  'album',
  'artist',
  'playlist',
  'track',
  'show',
  'episode',
  'audiobook',
] as const);

export type TSearchType = (typeof searchTypes)[number];

export default searchTypes;
