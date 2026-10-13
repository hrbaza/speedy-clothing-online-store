import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { FiArrowRight, FiEye, FiEyeOff, FiShield } from 'react-icons/fi'
import { assets } from '../assets/assets'
import { backendUrl, errorMessage } from '../config'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Errors are derived from the inputs, shown only once the user has typed something
  const emailError = email && !EMAIL_REGEX.test(email) ? 'Please enter a valid email address' : ''
  const passwordError = password && password.length < 8 ? 'Password must be at least 8 characters long' : ''
  const canSubmit = email && password && !emailError && !passwordError

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!canSubmit) return

    setLoading(true)
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/admin`, { email, password })

      if (data.success && data.token) {
        setToken(data.token)
        toast.success('Logged in successfully')
      } else {
        toast.error(data.message || 'Login failed')
      }
    } catch (error) {
      toast.error(errorMessage(error) || 'Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (hasError) =>
    `input py-3.5 ${hasError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15' : ''}`

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative isolate hidden overflow-hidden bg-ink p-14 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 -z-10 bg-grid mask-fade" />
        <div className="absolute -left-20 top-1/3 -z-10 h-96 w-96 rounded-full bg-brand-600/50 blur-[130px]" />
        <img src={assets.logo_light} alt="Speed Clothing" className="w-48" />
        <div>
          <p className="eyebrow text-brand-400"><span className="h-px w-8 bg-current" />Admin panel</p>
          <h2 className="heading mt-4 text-5xl leading-[0.95] xl:text-6xl">
            Run the<br /><span className="text-gradient italic">store.</span>
          </h2>
          <p className="mt-6 max-w-sm text-white/60">Add products, track orders and keep Speed Clothing moving — all from one place.</p>
        </div>
        <p className="text-sm text-white/40">Where Speed Meets Style.</p>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center px-4 py-16 sm:px-8">
        <div className="w-full max-w-md">
          <img src={assets.logo} alt="Speed Clothing" className="mb-10 w-40 lg:hidden" />
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-2xl text-white shadow-glow"><FiShield /></span>
          <h1 className="heading mt-6 text-4xl">Admin login</h1>
          <p className="mt-2 text-ink/60">Sign in with your admin credentials to continue.</p>

          <form onSubmit={onSubmitHandler} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="label">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                autoComplete="username"
                required
                className={inputClass(emailError)}
              />
              {emailError && <p className="mt-1.5 text-sm text-red-600">{emailError}</p>}
            </div>

            <div>
              <label htmlFor="password" className="label">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className={`${inputClass(passwordError)} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-ink/50 hover:bg-ink/5 hover:text-ink"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {passwordError && <p className="mt-1.5 text-sm text-red-600">{passwordError}</p>}
            </div>

            <button type="submit" disabled={!canSubmit || loading} className="btn-primary group w-full py-4">
              {loading ? 'Signing in...' : 'Sign in'}
              {!loading && <FiArrowRight className="transition group-hover:translate-x-1" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
