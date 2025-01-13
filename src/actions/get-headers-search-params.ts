import { headers } from 'next/headers';
import customHeaders from '@/constants/custom-headers';

export default async function getHeadersSearchParams() {
  const headersList = await headers();

  const search = headersList.get(customHeaders.search) ?? '';

  return new URLSearchParams(search);
}
