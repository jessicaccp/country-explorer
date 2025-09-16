import { TriangleAlert } from 'lucide-react'

const ErrorPage = ({
  message = 'An unexpected error occurred. Please try again later.'
}) => {
  return (
    <div
      className='flex flex-col items-center justify-center gap-4 text-red-600 dark:text-red-500 grow'
      role='alert'
    >
      <TriangleAlert className='h-12 w-12' />
      <p className='text-lg'>{message}</p>
    </div>
  )
}

export default ErrorPage
