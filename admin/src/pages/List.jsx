import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiSearch, FiTrash2, FiPlus, FiBox, FiStar } from 'react-icons/fi'
import { authHeaders, backendUrl, errorMessage, formatMoney } from '../config'

const TABS = ['All', 'Men', 'Women', 'Kids']

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('All')

  const fetchList = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/product/list`)
      if (data.success) {
        setList(data.products)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(errorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    if (!window.confirm('Are you sure you want to remove this product?')) return

    try {
      const { data } = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: authHeaders(token) })

      if (data.success) {
        toast.success(data.message)
        setList((prev) => prev.filter((item) => item._id !== id))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(errorMessage(error))
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const search = query.trim().toLowerCase()
  const visible = list.filter((item) =>
    (tab === 'All' || item.category === tab) &&
    (!search || item.name.toLowerCase().includes(search))
  )

  return (
    <div className='space-y-6'>
      {/* Toolbar */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex gap-1 no-scrollbar overflow-x-auto rounded-full border border-ink/10 bg-white p-1'>
          {TABS.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${tab === item ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'}`}
            >
              {item}
              <span className={`ml-1.5 text-xs ${tab === item ? 'text-white/60' : 'text-ink/40'}`}>
                {item === 'All' ? list.length : list.filter((p) => p.category === item).length}
              </span>
            </button>
          ))}
        </div>
        <div className='flex gap-3'>
          <div className='relative flex-1 sm:w-64'>
            <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-ink/40' />
            <input value={query} onChange={(e) => setQuery(e.target.value)} className='input rounded-full pl-10' placeholder='Search products...' />
          </div>
          <Link to='/add' className='btn-primary shrink-0 px-5'><FiPlus /> <span className='hidden sm:inline'>Add</span></Link>
        </div>
      </div>

      <div className='card overflow-hidden'>
        {/* Table header (desktop) */}
        <div className='hidden grid-cols-[80px_3fr_1.2fr_1fr_80px] items-center gap-4 border-b border-ink/5 bg-ink/[0.02] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink/50 md:grid'>
          <span>Image</span>
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span className='text-right'>Action</span>
        </div>

        {loading ? (
          <div className='space-y-3 p-6'>{[0, 1, 2, 3].map((i) => <div key={i} className='h-16 animate-pulse rounded-2xl bg-ink/5' />)}</div>
        ) : visible.length === 0 ? (
          <div className='flex flex-col items-center py-16 text-center'>
            <span className='grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-2xl text-brand-600'><FiBox /></span>
            <p className='mt-4 text-ink/60'>{list.length === 0 ? 'No products yet.' : 'No products match your search.'}</p>
            {list.length === 0 && <Link to='/add' className='btn-primary mt-6'><FiPlus /> Add product</Link>}
          </div>
        ) : (
          <ul className='divide-y divide-ink/5'>
            {visible.map((item) => (
              <li key={item._id} className='grid grid-cols-[64px_1fr_auto] items-center gap-4 px-4 py-4 transition hover:bg-ink/[0.02] sm:px-6 md:grid-cols-[80px_3fr_1.2fr_1fr_80px]'>
                <img className='h-20 w-16 rounded-xl bg-ink/5 object-cover md:w-20' src={item.image[0]} alt={item.name} />
                <div className='min-w-0'>
                  <p className='truncate font-semibold'>{item.name}</p>
                  <div className='mt-1 flex flex-wrap items-center gap-2 text-xs text-ink/50'>
                    <span>{item.sizes.join(' · ')}</span>
                    {item.bestseller && <span className='badge bg-amber-50 text-amber-700 ring-amber-600/20'><FiStar /> Bestseller</span>}
                  </div>
                  <p className='mt-1 text-sm font-bold md:hidden'>{formatMoney(item.price)} · <span className='font-normal text-ink/50'>{item.category}</span></p>
                </div>
                <div className='hidden md:block'>
                  <span className='badge bg-ink/5 text-ink/70 ring-ink/10'>{item.category}</span>
                  <p className='mt-1 text-xs text-ink/40'>{item.subCategory}</p>
                </div>
                <p className='hidden font-display text-lg font-bold md:block'>{formatMoney(item.price)}</p>
                <div className='text-right'>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className='grid h-10 w-10 place-items-center rounded-full text-ink/40 transition hover:bg-red-50 hover:text-red-600 md:ml-auto'
                    aria-label='Remove product'
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default List
