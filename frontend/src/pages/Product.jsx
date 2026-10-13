import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { FiChevronRight, FiShoppingBag, FiZap, FiTruck, FiRefreshCw, FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { ShopContext, isInStock } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const RATING = 4
const REVIEW_COUNT = 122

const PERKS = [
  { icon: FiCheckCircle, title: '100% Original', text: 'Authentic Speed Clothing product' },
  { icon: FiTruck, title: 'Cash on Delivery', text: 'Pay when your order arrives' },
  { icon: FiRefreshCw, title: '7-Day Returns', text: 'Easy return and exchange policy' },
]

const ProductSkeleton = () => (
  <div className='container-x grid animate-pulse gap-12 py-16 lg:grid-cols-2'>
    <div className='aspect-[4/5] rounded-3xl bg-ink/5' />
    <div className='space-y-4'>
      <div className='h-4 w-1/4 rounded bg-ink/5' />
      <div className='h-10 w-3/4 rounded bg-ink/10' />
      <div className='h-8 w-1/5 rounded bg-ink/5' />
      <div className='h-24 rounded bg-ink/5' />
    </div>
  </div>
)

const Product = () => {

  const { productId } = useParams();
  const { products, productsLoading, formatPrice, addToCart, navigate } = useContext(ShopContext);
  const productData = products.find((item) => item._id === productId);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  // Reset gallery and size when switching to another product
  useEffect(() => {
    setImage(productData?.image[0] || '');
    setSize('');
  }, [productData])

  if (!productData) {
    return productsLoading ? <ProductSkeleton /> : (
      <div className='container-x py-32 text-center'>
        <h1 className='heading text-4xl'>Product not found</h1>
        <p className='mt-3 text-ink/60'>It may have been removed or is no longer available.</p>
        <Link to='/collection' className='btn-primary mt-8'>Back to collection</Link>
      </div>
    )
  }

  const inStock = isInStock(productData)

  const buyNow = () => {
    if (!size) {
      addToCart(productData._id, size) // shows the "select size" message
      return
    }
    addToCart(productData._id, size)
    navigate('/cart')
  }

  return (
    <>
      <div className='container-x py-8 sm:py-12'>
        {/* Breadcrumb */}
        <nav className='mb-8 flex flex-wrap items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-ink/40'>
          <Link to='/' className='hover:text-ink'>Home</Link>
          <FiChevronRight />
          <Link to='/collection' className='hover:text-ink'>Collection</Link>
          <FiChevronRight />
          <span className='text-ink/80'>{productData.name}</span>
        </nav>

        <div className='grid gap-10 lg:grid-cols-2 lg:gap-16'>
          {/* Gallery */}
          <div className='flex flex-col-reverse gap-4 sm:flex-row lg:sticky lg:top-28 lg:self-start'>
            <div className='flex gap-3 overflow-x-auto sm:w-24 sm:flex-col'>
              {productData.image.map((item) => (
                <button
                  key={item}
                  onClick={() => setImage(item)}
                  className={`aspect-square w-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-[#f3f4f7] transition sm:w-full ${item === image ? 'border-brand-600' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={item} className='h-full w-full object-cover' alt='' />
                </button>
              ))}
            </div>
            <div className='relative flex-1 overflow-hidden rounded-3xl bg-[#f3f4f7]'>
              <img className={`aspect-[4/5] h-full w-full object-cover ${inStock ? '' : 'opacity-60 grayscale'}`} src={image} alt={productData.name} />
              {!inStock && (
                <span className='absolute right-4 top-4 -skew-x-12 rounded-md bg-red-600 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white'>
                  <span className='inline-block skew-x-12'>Out of stock</span>
                </span>
              )}
              {productData.bestseller && (
                <span className='absolute left-4 top-4 -skew-x-12 rounded-md bg-ink px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white'>
                  <span className='inline-block skew-x-12'>Bestseller</span>
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className='eyebrow'><span className='h-px w-8 bg-current' />{productData.category} · {productData.subCategory}</p>
            <h1 className='heading mt-4 text-3xl leading-tight sm:text-5xl'>{productData.name}</h1>

            <div className='mt-5 flex items-center gap-3'>
              <div className='flex gap-0.5 text-amber-400'>
                {Array.from({ length: 5 }, (_, i) => <FaStar key={i} className={i < RATING ? '' : 'text-ink/15'} />)}
              </div>
              <span className='text-sm text-ink/50'>({REVIEW_COUNT} reviews)</span>
            </div>

            <div className='mt-6 flex flex-wrap items-center gap-4'>
              <p className='font-display text-4xl font-black'>{formatPrice(productData.price)}</p>
              {inStock ? (
                <span className='inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20'>
                  <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' /> In stock
                </span>
              ) : (
                <span className='inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-600/20'>
                  <span className='h-1.5 w-1.5 rounded-full bg-red-500' /> Out of stock
                </span>
              )}
            </div>
            <p className='mt-6 leading-relaxed text-ink/60'>{productData.description}</p>

            <div className='mt-10'>
              <div className='flex items-center justify-between'>
                <p className='text-sm font-semibold uppercase tracking-wider'>Select size</p>
                {size && <p className='text-sm text-ink/50'>Selected: <span className='font-semibold text-ink'>{size}</span></p>}
              </div>
              <div className='mt-4 flex flex-wrap gap-3'>
                {productData.sizes.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSize(item)}
                    disabled={!inStock}
                    className={`h-12 min-w-12 rounded-xl border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${item === size ? 'border-brand-600 bg-brand-600 text-white shadow-glow' : 'border-ink/15 hover:border-ink'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {inStock ? (
              <div className='mt-10 flex flex-col gap-3 sm:flex-row'>
                <button onClick={() => addToCart(productData._id, size)} className='btn-primary flex-1 py-4'>
                  <FiShoppingBag /> Add to cart
                </button>
                <button onClick={buyNow} className='btn-dark flex-1 py-4'>
                  <FiZap /> Buy now
                </button>
              </div>
            ) : (
              <div className='mt-10'>
                <button disabled className='btn w-full cursor-not-allowed bg-ink/10 py-4 text-ink/50'>
                  <FiXCircle /> Out of stock
                </button>
                <p className='mt-3 text-center text-sm text-ink/50'>
                  This item is currently unavailable. <Link to={`/collection?category=${productData.category}`} className='font-semibold text-brand-600 hover:underline'>See similar products</Link>
                </p>
              </div>
            )}

            <div className='mt-10 grid gap-3 sm:grid-cols-3'>
              {PERKS.map(({ icon: Icon, title, text }) => (
                <div key={title} className='rounded-2xl border border-ink/10 p-4'>
                  <Icon className='text-xl text-brand-600' />
                  <p className='mt-3 text-sm font-semibold'>{title}</p>
                  <p className='mt-1 text-xs text-ink/50'>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts
        productId={productData._id}
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </>
  )
}

export default Product
