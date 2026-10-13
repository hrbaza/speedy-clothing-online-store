import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

// global variables
const deliveryCharge = 10
const ORDER_STATUSES = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered']

const clearCart = (userId) => userModel.findByIdAndUpdate(userId, { cartData: {} })

// Builds the order from the client's cart, but takes name/price from the database
// so the customer cannot change what they pay.
const createOrder = async (userId, { items, address }) => {
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
        paymentMethod: 'COD',
        payment: false,
        date: Date.now()
    })
}

// Placing orders (Cash on Delivery is the only payment method)
const placeOrder = async (req, res) => {
    try {
        await createOrder(req.userId, req.body)
        await clearCart(req.userId)
        res.json({ success: true, message: 'Order Placed' })
    } catch (error) {
        console.error(error)
        res.status(400).json({ success: false, message: error.message })
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

export { placeOrder, allOrders, userOrders, updateStatus, deleteOrder }
