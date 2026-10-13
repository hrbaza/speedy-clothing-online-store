import { FiRefreshCw, FiAward, FiHeadphones, FiTruck } from 'react-icons/fi'

const POLICIES = [
  { icon: FiRefreshCw, title: 'Easy Exchange', description: 'Hassle-free exchanges on every order.' },
  { icon: FiAward, title: '7-Day Returns', description: 'Return within 7 days — no questions asked.' },
  { icon: FiTruck, title: 'Cash on Delivery', description: 'Pay at your door, or securely with Stripe.' },
  { icon: FiHeadphones, title: '24/7 Support', description: 'Our team is here whenever you need us.' },
]

const OurPolicy = () => {
  return (
    <section className='container-x py-16'>
      <div className='grid gap-px overflow-hidden rounded-[2rem] border border-ink/5 bg-ink/5 sm:grid-cols-2 lg:grid-cols-4'>
        {POLICIES.map(({ icon: Icon, title, description }, index) => (
          <div
            key={title}
            data-aos='fade-up'
            data-aos-delay={index * 100}
            className='group bg-white p-8 transition duration-300 hover:bg-ink'
          >
            <span className='grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-2xl text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white'>
              <Icon />
            </span>
            <h3 className='heading mt-6 text-lg transition group-hover:text-white'>{title}</h3>
            <p className='mt-2 text-sm text-ink/60 transition group-hover:text-white/60'>{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy
