import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const currency = 'Rs';

// Pakistani Rupees, e.g. 1299 -> "Rs 1,299"
export const formatPrice = (value) =>
    `${currency} ${Number(value || 0).toLocaleString('en-PK', { maximumFractionDigits: 2 })}`;
const delivery_fee = 200; // PKR, must match deliveryCharge in the backend
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Best error message available from an axios error
export const errorMessage = (error) => error.response?.data?.message || error.message

// Sizes are always shown smallest to largest, whatever order they were saved in
const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
const sizeRank = (size) => (SIZE_ORDER.includes(size) ? SIZE_ORDER.indexOf(size) : SIZE_ORDER.length)
export const sortSizes = (sizes) => [...sizes].sort((a, b) => sizeRank(a) - sizeRank(b))

// Products saved before the stock option existed have no inStock field and count as in stock
export const isInStock = (product) => product?.inStock !== false

const ShopContextProvider = (props) => {

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [token, setTokenState] = useState(() => localStorage.getItem('token') || '')
    const navigate = useNavigate();

    // Single place that keeps the token in state and localStorage in sync
    const setToken = (newToken) => {
        if (newToken) {
            localStorage.setItem('token', newToken)
        } else {
            localStorage.removeItem('token')
            setCartItems({})
        }
        setTokenState(newToken)
    }

    const addToCart = async (itemId, size, quantity = 1) => {
        if (!isInStock(products.find((product) => product._id === itemId))) {
            toast.error('Sorry, this product is out of stock');
            return;
        }
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        const cartData = structuredClone(cartItems);
        cartData[itemId] = cartData[itemId] || {};
        cartData[itemId][size] = (cartData[itemId][size] || 0) + quantity;
        setCartItems(cartData);
        toast.success(quantity > 1 ? `${quantity} items added to cart` : 'Added to cart');

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.error('Could not save cart:', errorMessage(error));
            }
        }
    }

    const updateQuantity = async (itemId, size, quantity) => {
        const cartData = structuredClone(cartItems);

        if (quantity > 0) {
            cartData[itemId][size] = quantity;
        } else {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.error('Could not save cart:', errorMessage(error));
            }
        }
    }

    // Flat list of cart lines ({ product, size, quantity }) for products that still exist
    const cartLines = useMemo(() => {
        const productsById = new Map(products.map((product) => [product._id, product]));
        const lines = [];
        for (const [itemId, sizes] of Object.entries(cartItems)) {
            const product = productsById.get(itemId);
            if (!product) continue;
            for (const [size, quantity] of Object.entries(sizes)) {
                if (quantity > 0) lines.push({ product, size, quantity });
            }
        }
        return lines;
    }, [cartItems, products]);

    const getCartCount = () =>
        Object.values(cartItems).reduce(
            (total, sizes) => total + Object.values(sizes).reduce((sum, qty) => sum + (qty > 0 ? qty : 0), 0),
            0
        );

    const getCartAmount = () =>
        cartLines.reduce((total, { product, quantity }) => total + product.price * quantity, 0);

    const getProductsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/product/list')
            if (data.success) {
                setProducts(data.products.map((product) => ({ ...product, sizes: sortSizes(product.sizes) })))
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(errorMessage(error))
        } finally {
            setProductsLoading(false)
        }
    }

    const getUserCart = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (data.success) {
                setCartItems(data.cartData)
            }
        } catch (error) {
            // Expired/invalid token: log the user out instead of showing a raw error
            if (error.response?.status === 401) {
                setToken('')
            } else {
                toast.error(errorMessage(error))
            }
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (token) {
            getUserCart()
        }
    }, [token])

    const value = {
        products, productsLoading, currency, formatPrice, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, cartLines, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;
