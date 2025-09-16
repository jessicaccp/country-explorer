import CountryCard from '@/pages/HomePage/components/CountryCard'

/**
 * @description Renders the responsive grid of `CountryCard` components.
 * @param {object} props - The component's props.
 * @param {object[]} props.countries - The array of country objects to display in the grid.
 */
const CountryGrid = ({ countries }) => {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
      {countries.map(country => {
        return <CountryCard key={country.name.common} country={country} />
      })}
    </section>
  )
}

export default CountryGrid
