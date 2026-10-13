import { toast } from 'react-toastify'

const NewsletterBox = () => {

  // Frontend-only for now: no newsletter API exists on the backend yet
  const onSubmitHandler = (event) => {
    event.preventDefault();
    toast.success('Thanks for subscribing!');
    event.target.reset();
  }

  return (
    <div className="text-center px-4 py-10 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Subscribe Now & Get 20% Off</h2>
      <p className="text-gray-500 mb-6 max-w-xl mx-auto text-sm sm:text-base">
        Be the first to know about exclusive offers, new collections, and insider sales.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-4 px-2 sm:px-0"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary transition"
        />
        <button
          type="submit"
          className="bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox
