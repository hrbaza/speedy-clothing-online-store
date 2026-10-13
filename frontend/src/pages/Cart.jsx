import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Cart = () => {
  const { currency, cartLines, updateQuantity, getCartAmount, navigate } = useContext(ShopContext);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-indigo-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2">
            <Title text1={'YOUR'} text2={'CART'} />
            <hr className="border-none h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto" />
          </div>
          <p className="mt-4 text-gray-700 text-lg font-light">
            Your Speed Clothing shopping cart
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {cartLines.length === 0 ? (
              <div className="text-center text-gray-500">
                <p>Your cart is empty.</p>
                <Link to="/collection" className="inline-block mt-4 text-blue-600 font-medium hover:underline">
                  Continue shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cartLines.map(({ product, size, quantity }) => (
                  <div key={`${product._id}-${size}`} className="border-b pb-6 last:border-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image[0]}
                          className="w-24 h-24 rounded-lg object-cover"
                          alt={product.name}
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          <p className="text-gray-500 mt-2">Size: {size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(product._id, size, quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            -
                          </button>
                          <span className="text-lg">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product._id, size, quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-lg">{currency}</span>
                          <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                        </div>
                        <button
                          onClick={() => updateQuantity(product._id, size, 0)}
                          aria-label="Remove item"
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Cart Total</h2>
                <div className="flex items-center">
                  <span className="text-lg font-semibold">{currency}</span>
                  <span className="text-2xl font-bold text-blue-600">{getCartAmount().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/place-order')}
                disabled={cartLines.length === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
