import { NavLink, useLocation } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import { assets } from '../assets/assets'
import { NAV_LINKS } from './Sidebar'

// Top bar: page title on desktop, logo + tab navigation on small screens
const Navbar = ({ setToken }) => {
  const { pathname } = useLocation()
  const current = pathname.startsWith('/edit/')
    ? { title: 'Edit Product' }
    : NAV_LINKS.find(({ to }) => to === pathname) || NAV_LINKS[0]
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <header className='sticky top-0 z-20 border-b border-ink/5 bg-white/80 backdrop-blur-xl'>
      <div className='flex h-20 items-center justify-between gap-4 px-4 sm:px-8'>
        <img className='w-32 lg:hidden' src={assets.logo} alt="Speed Clothing" />
        <div className='hidden lg:block'>
          <p className='text-xs font-medium uppercase tracking-widest text-ink/40'>{today}</p>
          <h1 className='heading mt-0.5 text-2xl'>{current.title}</h1>
        </div>

        <div className='flex items-center gap-3'>
          <div className='hidden items-center gap-3 rounded-full border border-ink/10 py-1.5 pl-1.5 pr-4 sm:flex'>
            <span className='grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display text-sm font-black text-white'>A</span>
            <span className='text-sm font-semibold'>Admin</span>
          </div>
          <button onClick={() => setToken('')} className='btn-dark px-5 py-2.5 lg:hidden'>
            <FiLogOut /> <span className='hidden sm:inline'>Logout</span>
          </button>
        </div>
      </div>

      {/* Tab navigation for tablets and phones */}
      <nav className='flex gap-2 no-scrollbar overflow-x-auto px-4 pb-3 sm:px-8 lg:hidden'>
        {NAV_LINKS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-ink text-white' : 'bg-ink/5 text-ink/70'}`
            }
          >
            <Icon /> {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
