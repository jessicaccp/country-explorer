import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import BackToTopButton from './BackToTopButton'

describe('BackToTopButton Component', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should be hidden from the document initially', () => {
    render(<BackToTopButton />)
    const button = screen.queryByRole('button', { name: /go to top/i })
    expect(button).not.toBeInTheDocument()
  })

  it('should become visible after the user scrolls down', () => {
    render(<BackToTopButton />)
    fireEvent.scroll(window, { target: { scrollY: 500 } })
    const button = screen.getByRole('button', { name: /go to top/i })
    expect(button).toBeInTheDocument()
  })

  it('should scroll the window to the top when clicked', async () => {
    const user = userEvent.setup()
    render(<BackToTopButton />)
    fireEvent.scroll(window, { target: { scrollY: 500 } })
    const button = screen.getByRole('button', { name: /go to top/i })
    await user.click(button)
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })
})
