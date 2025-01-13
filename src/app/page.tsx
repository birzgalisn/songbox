import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/app/get-query-client';
import SearchBar from '@/components/search-bar';
import SearchResults from '@/components/search-results';
import getHeadersSearchParams from '@/actions/get-headers-search-params';
import getSearchServerOptions from '@/query-options/search/server';

export default async function Home() {
  const searchParams = await getHeadersSearchParams();

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getSearchServerOptions(searchParams));

  return (
    <>
      <SearchBar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchResults />
      </HydrationBoundary>
    </>
  );
}
