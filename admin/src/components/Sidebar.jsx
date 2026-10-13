import { NavLink } from 'react-router-dom'
import { FiGrid, FiPlusSquare, FiList, FiPackage, FiLogOut } from 'react-icons/fi'
import { assets } from '../assets/assets'

export const NAV_LINKS = [
  { to: '/', icon: FiGrid, label: 'Dashboard', title: 'Dashboard' },
  { to: '/add', icon: FiPlusSquare, label: 'Add Product', title: 'Add Product' },
  { to: '/list', icon: FiList, label: 'Products', title: 'All Products' },
  { to: '/orders', icon: FiPackage, label: 'Orders', title: 'Orders' },
]

const Sidebar = ({ setToken }) => {
  return (
    <aside className='fixed inset-y-0 left-0 z-30 hidden w-72 flex-col overflow-hidden bg-ink text-white lg:flex'>
      <div className='absolute inset-0 -z-10 bg-grid opacity-40 mask-fade' />
      <div className='absolute -bottom-24 -left-16 -z-10 h-72 w-72 rounded-full bg-brand-600/40 blur-[110px]' />

      <div className='px-7 pb-6 pt-8'>
        <img className='w-44' src={assets.logo_light} alt="Speed Clothing" />
        <span className='mt-4 inline-flex -skew-x-12 rounded-md bg-brand-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em]'>
          <span className='skew-x-12'>Admin Panel</span>
        </span>
      </div>

      <nav className='flex flex-1 flex-col gap-1 px-4'>
        <p className='px-3 pb-2 pt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/30'>Menu</p>
        {NAV_LINKS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium transition ${
                isActive ? 'bg-brand-600 text-white shadow-glow' : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon className='text-lg' />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className='m-4 rounded-2xl border border-white/10 bg-white/5 p-4'>
        <p className='text-sm font-semibold'>Signed in as admin</p>
        <p className='mt-0.5 text-xs text-white/50'>Manage products and orders</p>
        <button onClick={() => setToken('')} className='mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-sm font-semibold transition hover:bg-red-500'>
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
