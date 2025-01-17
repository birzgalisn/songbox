import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/app/get-query-client';
import getSearchServerOptions from '@/query-options/search/server';
import ResultsLoader from '@/components/results';
import SearchLoader from '@/components/search';
import FiltersLoader from '@/components/filters';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const awaitedSearchParams = await searchParams;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getSearchServerOptions(awaitedSearchParams));

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <SearchLoader />
        <FiltersLoader />
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ResultsLoader />
      </HydrationBoundary>
    </section>
  );
}
