/**
 * @file A catalog of stateless React components, each designed to render a unique "fun fact" about a country.
 * This array is consumed by the DynamicFact component to pseudo-randomly display one fact per card.
 * @type {Array<({country: object}) => JSX.Element>}
 */
export const factTemplates = [
  // 1. Population and area
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

  // 2. Capital and language
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

  // 3. Region and subregion
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

  // 4. Border count and currency
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

  // 5. Official name and population
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

  // 6. Area and capital
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

  // 7. Language and currency
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

  // 8. Region and border count
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

  // 9. Density
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

  // 10. Capital and currency
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
