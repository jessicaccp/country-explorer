import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import DynamicFact from '@/pages/HomePage/components/DynamicFact'
import { Link } from 'react-router-dom'

/**
 * @description Displays a summary of a single country's information in a card format.
 * Includes the flag, name, key details, and a dynamic "fun fact". The card is a link to the country's detail page.
 * @param {object} props - The component's props.
 * @param {object} props.country - The country object from the API.
 */
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
            <div className='mt-4 text-sm text-neutral-700 dark:text-neutral-300'>
              <DynamicFact country={country} />
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  )
}

export default CountryCard
