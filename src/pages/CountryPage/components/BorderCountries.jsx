import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from 'react-router-dom'

const BorderCountries = ({ countries, loading, error }) => {
  return (
    <div className='mt-12'>
      <h3 className='font-bold text-2xl mb-4'>Border Countries</h3>

      {loading && (
        <div className='flex flex-wrap gap-3'>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className='h-9 w-24 rounded-md' />
          ))}
        </div>
      )}

      {error && (
        <p className='text-sm text-red-500'>Could not load border countries.</p>
      )}

      {!loading && !error && (
        <>
          {countries.length === 0 ? (
            <p className='text-sm text-muted-foreground'>
              This country has no land borders.
            </p>
          ) : (
            <div className='flex flex-wrap gap-3'>
              {countries.map(border => (
                <Button asChild variant='outline' key={border.cca3}>
                  <Link to={`/country/${border.name.common}`}>
                    {border.name.common}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BorderCountries
