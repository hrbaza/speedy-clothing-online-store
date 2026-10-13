import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const links = [
  { to: '/add', icon: assets.add_icon, label: 'Add Items' },
  { to: '/list', icon: assets.order_icon, label: 'List Items' },
  { to: '/orders', icon: assets.order_icon, label: 'Orders' },
]

const Sidebar = () => {
  return (
    <div className='w-full md:w-[18%] min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 border-r'>
      <div className='flex flex-col gap-4 pt-10 pl-6 pr-2 md:pl-[20%] text-[15px] text-gray-800'>
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive ? 'bg-blue-100 border-l-4 border-blue-500 font-semibold' : 'hover:bg-blue-50'
              }`
            }
          >
            <img className='w-5 h-5' src={icon} alt={`${label} Icon`} />
            <p className='hidden md:block'>{label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
