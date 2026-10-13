import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'

// Big section title: eyebrow + heading + optional subtitle and "view all" link
const SectionHeading = ({ eyebrow, title, highlight, subtitle, linkTo, linkText = 'View all', center = false, dark = false }) => {
  return (
    <div className={`mb-10 flex flex-col gap-6 sm:mb-14 ${center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
      <div className={center ? 'max-w-2xl' : 'max-w-xl'}>
        {eyebrow && (
          <p className={`eyebrow ${dark ? 'text-brand-400' : ''}`}>
            <span className='h-px w-8 bg-current' />
            {eyebrow}
          </p>
        )}
        <h2 className={`heading mt-3 text-3xl leading-[1.05] sm:text-4xl lg:text-5xl ${dark ? 'text-white' : 'text-ink'}`}>
          {title} {highlight && <span className='text-gradient'>{highlight}</span>}
        </h2>
        {subtitle && <p className={`mt-4 text-base sm:text-lg ${dark ? 'text-white/60' : 'text-ink/60'}`}>{subtitle}</p>}
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className={`group inline-flex shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-wider ${dark ? 'text-white' : 'text-ink'}`}
        >
          {linkText}
          <span className='grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-white transition group-hover:rotate-45'>
            <FiArrowUpRight />
          </span>
        </Link>
      )}
    </div>
  )
}

export default SectionHeading
