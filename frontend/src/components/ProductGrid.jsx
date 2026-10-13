import { useContext } from 'react'
import { FiPackage } from 'react-icons/fi'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const ProductSkeleton = () => (
  <div className='animate-pulse'>
    <div className='aspect-[4/5] rounded-3xl bg-ink/5' />
    <div className='mt-4 h-3 w-1/3 rounded bg-ink/5' />
    <div className='mt-2 h-4 w-2/3 rounded bg-ink/10' />
  </div>
)

// Product grid with loading skeletons and an empty state
const ProductGrid = ({ products, skeletons = 8, emptyText = 'No products found.', className = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' }) => {
  const { productsLoading } = useContext(ShopContext)

  if (productsLoading) {
    return (
      <div className={`grid gap-x-5 gap-y-10 ${className}`}>
        {Array.from({ length: skeletons }, (_, i) => <ProductSkeleton key={i} />)}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink/15 bg-ink/[0.02] px-6 py-16 text-center'>
        <span className='grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-2xl text-brand-600'><FiPackage /></span>
        <p className='mt-4 text-ink/60'>{emptyText}</p>
      </div>
    )
  }

  return (
    <div className={`grid gap-x-5 gap-y-10 ${className}`}>
      {products.map((item) => <ProductItem key={item._id} product={item} />)}
    </div>
  )
}

export default ProductGrid
