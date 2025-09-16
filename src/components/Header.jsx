import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header>
        <Link to='/'>
          <h1 className='scroll-m-20 text-center md:text-left text-4xl font-extrabold tracking-tight text-balance'>
            Country Explorer
          </h1>
        </Link>
      </header>
    </>
  )
}

export default Header
