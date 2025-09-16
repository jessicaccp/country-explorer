import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { DOTS } from '@/hooks/usePagination'

/**
 * @description Renders the main pagination controls for the application.
 * It uses the `usePagination` hook's output to build an intelligent pagination UI with ellipses.
 * @param {object} props - The component's props.
 * @param {(number|string)[]} props.paginationRange - The array of pages and dots from the `usePagination` hook.
 * @param {number} props.currentPage - The current active page.
 * @param {number} props.totalPages - The total number of pages.
 * @param {Function} props.setCurrentPage - Callback function to set the current page.
 */
const HomePagination = ({
  paginationRange,
  currentPage,
  totalPages,
  setCurrentPage
}) => {
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  return (
    <section>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={e => {
                e.preventDefault()
                setCurrentPage(prev => Math.max(prev - 1, 1))
              }}
              className={
                currentPage === 1 ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>

          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <PaginationItem key={`dots-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href='#'
                  isActive={pageNumber === currentPage}
                  onClick={e => {
                    e.preventDefault()
                    setCurrentPage(pageNumber)
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={e => {
                e.preventDefault()
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }}
              className={
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  )
}

export default HomePagination
