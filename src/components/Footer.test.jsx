import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Footer from './Footer'

describe('Footer Component', () => {
  it('should render the creator name and API links correctly', () => {
    render(<Footer />)

    const creatorLink = screen.getByRole('link', { name: /jessica patricio/i })
    const apiLink = screen.getByRole('link', { name: /rest countries api/i })
    const codedByText = screen.getByText(/coded with ❤️ by/i)

    expect(creatorLink).toBeInTheDocument()
    expect(apiLink).toBeInTheDocument()
    expect(codedByText).toBeInTheDocument()
  })
})
