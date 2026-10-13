import { toast } from 'react-toastify'
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi'
import PageHeader from '../components/PageHeader'
import NewsletterBox from '../components/NewsletterBox'

const CONTACT_INFO = [
  { icon: FiMapPin, title: 'Our location', lines: ['Bahawalpur, Pakistan'] },
  { icon: FiPhone, title: 'Call us', lines: ['+92 62 123 4567'], href: 'tel:+92621234567' },
  { icon: FiMail, title: 'Email us', lines: ['Speedclothing@gmail.com'], href: 'mailto:Speedclothing@gmail.com' },
  { icon: FiClock, title: 'Store hours', lines: ['Mon – Fri: 9:00 AM – 6:00 PM', 'Sat: 10:00 AM – 5:00 PM · Sun: Closed'] },
]

const Contact = () => {

  // Frontend-only for now: no contact API exists on the backend yet
  const onSubmitHandler = (event) => {
    event.preventDefault()
    toast.success('Thanks! We will get back to you soon.')
    event.target.reset()
  }

  return (
    <>
      <PageHeader
        eyebrow='Get in touch'
        title='Contact'
        highlight='us'
        crumb='Contact'
        subtitle='Questions about an order, sizing or anything else? We would love to hear from you.'
      />

      <section className='container-x grid gap-10 py-16 lg:grid-cols-[1fr_1.2fr] lg:py-24'>
        {/* Info */}
        <div className='grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1'>
          {CONTACT_INFO.map(({ icon: Icon, title, lines, href }) => {
            const body = (
              <>
                <span className='grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-600 text-xl text-white shadow-glow'><Icon /></span>
                <span>
                  <span className='block text-xs font-semibold uppercase tracking-widest text-ink/40'>{title}</span>
                  {lines.map((line) => <span key={line} className='mt-1 block font-medium'>{line}</span>)}
                </span>
              </>
            )
            return href ? (
              <a key={title} href={href} className='card flex items-start gap-4 p-6 transition hover:-translate-y-1'>{body}</a>
            ) : (
              <div key={title} className='card flex items-start gap-4 p-6'>{body}</div>
            )
          })}
        </div>

        {/* Form */}
        <div className='card p-6 sm:p-10'>
          <h2 className='heading text-3xl'>Send us a message</h2>
          <p className='mt-2 text-ink/60'>We usually reply within one working day.</p>

          <form onSubmit={onSubmitHandler} className='mt-8 space-y-5'>
            <div className='grid gap-5 sm:grid-cols-2'>
              <div>
                <label htmlFor='contact-name' className='label'>Full name</label>
                <input id='contact-name' type='text' className='input py-3.5' placeholder='Your name' required />
              </div>
              <div>
                <label htmlFor='contact-email' className='label'>Email address</label>
                <input id='contact-email' type='email' className='input py-3.5' placeholder='you@example.com' required />
              </div>
            </div>
            <div>
              <label htmlFor='contact-message' className='label'>Message</label>
              <textarea id='contact-message' rows={6} className='input resize-none py-3.5' placeholder='How can we help?' required />
            </div>
            <button type='submit' className='btn-primary w-full py-4 sm:w-auto'>
              Send message <FiSend />
            </button>
          </form>
        </div>
      </section>

      <section className='container-x pb-24'>
        <NewsletterBox />
      </section>
    </>
  )
}

export default Contact
