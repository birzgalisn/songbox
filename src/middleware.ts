import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import customHeaders from '@/constants/custom-headers';

// https://nextjs.org/docs/app/api-reference/file-conventions/page
// https://nextjs.org/docs/app/building-your-application/routing/middleware#setting-headers
// https://github.com/vercel/next.js/issues/43704#issuecomment-2090798307
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(customHeaders.search, request.nextUrl.search);

  const response = NextResponse.next({ request: { headers } });
  return response;
}
