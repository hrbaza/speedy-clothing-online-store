import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: [String], required: true },
    bestseller: { type: Boolean, required: true },
    inStock: { type: Boolean, default: true }, // older products without this field count as in stock
    date: { type: Date, required: true }
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
