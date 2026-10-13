import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { assets } from '../assets/assets';

const SOCIAL_ICONS = [FaFacebookF, FaTwitter, FaInstagram];

const COMPANY_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14">
        {/* Brand */}
        <div>
          <img src={assets.logo} className="mb-6 w-36" alt="Speed Clothing" />
          <p className="mb-6 leading-relaxed text-gray-600">
            Where Speed Meets Style — Your Ultimate T-Shirt Destination
          </p>
          <div className="flex space-x-4">
            {SOCIAL_ICONS.map((Icon, index) => (
              <a key={index} href="#" className="p-2 rounded-full bg-blue-200 hover:bg-blue-400 transition-colors">
                <Icon className="w-4 h-4 text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-xl font-semibold text-blue-900 mb-5">Company</h4>
          <ul className="space-y-3">
            {COMPANY_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-600 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xl font-semibold text-blue-900 mb-5">Get In Touch</h4>
          <ul className="space-y-3">
            <li>
              <a href="tel:+923039219730" className="hover:text-blue-600 transition-colors">
                +92 303 921 9730
              </a>
            </li>
            <li>
              <a href="mailto:HamzaRashid@gmail.com" className="hover:text-blue-600 transition-colors">
                HamzaRashid@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-200">
        <p className="py-6 text-center text-sm text-blue-900 font-medium">
          © {new Date().getFullYear()} SpeedClothing.com — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
