import { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX, FiPackage, FiLogOut, FiArrowRight } from 'react-icons/fi'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';

const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/collection', label: 'Collection' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
]

const iconButton = 'relative grid h-10 w-10 place-items-center rounded-full text-lg text-ink transition hover:bg-ink hover:text-white'

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken } = useContext(ShopContext);
    const { pathname } = useLocation();
    const cartCount = getCartCount();

    // Close the mobile menu on navigation, and add a shadow once the page scrolls
    useEffect(() => setMenuOpen(false), [pathname]);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const logout = () => {
        setToken('')
        navigate('/login')
    }

    const openSearch = () => {
        setShowSearch(true)
        navigate('/collection')
    }

    return (
        <>
            {/* Announcement bar */}
            <div className='bg-ink text-white'>
                <div className='container-x flex h-9 items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] sm:text-xs'>
                    <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500' />
                    New season drop is live — <Link to='/collection' className='font-semibold text-brand-400 underline-offset-4 hover:underline'>Shop now</Link>
                </div>
            </div>

            <header className={`sticky top-0 z-40 border-b transition-all duration-300 ${scrolled ? 'border-ink/5 bg-white/80 shadow-soft backdrop-blur-xl' : 'border-transparent bg-white'}`}>
                <div className='container-x flex h-20 items-center justify-between gap-4'>

                    <Link to='/' className='shrink-0'>
                        <img src={assets.logo} className='w-36 sm:w-44' alt="Speed Clothing" />
                    </Link>

                    <nav className='hidden items-center gap-1 rounded-full border border-ink/5 bg-ink/[0.03] p-1 md:flex'>
                        {NAV_LINKS.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) =>
                                    `rounded-full px-5 py-2 text-sm font-medium transition ${isActive ? 'bg-ink text-white shadow-soft' : 'text-ink/70 hover:text-ink'}`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className='flex items-center gap-1'>
                        <button onClick={openSearch} className={iconButton} aria-label="Search">
                            <FiSearch />
                        </button>

                        <div className='group relative'>
                            <button onClick={() => !token && navigate('/login')} className={iconButton} aria-label="Account">
                                <FiUser />
                            </button>
                            {token &&
                                <div className='invisible absolute right-0 top-full z-50 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100'>
                                    <div className='card w-52 overflow-hidden p-2 text-sm'>
                                        <button onClick={() => navigate('/profile')} className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-ink/5'><FiUser /> My Profile</button>
                                        <button onClick={() => navigate('/orders')} className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-ink/5'><FiPackage /> My Orders</button>
                                        <button onClick={logout} className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-red-600 hover:bg-red-50'><FiLogOut /> Logout</button>
                                    </div>
                                </div>}
                        </div>

                        <Link to='/cart' className={iconButton} aria-label="Cart">
                            <FiShoppingBag />
                            {cartCount > 0 && (
                                <span className='absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white ring-2 ring-white'>
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button onClick={() => setMenuOpen(true)} className={`${iconButton} md:hidden`} aria-label="Open menu">
                            <FiMenu />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            <div className={`fixed inset-0 z-50 md:hidden ${menuOpen ? '' : 'pointer-events-none'}`}>
                <div onClick={() => setMenuOpen(false)} className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity ${menuOpen ? 'opacity-100' : 'opacity-0'}`} />
                <aside className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-ink text-white transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className='flex items-center justify-between p-5'>
                        <img src={assets.logo_light} className='w-36' alt="Speed Clothing" />
                        <button onClick={() => setMenuOpen(false)} className='grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xl' aria-label="Close menu">
                            <FiX />
                        </button>
                    </div>
                    <nav className='flex flex-col gap-1 px-3'>
                        {NAV_LINKS.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) =>
                                    `heading flex items-center justify-between rounded-2xl px-4 py-4 text-2xl ${isActive ? 'bg-brand-600' : 'hover:bg-white/5'}`
                                }
                            >
                                {label} <FiArrowRight className='text-lg' />
                            </NavLink>
                        ))}
                    </nav>
                    <div className='mt-auto border-t border-white/10 p-5 text-sm'>
                        {token ? (
                            <div className='flex gap-2'>
                                <Link to='/orders' className='btn-ghost-light flex-1 px-4'>Orders</Link>
                                <button onClick={logout} className='btn-ghost-light flex-1 px-4'>Logout</button>
                            </div>
                        ) : (
                            <Link to='/login' className='btn-primary w-full'>Login / Sign up</Link>
                        )}
                    </div>
                </aside>
            </div>
        </>
    )
}

export default Navbar
