import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * @description A reusable card component to display a category of facts.
 * @param {object} props - The component's props.
 * @param {string} props.title - The title of the card.
 * @param {React.ReactNode} props.children - The content (facts) to be displayed inside the card.
 */
const InfoCard = ({ title, children }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>{children}</CardContent>
    </Card>
  )
}

export default InfoCard
