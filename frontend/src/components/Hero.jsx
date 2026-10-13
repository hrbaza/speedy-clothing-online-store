import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import { assets } from '../assets/assets';

const PERKS = [
  { icon: FiTruck, text: 'Cash on delivery' },
  { icon: FiRefreshCw, text: '7-day easy returns' },
  { icon: FiShield, text: 'Secure checkout' },
];

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {/* background: grid, glows and speed streaks */}
      <div className="absolute inset-0 -z-10 bg-grid mask-fade" />
      <div className="absolute -top-40 right-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-brand-600/50 blur-[140px]" />
      <div className="absolute -bottom-40 -left-20 -z-10 h-[26rem] w-[26rem] rounded-full bg-sky-500/20 blur-[120px]" />
      <div className="absolute left-0 top-24 -z-10 hidden flex-col gap-3 lg:flex">
        {[220, 140, 180].map((w, i) => (
          <span key={i} className="h-2 -skew-x-[30deg] rounded-sm bg-gradient-to-l from-transparent to-brand-600/60" style={{ width: w }} />
        ))}
      </div>

      <div className="container-x grid min-h-[calc(100vh-7.25rem)] items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-10">

        {/* Text */}
        <div className="animate-fade-up text-center lg:text-left">
          <span className="inline-flex -skew-x-12 items-center gap-2 rounded-md border border-brand-500/40 bg-brand-600/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-300">
            <span className="inline-flex skew-x-12 items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              Speed Exclusive Drop
            </span>
          </span>

          <h1 className="heading mt-7 text-5xl leading-[0.95] sm:text-7xl xl:text-8xl">
            Wear The
            <br />
            <span className="text-gradient italic">Speed.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-lg text-lg text-white/60 lg:mx-0">
            Premium men&apos;s T-shirts built for comfort and made to move.
            Bold designs, soft cotton, and a fit that keeps up with you.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link to="/collection" className="btn-primary group">
              Shop Now <FiArrowRight className="transition group-hover:translate-x-1" />
            </Link>
            <Link to="/about" className="btn-ghost-light">
              Our Story
            </Link>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-sm text-white/70 lg:justify-start">
            {PERKS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-brand-300"><Icon /></span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none">
          <div className="absolute aspect-square w-[85%] rounded-full bg-gradient-to-br from-brand-500 to-brand-800 opacity-90 shadow-glow" />
          <div className="absolute aspect-square w-[105%] animate-spin-slow rounded-full border border-dashed border-white/15" />
          <span className="heading pointer-events-none absolute select-none text-[9rem] leading-none text-white/[0.07] sm:text-[12rem]">SC</span>

          <img
            src={assets.hero_tee}
            alt="Speed Clothing T-shirt"
            className="relative w-[78%] animate-float drop-shadow-[0_40px_40px_rgba(0,0,0,0.5)]"
          />

          <div className="absolute bottom-6 left-0 hidden rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl sm:block">
            <p className="text-xs uppercase tracking-widest text-white/50">New arrival</p>
            <p className="heading mt-1 text-lg">Midnight Tee</p>
          </div>
          <div className="absolute right-0 top-10 hidden -skew-x-12 rounded-xl bg-white px-5 py-3 text-ink shadow-glow sm:block">
            <p className="skew-x-12 font-display text-2xl font-black italic">-50%</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
