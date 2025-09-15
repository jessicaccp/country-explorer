import CountryCard from '@/components/CountryCard'
import Error from '@/components/Error'
import FilterControls from '@/components/FilterControls'
import Loading from '@/components/Loading'
import { fetchAllCountries } from '@/services/api'
import { useEffect, useState } from 'react'

const HomePage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')

  useEffect(() => {
    const getAllCountriesData = async () => {
      try {
        setError(false)
        setLoading(true)
        const data = await fetchAllCountries()
        setAllCountries(data)
        setFilteredCountries(data)
      } catch (err) {
        console.log('Failed to fetch all countries data:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    getAllCountriesData()
  }, [])

  useEffect(() => {
    let filtered = allCountries
    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (selectedRegion) {
      filtered = filtered.filter(country => country.region === selectedRegion)
    }
    setFilteredCountries(filtered)
  }, [allCountries, searchTerm, selectedRegion])

  console.log(allCountries)

  if (loading) return <Loading />
  if (error) return <Error error={'Failed to search data.'} />

  return (
    <>
      <section>
        <FilterControls
          searchTerm={searchTerm}
          selectedRegion={selectedRegion}
          onSearchChange={value => setSearchTerm(value)}
          onRegionChange={value => setSelectedRegion(value)}
        />
      </section>
      <section className='flex flex-wrap gap-4 justify-between p-4'>
        {filteredCountries.map(country => {
          return <CountryCard country={country} />
        })}
      </section>
    </>
  )
}

export default HomePage
