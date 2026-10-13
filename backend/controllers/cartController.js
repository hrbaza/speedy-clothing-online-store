import userModel from "../models/userModel.js";

// Loads the logged-in user's cart, or sends a 404 and returns null
const loadCart = async (req, res) => {
    const user = await userModel.findById(req.userId).select("cartData");
    if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return null;
    }
    return user.cartData || {};
};

const saveCart = (userId, cartData) => userModel.findByIdAndUpdate(userId, { cartData });

// Add products to user cart
const addToCart = async (req, res) => {
    try {
        const { itemId, size, quantity = 1 } = req.body;
        if (!itemId || !size || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
            return res.status(400).json({ success: false, message: "Invalid input data" });
        }

        const cartData = await loadCart(req, res);
        if (!cartData) return;

        cartData[itemId] = cartData[itemId] || {};
        cartData[itemId][size] = (cartData[itemId][size] || 0) + quantity;

        await saveCart(req.userId, cartData);
        res.status(200).json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update user cart (quantity 0 removes the item)
const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        if (!itemId || !size || !Number.isInteger(quantity) || quantity < 0) {
            return res.status(400).json({ success: false, message: "Invalid input data" });
        }

        const cartData = await loadCart(req, res);
        if (!cartData) return;

        if (!cartData[itemId]) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        if (quantity === 0) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][size] = quantity;
        }

        await saveCart(req.userId, cartData);
        res.status(200).json({ success: true, message: "Cart Updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get user cart data
const getUserCart = async (req, res) => {
    try {
        const cartData = await loadCart(req, res);
        if (!cartData) return;

        res.status(200).json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };
