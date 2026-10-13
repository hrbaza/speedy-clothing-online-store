import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';
import { ShopContext, isInStock } from '../context/ShopContext';
import PageHeader from '../components/PageHeader';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { currency, cartLines, updateQuantity } = useContext(ShopContext);

  return (
    <>
      <PageHeader eyebrow='Almost yours' title='Your' highlight='Cart' crumb='Cart' />

      <div className='container-x py-12 lg:py-16'>
        {cartLines.length === 0 ? (
          <div className='mx-auto max-w-md py-10 text-center'>
            <span className='mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-brand-50 text-3xl text-brand-600'>
              <FiShoppingBag />
            </span>
            <h2 className='heading mt-6 text-3xl'>Your cart is empty</h2>
            <p className='mt-3 text-ink/60'>Looks like you have not added anything yet. Let&apos;s fix that.</p>
            <Link to='/collection' className='btn-primary mt-8'>Start shopping</Link>
          </div>
        ) : (
          <div className='grid gap-10 lg:grid-cols-[1fr_380px]'>
            <div>
              <div className='space-y-4'>
                {cartLines.map(({ product, size, quantity }) => (
                  <div key={`${product._id}-${size}`} className={`card flex gap-4 p-4 sm:gap-6 sm:p-5 ${isInStock(product) ? '' : 'ring-2 ring-red-200'}`}>
                    <Link to={`/product/${product._id}`} className='h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#f3f4f7] sm:h-32 sm:w-28'>
                      <img src={product.image[0]} className='h-full w-full object-cover' alt={product.name} />
                    </Link>

                    <div className='flex min-w-0 flex-1 flex-col justify-between'>
                      <div className='flex items-start justify-between gap-3'>
                        <div className='min-w-0'>
                          <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40'>{product.category}</p>
                          <Link to={`/product/${product._id}`} className='mt-1 block truncate font-semibold hover:text-brand-600'>{product.name}</Link>
                          <span className='mt-2 inline-block rounded-lg bg-ink/5 px-2.5 py-1 text-xs font-semibold'>Size {size}</span>
                          {!isInStock(product) && (
                            <p className='mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-600'>
                              <FiAlertTriangle /> Out of stock — please remove to continue
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => updateQuantity(product._id, size, 0)}
                          aria-label='Remove item'
                          className='grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink/40 transition hover:bg-red-50 hover:text-red-600'
                        >
                          <FiTrash2 />
                        </button>
                      </div>

                      <div className='mt-4 flex items-center justify-between'>
                        <div className='flex items-center rounded-full border border-ink/10 p-1'>
                          <button
                            onClick={() => updateQuantity(product._id, size, quantity - 1)}
                            className='grid h-8 w-8 place-items-center rounded-full transition hover:bg-ink hover:text-white'
                            aria-label='Decrease quantity'
                          >
                            <FiMinus />
                          </button>
                          <span className='w-10 text-center text-sm font-semibold'>{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product._id, size, quantity + 1)}
                            className='grid h-8 w-8 place-items-center rounded-full transition hover:bg-ink hover:text-white'
                            aria-label='Increase quantity'
                          >
                            <FiPlus />
                          </button>
                        </div>
                        <p className='font-display text-xl font-bold'>{currency}{(product.price * quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link to='/collection' className='mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink/60 hover:text-ink'>
                <FiArrowLeft /> Continue shopping
              </Link>
            </div>

            <div className='lg:sticky lg:top-28 lg:self-start'>
              <CartTotal showCheckout />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
