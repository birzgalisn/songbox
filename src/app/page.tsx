import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/app/get-query-client';
import SearchBar from '@/components/search-bar';
import SearchResultsBoundary from '@/components/search-results';
import getSearchServerOptions from '@/query-options/search/server';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const awaitedSearchParams = await searchParams;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getSearchServerOptions(awaitedSearchParams));

  return (
    <>
      <SearchBar />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchResultsBoundary />
      </HydrationBoundary>
    </>
  );
}
