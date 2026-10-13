import { toast } from 'react-toastify'
import NewsletterBox from '../components/NewsletterBox'

const inputClass = 'w-full border border-blue-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'

const Contact = () => {

  // Frontend-only for now: no contact API exists on the backend yet
  const onSubmitHandler = (event) => {
    event.preventDefault()
    toast.success('Thanks! We will get back to you soon.')
    event.target.reset()
  }

  return (
    <div className='bg-gradient-to-b from-blue-50 to-indigo-50 min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2'>
            <h1 className='text-2xl font-bold'>CONTACT US</h1>
            <hr className='border-none h-[2px] w-12 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto' />
          </div>
          <p className='mt-4 text-gray-700 text-lg font-light'>
            Get in touch with Speed Clothing for any inquiries or support
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-12'>
          {/* Contact Form */}
          <div className='md:w-1/2'>
            <div className='bg-white rounded-2xl shadow-sm p-8'>
              <h2 className='text-xl font-semibold mb-6'>Send us a message</h2>
              <form onSubmit={onSubmitHandler} className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                  <input
                    type="text"
                    className={inputClass}
                    required
                    placeholder='Your name'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                  <input
                    type="email"
                    className={inputClass}
                    required
                    placeholder='your@email.com'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Message</label>
                  <textarea
                    rows={4}
                    className={inputClass}
                    required
                    placeholder='Your message...'
                  />
                </div>
                <button
                  type='submit'
                  className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity'
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className='md:w-1/2'>
            <div className='bg-white rounded-2xl shadow-sm p-8'>
              <h2 className='text-xl font-semibold mb-6'>Our Store</h2>
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Our Location</p>
                    <p className='text-gray-800'>Near Satellite Town, One Unit Chowk<br />Bahawalpur</p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                    </svg>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Contact Us</p>
                    <p className='text-gray-800'>Tel: (+92) 3039219730<br />Email: Speedclothing@gmail.com</p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Store Hours</p>
                    <p className='text-gray-800'>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 5:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-12'></div>

        <NewsletterBox/>
      </div>
    </div>
  )
}

export default Contact
