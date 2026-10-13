import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ShopContext, errorMessage } from '../context/ShopContext'

// Stripe redirects here after checkout; the backend confirms the payment with Stripe
const Verify = () => {

    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    const orderId = searchParams.get('orderId')

    useEffect(() => {
        if (!token) return

        axios.post(backendUrl + '/api/order/verifyStripe', { orderId }, { headers: { token } })
            .then(({ data }) => {
                if (data.success) {
                    setCartItems({})
                    navigate('/orders')
                } else {
                    toast.error('Payment was not completed')
                    navigate('/cart')
                }
            })
            .catch((error) => toast.error(errorMessage(error)))
    }, [token])

    return (
        <div className='flex min-h-[60vh] flex-col items-center justify-center gap-6'>
            <span className='h-14 w-14 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600' />
            <p className='heading text-xl'>Verifying your payment...</p>
        </div>
    )
}

export default Verify
