import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin, FiArrowUp } from 'react-icons/fi';
import { assets } from '../assets/assets';

const SOCIAL_ICONS = [FaFacebookF, FaTwitter, FaInstagram];

const LINK_GROUPS = [
  {
    title: 'Shop',
    links: [
      { to: '/collection', label: 'All Products' },
      { to: '/collection?category=Men', label: 'Men' },
      { to: '/collection?category=Women', label: 'Women' },
      { to: '/collection?category=Kids', label: 'Kids' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/contact', label: 'Contact' },
      { to: '/orders', label: 'Track Order' },
      { to: '/cart', label: 'Cart' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
      <div className="absolute -bottom-40 right-0 -z-10 h-96 w-96 rounded-full bg-brand-600/25 blur-[140px]" />

      <div className="container-x grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
        {/* Brand */}
        <div>
          <img src={assets.logo_light} className="w-48" alt="Speed Clothing" />
          <p className="mt-6 max-w-xs leading-relaxed text-white/60">
            Where Speed Meets Style — your ultimate T-shirt destination.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIAL_ICONS.map((Icon, index) => (
              <a key={index} href="#" aria-label="Social link" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:-translate-y-1 hover:border-brand-600 hover:bg-brand-600 hover:text-white">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {LINK_GROUPS.map(({ title, links }) => (
          <div key={title}>
            <h4 className="heading text-sm tracking-widest text-white/40">{title}</h4>
            <ul className="mt-6 space-y-3">
              {links.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-white/75 transition hover:pl-1 hover:text-white">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h4 className="heading text-sm tracking-widest text-white/40">Get in touch</h4>
          <ul className="mt-6 space-y-4 text-white/75">
            <li>
              <a href="tel:+923039219730" className="flex items-center gap-3 transition hover:text-white">
                <FiPhone className="text-brand-400" /> +92 303 921 9730
              </a>
            </li>
            <li>
              <a href="mailto:HamzaRashid@gmail.com" className="flex items-center gap-3 transition hover:text-white">
                <FiMail className="text-brand-400" /> HamzaRashid@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FiMapPin className="mt-1 shrink-0 text-brand-400" /> Satellite Town, Bahawalpur
            </li>
          </ul>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="container-x overflow-hidden">
        <p className="heading select-none whitespace-nowrap text-center text-[17vw] leading-[0.8] text-white/[0.04] lg:text-[12rem]">SPEED</p>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} SpeedClothing.com — All Rights Reserved</p>
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-white px-2 py-1"><img src={assets.stripe_logo} alt="Stripe" className="h-4" /></span>
            <span className="rounded-md border border-white/15 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-white/70">COD</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="ml-2 grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-white transition hover:-translate-y-1"
              aria-label="Back to top"
            >
              <FiArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
