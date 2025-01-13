import { NextRequest } from 'next/server';
import SearchManager from '@/lib/spotify/search/manager';

export async function GET(request: NextRequest) {
  const data = await SearchManager.get(request.nextUrl.searchParams);

  if ('error' in data) {
    return Response.json(data, { status: 500 });
  }

  return Response.json(data);
}
