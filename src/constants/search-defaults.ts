import SEARCH_TYPES from '@/constants/search-types';

const SEARCH_DEFAULTS = Object.freeze({
  q: '',
  type: SEARCH_TYPES.join(','),
  market: 'US',
  limit: 2,
  offset: 0,
} as const);

export default SEARCH_DEFAULTS;
