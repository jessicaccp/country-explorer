import { factTemplates } from '@/lib/FactTemplates'

/**
 * @description A component that pseudo-randomly selects and renders one of several "fun fact" templates for a given country.
 * The selection is stable, meaning the same fact will always be shown for the same country.
 * @param {object} props - The component's props.
 * @param {object} props.country - The country object, used to select a stable fact and passed to the chosen template.
 */
const DynamicFact = ({ country }) => {
  const charCodeSum = country.name.common
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const randomIndex = charCodeSum % factTemplates.length
  const FactComponent = factTemplates[randomIndex]

  return <FactComponent country={country} />
}

export default DynamicFact
