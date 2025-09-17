const Fact = ({ label, labelPlural, value, children, title }) => {
  let content = value || children
  if (!content && content !== 0) return null

  let displayLabel = label

  if (Array.isArray(value)) {
    if (value.length === 0) return null
    displayLabel = value.length > 1 && labelPlural ? labelPlural : label
    content = value.join(', ')
  }

  return (
    <div className='text-sm'>
      <strong
        className='font-semibold text-foreground'
        title={title || displayLabel}
      >
        {displayLabel}:
      </strong>{' '}
      <span className='font-light text-muted-foreground'>{content}</span>
    </div>
  )
}

export default Fact
