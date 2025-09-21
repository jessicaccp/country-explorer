import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import FilterControls from './FilterControls'

describe('FilterControls Component', () => {
  const mockProps = {
    searchTerm: '',
    selectedRegion: 'all',
    sortOrder: 'name-asc',
    itemsPerPage: 12,
    onSearchChange: vi.fn(),
    onRegionChange: vi.fn(),
    onSortChange: vi.fn(),
    onItemsPerPageChange: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call onSearchChange with the correct value when user types in the input', () => {
    render(<FilterControls {...mockProps} />)
    const searchInput = screen.getByRole('searchbox')
    fireEvent.change(searchInput, { target: { value: 'Brazil' } })
    expect(mockProps.onSearchChange).toHaveBeenCalledWith('Brazil')
  })

  it('should call onRegionChange when user selects a new region', async () => {
    const user = userEvent.setup()
    render(<FilterControls {...mockProps} />)
    const regionSelectTrigger = screen
      .getByText(/all regions/i)
      .closest('button')

    await user.click(regionSelectTrigger)
    const africaOption = await screen.findByRole('option', { name: /africa/i })
    await user.click(africaOption)
    expect(mockProps.onRegionChange).toHaveBeenCalledWith('Africa')
  })
})
