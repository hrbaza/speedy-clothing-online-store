import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiBox, FiShoppingCart, FiTrendingUp, FiClock, FiPlus, FiArrowUpRight } from 'react-icons/fi'
import { authHeaders, backendUrl, errorMessage, formatMoney, STATUS_STYLES } from '../config'

const Dashboard = ({ token }) => {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      axios.get(`${backendUrl}/api/product/list`),
      axios.post(`${backendUrl}/api/order/list`, {}, { headers: authHeaders(token) }),
    ])
      .then(([productRes, orderRes]) => {
        if (productRes.data.success) setProducts(productRes.data.products)
        if (orderRes.data.success) setOrders(orderRes.data.orders)
      })
      .catch((error) => toast.error(errorMessage(error)))
      .finally(() => setLoading(false))
  }, [token])

  const revenue = orders.reduce((sum, order) => sum + (order.payment || order.status === 'Delivered' ? order.amount : 0), 0)
  const pending = orders.filter((order) => order.status !== 'Delivered').length
  const outOfStock = products.filter((product) => product.inStock === false).length

  const stats = [
    { label: 'Total products', value: products.length, icon: FiBox, accent: 'from-brand-500 to-brand-700', sub: outOfStock > 0 ? `${outOfStock} out of stock` : 'All in stock' },
    { label: 'Total orders', value: orders.length, icon: FiShoppingCart, accent: 'from-ink to-ink-600' },
    { label: 'Revenue (paid)', value: formatMoney(revenue), icon: FiTrendingUp, accent: 'from-emerald-500 to-emerald-700' },
    { label: 'Pending orders', value: pending, icon: FiClock, accent: 'from-amber-400 to-amber-600' },
  ]

  return (
    <div className='space-y-8'>
      {/* Welcome banner */}
      <section className='relative isolate overflow-hidden rounded-[2rem] bg-ink p-8 text-white sm:p-10'>
        <div className='absolute inset-0 -z-10 bg-grid opacity-60 mask-fade' />
        <div className='absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-brand-600/50 blur-[110px]' />
        <p className='eyebrow text-brand-400'><span className='h-px w-8 bg-current' />Welcome back</p>
        <h2 className='heading mt-3 text-3xl sm:text-4xl'>Store <span className='text-gradient italic'>overview</span></h2>
        <p className='mt-3 max-w-lg text-white/60'>Here is what is happening at Speed Clothing today.</p>
        <div className='mt-8 flex flex-wrap gap-3'>
          <Link to='/add' className='btn-primary'><FiPlus /> Add product</Link>
          <Link to='/orders' className='btn border border-white/20 bg-white/5 text-white hover:bg-white hover:text-ink'>View orders</Link>
        </div>
      </section>

      {/* Stats */}
      <section className='grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4'>
        {stats.map(({ label, value, icon: Icon, accent, sub }) => (
          <div key={label} className='card p-4 sm:p-6'>
            <div className='flex items-start justify-between'>
              <p className='text-xs font-medium text-ink/50 sm:text-sm'>{label}</p>
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white sm:h-11 sm:w-11 sm:rounded-2xl sm:text-lg ${accent}`}><Icon /></span>
            </div>
            {loading
              ? <div className='mt-4 h-9 w-24 animate-pulse rounded-lg bg-ink/5' />
              : <p className='mt-4 truncate font-display text-xl font-black sm:text-3xl'>{value}</p>}
            {sub && !loading && <p className={`mt-1 text-xs font-medium ${sub.includes('out of stock') ? 'text-red-600' : 'text-emerald-600'}`}>{sub}</p>}
          </div>
        ))}
      </section>

      <section className='grid gap-6 xl:grid-cols-[1.5fr_1fr]'>
        {/* Recent orders */}
        <div className='card p-6 sm:p-8'>
          <div className='flex items-center justify-between'>
            <h3 className='heading text-lg'>Recent orders</h3>
            <Link to='/orders' className='flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline'>All orders <FiArrowUpRight /></Link>
          </div>
          {loading ? (
            <div className='mt-6 space-y-3'>{[0, 1, 2].map((i) => <div key={i} className='h-14 animate-pulse rounded-2xl bg-ink/5' />)}</div>
          ) : orders.length === 0 ? (
            <p className='mt-6 rounded-2xl border border-dashed border-ink/15 py-10 text-center text-sm text-ink/50'>No orders yet.</p>
          ) : (
            <ul className='mt-6 divide-y divide-ink/5'>
              {orders.slice(0, 5).map((order) => (
                <li key={order._id} className='flex items-center gap-4 py-3.5'>
                  <span className='grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white'>
                    {(order.address.firstName || '?')[0].toUpperCase()}
                  </span>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate font-semibold'>{order.address.firstName} {order.address.lastName}</p>
                    <p className='text-xs text-ink/50'>{order.items.length} items · {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`badge hidden sm:inline-flex ${STATUS_STYLES[order.status] || STATUS_STYLES['Order Placed']}`}>{order.status}</span>
                  <p className='font-display font-bold'>{formatMoney(order.amount)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Latest products */}
        <div className='card p-6 sm:p-8'>
          <div className='flex items-center justify-between'>
            <h3 className='heading text-lg'>Latest products</h3>
            <Link to='/list' className='flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline'>View all <FiArrowUpRight /></Link>
          </div>
          {loading ? (
            <div className='mt-6 space-y-3'>{[0, 1, 2].map((i) => <div key={i} className='h-14 animate-pulse rounded-2xl bg-ink/5' />)}</div>
          ) : products.length === 0 ? (
            <div className='mt-6 rounded-2xl border border-dashed border-ink/15 py-10 text-center'>
              <p className='text-sm text-ink/50'>No products yet.</p>
              <Link to='/add' className='btn-primary mt-4 px-5 py-2.5'><FiPlus /> Add first product</Link>
            </div>
          ) : (
            <ul className='mt-6 space-y-3'>
              {products.slice(0, 5).map((product) => (
                <li key={product._id} className='flex items-center gap-3'>
                  <img src={product.image[0]} alt={product.name} className='h-14 w-12 rounded-xl bg-ink/5 object-cover' />
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-semibold'>{product.name}</p>
                    <p className='text-xs text-ink/50'>
                      {product.category} · {product.subCategory}
                      {product.inStock === false && <span className='ml-2 font-semibold text-red-600'>Out of stock</span>}
                    </p>
                  </div>
                  <p className='font-display font-bold'>{formatMoney(product.price)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
