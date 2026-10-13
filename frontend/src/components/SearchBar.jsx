import { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi'
import { ShopContext } from '../context/ShopContext'

const SearchBar = () => {

  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const { pathname } = useLocation();

  // Only shown on the collection page
  if (!showSearch || !pathname.includes('collection')) return null;

  return (
    <div className='border-b border-ink/5 bg-ink/[0.02]'>
      <div className='container-x flex items-center gap-3 py-4'>
        <div className='flex flex-1 items-center gap-3 rounded-full border border-ink/10 bg-white px-5 py-3 shadow-soft focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15'>
          <FiSearch className='text-ink/40' />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='flex-1 bg-transparent text-sm outline-none'
            type="text"
            placeholder='Search for T-shirts, hoodies, jackets...'
            autoFocus
          />
        </div>
        <button
          onClick={() => { setShowSearch(false); setSearch('') }}
          className='grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition hover:bg-brand-600'
          aria-label="Close search"
        >
          <FiX />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
