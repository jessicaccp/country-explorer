import { Badge } from '@/components/ui/badge'
import Fact from './Fact'
import InfoCard from './InfoCard'

const CountryInfoGrid = ({ countryData }) => {
  const languages = countryData.languages
    ? Object.values(countryData.languages)
    : []
  const currencies = countryData.currencies
    ? Object.values(countryData.currencies)
    : []
  const nativeNames = countryData.name.nativeName
    ? Object.values(countryData.name.nativeName).map(n => n.common)
    : []
  const density =
    countryData.population && countryData.area > 0
      ? (countryData.population / countryData.area).toFixed(2)
      : 'N/A'
  const giniData = countryData.gini ? Object.entries(countryData.gini)[0] : null

  const _borderStatus = countryData.landlocked
    ? `A landlocked nation, it is bordered by ${
        countryData.borders?.length || 0
      } countries.`
    : `A coastal nation with ${countryData.borders?.length || 0} land borders.`

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
      <InfoCard title='Overview'>
        <Fact label='Common Name' value={countryData.name.common} />
        <Fact label='Official Name' value={countryData.name.official} />
        <Fact
          label='Native Name'
          labelPlural='Native Names'
          value={nativeNames}
        />
        <Fact
          label='Demonym'
          value={countryData.demonyms?.eng?.m}
          title='Name used for the people of the country'
        />
        <Fact label='Flag'>
          <img
            src={countryData.flags.svg}
            alt={countryData.flags.alt}
            className='w-20 h-auto shadow rounded'
          />
        </Fact>
        {countryData.coatOfArms?.svg && (
          <Fact label='Coat of Arms'>
            <img
              src={countryData.coatOfArms.svg}
              alt={`Coat of arms of ${countryData.name.common}`}
              className='w-20 h-auto shadow rounded'
            />
          </Fact>
        )}
      </InfoCard>

      <InfoCard title='Geography'>
        <Fact
          label='Continent'
          labelPlural='Continents'
          value={countryData.continents}
        />
        <Fact label='Region' value={countryData.region} />
        <Fact label='Subregion' value={countryData.subregion} />
        <Fact
          label='Capital'
          labelPlural='Capitals'
          value={countryData.capital}
        />
        <Fact
          label='Area'
          value={`${countryData.area?.toLocaleString('en-US')} km²`}
        />
        <Fact
          label='Coordinates'
          value={countryData.latlng?.map(c => c.toFixed(2))}
          title='Latitude and Longitude'
        />
        <Fact
          label='Landlocked'
          value={countryData.landlocked ? 'Yes' : 'No'}
        />
        <Fact label='Google Maps'>
          <a
            href={countryData.maps.googleMaps}
            target='_blank'
            rel='noreferrer'
          >
            View
          </a>
        </Fact>
        <Fact label='OpenStreetMap'>
          <a
            href={countryData.maps.openStreetMaps}
            target='_blank'
            rel='noreferrer'
          >
            View
          </a>
        </Fact>
      </InfoCard>

      <InfoCard title='Population & Society'>
        <Fact
          label='Population'
          value={countryData.population?.toLocaleString('en-US')}
        />
        <Fact label='Population Density' value={`${density} people / km²`} />
        <Fact
          label='Language Spoken'
          labelPlural='Languages Spoken'
          value={languages}
        />
        <Fact label='Languages'>
          <div className='flex flex-wrap gap-2 mt-1'>
            {languages.map(lang => (
              <Badge key={lang} variant='secondary'>
                {lang}
              </Badge>
            ))}
          </div>
        </Fact>
        <Fact label='Start of Week'>
          {countryData.startOfWeek?.charAt(0).toUpperCase() +
            countryData.startOfWeek?.slice(1)}
        </Fact>
      </InfoCard>

      <InfoCard title='Economy'>
        <Fact label='Currency' labelPlural='Currencies'>
          <div className='flex flex-wrap gap-2 mt-1'>
            {currencies.map(curr => (
              <Badge key={curr.name}>{`${curr.name} (${curr.symbol})`}</Badge>
            ))}
          </div>
        </Fact>
        {giniData && (
          <Fact
            label={`GINI Index (${giniData[0]})`}
            value={giniData[1]}
            title='Income inequality measure (0 = equality, 100 = inequality)'
          />
        )}
      </InfoCard>

      <InfoCard title='Codes & Digital'>
        <Fact
          label='Top-Level Domain'
          labelPlural='Top-Level Domains'
          value={countryData.tld}
        />
        <Fact
          label='Calling Code'
          value={`${countryData.idd?.root}${countryData.idd?.suffixes?.[0]}`}
        />
        <Fact
          label='ISO Code'
          labelPlural='ISO Codes'
          value={[countryData.cca2, countryData.cca3, countryData.ccn3]}
          title='International Organization for Standardization country codes'
        />
        <Fact
          label='IOC Code'
          value={countryData.cioc}
          title='Olympic country code'
        />
        <Fact
          label='FIFA Code'
          value={countryData.fifa}
          title='International football country code'
        />
      </InfoCard>
      <InfoCard title='Government & Organizations'>
        <Fact
          label='Independent'
          value={countryData.independent ? 'Yes' : 'No'}
        />
        <Fact label='Status' value={countryData.status} />
        <Fact label='UN Member' value={countryData.unMember ? 'Yes' : 'No'} />
        <Fact label='Driving Side'>
          {countryData.car?.side?.charAt(0).toUpperCase() +
            countryData.car?.side?.slice(1)}
        </Fact>
      </InfoCard>

      <InfoCard title='Time & Zones'>
        <Fact
          label='Timezone'
          labelPlural='Timezones'
          value={countryData.timezones}
        />
      </InfoCard>

      <InfoCard title='Borders'>
        <Fact label='Border Status'>
          {countryData.landlocked
            ? `Landlocked with ${countryData.borders?.length || 0} borders`
            : `Coastal nation with ${
                countryData.borders?.length || 0
              } land borders`}
        </Fact>
      </InfoCard>
    </div>
  )
}

export default CountryInfoGrid
