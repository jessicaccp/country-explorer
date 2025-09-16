import { factTemplates } from '@/lib/FactTemplates'

const DynamicFact = ({ country }) => {
  const charCodeSum = country.name.common
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const randomIndex = charCodeSum % factTemplates.length
  const FactComponent = factTemplates[randomIndex]

  return <FactComponent country={country} />
}

export default DynamicFact
