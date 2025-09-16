export const factTemplates = [
  // Population and area
  ({ country }) => {
    const population = country.population?.toLocaleString('en-US')
    const area = country.area?.toLocaleString('en-US')
    return (
      <p>
        With a population of <strong>{population}</strong> in an area of{' '}
        <strong>{area}</strong> km².
      </p>
    )
  },

  // Capital and language
  ({ country }) => {
    const capital = country.capital?.[0] ?? 'N/A'
    const language = Object.values(country.languages ?? {})[0] ?? 'N/A'
    return (
      <p>
        In its capital, <strong>{capital}</strong>, you'll likely hear people
        speaking <strong>{language}</strong>.
      </p>
    )
  },

  // Region and subregion
  ({ country }) => {
    const region = country.region ?? 'N/A'
    const subregion = country.subregion ?? 'the same region'
    return (
      <p>
        Located in the <strong>{region}</strong> region, specifically within{' '}
        <strong>{subregion}</strong>.
      </p>
    )
  },

  // Border count and currency
  ({ country }) => {
    const borderCount = country.borders?.length || 0
    const currency = Object.values(country.currencies ?? {})[0]?.name ?? 'N/A'
    return (
      <p>
        Sharing borders with <strong>{borderCount}</strong> nations, its
        official currency is the <strong>{currency}</strong>.
      </p>
    )
  },

  // Official name and population
  ({ country }) => {
    const officialName = country.name.official ?? country.name.common
    const population = country.population?.toLocaleString('en-US')
    return (
      <p>
        Officially the <strong>{officialName}</strong>, it is home to over{' '}
        <strong>{population}</strong> people.
      </p>
    )
  },

  // Area and capital
  ({ country }) => {
    const area = country.area?.toLocaleString('en-US')
    const capital = country.capital?.[0] ?? 'N/A'
    return (
      <p>
        Spanning <strong>{area}</strong> km², its capital city is{' '}
        <strong>{capital}</strong>.
      </p>
    )
  },

  // Language and currency
  ({ country }) => {
    const language = Object.values(country.languages ?? {})[0] ?? 'N/A'
    const currency = Object.values(country.currencies ?? {})[0]?.name ?? 'N/A'
    return (
      <p>
        The primary language is <strong>{language}</strong>, and the economy
        runs on the <strong>{currency}</strong>.
      </p>
    )
  },

  // Region and border count
  ({ country }) => {
    const region = country.region ?? 'N/A'
    const borderCount = country.borders?.length || 0
    return (
      <p>
        A country in <strong>{region}</strong> that shares a border with{' '}
        <strong>{borderCount}</strong> neighbors.
      </p>
    )
  },

  // Density
  ({ country }) => {
    const density =
      country.population && country.area
        ? (country.population / country.area).toFixed(1)
        : 'N/A'
    return (
      <p>
        It has a population density of approx. <strong>{density}</strong> people
        per km².
      </p>
    )
  },

  // Capital and currency
  ({ country }) => {
    const capital = country.capital?.[0] ?? 'N/A'
    const currency = Object.values(country.currencies ?? {})[0]?.name ?? 'N/A'
    return (
      <p>
        The currency used in its capital, <strong>{capital}</strong>, is the{' '}
        <strong>{currency}</strong>.
      </p>
    )
  }
]
