import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  return (
    <>
      <header className='flex justify-between items-center gap-4'>
        <Link to='/'>
          <h1 className='text-left text-2xl font-extrabold tracking-tight sm:text-4xl text-balance'>
            Country Explorer
          </h1>
        </Link>

        <div className='flex items-center gap-2'>
          <ThemeToggle />
        </div>
      </header>
    </>
  )
}

export default Header
