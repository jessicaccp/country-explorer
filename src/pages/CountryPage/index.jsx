import ErrorPage from '@/components/ErrorPage'
import LoadingPage from '@/components/LoadingPage'
import { Button } from '@/components/ui/button'
import { useBorderCountries } from '@/hooks/useBorderCountries'
import { useCountryData } from '@/hooks/useCountryData'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import BorderCountries from './components/BorderCountries'
import CountryHeader from './components/CountryHeader'
import CountryInfoGrid from './components/CountryInfoGrid'

const CountryPage = () => {
  const { name } = useParams()
  const { countryData, loading, error } = useCountryData(name)
  const { borderCountries, loadingBorders, errorBorders } =
    useBorderCountries(countryData)

  if (loading) return <LoadingPage />
  if (error || !countryData) return <ErrorPage message='Country not found.' />

  return (
    <div className='animate-fade-in'>
      <Button asChild variant='outline' className='mb-12 shadow-md'>
        <Link to='/'>
          <ArrowLeft className='mr-2 h-4 w-4' /> Back to Home
        </Link>
      </Button>

      <CountryHeader
        flagUrl={countryData.flags.svg}
        flagAlt={countryData.flags.alt}
        commonName={countryData.name.common}
        officialName={countryData.name.official}
      />
      <CountryInfoGrid countryData={countryData} />
      <BorderCountries
        countries={borderCountries}
        loading={loadingBorders}
        error={errorBorders}
      />
    </div>
  )
}

export default CountryPage
