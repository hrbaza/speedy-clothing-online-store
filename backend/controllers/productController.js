import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

const IMAGE_FIELDS = ['image1', 'image2', 'image3', 'image4']
const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
const sizeRank = (size) => (SIZE_ORDER.includes(size) ? SIZE_ORDER.indexOf(size) : SIZE_ORDER.length)

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const images = IMAGE_FIELDS
            .map((field) => req.files?.[field]?.[0])
            .filter(Boolean)

        if (images.length === 0) {
            return res.status(400).json({ success: false, message: "At least one image is required" })
        }

        const imagesUrl = await Promise.all(
            images.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' })
                return result.secure_url
            })
        )

        await productModel.create({
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true",
            sizes: JSON.parse(sizes).sort((a, b) => sizeRank(a) - sizeRank(b)),
            image: imagesUrl,
            date: Date.now()
        })

        res.json({ success: true, message: "Product Added" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// function for list product (newest first)
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({}).sort({ date: -1 })
        res.json({ success: true, products })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.productId)
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }
        res.json({ success: true, product })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct }
