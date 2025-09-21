import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import HomePagination from './HomePagination'

describe('HomePagination Component', () => {
  it('should disable the "Previous" button when on the first page', () => {
    render(
      <HomePagination
        currentPage={1}
        totalPages={10}
        paginationRange={[1, 2, 3, '...', 10]}
        setCurrentPage={vi.fn()}
      />
    )
    const previousButton = screen.getByRole('link', { name: /previous/i })
    expect(previousButton).toHaveClass('pointer-events-none')
  })

  it('should disable the "Next" button when on the last page', () => {
    render(
      <HomePagination
        currentPage={10}
        totalPages={10}
        paginationRange={[1, '...', 8, 9, 10]}
        setCurrentPage={vi.fn()}
      />
    )
    const nextButton = screen.getByRole('link', { name: /next/i })
    expect(nextButton).toHaveClass('pointer-events-none')
  })

  it('should call setCurrentPage with the correct page number when a page link is clicked', async () => {
    const user = userEvent.setup()
    const setCurrentPageMock = vi.fn()
    render(
      <HomePagination
        currentPage={5}
        totalPages={10}
        paginationRange={[1, '...', 4, 5, 6, '...', 10]}
        setCurrentPage={setCurrentPageMock}
      />
    )
    const page6Link = screen.getByRole('link', { name: '6' })
    await user.click(page6Link)
    expect(setCurrentPageMock).toHaveBeenCalledWith(6)
  })
})
