const CountryCard = ({ country }) => {
  console.log(country)
  return (
    <>
      <div className='border p-4'>{country.name.common}</div>
    </>
  )
}

export default CountryCard
