import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'
import BackToTopButton from './BackToTopButton'

const Layout = () => {
  return (
    <div className='min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 p-8 flex flex-col gap-8'>
      <Header />
      <main className='grow flex flex-col'>
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  )
}

export default Layout
