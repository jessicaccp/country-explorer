const Footer = () => {
  return (
    <>
      <footer>
        <p className='text-muted-foreground text-sm text-center'>
          Coded with ❤️ by{' '}
          <a
            href='https://github.com/jessicaccp'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold text-primary hover:underline'
          >
            Jessica Patricio
          </a>
          . Country data provided by the{' '}
          <a
            href='https://restcountries.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold text-primary hover:underline'
          >
            REST Countries API
          </a>
          .
        </p>
      </footer>
    </>
  )
}

export default Footer
