import { useMemo } from 'react';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = '...';

/**
 * A custom React hook that generates a pagination range array with ellipses.
 * It's designed to be used in pagination components to create a smart navigation UI.
 * 
 * @param {object} props - The pagination configuration object.
 * @param {number} props.totalItems - The total number of items to be paginated.
 * @param {number} props.itemsPerPage - The maximum number of items displayed per page.
 * @param {number} props.currentPage - The current active page, starting from 1.
 * @param {number} [props.siblingCount=1] - The number of page numbers to show on each side of the current page. Defaults to 1.
 * 
 * @returns {(number|string)[]} An array of page numbers and ellipses ('...') representing the pagination range.
 * 
 * @example
 * const range = usePagination({ totalItems: 100, itemsPerPage: 10, currentPage: 5, siblingCount: 1 });
 * // returns [1, '...', 4, 5, 6, '...', 10]
 */
export const usePagination = ({
  totalItems,
  itemsPerPage,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalItems, itemsPerPage, siblingCount, currentPage]);

  return paginationRange;
};