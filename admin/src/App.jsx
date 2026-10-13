import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { authHeaders, backendUrl } from './config'

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(Boolean(token));

  // Keep localStorage in sync so logout really logs out after a refresh
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Validate a saved token once on startup
  useEffect(() => {
    if (!token) return;

    axios.get(`${backendUrl}/api/user/validate`, { headers: authHeaders(token) })
      .catch(() => setToken(''))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink">
        <span className="h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-brand-500" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer position='bottom-right' theme='dark' />
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <div className='min-h-screen'>
          <Sidebar setToken={setToken} />
          <div className='lg:pl-72'>
            <Navbar setToken={setToken} />
            <main className='mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10'>
              <Routes>
                <Route path="/" element={<Dashboard token={token} />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App
