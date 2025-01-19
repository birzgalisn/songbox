import SEARCH_DEFAULTS from '@/constants/search-defaults';
import SEARCH_FIELDS from '@/constants/search-fields';

type SearchFieldKeys = keyof typeof SEARCH_FIELDS;
type NumericFields = keyof Pick<typeof SEARCH_FIELDS, 'limit' | 'offset'>;
type StringFields = Exclude<SearchFieldKeys, NumericFields>;

function getSafeSearchParam(
  searchParams: URLSearchParams,
  name: NumericFields,
): number;
function getSafeSearchParam(
  searchParams: URLSearchParams,
  name: StringFields,
): string;
function getSafeSearchParam(
  searchParams: URLSearchParams,
  name: SearchFieldKeys,
) {
  const field = SEARCH_FIELDS[name];
  const value = searchParams.get(field);
  const defaultValue = SEARCH_DEFAULTS[name];

  if (name === SEARCH_FIELDS.limit || name === SEARCH_FIELDS.offset) {
    return +(value || defaultValue) || defaultValue;
  }

  return `${value || defaultValue || ''}`;
}

export default getSafeSearchParam;
