import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ pagination = {}, baseUrl = '/documents', useQueryParam = false, queryParamName = 'page' }) {
  const {
    currentPage = 1,
    totalPages = 1,
    hasPrev = false,
    hasNext = false,
  } = pagination;

  const getPageUrl = (pageNum) => {
    const [path, queryString] = baseUrl.split('?');
    if (useQueryParam) {
      const params = new URLSearchParams(queryString || '');
      if (pageNum === 1) {
        params.delete(queryParamName);
      } else {
        params.set(queryParamName, pageNum);
      }
      const qs = params.toString();
      return qs ? `${path}?${qs}` : path;
    }
    const pagePath = pageNum === 1 ? path : `${path}/page/${pageNum}`;
    return queryString ? `${pagePath}?${queryString}` : pagePath;
  };

  const getPageNumbers = () => {
    if (totalPages <= 1) return [];

    const delta = 2;
    const rangeWithDots = [];

    const left  = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    // Always include page 1
    rangeWithDots.push(1);

    if (left > 2) rangeWithDots.push('...');

    for (let i = left; i <= right; i++) rangeWithDots.push(i);

    if (right < totalPages - 1) rangeWithDots.push('...');

    // Always include last page (guard against totalPages === 1 duplicate)
    if (totalPages > 1) rangeWithDots.push(totalPages);

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col px-4 rounded-xl sm:flex-row items-center justify-between gap-4 py-4 bg-zinc-900 border border-zinc-800"
    >
      {/* Page info */}
      <p className="text-sm text-zinc-400 order-2 sm:order-1">
        Page{' '}
        <span className="font-semibold text-white">{currentPage}</span>
        {' '}of{' '}
        <span className="font-semibold text-white">{totalPages}</span>
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1 order-1 sm:order-2">

        {/* Prev */}
        {hasPrev ? (
          <Link
            href={getPageUrl(currentPage - 1)}
            aria-label="Previous page"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white bg-zinc-900 border border-zinc-800 hover:text-yellow-400 hover:border-zinc-700 transition-colors duration-150 select-none"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Prev</span>
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 bg-zinc-900/50 border border-zinc-800/50 cursor-not-allowed select-none"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Prev</span>
          </span>
        )}

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pages.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`dots-${index}`}
                  className="inline-flex items-center justify-center w-9 h-9 text-sm text-zinc-500 select-none"
                >
                  ···
                </span>
              );
            }

            const isActive = page === currentPage;
            return isActive ? (
              <span
                key={page}
                aria-current="page"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-semibold bg-yellow-400 text-neutral-900 shadow-sm select-none"
              >
                {page}
              </span>
            ) : (
              <Link
                key={page}
                href={getPageUrl(page)}
                aria-label={`Page ${page}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium text-white bg-zinc-900 border border-zinc-800 hover:text-yellow-400 hover:border-zinc-700 transition-colors duration-150 select-none"
              >
                {page}
              </Link>
            );
          })}
        </div>

        {/* Next */}
        {hasNext ? (
          <Link
            href={getPageUrl(currentPage + 1)}
            aria-label="Next page"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white bg-zinc-900 border border-zinc-800 hover:text-yellow-400 hover:border-zinc-700 transition-colors duration-150 select-none"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 bg-zinc-900/50 border border-zinc-800/50 cursor-not-allowed select-none"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </nav>
  );
}