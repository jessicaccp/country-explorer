import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  return (
    <>
      <header className='flex justify-between items-center'>
        <Link to='/'>
          <h1 className='text-left text-4xl sm:text-5xl  font-extrabold tracking-tight text-balance'>
            Country Explorer
          </h1>
        </Link>
        <ThemeToggle />
      </header>
    </>
  )
}

export default Header
