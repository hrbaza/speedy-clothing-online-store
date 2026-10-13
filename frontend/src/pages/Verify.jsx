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
        <div className='min-h-[60vh] flex items-center justify-center'>
            <p className='text-gray-600'>Verifying your payment...</p>
        </div>
    )
}

export default Verify
