import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  const policies = [
    {
      icon: assets.exchange_icon,
      title: 'Easy Exchange Policy',
      description: 'We offer a hassle-free exchange policy.',
    },
    {
      icon: assets.quality_icon,
      title: '7 Days Return Policy',
      description: 'Return your order within 7 days – no questions asked.',
    },
    {
      icon: assets.support_img,
      title: 'Best Customer Support',
      description: 'Get 24/7 support from our dedicated team.',
    },
  ]

  return (
    <div className="py-20 px-4 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center max-w-6xl mx-auto">
        {policies.map((item, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={item.icon}
              alt={item.title}
              className="w-14 h-14 mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurPolicy
