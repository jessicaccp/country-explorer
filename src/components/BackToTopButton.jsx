import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 h-12 w-12 rounded-full shadow-lg'
          size='icon'
          aria-label='Go to top'
        >
          <ArrowUp className='h-6 w-6' />
        </Button>
      )}
    </>
  )
}

export default BackToTopButton
