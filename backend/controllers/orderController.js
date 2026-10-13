import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'

// global variables
const currency = 'usd'
const deliveryCharge = 10
const ORDER_STATUSES = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered']

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const toCents = (amount) => Math.round(amount * 100)

const clearCart = (userId) => userModel.findByIdAndUpdate(userId, { cartData: {} })

// Builds the order from the client's cart, but takes name/price from the database
// so the customer cannot change what they pay.
const createOrder = async (userId, { items, address }, paymentMethod) => {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error('Your cart is empty')
    }
    if (!address) {
        throw new Error('Delivery address is required')
    }

    const products = await productModel.find({ _id: { $in: items.map((item) => item._id) } })
    const productsById = new Map(products.map((product) => [product._id.toString(), product]))

    const orderItems = items.map(({ _id, size, quantity }) => {
        const product = productsById.get(String(_id))
        if (!product || !size || !Number.isInteger(quantity) || quantity < 1) {
            throw new Error('Cart contains an invalid item')
        }
        const { name, price, image, category, subCategory } = product
        return { _id: product._id, name, price, image, category, subCategory, size, quantity }
    })

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return orderModel.create({
        userId,
        items: orderItems,
        address,
        amount: subtotal + deliveryCharge,
        paymentMethod,
        payment: false,
        date: Date.now()
    })
}

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        await createOrder(req.userId, req.body, 'COD')
        await clearCart(req.userId)
        res.json({ success: true, message: 'Order Placed' })
    } catch (error) {
        console.error(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { origin } = req.headers
        const order = await createOrder(req.userId, req.body, 'Stripe')

        const line_items = order.items.map((item) => ({
            price_data: {
                currency,
                product_data: { name: item.name },
                unit_amount: toCents(item.price)
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency,
                product_data: { name: 'Delivery Charges' },
                unit_amount: toCents(deliveryCharge)
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
            line_items,
            mode: 'payment',
        })

        order.paymentRef = session.id
        await order.save()

        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.error(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// Verify Stripe payment by asking Stripe directly (the `success` query param can be faked)
const verifyStripe = async (req, res) => {
    try {
        const { orderId } = req.body
        const order = await orderModel.findOne({ _id: orderId, userId: req.userId })
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' })
        }

        const session = order.paymentRef && await stripe.checkout.sessions.retrieve(order.paymentRef)

        if (session?.payment_status === 'paid') {
            order.payment = true
            await order.save()
            await clearCart(req.userId)
            res.json({ success: true })
        } else {
            await order.deleteOne()
            res.json({ success: false })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    try {
        const order = await createOrder(req.userId, req.body, 'Razorpay')

        const razorpayOrder = await razorpayInstance.orders.create({
            amount: toCents(order.amount),
            currency: currency.toUpperCase(),
            receipt: order._id.toString()
        })

        res.json({ success: true, order: razorpayOrder })
    } catch (error) {
        console.error(error)
        res.status(400).json({ success: false, message: error.message || 'Razorpay error' })
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status !== 'paid') {
            return res.json({ success: false, message: 'Payment Failed' })
        }

        await orderModel.findOneAndUpdate({ _id: orderInfo.receipt, userId: req.userId }, { payment: true })
        await clearCart(req.userId)
        res.json({ success: true, message: 'Payment Successful' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// All Orders data for Admin Panel (newest first)
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 })
        res.json({ success: true, orders })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// User Order Data For Frontend (newest first)
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId }).sort({ date: -1 })
        res.json({ success: true, orders })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        if (!ORDER_STATUSES.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' })
        }

        const order = await orderModel.findByIdAndUpdate(orderId, { status })
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' })
        }

        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const order = await orderModel.findByIdAndDelete(req.params.orderId)
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' })
        }

        res.json({ success: true, message: 'Order deleted successfully' })
    } catch (error) {
        console.error('Delete order error:', error)
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

export { verifyRazorpay, verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, deleteOrder }
