import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-8 flex flex-col gap-8'>
      <Header />
      <main className='grow flex flex-col'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
