import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const FilterControls = ({
  searchTerm,
  selectedRegion,
  sortOrder,
  onSearchChange,
  onRegionChange,
  onSortChange
}) => {
  return (
    <>
      <section className='flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap w-full gap-2'>
        <Input
          type='search'
          placeholder='Search for a country...'
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          className='w-full md:basis-1/2 grow bg-card shadow-xs'
        />

        <Select value={selectedRegion} onValueChange={onRegionChange}>
          <SelectTrigger className='w-full sm:basis-1/4 md:basis-1/6 xl:basis-1/8 2xl:basis-1/10 3xl:basis-1/12 grow bg-card shadow-xs'>
            <SelectValue placeholder='Filter by Region' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Regions</SelectItem>
            <SelectItem value='Africa'>Africa</SelectItem>
            <SelectItem value='Americas'>Americas</SelectItem>
            <SelectItem value='Asia'>Asia</SelectItem>
            <SelectItem value='Europe'>Europe</SelectItem>
            <SelectItem value='Oceania'>Oceania</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortOrder} onValueChange={onSortChange}>
          <SelectTrigger className='w-full sm:basis-1/4 md:basis-1/6 xl:basis-1/8 2xl:basis-1/10 3xl:basis-1/12 grow bg-card shadow-xs'>
            <SelectValue placeholder='Sort by...' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='name-asc'>Sort by Name (A-Z)</SelectItem>
            <SelectItem value='name-desc'>Sort by Name (Z-A)</SelectItem>
            <SelectItem value='pop-desc'>Population (Highest)</SelectItem>
            <SelectItem value='pop-asc'>Population (Lowest)</SelectItem>
          </SelectContent>
        </Select>
      </section>
    </>
  )
}

export default FilterControls
