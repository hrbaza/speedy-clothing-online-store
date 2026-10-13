import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiRefreshCw, FiPackage, FiCalendar, FiCreditCard } from 'react-icons/fi'
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext, errorMessage } from '../context/ShopContext'
import PageHeader from '../components/PageHeader';

const STATUS_STYLES = {
  'order placed': 'bg-sky-50 text-sky-700 ring-sky-600/20',
  packing: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  shipped: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  'out for delivery': 'bg-brand-50 text-brand-700 ring-brand-600/20',
  delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
}

const Orders = () => {
  const { backendUrl, token, formatPrice } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const loadOrderData = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (data.success) {
        // One row per ordered item, carrying the order's status/payment/date
        setOrderData(data.orders.flatMap(({ items, status, payment, paymentMethod, date }) =>
          items.map((item) => ({ ...item, status, payment, paymentMethod, date }))
        ));
      }
    } catch (error) {
      toast.error(errorMessage(error) || 'Error loading orders');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  const emptyState = (title, text, action) => (
    <div className='mx-auto max-w-md py-10 text-center'>
      <span className='mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-brand-50 text-3xl text-brand-600'><FiPackage /></span>
      <h2 className='heading mt-6 text-3xl'>{title}</h2>
      <p className='mt-3 text-ink/60'>{text}</p>
      {action}
    </div>
  )

  return (
    <>
      <PageHeader eyebrow='Your purchases' title='My' highlight='Orders' crumb='Orders' />

      <div className='container-x py-12 lg:py-16'>
        {isLoading ? (
          <div className='space-y-4'>
            {[0, 1, 2].map((i) => <div key={i} className='h-32 animate-pulse rounded-3xl bg-ink/5' />)}
          </div>
        ) : !token ? (
          emptyState('Please login', 'Sign in to see and track your orders.', <Link to='/login' className='btn-primary mt-8'>Login</Link>)
        ) : orderData.length === 0 ? (
          emptyState('No orders yet', "You haven't placed any orders yet.", <Link to='/collection' className='btn-primary mt-8'>Start shopping</Link>)
        ) : (
          <>
            <div className='mb-6 flex items-center justify-between'>
              <p className='text-sm text-ink/60'><span className='font-semibold text-ink'>{orderData.length}</span> items ordered</p>
              <button onClick={loadOrderData} className='btn-outline px-5 py-2.5'>
                <FiRefreshCw /> Refresh
              </button>
            </div>

            <div className='space-y-4'>
              {orderData.map((item, index) => (
                <div key={index} className='card flex flex-col gap-5 p-5 sm:flex-row sm:items-center'>
                  <div className='h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#f3f4f7]'>
                    <img className='h-full w-full object-cover' src={item.image[0]} alt={item.name} />
                  </div>

                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-lg font-semibold'>{item.name}</p>
                    <div className='mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink/60'>
                      <span className='font-display font-bold text-ink'>{formatPrice(item.price)}</span>
                      <span>Qty {item.quantity}</span>
                      <span>Size {item.size}</span>
                    </div>
                    <div className='mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink/50'>
                      <span className='flex items-center gap-1.5'><FiCalendar /> {new Date(item.date).toDateString()}</span>
                      <span className='flex items-center gap-1.5'><FiCreditCard /> {item.paymentMethod} · {item.payment ? 'Paid' : 'Pending'}</span>
                    </div>
                  </div>

                  <div className='flex items-center justify-between gap-3 sm:flex-col sm:items-end'>
                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${STATUS_STYLES[item.status.toLowerCase()] || STATUS_STYLES['order placed']}`}>
                      <span className='h-1.5 w-1.5 rounded-full bg-current' />
                      {item.status}
                    </span>
                    <button onClick={loadOrderData} className='text-xs font-semibold uppercase tracking-wider text-brand-600 hover:underline'>
                      Track order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Orders
