import ErrorPage from '@/components/ErrorPage'
import LoadingPage from '@/components/LoadingPage'
import { Button } from '@/components/ui/button'
import { useBorderCountries } from '@/hooks/useBorderCountries'
import { useCountryData } from '@/hooks/useCountryData'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import BorderCountries from './components/BorderCountries'
import CountryDetails from './components/CountryDetails'
import CountryHeader from './components/CountryHeader'

const CountryPage = () => {
  const { name } = useParams()
  const { countryData, loading, error } = useCountryData(name)
  const { borderCountries, loadingBorders, errorBorders } =
    useBorderCountries(countryData)

  if (loading) return <LoadingPage />
  if (error || !countryData) return <ErrorPage message='Country not found.' />

  return (
    <div className='animate-fade-in'>
      <div className='mb-8'>
        <Button asChild variant='ghost' size='icon'>
          <Link to='/' aria-label='Back to home page' title='Back to Home'>
            <ArrowLeft className='h-5 w-5' />
          </Link>
        </Button>
      </div>

      <section>
        <CountryHeader
          flagUrl={countryData.flags.svg}
          flagAlt={countryData.flags.alt}
          commonName={countryData.name.common}
          officialName={countryData.name.official}
        />

        <CountryDetails countryData={countryData} />

        <BorderCountries
          countries={borderCountries}
          loading={loadingBorders}
          error={errorBorders}
        />
      </section>
    </div>
  )
}

export default CountryPage
