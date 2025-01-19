import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useSearchPagination from '@/hooks/use-search-pagination';

export default function Pagination() {
  const { isPending, total, page, maxPage, nextPage, previousPage } =
    useSearchPagination();

  if (!total) {
    return null;
  }

  return (
    <footer
      data-pending={isPending ? '' : undefined}
      className="flex items-center justify-center gap-4 border-t py-4"
    >
      <Button
        size="sm"
        variant="ghost"
        disabled={isPending}
        onClick={previousPage}
        aria-label="Previous page"
      >
        <ArrowLeft aria-hidden="true" />
      </Button>

      <p>
        {total.toLocaleString()} results ({page.toLocaleString()} of{' '}
        {maxPage.toLocaleString()})
      </p>

      <Button
        size="sm"
        variant="ghost"
        disabled={isPending}
        onClick={nextPage}
        aria-label="Next page"
      >
        <ArrowRight aria-hidden="true" />
      </Button>
    </footer>
  );
}
