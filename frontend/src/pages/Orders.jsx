import { useContext, useEffect, useState } from 'react'
import { ShopContext, errorMessage } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const STATUS_COLORS = {
  delivered: 'bg-green-500',
  cancelled: 'bg-red-500',
  processing: 'bg-yellow-500',
}

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
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

  const refreshButton = (
    <button onClick={loadOrderData} className='bg-black text-white px-6 py-2 text-sm font-medium rounded-sm hover:bg-gray-800'>
      Refresh Orders
    </button>
  )

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {isLoading ? (
        <div className='text-center py-8'>
          <p className='text-gray-600'>Loading your orders...</p>
        </div>
      ) : !token ? (
        <div className='text-center py-8'>
          <p className='text-gray-600'>Please login to see your orders.</p>
        </div>
      ) : orderData.length === 0 ? (
        <div className='text-center py-8'>
          <p className='text-gray-600 mb-4'>You haven&apos;t placed any orders yet.</p>
          {refreshButton}
        </div>
      ) : (
        <div>
          <div className='flex justify-end mb-4'>
            {refreshButton}
          </div>
          {orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt={item.name} />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className={`min-w-2 h-2 rounded-full ${STATUS_COLORS[item.status.toLowerCase()] || 'bg-blue-500'}`}></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-50'>Track Order</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
