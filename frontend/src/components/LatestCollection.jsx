import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import SectionHeading from './SectionHeading';
import ProductGrid from './ProductGrid';

const LATEST_COUNT = 8

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  return (
    <>
      <SectionHeading
        eyebrow='Just dropped'
        title='Latest'
        highlight='collection'
        subtitle='Fresh drops from Speed Clothing — the newest styles, added just for you.'
        linkTo='/collection'
      />
      {/* products already come newest first from the backend */}
      <ProductGrid
        products={products.slice(0, LATEST_COUNT)}
        emptyText='New products are on their way. Check back soon!'
      />
    </>
  )
}

export default LatestCollection
