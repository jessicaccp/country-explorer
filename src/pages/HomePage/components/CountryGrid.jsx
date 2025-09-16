import CountryCard from './CountryCard'

const CountryGrid = ({ countries }) => {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
      {countries.map(country => {
        return <CountryCard key={country.cca3} country={country} />
      })}
    </section>
  )
}

export default CountryGrid
