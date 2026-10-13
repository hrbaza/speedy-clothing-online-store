const ITEMS = ['New Season Drop', 'Premium Cotton', 'Cash On Delivery', '7-Day Easy Returns', 'Secure Stripe Checkout', 'Where Speed Meets Style']

// Tilted, scrolling brand strip; the list is rendered twice so the loop is seamless
const Marquee = () => {
  return (
    <div className='relative z-10 -mt-6 overflow-x-clip sm:-mt-8'>
      <div className='-ml-[5%] w-[110%] -rotate-2 bg-brand-600 py-4 shadow-glow'>
        <div className='flex w-max animate-marquee'>
          {[0, 1].map((copy) => (
            <div key={copy} className='flex shrink-0 items-center' aria-hidden={copy === 1}>
              {ITEMS.map((item) => (
                <span key={item} className='heading flex items-center gap-8 px-8 text-lg text-white sm:text-2xl'>
                  {item}
                  <span className='text-sky-300'>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Marquee
