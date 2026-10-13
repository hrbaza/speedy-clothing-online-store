import express from 'express'
import { placeOrder, allOrders, userOrders, updateStatus, deleteOrder } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)
orderRouter.delete('/delete/:orderId', adminAuth, deleteOrder)

// Cash on Delivery order
orderRouter.post('/place', authUser, placeOrder)

// User Feature
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter
