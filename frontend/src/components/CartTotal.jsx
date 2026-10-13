import { useContext } from 'react';
import { FiArrowRight, FiTruck } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

// Order summary card. `showCheckout` adds the "Proceed to checkout" button (used on the cart page)
const CartTotal = ({ showCheckout = false }) => {
  const { currency, delivery_fee, getCartAmount, getCartCount, navigate } = useContext(ShopContext);
  const subtotal = getCartAmount();

  const handleCheckout = () => {
    if (subtotal === 0) {
      toast.error('Your cart is empty');
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

      {showCheckout && (
        <button onClick={handleCheckout} disabled={subtotal === 0} className="btn-primary group mt-8 w-full py-4">
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
