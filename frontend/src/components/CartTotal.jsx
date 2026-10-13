import { useContext } from 'react';
import { FiArrowRight, FiTruck, FiAlertTriangle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { ShopContext, isInStock } from '../context/ShopContext';

// Order summary card. `showCheckout` adds the "Proceed to checkout" button (used on the cart page)
const CartTotal = ({ showCheckout = false }) => {
  const { currency, delivery_fee, getCartAmount, getCartCount, navigate, cartLines } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const hasOutOfStock = cartLines.some(({ product }) => !isInStock(product));

  const handleCheckout = () => {
    if (subtotal === 0) {
      toast.error('Your cart is empty');
      return;
    }
    if (hasOutOfStock) {
      toast.error('Please remove out of stock items first');
      return;
    }
    navigate('/place-order');
  };

  const rows = [
    { label: `Subtotal (${getCartCount()} items)`, value: subtotal },
    { label: 'Shipping', value: delivery_fee },
  ];

  return (
    <div className="card p-6 sm:p-8">
      <h2 className="heading text-xl">Order summary</h2>

      <dl className="mt-6 space-y-4 text-sm">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between text-ink/60">
            <dt>{label}</dt>
            <dd className="font-medium text-ink">{currency}{value.toFixed(2)}</dd>
          </div>
        ))}
        <div className="flex items-end justify-between border-t border-dashed border-ink/15 pt-5">
          <dt className="font-semibold">Total</dt>
          <dd className="font-display text-3xl font-black">{currency}{(subtotal + delivery_fee).toFixed(2)}</dd>
        </div>
      </dl>

      {hasOutOfStock && (
        <p className="mt-6 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-700">
          <FiAlertTriangle className="mt-0.5 shrink-0" /> Some items in your cart are out of stock. Remove them to place your order.
        </p>
      )}

      {showCheckout && (
        <button onClick={handleCheckout} disabled={subtotal === 0 || hasOutOfStock} className="btn-primary group mt-8 w-full py-4">
          Proceed to checkout <FiArrowRight className="transition group-hover:translate-x-1" />
        </button>
      )}

      <p className="mt-5 flex items-center justify-center gap-2 text-xs text-ink/50">
        <FiTruck /> Pay with cash on delivery
      </p>
    </div>
  );
};

export default CartTotal;
