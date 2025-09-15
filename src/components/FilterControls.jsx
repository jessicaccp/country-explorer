const FilterControls = ({
  searchTerm,
  selectedRegion,
  onSearchChange,
  onRegionChange
}) => {
  return (
    <>
      <section>
        <input
          type='text'
          placeholder='Search for a country'
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
        />
        <select
          value={selectedRegion}
          onChange={e => onRegionChange(e.target.value)}
        >
          <option value='' disabled>
            Filter by Region
          </option>
          <option value='Africa'>Africa</option>
          <option value='Americas'>Americas</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
          <option value='Oceania'>Oceania</option>
        </select>
      </section>
    </>
  )
}

export default FilterControls
