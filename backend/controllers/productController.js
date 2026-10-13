import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

const IMAGE_FIELDS = ['image1', 'image2', 'image3', 'image4']
const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
const sizeRank = (size) => (SIZE_ORDER.includes(size) ? SIZE_ORDER.indexOf(size) : SIZE_ORDER.length)

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller, inStock } = req.body

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
            inStock: inStock !== "false",
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

// function for editing a product (admin)
// Each image slot is either a new upload (image1..image4) or an existing URL from `existingImages`.
const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, subCategory, sizes, bestseller, inStock, existingImages } = req.body

        const product = await productModel.findById(id)
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }

        const keep = JSON.parse(existingImages || '[]')
        const slots = await Promise.all(IMAGE_FIELDS.map(async (field, i) => {
            const file = req.files?.[field]?.[0]
            if (file) {
                const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' })
                return result.secure_url
            }
            // Only keep URLs that already belong to this product
            return product.image.includes(keep[i]) ? keep[i] : null
        }))
        const image = slots.filter(Boolean)

        if (image.length === 0) {
            return res.status(400).json({ success: false, message: "At least one image is required" })
        }

        Object.assign(product, {
            name,
            description,
            category,
            subCategory,
            price: Number(price),
            sizes: JSON.parse(sizes).sort((a, b) => sizeRank(a) - sizeRank(b)),
            bestseller: bestseller === "true",
            inStock: inStock !== "false",
            image,
        })
        await product.save()

        res.json({ success: true, message: "Product updated", product })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// function for marking a product in stock / out of stock (admin)
const updateStock = async (req, res) => {
    try {
        const { id, inStock } = req.body
        if (typeof inStock !== 'boolean') {
            return res.status(400).json({ success: false, message: "inStock must be true or false" })
        }

        const product = await productModel.findByIdAndUpdate(id, { inStock }, { new: true })
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }

        res.json({ success: true, message: inStock ? "Marked as in stock" : "Marked as out of stock", product })
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

export { listProducts, addProduct, removeProduct, singleProduct, updateStock, updateProduct }
