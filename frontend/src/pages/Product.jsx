import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const RATING = 4
const REVIEW_COUNT = 122

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const productData = products.find((item) => item._id === productId);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  // Reset gallery and size when switching to another product
  useEffect(() => {
    setImage(productData?.image[0] || '');
    setSize('');
  }, [productData])

  return productData ? (
    <div className='border-t-2 pt-10 transition-all ease-in duration-500'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item) => (
              <img onClick={() => setImage(item)} src={item} key={item} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt={productData.name} />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {Array.from({ length: 5 }, (_, i) => (
              <img key={i} src={i < RATING ? assets.star_icon : assets.star_dull_icon} alt="" className="w-3 5" />
            ))}
            <p className='pl-2'>({REVIEW_COUNT})</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p className='text-lg font-semibold'>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 text-sm ${item === size ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className='bg-blue-600 text-white px-8 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors active:bg-blue-400'
          >
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='mt-8 border-t pt-8'>
            <h3 className='text-lg font-semibold mb-4'>Product Information</h3>
            <div className='text-sm text-gray-600 space-y-2'>
              <p>100% Original product</p>
              <p>Cash on delivery available</p>
              <p>Easy return and exchange policy (7 days)</p>
            </div>
          </div>
        </div>
      </div>

      {/* --------- display related products ---------- */}
      <RelatedProducts
        productId={productData._id}
        category={productData.category}
        subCategory={productData.subCategory}
      />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
