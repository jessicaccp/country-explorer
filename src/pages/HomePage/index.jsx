import ErrorPage from '@/components/ErrorPage'
import LoadingPage from '@/components/LoadingPage'
import { useCountries } from '@/hooks/useCountries'
import { usePagination } from '@/hooks/usePagination'
import FilterControls from '@/pages/HomePage/components/FilterControls'
import CountryGrid from './components/CountryGrid'
import HomePagination from './components/HomePagination'

const HomePage = () => {
  const {
    loading,
    error,
    displayedCountries,
    processedCountries,
    searchTerm,
    selectedRegion,
    sortOrder,
    itemsPerPage,
    currentPage,
    setSearchTerm,
    setSelectedRegion,
    setSortOrder,
    handleItemsPerPageChange,
    setCurrentPage
  } = useCountries()

  const totalPages = Math.ceil(processedCountries.length / itemsPerPage)
  const paginationRange = usePagination({
    currentPage,
    totalItems: processedCountries.length,
    itemsPerPage,
    siblingCount: 1
  })

  if (loading) return <LoadingPage />
  if (error) return <ErrorPage />

  const noResultsFound = !loading && processedCountries.length === 0

  return (
    <>
      <div className='flex flex-col gap-8 grow'>
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

        {noResultsFound ? (
          <div className='grow flex flex-col items-center justify-center text-center'>
            <p className='text-xl font-semibold text-muted-foreground'>
              No countries found.
            </p>
            <p className='text-muted-foreground'>
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <>
            <CountryGrid countries={displayedCountries} />
            <HomePagination
              paginationRange={paginationRange}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </>
  )
}

export default HomePage
