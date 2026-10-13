import { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import SectionHeading from './SectionHeading';
import ProductGrid from './ProductGrid';

const RelatedProducts = ({ productId, category, subCategory }) => {

  const { products } = useContext(ShopContext);

  // Recomputed whenever the viewed product changes, not only when products load
  const related = useMemo(
    () => products
      .filter((item) => item._id !== productId && item.category === category && item.subCategory === subCategory)
      .slice(0, 4),
    [products, productId, category, subCategory]
  );

  if (related.length === 0) return null;

  return (
    <section className='container-x border-t border-ink/5 py-20'>
      <SectionHeading eyebrow='You may also like' title='Related' highlight='products' linkTo={`/collection?category=${category}`} />
      <ProductGrid products={related} skeletons={4} />
    </section>
  )
}

export default RelatedProducts
