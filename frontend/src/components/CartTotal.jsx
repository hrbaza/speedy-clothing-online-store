import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { toast } from 'react-toastify';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, navigate } = useContext(ShopContext);

  const subtotal = getCartAmount();

  const handleCheckout = () => {
    if (subtotal === 0) {
      toast.error('Your cart is empty');
      return;
    }

    navigate('/place-order');
  };

  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-lg">
      <div className="text-2xl mb-4">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className="flex flex-col gap-4">
        {/* Subtotal */}
        <div className="flex justify-between text-gray-600">
          <p>Subtotal</p>
          <p>
            {currency}
            {subtotal.toFixed(2)}
          </p>
        </div>
        <hr className="border-gray-200" />

        {/* Shipping Fee */}
        <div className="flex justify-between text-gray-600">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr className="border-gray-200" />

        {/* Total */}
        <div className="flex justify-between font-semibold">
          <p>Total</p>
          <p>
            {currency}
            {(subtotal + delivery_fee).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartTotal;