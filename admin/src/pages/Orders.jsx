import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiPackage, FiMapPin, FiPhone, FiMail, FiCalendar, FiTrash2, FiRefreshCw } from 'react-icons/fi'
import { authHeaders, backendUrl, errorMessage, formatMoney, ORDER_STATUSES, STATUS_STYLES } from '../config'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  const fetchAllOrders = async () => {
    if (!token) return

    setLoading(true)
    try {
      const { data } = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: authHeaders(token) })
      if (data.success) {
        setOrders(data.orders)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(errorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return

    try {
      const { data } = await axios.delete(`${backendUrl}/api/order/delete/${orderId}`, { headers: authHeaders(token) })
      if (data.success) {
        toast.success('Order deleted successfully')
        setOrders((prev) => prev.filter((order) => order._id !== orderId))
      }
    } catch (error) {
      toast.error(errorMessage(error) || 'Failed to delete order')
    }
  }

  const statusHandler = async (event, orderId) => {
    const status = event.target.value
    try {
      const { data } = await axios.post(`${backendUrl}/api/order/status`, { orderId, status }, { headers: authHeaders(token) })
      if (data.success) {
        setOrders((prev) => prev.map((order) => (order._id === orderId ? { ...order, status } : order)))
        toast.success(`Order marked as ${status}`)
      }
    } catch (error) {
      toast.error(errorMessage(error) || 'Failed to update order status')
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  const visible = filter === 'All' ? orders : orders.filter((order) => order.status === filter)
  const countFor = (status) => (status === 'All' ? orders.length : orders.filter((order) => order.status === status).length)

  return (
    <div className='space-y-6'>
      {/* Status filter */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex gap-1 no-scrollbar overflow-x-auto rounded-full border border-ink/10 bg-white p-1'>
          {['All', ...ORDER_STATUSES].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${filter === status ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'}`}
            >
              {status}
              <span className={`ml-1.5 text-xs ${filter === status ? 'text-white/60' : 'text-ink/40'}`}>{countFor(status)}</span>
            </button>
          ))}
        </div>
        <button onClick={fetchAllOrders} className='btn-outline shrink-0 px-5 py-2.5'>
          <FiRefreshCw /> Refresh
        </button>
      </div>

      {loading ? (
        <div className='space-y-4'>{[0, 1, 2].map((i) => <div key={i} className='h-48 animate-pulse rounded-3xl bg-ink/5' />)}</div>
      ) : visible.length === 0 ? (
        <div className='card flex flex-col items-center py-16 text-center'>
          <span className='grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-2xl text-brand-600'><FiPackage /></span>
          <p className='mt-4 text-ink/60'>{orders.length === 0 ? 'No orders yet.' : `No orders with status "${filter}".`}</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {visible.map((order) => {
            const { address } = order
            return (
              <article key={order._id} className='card overflow-hidden'>
                {/* Header */}
                <div className='flex flex-wrap items-center justify-between gap-3 border-b border-ink/5 bg-ink/[0.02] px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <span className='grid h-10 w-10 place-items-center rounded-xl bg-ink text-white'><FiPackage /></span>
                    <div>
                      <p className='font-mono text-xs text-ink/50'>#{order._id.slice(-8).toUpperCase()}</p>
                      <p className='flex items-center gap-1.5 text-sm text-ink/60'><FiCalendar /> {new Date(order.date).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='badge bg-ink/5 text-ink/70 ring-ink/10'>{order.paymentMethod}</span>
                    <span className={`badge ${order.payment ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 'bg-amber-50 text-amber-700 ring-amber-600/20'}`}>
                      {order.payment ? 'Paid' : 'Payment pending'}
                    </span>
                  </div>
                </div>

                <div className='grid gap-6 p-6 lg:grid-cols-[1.3fr_1fr_auto]'>
                  {/* Items */}
                  <div>
                    <p className='label'>Items ({order.items.length})</p>
                    <ul className='space-y-2'>
                      {order.items.map((item, index) => (
                        <li key={index} className='flex items-center gap-3'>
                          {item.image?.[0] && <img src={item.image[0]} alt='' className='h-12 w-10 rounded-lg bg-ink/5 object-cover' />}
                          <div className='min-w-0 flex-1 text-sm'>
                            <p className='truncate font-medium'>{item.name}</p>
                            <p className='text-xs text-ink/50'>Size {item.size} · Qty {item.quantity}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Customer */}
                  <div className='text-sm'>
                    <p className='label'>Customer</p>
                    <p className='font-semibold'>{`${address.firstName} ${address.lastName}`}</p>
                    <p className='mt-2 flex items-start gap-2 text-ink/60'>
                      <FiMapPin className='mt-0.5 shrink-0' />
                      <span>{address.street}, {[address.city, address.state, address.country, address.zipcode].filter(Boolean).join(', ')}</span>
                    </p>
                    <p className='mt-1 flex items-center gap-2 text-ink/60'><FiPhone /> {address.phone}</p>
                    {address.email && <p className='mt-1 flex items-center gap-2 text-ink/60'><FiMail /> {address.email}</p>}
                  </div>

                  {/* Actions */}
                  <div className='flex flex-col gap-3 lg:w-52'>
                    <div>
                      <p className='label'>Total</p>
                      <p className='font-display text-2xl font-black'>{formatMoney(order.amount)}</p>
                    </div>
                    <select
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status}
                      className={`cursor-pointer rounded-xl px-3 py-2.5 text-sm font-semibold outline-none ring-1 ring-inset ${STATUS_STYLES[order.status] || STATUS_STYLES['Order Placed']}`}
                    >
                      {ORDER_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className='flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50'
                    >
                      <FiTrash2 /> Delete order
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Orders
