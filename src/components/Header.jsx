import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header>
        <Link to='/'>
          <h1 className='text-left text-4xl sm:text-5xl  font-extrabold tracking-tight text-balance'>
            Country Explorer
          </h1>
        </Link>
      </header>
    </>
  )
}

export default Header
