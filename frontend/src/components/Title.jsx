// Small two-tone heading used inside cards and secondary sections
const Title = ({ text1, text2 }) => {
  return (
    <div className='mb-4 flex items-center gap-3'>
      <span className='h-6 w-1.5 -skew-x-12 rounded-sm bg-gradient-to-b from-brand-500 to-brand-700' />
      <h2 className='heading text-xl sm:text-2xl'>
        <span className='text-ink/50'>{text1}</span> <span className='text-ink'>{text2}</span>
      </h2>
    </div>
  )
}

export default Title
