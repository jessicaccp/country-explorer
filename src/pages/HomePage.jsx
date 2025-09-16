import CountryCard from '@/components/CountryCard'
import Error from '@/components/Error'
import FilterControls from '@/components/FilterControls'
import Loading from '@/components/Loading'
import { fetchAllCountries } from '@/services/api'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

const HomePage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [allCountries, setAllCountries] = useState([])
  const [displayedCountries, setDisplayedCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)
  const [sortOrder, setSortOrder] = useState('name-asc')

  useEffect(() => {
    const getAllCountriesData = async () => {
      try {
        setError(false)
        setLoading(true)
        const data = await fetchAllCountries()
        setAllCountries(data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    getAllCountriesData()
  }, [])

  useEffect(() => {
    let filtered = allCountries
    if (debouncedSearchTerm) {
      filtered = filtered.filter(country =>
        country.name.common
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      )
    }
    if (selectedRegion && selectedRegion !== 'all') {
      filtered = filtered.filter(country => country.region === selectedRegion)
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case 'name-asc':
          return a.name.common.localeCompare(b.name.common)
        case 'name-desc':
          return b.name.common.localeCompare(a.name.common)
        case 'pop-desc':
          return b.population - a.population
        case 'pop-asc':
          return a.population - b.population
        default:
          return 0
      }
    })

    setDisplayedCountries(sorted)
  }, [allCountries, debouncedSearchTerm, selectedRegion, sortOrder])

  console.log(displayedCountries)

  if (loading) return <Loading />
  if (error) return <Error error={'Failed to search data.'} />

  return (
    <>
      {' '}
      <div className='flex flex-col gap-8'>
        <section>
          <FilterControls
            searchTerm={searchTerm}
            selectedRegion={selectedRegion}
            sortOrder={sortOrder}
            onSearchChange={setSearchTerm}
            onRegionChange={setSelectedRegion}
            onSortChange={setSortOrder}
          />
        </section>
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {displayedCountries.map(country => {
            return <CountryCard key={country.cca3} country={country} />
          })}
        </section>
      </div>
    </>
  )
}

export default HomePage
