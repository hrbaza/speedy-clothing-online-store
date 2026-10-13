import { toast } from 'react-toastify'
import { FiSend } from 'react-icons/fi'

const NewsletterBox = () => {

  // Frontend-only for now: no newsletter API exists on the backend yet
  const onSubmitHandler = (event) => {
    event.preventDefault();
    toast.success('Thanks for subscribing!');
    event.target.reset();
  }

  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-950 px-6 py-14 text-center text-white sm:px-12 sm:py-20">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40 mask-fade" />
      <div className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-sky-400/30 blur-[90px]" />
      <span className="heading pointer-events-none absolute -bottom-10 left-1/2 -z-10 -translate-x-1/2 select-none whitespace-nowrap text-[8rem] leading-none text-white/[0.06] sm:text-[12rem]">SPEED</span>

      <p className="eyebrow text-white/70"><span className="h-px w-8 bg-current" />Newsletter<span className="h-px w-8 bg-current" /></p>
      <h2 className="heading mx-auto mt-4 max-w-2xl text-3xl leading-tight sm:text-5xl">Subscribe & get 20% off</h2>
      <p className="mx-auto mt-4 max-w-xl text-white/70">
        Be the first to know about exclusive offers, new collections, and insider sales.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="mx-auto mt-10 flex w-full max-w-xl flex-col gap-3 rounded-full sm:flex-row sm:bg-white/10 sm:p-2 sm:backdrop-blur"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="flex-1 rounded-full bg-white/10 px-6 py-4 text-sm text-white outline-none placeholder:text-white/50 focus:bg-white/15 sm:bg-transparent"
        />
        <button type="submit" className="btn bg-white text-ink hover:bg-ink hover:text-white">
          Subscribe <FiSend />
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox
