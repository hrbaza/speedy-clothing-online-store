import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { ShopContext, isInStock } from '../context/ShopContext'

const ProductItem = ({ product }) => {
  const { currency } = useContext(ShopContext)
  const { _id, image, name, price, category, subCategory, bestseller } = product
  const inStock = isInStock(product)

  return (
    <Link to={`/product/${_id}`} className='group block'>
      <div className='relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#f3f4f7]'>
        <img
          className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 ${inStock ? '' : 'opacity-60 grayscale'}`}
          src={image[0]}
          alt={name}
          loading='lazy'
        />
        {/* second photo on hover, when there is one */}
        {image[1] && (
          <img
            className={`absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-100 ${inStock ? '' : 'grayscale'}`}
            src={image[1]}
            alt=''
            loading='lazy'
          />
        )}
        <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition group-hover:opacity-100' />

        {!inStock && (
          <span className='absolute inset-x-3 top-1/2 -translate-y-1/2 -skew-x-12 rounded-md bg-red-600/95 py-2 text-center text-xs font-bold uppercase tracking-[0.25em] text-white shadow-lg'>
            <span className='inline-block skew-x-12'>Out of stock</span>
          </span>
        )}
        {bestseller && inStock && (
          <span className='absolute left-3 top-3 -skew-x-12 rounded-md bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white'>
            <span className='inline-block skew-x-12'>Bestseller</span>
          </span>
        )}
        <span className='absolute bottom-3 right-3 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-white text-lg text-ink opacity-0 shadow-soft transition duration-300 group-hover:translate-y-0 group-hover:bg-brand-600 group-hover:text-white group-hover:opacity-100'>
          <FiArrowUpRight />
        </span>
      </div>

      <div className='mt-4 flex items-start justify-between gap-3 px-1'>
        <div className='min-w-0'>
          <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40'>{category} · {subCategory}</p>
          <p className='mt-1 truncate font-medium text-ink transition group-hover:text-brand-600'>{name}</p>
        </div>
        <p className='shrink-0 font-display text-lg font-bold'>{currency}{price}</p>
      </div>
    </Link>
  )
}

export default ProductItem
