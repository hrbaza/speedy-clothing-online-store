import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

// Dark gradient banner shown at the top of inner pages
const PageHeader = ({ eyebrow, title, highlight, subtitle, crumb }) => {
  return (
    <section className='relative isolate overflow-hidden bg-ink text-white'>
      <div className='absolute inset-0 -z-10 bg-grid mask-fade opacity-60' />
      <div className='absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-brand-600/40 blur-[100px]' />
      <div className='absolute -bottom-32 left-10 -z-10 h-72 w-72 rounded-full bg-sky-500/20 blur-[100px]' />
      {/* speed streaks */}
      <div className='absolute right-0 top-1/2 -z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex'>
        {[64, 40, 52].map((w, i) => (
          <span key={i} className='h-2 -skew-x-[30deg] rounded-sm bg-gradient-to-r from-transparent to-brand-600/70' style={{ width: `${w * 4}px` }} />
        ))}
      </div>

      <div className='container-x py-14 sm:py-20'>
        <nav className='mb-5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-white/50'>
          <Link to='/' className='transition hover:text-white'>Home</Link>
          <FiChevronRight />
          <span className='text-white/80'>{crumb || title}</span>
        </nav>
        {eyebrow && <p className='eyebrow text-brand-400'><span className='h-px w-8 bg-current' />{eyebrow}</p>}
        <h1 className='heading mt-3 text-4xl leading-none sm:text-6xl'>
          {title} {highlight && <span className='text-gradient'>{highlight}</span>}
        </h1>
        {subtitle && <p className='mt-5 max-w-xl text-base text-white/60 sm:text-lg'>{subtitle}</p>}
      </div>
    </section>
  )
}

export default PageHeader
