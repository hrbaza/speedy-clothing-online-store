import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const MILESTONES = [
  { year: '2020', title: 'Passion for Comfort', text: 'Speed Clothing was born from a passion to create the perfect T-shirt' },
  { year: '2022', title: 'Quality Revolution', text: 'Launched our premium collection with innovative materials' },
  { year: '2023', title: 'Global Style', text: 'Expanded our reach to fashion-conscious individuals worldwide' },
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

const SOCIAL_ICON_PATHS = [
  // Facebook
  'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  // Instagram
  'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.253-.149-4.771-1.699-4.92-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.92-4.919 1.266-.057 1.645-.069 4.85-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.667.072 4.947.2 4.358 2.618 6.78 6.98 6.979 1.3.007 1.688.013 4.947.072 4.359.2 6.782 2.618 6.98 6.98.059 1.28.072 1.688.072 4.947 0 3.259-.013 3.667-.072 4.947-.197 4.324-2.638 6.769-6.907 6.965-1.28.058-1.678.07-4.906.07-3.228 0-3.668-.012-4.906-.07-4.305-.196-6.782-2.641-6.98-6.965-.059-1.28-.073-1.688-.073-4.947 0-3.259.013-3.667.072-4.947.199-4.324 2.639-6.769 6.907-6.965 1.28-.058 1.688-.07 4.906-.07 3.228 0 3.668.012 4.906.07 4.305.196 6.782 2.641 6.98 6.965.059 1.28.073 1.688.073 4.947zM12 14c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z',
]

const FEATURES = [
  {
    title: 'Premium Quality',
    text: 'Crafted from the finest materials for unmatched comfort and durability.',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Unique Designs',
    text: 'Our in-house designers create exclusive, trend-setting collections.',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Perfect Fit',
    text: 'Precision-cut for a perfect fit that moves with you.',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
]

const About = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-indigo-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2">
            <Title text1={'SPEED'} text2={'CLOTHING'} />
            <hr className="border-none h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto" />
          </div>
          <p className="mt-4 text-gray-700 text-lg font-light">
            Where Speed Meets Style - Your Ultimate T-Shirt Destination
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={assets.image}
                alt="Speed Clothing T-Shirt Collection"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">The Speed Clothing Experience</h3>
                  <p className="text-sm">Where Speed Meets Style</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Our Story
            </h2>
            <div className="space-y-6">
              {MILESTONES.map(({ year, title, text }) => (
                <div key={year} className="relative pl-10">
                  <div className="absolute -left-3 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 to-indigo-500"></div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                        <span className="text-white font-semibold">{year}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                      <p className="text-gray-600">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Meet Our Design Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
                      Connect
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                  <div className="flex gap-4 mt-4">
                    {SOCIAL_ICON_PATHS.map((path, index) => (
                      <a key={index} href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={path} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Speed Clothing?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURES.map(({ title, text, iconPath }) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <NewsletterBox />
        </div>
      </div>
    </div>
  )
}

export default About
