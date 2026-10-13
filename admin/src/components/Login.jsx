import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
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
    `w-full px-4 py-3 border ${hasError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Admin Login
        </h1>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className={inputClass(emailError)}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`${inputClass(passwordError)} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className={`w-full ${
              canSubmit && !loading
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90'
                : 'bg-gray-400 cursor-not-allowed'
            } text-white py-3 rounded-lg font-semibold transition-opacity`}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
