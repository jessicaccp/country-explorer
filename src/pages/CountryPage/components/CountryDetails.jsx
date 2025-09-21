import Fact from './Fact'

const CountryDetails = ({ countryData }) => {
  const nativeNames = countryData.name.nativeName
    ? Object.values(countryData.name.nativeName)
        .map(n => n.common)
        .join(', ')
    : 'N/A'

  const currencies = countryData.currencies
    ? Object.values(countryData.currencies)
        .map(c => `${c.name} (${c.symbol})`)
        .join(', ')
    : 'N/A'

  const languages = countryData.languages
    ? Object.values(countryData.languages).join(', ')
    : 'N/A'

  const demonym = countryData.demonyms?.eng?.m || 'N/A'

  const populationDensity =
    countryData.population && countryData.area > 0
      ? `${(countryData.population / countryData.area).toFixed(2)} people / km²`
      : 'N/A'

  const callingCode = countryData.idd
    ? `${countryData.idd.root}${countryData.idd.suffixes?.[0] || ''}`
    : 'N/A'

  const drivingSide = countryData.car?.side
    ? countryData.car.side.charAt(0).toUpperCase() +
      countryData.car.side.slice(1)
    : 'N/A'

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 my-12'>
      <div className='flex flex-col gap-3'>
        <h3 className='text-xl font-bold mb-2 border-b pb-2'>
          Geography & Demographics
        </h3>
        <Fact label='Official Name' value={countryData.name.official} />
        <Fact label='Native Names' value={nativeNames} />
        <Fact
          label='Population'
          value={countryData.population?.toLocaleString('en-US')}
        />
        <Fact
          label='Area'
          value={`${countryData.area?.toLocaleString('en-US')} km²`}
        />
        <Fact label='Population Density' value={populationDensity} />
        <Fact label='Continents' value={countryData.continents?.join(', ')} />
        <Fact label='Region' value={countryData.region} />
        <Fact label='Sub Region' value={countryData.subregion} />
        <Fact label='Capital' value={countryData.capital?.join(', ')} />
      </div>

      <div className='flex flex-col gap-3'>
        <h3 className='text-xl font-bold mb-2 border-b pb-2'>
          Culture, Economy & Technical
        </h3>
        <Fact label='Demonym' value={demonym} />
        <Fact label='Languages' value={languages} />
        <Fact label='Currencies' value={currencies} />
        <Fact label='Driving Side' value={drivingSide} />
        <Fact label='Calling Code' value={callingCode} />
        <Fact label='Timezones' value={countryData.timezones?.join(', ')} />
        <Fact label='Top Level Domain' value={countryData.tld?.join(', ')} />
      </div>
    </div>
  )
}

export default CountryDetails
