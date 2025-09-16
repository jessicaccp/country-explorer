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
