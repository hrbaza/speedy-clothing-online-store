import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import LatestCollection from '../components/LatestCollection'
import { assets } from '../assets/assets'

const SHIRT_CATEGORIES = [
  { title: 'Polo Shirts', image: assets.p_img2_1, tagline: 'Classic designs for modern style' },
  { title: 'Basic Shirts', image: assets.p_img11, tagline: 'Essential styles for everyday wear' },
  { title: 'Graphic Shirts', image: assets.p_img42, tagline: 'Bold designs that make a statement' },
  { title: 'Sport Shirts', image: assets.p_img8, tagline: 'Performance wear for active men' },
]

const Home = () => {
  return (
    <div className='bg-gradient-to-b from-blue-50 to-indigo-50'>
      {/* Hero Section */}
      <Hero />

      {/* Latest Collection Heading */}
      <div className='container mx-auto px-4 py-12 text-center'>
        <h2 className='text-4xl md:text-5xl font-bold text-blue-600 mb-4'>Speed Collection</h2>
        <div className='w-24 h-[4px] bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8'></div>
        <p className='text-xl md:text-2xl text-gray-600'>Discover our fastest and most stylish Shirts</p>
      </div>

      {/* Men's T-Shirt Categories */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {SHIRT_CATEGORIES.map(({ title, image, tagline }) => (
            <div key={title} className='group relative overflow-hidden rounded-3xl'>
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
              <div className='absolute top-4 left-4 bg-white/90 px-4 py-2 rounded-full text-sm font-medium text-gray-800'>{title}</div>
              <img
                className='w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500'
                src={image}
                alt={title}
                loading='lazy'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8'>
                <p className='text-xl text-gray-300 mb-6'>{tagline}</p>
                <Link to='/collection' className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity'>Shop Now</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Collection Section */}
      <div className='container mx-auto px-4'>
        <LatestCollection />
      </div>

      {/* Our Policy */}
      <OurPolicy />

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  )
}

export default Home
