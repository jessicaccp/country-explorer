import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const FilterControls = ({
  searchTerm,
  selectedRegion,
  sortOrder,
  itemsPerPage,
  onSearchChange,
  onRegionChange,
  onSortChange,
  onItemsPerPageChange
}) => {
  return (
    <>
      <section className='flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap w-full gap-2'>
        <Input
          type='search'
          placeholder='Search for a country...'
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          className='w-full md:basis-1/2 grow bg-card shadow-xs text-sm'
        />

        <Select value={selectedRegion} onValueChange={onRegionChange}>
          <SelectTrigger className='w-full sm:basis-1/4 md:basis-1/6 xl:basis-1/8 2xl:basis-1/10 3xl:basis-1/12 grow bg-card shadow-xs'>
            <SelectValue placeholder='Filter by Region' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Region</SelectLabel>
              <SelectItem value='all'>All Regions</SelectItem>
              <SelectItem value='Africa'>Africa</SelectItem>
              <SelectItem value='Americas'>Americas</SelectItem>
              <SelectItem value='Asia'>Asia</SelectItem>
              <SelectItem value='Europe'>Europe</SelectItem>
              <SelectItem value='Oceania'>Oceania</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={sortOrder} onValueChange={onSortChange}>
          <SelectTrigger className='w-full sm:basis-1/4 md:basis-1/6 xl:basis-1/8 2xl:basis-1/10 3xl:basis-1/12 grow bg-card shadow-xs'>
            <SelectValue placeholder='Sort by...' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value='name-asc'>Name (A-Z)</SelectItem>
              <SelectItem value='name-desc'>Name (Z-A)</SelectItem>
              <SelectItem value='pop-desc'>Population (Highest)</SelectItem>
              <SelectItem value='pop-asc'>Population (Lowest)</SelectItem>
              <SelectItem value='area-desc'>Area (Largest)</SelectItem>
              <SelectItem value='area-asc'>Area (Smallest)</SelectItem>
              <SelectItem value='region-asc'>Region (A-Z)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={itemsPerPage.toString()}
          onValueChange={value => onItemsPerPageChange(Number(value))}
        >
          <SelectTrigger className='w-full sm:basis-1/4 md:basis-1/6 xl:basis-1/8 2xl:basis-1/10 3xl:basis-1/12 grow bg-card shadow-xs'>
            <SelectValue placeholder='Items per page' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Items per page</SelectLabel>
              <SelectItem value='12'>12</SelectItem>
              <SelectItem value='24'>24</SelectItem>
              <SelectItem value='48'>48</SelectItem>
              <SelectItem value='96'>96</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
    </>
  )
}

export default FilterControls
