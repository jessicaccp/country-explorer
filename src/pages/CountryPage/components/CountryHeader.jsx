const CountryHeader = ({ flagUrl, flagAlt, commonName, officialName }) => {
  return (
    <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-12'>
      <img
        src={flagUrl}
        alt={flagAlt}
        title={`Flag of ${commonName}`}
        className='w-48 h-auto shadow-lg rounded-lg object-cover'
      />
      <div>
        <h1 className='text-4xl md:text-5xl font-extrabold text-center sm:text-left'>
          {commonName}
        </h1>
        <p className='text-xl text-muted-foreground mt-1 text-center sm:text-left'>
          {officialName}
        </p>
      </div>
    </div>
  )
}

export default CountryHeader
