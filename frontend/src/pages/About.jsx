import { FiCheckCircle, FiZap, FiFeather } from 'react-icons/fi'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { assets } from '../assets/assets'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import NewsletterBox from '../components/NewsletterBox'

const MILESTONES = [
  { year: '2020', title: 'Passion for Comfort', text: 'Speed Clothing was born from a passion to create the perfect T-shirt.' },
  { year: '2022', title: 'Quality Revolution', text: 'Launched our premium collection with innovative materials.' },
  { year: '2023', title: 'Global Style', text: 'Expanded our reach to fashion-conscious individuals worldwide.' },
]

const TEAM = [
  {
    name: 'Hamza Rashid',
    role: 'CEO',
    description: 'Passionate about creating timeless T-shirt designs',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ayesha Khan',
    role: 'Chief Designer',
    description: 'Crafts unique styles that blend comfort with edge',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ali Zafar',
    role: 'Marketing Manager',
    description: 'Drives global reach through creative campaigns',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
]

const FEATURES = [
  { icon: FiCheckCircle, title: 'Premium Quality', text: 'Crafted from the finest materials for unmatched comfort and durability.' },
  { icon: FiFeather, title: 'Unique Designs', text: 'Our in-house designers create exclusive, trend-setting collections.' },
  { icon: FiZap, title: 'Perfect Fit', text: 'Precision-cut for a perfect fit that moves with you.' },
]

const About = () => {
  return (
    <>
      <PageHeader
        eyebrow='Our story'
        title='Speed'
        highlight='Clothing'
        crumb='About'
        subtitle='Where Speed Meets Style — your ultimate T-shirt destination.'
      />

      {/* Story */}
      <section className='container-x grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-28'>
        <div className='relative' data-aos='fade-right'>
          <div className='absolute -inset-4 -z-10 rotate-3 rounded-[2.5rem] bg-gradient-to-br from-brand-600 to-brand-900' />
          <div className='relative overflow-hidden rounded-[2rem] bg-ink'>
            <div className='absolute inset-0 bg-grid opacity-60' />
            <img src={assets.hero_tee} alt='Speed Clothing T-shirt' className='relative mx-auto w-3/4 py-10 drop-shadow-[0_30px_30px_rgba(0,0,0,0.5)]' loading='lazy' />
            <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-8 text-white'>
              <h3 className='heading text-2xl'>The Speed Experience</h3>
              <p className='mt-1 text-sm text-white/60'>Where Speed Meets Style</p>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading eyebrow='Since 2020' title='Built for' highlight='motion' subtitle='We make T-shirts that feel as good as they look — and keep up with however fast you live.' />
          <ol className='relative space-y-8 border-l-2 border-dashed border-ink/10 pl-8'>
            {MILESTONES.map(({ year, title, text }) => (
              <li key={year} className='relative' data-aos='fade-up'>
                <span className='absolute -left-[3.15rem] top-0 grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-[11px] font-bold text-white ring-8 ring-white'>
                  {year.slice(2)}&apos;
                </span>
                <p className='text-xs font-semibold uppercase tracking-widest text-brand-600'>{year}</p>
                <h3 className='heading mt-1 text-xl'>{title}</h3>
                <p className='mt-1 text-ink/60'>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why us */}
      <section className='relative isolate overflow-hidden bg-ink py-20 text-white lg:py-28'>
        <div className='absolute inset-0 -z-10 bg-grid mask-fade' />
        <div className='absolute left-1/2 top-0 -z-10 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-[120px]' />
        <div className='container-x'>
          <SectionHeading eyebrow='Why choose us' title='The Speed' highlight='difference' center dark />
          <div className='grid gap-6 md:grid-cols-3'>
            {FEATURES.map(({ icon: Icon, title, text }, i) => (
              <div key={title} data-aos='fade-up' data-aos-delay={i * 100} className='rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur transition hover:-translate-y-2 hover:border-brand-500/50 hover:bg-white/[0.06]'>
                <span className='grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-2xl shadow-glow'>
                  <Icon />
                </span>
                <h3 className='heading mt-6 text-xl'>{title}</h3>
                <p className='mt-2 text-white/60'>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className='container-x py-20 lg:py-28'>
        <SectionHeading eyebrow='The people' title='Meet our' highlight='team' center />
        <div className='grid gap-8 md:grid-cols-3'>
          {TEAM.map((member, i) => (
            <div key={member.name} data-aos='fade-up' data-aos-delay={i * 100} className='group'>
              <div className='relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink/5'>
                <img
                  src={member.image}
                  alt={member.name}
                  loading='lazy'
                  className='h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent' />
                <div className='absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 text-white'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-widest text-brand-300'>{member.role}</p>
                    <h3 className='heading mt-1 text-2xl'>{member.name}</h3>
                  </div>
                  <div className='flex gap-2'>
                    {[FaFacebookF, FaInstagram].map((Icon, index) => (
                      <a key={index} href='#' aria-label='Social link' className='grid h-9 w-9 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:bg-brand-600'>
                        <Icon className='h-3.5 w-3.5' />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <p className='mt-4 px-1 text-ink/60'>{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='container-x pb-24'>
        <NewsletterBox />
      </section>
    </>
  )
}

export default About
