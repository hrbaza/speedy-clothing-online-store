import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { authHeaders, backendUrl, currency, errorMessage } from '../config'

const ORDER_STATUSES = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered']

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return

    try {
      const { data } = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: authHeaders(token) })
      if (data.success) {
        setOrders(data.orders)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(errorMessage(error))
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
      }
    } catch (error) {
      toast.error(errorMessage(error) || 'Failed to update order status')
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order) => {
          const { address } = order
          return (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={order._id}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {order.items.map((item, index) => (
                    <p className='py-0.5' key={index}>
                      {item.name} x {item.quantity} <span>{item.size}</span>
                      {index < order.items.length - 1 && ','}
                    </p>
                  ))}
                </div>
                <p className='mt-3 mb-2 font-medium'>{`${address.firstName} ${address.lastName}`}</p>
                <div>
                  <p>{address.street},</p>
                  <p>{[address.city, address.state, address.country, address.zipcode].filter(Boolean).join(', ')}</p>
                </div>
                <p>{address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <div className='flex flex-col gap-2'>
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>
                  {ORDER_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="p-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                >
                  Delete Order
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders
