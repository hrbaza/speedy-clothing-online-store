import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

// Unknown routes
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' })
})

// Errors thrown outside controllers (e.g. bad JSON body, upload errors)
app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' })
})

// On Vercel the app is run as a serverless function, so it must not listen on a port
if (!process.env.VERCEL) {
    app.listen(port, () => console.log('Server started on PORT : ' + port))
}

export default app
