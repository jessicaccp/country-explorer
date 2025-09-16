import ErrorPage from '@/components/ErrorPage'
import LoadingPage from '@/components/LoadingPage'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { DOTS, usePagination } from '@/hooks/usePagination'
import CountryCard from '@/pages/HomePage/components/CountryCard'
import FilterControls from '@/pages/HomePage/components/FilterControls'
import { fetchAllCountries } from '@/services/api'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

const HomePage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [allCountries, setAllCountries] = useState([])
  const [processedCountries, setProcessedCountries] = useState([])
  const [displayedCountries, setDisplayedCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)
  const [sortOrder, setSortOrder] = useState('name-asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)

  const handleItemsPerPageChange = newSize => {
    setItemsPerPage(newSize)
    setCurrentPage(1)
  }

  useEffect(() => {
    const getAllCountriesData = async () => {
      try {
        setError(false)
        setLoading(true)
        const data = await fetchAllCountries()
        setAllCountries(data)
        setProcessedCountries(data)
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
        case 'area-desc':
          return (b.area || 0) - (a.area || 0)
        case 'area-asc':
          return (a.area || 0) - (b.area || 0)
        case 'region-asc': {
          const regionCompare = (a.region || '').localeCompare(b.region || '')
          if (regionCompare !== 0) {
            return regionCompare
          }
          return a.name.common.localeCompare(b.name.common)
        }
        default:
          return 0
      }
    })

    setProcessedCountries(sorted)
    setCurrentPage(1)
  }, [allCountries, debouncedSearchTerm, selectedRegion, sortOrder])

  useEffect(() => {
    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentItems = processedCountries.slice(firstItemIndex, lastItemIndex)
    setDisplayedCountries(currentItems)
  }, [processedCountries, currentPage, itemsPerPage])

  const totalPages = Math.ceil(processedCountries.length / itemsPerPage)

  const paginationRange = usePagination({
    currentPage,
    totalItems: processedCountries.length,
    itemsPerPage,
    siblingCount: 1
  })

  console.log(displayedCountries)

  if (loading) return <LoadingPage />
  if (error) return <ErrorPage />

  return (
    <>
      {' '}
      <div className='flex flex-col gap-8'>
        <section>
          <FilterControls
            searchTerm={searchTerm}
            selectedRegion={selectedRegion}
            sortOrder={sortOrder}
            itemsPerPage={itemsPerPage}
            onSearchChange={setSearchTerm}
            onRegionChange={setSelectedRegion}
            onSortChange={setSortOrder}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </section>

        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {displayedCountries.map(country => {
            return <CountryCard key={country.cca3} country={country} />
          })}
        </section>

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
      </div>
    </>
  )
}

export default HomePage
