import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const CountryCardSkeleton = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <Skeleton className='w-full h-30' />
      </CardHeader>
      <CardContent>
        <CardTitle>
          <Skeleton className='h-6 w-3/4' />
        </CardTitle>
        <Skeleton className='my-2 h-1' />
        <CardDescription>
          <Skeleton className='h-4 w-1/2 mb-1' />
          <Skeleton className='h-4 w-1/2' />
        </CardDescription>
        <div className='mt-4 text-sm'>
          <Skeleton className='h-4 w-full mb-1' />
          <Skeleton className='h-4 w-full' />
        </div>
      </CardContent>
    </Card>
  )
}

export default CountryCardSkeleton
