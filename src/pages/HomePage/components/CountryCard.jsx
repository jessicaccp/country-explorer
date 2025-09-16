import DynamicFact from '@/pages/HomePage/components/DynamicFact'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../../components/ui/card'

const CountryCard = ({ country }) => {
  const capital = country.capital?.[0] || 'N/A'

  return (
    <>
      <Link to={`/country/${country.name.common}`} className='h-full'>
        <Card className='h-full'>
          <CardHeader>
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              title={`Flag of ${country.name.common}`}
              className='w-full h-30 object-cover'
            />
          </CardHeader>
          <CardContent>
            <CardTitle>{country.name.common}</CardTitle>
            <hr className='my-2'></hr>
            <CardDescription>
              {country.name.official && (
                <span className='text-neutral-950'>
                  {country.name.official}
                </span>
              )}
              <div className='flex flex-row flex-wrap'>
                <span>{capital}</span>
                <span className='mx-2 font-bold'>·</span>
                <span>{country.region}</span>
              </div>
            </CardDescription>
            <div className='mt-4 text-sm text-gray-700 dark:text-gray-300'>
              <DynamicFact country={country} />
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  )
}

export default CountryCard
