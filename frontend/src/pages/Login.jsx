import { useContext, useEffect, useState } from 'react'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const BENEFITS = ['Track your orders in one place', 'Your cart saved on every device', 'Early access to new drops']

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const [isLoading, setIsLoading] = useState(false)
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const isLogin = currentState === 'Login'

  const validateForm = () => {
    const newErrors = {}
    if (!isLogin && !name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required'
    } else if (!isLogin && password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const url = `${backendUrl}/api/user/${isLogin ? 'login' : 'register'}`
      const payload = isLogin ? { email, password } : { name, email, password }
      const { data } = await axios.post(url, payload)

      if (data.success) {
        setToken(data.token)
        toast.success(isLogin ? 'Welcome back!' : 'Account created. Welcome!')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const switchMode = (mode) => {
    setCurrentState(mode)
    setName('')
    setPassword('')
    setErrors({})
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  const fields = [
    !isLogin && { id: 'name', label: 'Full name', type: 'text', value: name, set: setName, autoComplete: 'name', placeholder: 'Your name' },
    { id: 'email', label: 'Email address', type: 'email', value: email, set: setEmail, autoComplete: 'email', placeholder: 'you@example.com' },
    { id: 'password', label: 'Password', type: 'password', value: password, set: setPassword, autoComplete: isLogin ? 'current-password' : 'new-password', placeholder: isLogin ? 'Your password' : 'At least 8 characters' },
  ].filter(Boolean)

  return (
    <div className="grid min-h-[calc(100vh-7.25rem)] lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative isolate hidden overflow-hidden bg-ink p-14 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 -z-10 bg-grid mask-fade" />
        <div className="absolute -left-20 top-1/3 -z-10 h-96 w-96 rounded-full bg-brand-600/50 blur-[130px]" />
        <img src={assets.logo_light} alt="Speed Clothing" className="w-48" />
        <div>
          <h2 className="heading text-5xl leading-[0.95] xl:text-6xl">
            Join the<br /><span className="text-gradient italic">fast lane.</span>
          </h2>
          <ul className="mt-10 space-y-4 text-white/70">
            {BENEFITS.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-600 text-xs text-white"><FiCheck /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-white/40">Where Speed Meets Style.</p>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center bg-ink/[0.02] px-4 py-16 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex rounded-full border border-ink/10 bg-white p-1">
            {['Login', 'Sign Up'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => switchMode(mode)}
                className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition ${currentState === mode ? 'bg-ink text-white shadow-soft' : 'text-ink/60 hover:text-ink'}`}
              >
                {mode}
              </button>
            ))}
          </div>

          <h1 className="heading text-4xl">{isLogin ? 'Welcome back' : 'Create account'}</h1>
          <p className="mt-2 text-ink/60">
            {isLogin ? 'Sign in to your Speed Clothing account.' : 'Join the Speed Clothing community.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            {fields.map(({ id, label, type, value, set, autoComplete, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="label">{label}</label>
                <input
                  id={id}
                  type={type}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  autoComplete={autoComplete}
                  placeholder={placeholder}
                  className={`input py-3.5 ${errors[id] ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15' : ''}`}
                />
                {errors[id] && <p className="mt-1.5 text-sm text-red-600">{errors[id]}</p>}
              </div>
            ))}

            <button type="submit" disabled={isLoading} className="btn-primary group w-full py-4">
              {isLoading ? 'Please wait...' : isLogin ? 'Sign in' : 'Create account'}
              {!isLoading && <FiArrowRight className="transition group-hover:translate-x-1" />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-ink/60">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button type="button" onClick={() => switchMode(isLogin ? 'Sign Up' : 'Login')} className="font-semibold text-brand-600 hover:underline">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
