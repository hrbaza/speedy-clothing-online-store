export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
export const currency = '$'

export const authHeaders = (token) => ({ Authorization: `Bearer ${token}` })

// Best error message available from an axios error
export const errorMessage = (error) => error.response?.data?.message || error.message
