import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import LatestCollection from '../components/LatestCollection'
import SectionHeading from '../components/SectionHeading'
import ProductGrid from '../components/ProductGrid'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const CATEGORIES = [
  { title: 'Men', tagline: 'Everyday essentials', image: assets.p_img11, to: '/collection?category=Men' },
  { title: 'Women', tagline: 'Fresh fits & tops', image: assets.p_img5, to: '/collection?category=Women' },
  { title: 'Kids', tagline: 'Built to play', image: assets.p_img42, to: '/collection?category=Kids' },
  { title: 'Winter', tagline: 'Layer up in style', image: assets.p_img45, to: '/collection?type=Winterwear' },
]

const Home = () => {
  const { products } = useContext(ShopContext)
  const bestsellers = products.filter((item) => item.bestseller).slice(0, 4)

  return (
    <>
      <Hero />
      <Marquee />

      {/* Shop by category */}
      <section className='container-x pb-20 pt-24 sm:pt-32'>
        <SectionHeading
          eyebrow='Shop by category'
          title='Find your'
          highlight='fit'
          subtitle='From sharp basics to statement pieces — pick a lane and go.'
          linkTo='/collection'
          linkText='All products'
        />

        <div className='grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4'>
          {CATEGORIES.map(({ title, tagline, image, to }) => (
            <Link key={title} to={to} className='group relative aspect-[3/4] overflow-hidden rounded-3xl bg-[#f3f4f7]'>
              <img
                className='h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110'
                src={image}
                alt={title}
                loading='lazy'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent' />
              <div className='absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white sm:p-6'>
                <div>
                  <p className='text-[10px] font-medium uppercase tracking-widest text-white/60 sm:text-xs'>{tagline}</p>
                  <h3 className='heading mt-1 text-xl sm:text-3xl'>{title}</h3>
                </div>
                <span className='hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-ink transition group-hover:rotate-45 group-hover:bg-brand-600 group-hover:text-white sm:grid'>
                  <FiArrowUpRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className='container-x py-20'>
        <LatestCollection />
      </section>

      {/* Promo banner */}
      <section className='container-x py-10'>
        <div className='relative isolate grid overflow-hidden rounded-[2rem] bg-ink text-white lg:grid-cols-2'>
          <div className='absolute inset-0 -z-10 bg-grid opacity-50' />
          <div className='absolute -left-20 top-0 -z-10 h-80 w-80 rounded-full bg-brand-600/50 blur-[120px]' />
          <div className='p-8 sm:p-14'>
            <p className='eyebrow text-brand-400'><span className='h-px w-8 bg-current' />Limited time</p>
            <h2 className='heading mt-4 text-4xl leading-[1] sm:text-6xl'>
              Basics,<br /><span className='text-gradient italic'>elevated.</span>
            </h2>
            <p className='mt-5 max-w-md text-white/60'>
              Heavyweight cotton tees in clean colours. The pieces you will reach for every single day.
            </p>
            <Link to='/collection?type=Topwear' className='btn-primary group mt-8'>
              Shop Topwear <FiArrowRight className='transition group-hover:translate-x-1' />
            </Link>
          </div>
          <div className='relative min-h-[260px]'>
            <img src={assets.feature} alt='Speed Clothing basics' className='absolute inset-0 h-full w-full object-cover' loading='lazy' />
            <div className='absolute inset-0 bg-gradient-to-r from-ink via-ink/30 to-transparent' />
          </div>
        </div>
      </section>

      {/* Best sellers (only when products are marked as bestseller in the admin panel) */}
      {bestsellers.length > 0 && (
        <section className='container-x py-20'>
          <SectionHeading eyebrow='Most loved' title='Best' highlight='sellers' linkTo='/collection' />
          <ProductGrid products={bestsellers} skeletons={4} />
        </section>
      )}

      <OurPolicy />

      <section className='container-x pb-24'>
        <NewsletterBox />
      </section>
    </>
  )
}

export default Home
