import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct, updateStock, updateProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

const productImages = upload.fields(['image1', 'image2', 'image3', 'image4'].map((name) => ({ name, maxCount: 1 })))

productRouter.post('/add', adminAuth, productImages, addProduct);
productRouter.post('/update', adminAuth, productImages, updateProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/stock', adminAuth, updateStock);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts)

export default productRouter
