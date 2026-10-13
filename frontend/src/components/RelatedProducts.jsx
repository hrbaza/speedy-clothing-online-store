import { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ productId, category, subCategory }) => {

  const { products } = useContext(ShopContext);

  // Recomputed whenever the viewed product changes, not only when products load
  const related = useMemo(
    () => products
      .filter((item) => item._id !== productId && item.category === category && item.subCategory === subCategory)
      .slice(0, 5),
    [products, productId, category, subCategory]
  );

  if (related.length === 0) return null;

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={"PRODUCTS"} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item) => (
          <ProductItem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
