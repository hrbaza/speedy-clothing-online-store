import { useContext, useState } from 'react'
import { FiLock, FiTruck, FiCreditCard, FiCheck } from 'react-icons/fi'
import PageHeader from '../components/PageHeader'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext, errorMessage } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const FIELDS = [
    [{ name: 'firstName', label: 'First name', required: true }, { name: 'lastName', label: 'Last name', required: true }],
    [{ name: 'email', label: 'Email address', type: 'email', required: true }],
    [{ name: 'phone', label: 'Phone', type: 'tel', required: true }],
    [{ name: 'street', label: 'Street address', required: true }],
    [{ name: 'city', label: 'City', required: true }, { name: 'state', label: 'State / Province' }],
    [{ name: 'zipcode', label: 'Zip code', inputMode: 'numeric', required: true }, { name: 'country', label: 'Country', required: true }],
]

const PAYMENT_METHODS = [
    { id: 'cod', title: 'Cash on delivery', text: 'Pay when your order arrives', icon: FiTruck },
    { id: 'stripe', title: 'Card payment', text: 'Secure checkout with Stripe', icon: FiCreditCard, logo: true },
]

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
        <>
            <PageHeader eyebrow='Final step' title='Check' highlight='out' crumb='Checkout' />

            <form onSubmit={onSubmitHandler} className='container-x grid gap-10 py-12 lg:grid-cols-[1fr_400px] lg:py-16'>
                <div className='space-y-8'>
                    {/* Delivery details */}
                    <section className='card p-6 sm:p-8'>
                        <div className='flex items-center gap-3'>
                            <span className='grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white'>1</span>
                            <h2 className='heading text-xl'>Delivery information</h2>
                        </div>
                        <div className='mt-8 space-y-4'>
                            {FIELDS.map((row, i) => (
                                <div key={i} className={`grid gap-4 ${row.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                                    {row.map(({ name, label, type = 'text', required, inputMode }) => (
                                        <div key={name}>
                                            <label htmlFor={name} className='label'>{label}{required && ' *'}</label>
                                            <input
                                                id={name}
                                                name={name}
                                                type={type}
                                                inputMode={inputMode}
                                                required={required}
                                                value={formData[name]}
                                                onChange={onChangeHandler}
                                                className='input'
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Payment method */}
                    <section className='card p-6 sm:p-8'>
                        <div className='flex items-center gap-3'>
                            <span className='grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white'>2</span>
                            <h2 className='heading text-xl'>Payment method</h2>
                        </div>
                        <div className='mt-8 grid gap-4 sm:grid-cols-2'>
                            {PAYMENT_METHODS.map(({ id, title, text, icon: Icon, logo }) => {
                                const active = method === id
                                return (
                                    <button
                                        type='button'
                                        key={id}
                                        onClick={() => setMethod(id)}
                                        className={`relative flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition ${active ? 'border-brand-600 bg-brand-50/60' : 'border-ink/10 hover:border-ink/30'}`}
                                    >
                                        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-lg ${active ? 'bg-brand-600 text-white' : 'bg-ink/5'}`}>
                                            <Icon />
                                        </span>
                                        <span>
                                            <span className='block font-semibold'>{title}</span>
                                            <span className='mt-0.5 block text-xs text-ink/50'>{text}</span>
                                            {logo && <img className='mt-3 h-5' src={assets.stripe_logo} alt='Stripe' />}
                                        </span>
                                        {active && (
                                            <span className='absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-xs text-white'><FiCheck /></span>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </section>
                </div>

                {/* Summary */}
                <aside className='space-y-4 lg:sticky lg:top-28 lg:self-start'>
                    <div className='card p-6'>
                        <h2 className='heading text-sm tracking-widest text-ink/50'>Items ({cartLines.length})</h2>
                        <ul className='mt-4 max-h-64 space-y-4 overflow-y-auto'>
                            {cartLines.map(({ product, size, quantity }) => (
                                <li key={`${product._id}-${size}`} className='flex items-center gap-3'>
                                    <div className='h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f3f4f7]'>
                                        <img src={product.image[0]} alt={product.name} className='h-full w-full object-cover' />
                                    </div>
                                    <div className='min-w-0 flex-1'>
                                        <p className='truncate text-sm font-medium'>{product.name}</p>
                                        <p className='text-xs text-ink/50'>Size {size} · Qty {quantity}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <CartTotal />

                    <button type='submit' disabled={submitting} className='btn-primary w-full py-4'>
                        <FiLock /> {submitting ? 'Placing order...' : 'Place order'}
                    </button>
                </aside>
            </form>
        </>
    )
}

export default PlaceOrder
