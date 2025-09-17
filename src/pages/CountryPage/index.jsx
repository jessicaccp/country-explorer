import ErrorPage from '@/components/ErrorPage'
import LoadingPage from '@/components/LoadingPage'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { findBestMatch } from '@/lib/similarity'
import { fetchCountryByCode, fetchCountryByName } from '@/services/api'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import InfoCard from './components/InfoCard'

const Fact = ({ label, value, children }) => {
  const content = value || children
  if (!content) return null

  return (
    <div className='text-sm'>
      <strong className='font-semibold text-foreground'>{label}:</strong>{' '}
      <span className='font-light text-muted-foreground'>{content}</span>
    </div>
  )
}

const CountryPage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [countryData, setCountryData] = useState(null)
  const [borderCountries, setBorderCountries] = useState([])
  const { name } = useParams()

  useEffect(() => {
    const getCountryData = async () => {
      try {
        setLoading(true)
        setError(false)
        setBorderCountries([])
        const data = await fetchCountryByName(name)
        const bestMatch = findBestMatch(name, data)
        setCountryData(bestMatch)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    if (name) getCountryData()
  }, [name])

  useEffect(() => {
    const getBorderCountries = async () => {
      if (countryData && countryData.borders) {
        const promises = countryData.borders.map(code =>
          fetchCountryByCode(code)
        )
        const results = await Promise.all(promises)
        setBorderCountries(results.map(res => res[0]))
      }
    }
    getBorderCountries()
  }, [countryData])

  if (loading) return <LoadingPage />
  if (error || !countryData) return <ErrorPage message='Country not found.' />

  const languages = countryData.languages
    ? Object.values(countryData.languages)
    : []
  const currencies = countryData.currencies
    ? Object.values(countryData.currencies)
    : []
  const nativeNames = countryData.name.nativeName
    ? Object.values(countryData.name.nativeName).map(n => n.common)
    : []
  const giniData = countryData.gini ? Object.entries(countryData.gini)[0] : null
  const density =
    countryData.population && countryData.area > 0
      ? (countryData.population / countryData.area).toFixed(2)
      : 'N/A'
  const borderStatus = countryData.landlocked
    ? `A landlocked nation, it is bordered by ${
        countryData.borders?.length || 0
      } countries.`
    : `A coastal nation with ${countryData.borders?.length || 0} land borders.`

  return (
    <div className='animate-fade-in'>
      <Button asChild variant='outline' className='mb-12 shadow-md'>
        <Link to='/'>
          <ArrowLeft className='mr-2 h-4 w-4' /> Back to Home
        </Link>
      </Button>

      <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-12'>
        <img
          src={countryData.flags.svg}
          alt={`Flag of ${countryData.name.common}`}
          className='w-48 h-auto shadow-lg rounded-lg object-cover'
        />
        <div>
          <h1 className='text-4xl md:text-5xl font-extrabold text-center sm:text-left'>
            {countryData.name.common}
          </h1>
          <p className='text-xl text-muted-foreground mt-1 text-center sm:text-left'>
            {countryData.name.official}
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
        <InfoCard title='Key Information'>
          <Fact label='Capital(s)' value={countryData.capital?.join(', ')} />
          <Fact
            label='Population'
            value={countryData.population?.toLocaleString('en-US')}
          />
          <Fact label='Demonym' value={countryData.demonyms?.eng?.m} />
          <Fact label='Native Names'>
            <span className='italic'>
              {[...new Set(nativeNames)].join(', ')}
            </span>
          </Fact>
        </InfoCard>

        <InfoCard title='Geography'>
          <Fact
            label='Continent(s)'
            value={countryData.continents?.join(', ')}
          />
          <Fact label='Region' value={countryData.region} />
          <Fact label='Sub-region' value={countryData.subregion} />
          <Fact
            label='Area'
            value={`${countryData.area?.toLocaleString('en-US')} km²`}
          />
          <Fact label='Coordinates' value={countryData.latlng?.join(', ')} />
        </InfoCard>

        <InfoCard title='Economy & Digital'>
          <Fact label='Currencies'>
            <div className='flex flex-wrap gap-2 mt-1'>
              {currencies.map(curr => (
                <Badge key={curr.name}>{`${curr.name} (${curr.symbol})`}</Badge>
              ))}
            </div>
          </Fact>
          {giniData && (
            <Fact label={`GINI Index (${giniData[0]})`} value={giniData[1]} />
          )}
          <Fact label='Top-Level Domain' value={countryData.tld?.join(', ')} />
          <Fact
            label='Calling Code'
            value={`${countryData.idd?.root}${countryData.idd?.suffixes?.[0]}`}
          />
        </InfoCard>

        <InfoCard title='Calculated Insights'>
          <Fact label='Population Density' value={`${density} people / km²`} />
          <Fact label='Border Status'>
            <span className='italic'>{borderStatus}</span>
          </Fact>
          <Fact label='Languages Spoken' value={languages.length} />
          <Fact label='Timezones' value={countryData.timezones?.length} />
        </InfoCard>

        <InfoCard title='Geography'>
          <Fact
            label='Continent(s)'
            value={countryData.continents?.join(', ')}
          />
          <Fact label='Region' value={countryData.region} />
          <Fact label='Sub-region' value={countryData.subregion} />
          <Fact label='Capital(s)' value={countryData.capital?.join(', ')} />
          <Fact
            label='Area'
            value={`${countryData.area?.toLocaleString('en-US')} km²`}
          />
          <Fact
            label='Landlocked'
            value={countryData.landlocked ? 'Yes' : 'No'}
          />
        </InfoCard>

        <InfoCard title='People & Culture'>
          <Fact
            label='Population'
            value={countryData.population?.toLocaleString('en-US')}
          />
          <Fact label='Demonym' value={countryData.demonyms?.eng?.m} />
          <Fact label='Languages'>
            <div className='flex flex-wrap gap-2 mt-1'>
              {languages.map(lang => (
                <Badge key={lang} variant='secondary'>
                  {lang}
                </Badge>
              ))}
            </div>
          </Fact>
          <Fact
            label='Start of Week'
            value={
              countryData.startOfWeek?.charAt(0).toUpperCase() +
              countryData.startOfWeek?.slice(1)
            }
          />
        </InfoCard>

        <InfoCard title='Economy & Codes'>
          <Fact label='Currencies'>
            <div className='flex flex-wrap gap-2 mt-1'>
              {currencies.map(curr => (
                <Badge key={curr.name}>{`${curr.name} (${curr.symbol})`}</Badge>
              ))}
            </div>
          </Fact>
          <Fact label='Top-Level Domain' value={countryData.tld?.join(', ')} />
          <Fact
            label='Calling Code'
            value={`${countryData.idd?.root}${countryData.idd?.suffixes?.[0]}`}
          />
          <Fact label='CCA3 Code' value={countryData.cca3} />
        </InfoCard>

        <InfoCard title='Other Information'>
          <Fact
            label='Driving Side'
            value={
              countryData.car?.side?.charAt(0).toUpperCase() +
              countryData.car?.side?.slice(1)
            }
          />
          <Fact label='Timezones' value={countryData.timezones?.join(', ')} />
          <Fact label='UN Member' value={countryData.unMember ? 'Yes' : 'No'} />
        </InfoCard>
      </div>

      {borderCountries.length > 0 && (
        <div className='mt-12'>
          <h3 className='font-bold text-2xl mb-4'>Border Countries</h3>
          <div className='flex flex-wrap gap-3'>
            {borderCountries.map(border => (
              <Button asChild variant='outline' key={border.cca3}>
                <Link to={`/country/${border.name.common}`}>
                  {border.name.common}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CountryPage
