import ErrorPage from '@/components/ErrorPage'
import { useCountries } from '@/hooks/useCountries'
import { usePagination } from '@/hooks/usePagination'
import CountryGrid from '@/pages/HomePage/components/CountryGrid'
import FilterControls from '@/pages/HomePage/components/FilterControls'
import HomePagination from '@/pages/HomePage/components/HomePagination'

/**
 * @description Renders the main Home Page.
 * This component acts as a container that orchestrates the `useCountries` hook
 * with its presentational children components to build the complete user interface.
 */
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
            <CountryGrid
              countries={displayedCountries}
              isLoading={loading}
              itemsPerPage={itemsPerPage}
            />
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
