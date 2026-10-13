export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
export const currency = '$'

export const authHeaders = (token) => ({ Authorization: `Bearer ${token}` })

// Best error message available from an axios error
export const errorMessage = (error) => error.response?.data?.message || error.message

export const ORDER_STATUSES = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered']

// Badge colours per order status
export const STATUS_STYLES = {
  'Order Placed': 'bg-sky-50 text-sky-700 ring-sky-600/20',
  Packing: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Shipped: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  'Out for delivery': 'bg-brand-50 text-brand-700 ring-brand-600/20',
  Delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
}

export const formatMoney = (value) =>
  `${currency}${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
