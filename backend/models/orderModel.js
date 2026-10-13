import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default: 'Order Placed' },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    paymentRef: { type: String }, // Stripe checkout session id, used to verify payment
    date: { type: Number, required: true }
})

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)
export default orderModel;
