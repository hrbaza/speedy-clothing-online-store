import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="bg-white min-h-[90vh] flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-12 md:px-20 py-16">
      
      {/* Left: Text Content */}
      <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
        <span className="inline-block px-5 py-1.5 text-base border border-blue-600 text-blue-600 rounded-full font-medium tracking-wide">
          Speed Exclusive Drop
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
          New Collection<br /> Men&apos;s T-Shirts
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl max-w-md mx-auto lg:mx-0">
          Specially crafted for you. Comfort. Style. 50% OFF now!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          {/* Shop Now Button */}
          <Link
            to="/collection"
            className="bg-blue-600 text-white text-lg px-8 py-4 rounded-md hover:bg-blue-700 transition-all font-medium"
          >
            Shop Now
          </Link>
          {/* View Collection Button */}
          <Link
            to="/collection"
            className="border-2 border-blue-600 text-blue-600 text-lg px-8 py-4 rounded-md hover:bg-blue-600 hover:text-white transition-all font-medium"
          >
            View Collection
          </Link>
        </div>
      </div>

      {/* Right: Hero Image */}
      <div className="w-full lg:w-1/2 mb-12 lg:mb-0 flex justify-center items-center">
        <img
          src={assets.image}
          alt="Speed Clothing Model"
          className="w-full max-w-md h-auto"
        />
      </div>
    </div>
  );
};

export default Hero;
