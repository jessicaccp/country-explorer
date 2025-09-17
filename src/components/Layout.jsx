import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'
import BackToTopButton from './BackToTopButton'

const Layout = () => {
  return (
    <div className='bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-300'>
      <div className='max-w-[1920px] mx-auto p-8 flex flex-col gap-8 min-h-screen'>
        <Header />
        <main className='grow flex flex-col w-full'>
          <Outlet />
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </div>
  )
}

export default Layout
