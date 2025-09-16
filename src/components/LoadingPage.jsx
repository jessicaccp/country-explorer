import { LoaderCircle } from 'lucide-react'

const LoadingPage = () => {
  return (
    <div className='flex flex-col grow items-center justify-center gap-4 text-sky-600 dark:text-sky-500'>
      <LoaderCircle className='h-12 w-12 animate-spin' />
      <p className='text-lg'>Loading data...</p>
    </div>
  )
}

export default LoadingPage
