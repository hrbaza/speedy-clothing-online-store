import { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext, errorMessage } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const inputClass = 'border border-gray-300 rounded py-1.5 px-3.5 w-full'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const [submitting, setSubmitting] = useState(false);
    const { navigate, backendUrl, token, cartLines, setCartItems } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const { name, value } = event.target
        setFormData(data => ({ ...data, [name]: value }))
    }

    const orderPlaced = () => {
        setCartItems({})
        navigate('/orders')
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
                    if (data.success) {
                        orderPlaced()
                    }
                } catch (error) {
                    toast.error(errorMessage(error))
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        if (!token) {
            toast.error('Please login to place an order')
            navigate('/login')
            return
        }
        if (cartLines.length === 0) {
            toast.error('Your cart is empty')
            return
        }

        // Only ids, sizes and quantities are sent - the server looks up the prices itself
        const orderData = {
            address: formData,
            items: cartLines.map(({ product, size, quantity }) => ({ _id: product._id, size, quantity })),
        }
        const headers = { headers: { token } }

        setSubmitting(true)
        try {
            switch (method) {
                case 'cod': {
                    const { data } = await axios.post(backendUrl + '/api/order/place', orderData, headers)
                    if (data.success) {
                        orderPlaced()
                    } else {
                        toast.error(data.message)
                    }
                    break;
                }

                case 'stripe': {
                    const { data } = await axios.post(backendUrl + '/api/order/stripe', orderData, headers)
                    if (data.success) {
                        window.location.replace(data.session_url)
                    } else {
                        toast.error(data.message)
                    }
                    break;
                }

                case 'razorpay': {
                    const { data } = await axios.post(backendUrl + '/api/order/razorpay', orderData, headers)
                    if (data.success) {
                        initPay(data.order)
                    } else {
                        toast.error(data.message)
                    }
                    break;
                }

                default:
                    break;
            }
        } catch (error) {
            toast.error(errorMessage(error))
        } finally {
            setSubmitting(false)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* ------------- Left Side ---------------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className={inputClass} type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className={inputClass} type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className={inputClass} type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className={inputClass} type="text" placeholder='Street' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className={inputClass} type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className={inputClass} type="text" placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className={inputClass} type="text" inputMode="numeric" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className={inputClass} type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className={inputClass} type="tel" placeholder='Phone' />
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className='mt-8'>

                <div className='mt-8 min-w-120'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/* --------------- Payment Method Selection ------------- */}
                    <div className='flex gap-3 flex-col lg:flex-row justify-evenly'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
                        </div>
                        {/* Invisible spacer that keeps the two options apart (Razorpay option is hidden) */}
                        <div className='flex items-center gap-3 border p-2 px-3 opacity-0 pointer-events-none'>
                            <p className='min-w-3.5 h-3.5 border rounded-full'></p>
                            <div className='h-5 mx-4'></div>
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button type='submit' disabled={submitting} className='bg-black text-white px-16 py-3 text-sm disabled:opacity-50'>
                            {submitting ? 'PLACING ORDER...' : 'PLACE ORDER'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
