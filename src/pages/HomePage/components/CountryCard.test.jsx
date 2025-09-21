import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import CountryCard from './CountryCard'

const mockCountry = {
  name: {
    common: 'Brazil',
    official: 'Federative Republic of Brazil'
  },
  flags: {
    svg: 'https://flagcdn.com/br.svg',
    alt: 'The flag of Brazil has a green field with a large yellow rhombus in the center.'
  },
  capital: ['Brasília'],
  region: 'Americas',
  subregion: 'South America'
}

describe('CountryCard Component', () => {
  it('should render country data correctly from props', () => {
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    )
    const countryName = screen.getByRole('heading', { name: /brazil/i })
    const capitalName = screen.getByText(/brasília/i)
    const regionName = screen.getByText(/americas/i, { selector: 'span' })
    const flagImage = screen.getByRole('img', { name: /flag of brazil/i })
    expect(countryName).toBeInTheDocument()
    expect(capitalName).toBeInTheDocument()
    expect(regionName).toBeInTheDocument()
    expect(flagImage).toBeInTheDocument()
    expect(flagImage).toHaveAttribute('src', mockCountry.flags.svg)
  })
})
