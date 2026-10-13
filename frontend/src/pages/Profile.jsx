import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiLogOut, FiMail, FiUser, FiHash } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext, errorMessage } from '../context/ShopContext';
import PageHeader from '../components/PageHeader';

const FIELDS = [
  { key: 'name', label: 'Full name', icon: FiUser },
  { key: 'email', label: 'Email', icon: FiMail },
  { key: '_id', label: 'Customer ID', icon: FiHash, mono: true },
];

const Profile = () => {
  const { backendUrl, token, navigate, setToken } = useContext(ShopContext);
  const [profile, setProfile] = useState({ name: '', email: '', _id: '' });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(`${backendUrl}/api/user/profile`, { headers: { token } })
      .then(({ data }) => {
        if (data.success) {
          setProfile(data.user);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => toast.error(errorMessage(error) || 'Error loading profile'));
  }, [token]);

  const logout = () => {
    setToken('');
    navigate('/login');
  };

  const initial = profile.name ? profile.name.trim()[0].toUpperCase() : '?';

  return (
    <>
      <PageHeader eyebrow='Account' title='My' highlight='Profile' crumb='Profile' />

      <div className='container-x grid gap-8 py-12 lg:grid-cols-[320px_1fr] lg:py-16'>
        <aside className='card relative overflow-hidden p-8 text-center lg:self-start'>
          <div className='absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-brand-600 to-brand-800' />
          <div className='relative mx-auto mt-6 grid h-24 w-24 place-items-center rounded-full bg-ink font-display text-4xl font-black text-white ring-8 ring-white'>
            {initial}
          </div>
          <h2 className='heading mt-5 text-2xl'>{profile.name || 'Loading...'}</h2>
          <p className='mt-1 text-sm text-ink/50'>{profile.email}</p>
          <button onClick={logout} className='btn-outline mt-8 w-full'>
            <FiLogOut /> Logout
          </button>
        </aside>

        <div className='space-y-6'>
          <section className='card p-6 sm:p-8'>
            <h3 className='heading text-xl'>Account details</h3>
            <dl className='mt-6 divide-y divide-ink/5'>
              {FIELDS.map(({ key, label, icon: Icon, mono }) => (
                <div key={key} className='flex items-center gap-4 py-4'>
                  <span className='grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600'><Icon /></span>
                  <div className='min-w-0'>
                    <dt className='text-xs font-semibold uppercase tracking-wider text-ink/40'>{label}</dt>
                    <dd className={`mt-0.5 truncate ${mono ? 'font-mono text-sm' : 'font-medium'}`}>{profile[key] || 'Not available'}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </section>

          <div className='grid gap-4 sm:grid-cols-2'>
            <Link to='/orders' className='card group flex items-center gap-4 p-6 transition hover:-translate-y-1 hover:bg-ink hover:text-white'>
              <span className='grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-xl text-white'><FiPackage /></span>
              <span>
                <span className='block font-semibold'>My orders</span>
                <span className='text-sm text-ink/50 group-hover:text-white/60'>Track and view past orders</span>
              </span>
            </Link>
            <Link to='/cart' className='card group flex items-center gap-4 p-6 transition hover:-translate-y-1 hover:bg-ink hover:text-white'>
              <span className='grid h-12 w-12 place-items-center rounded-2xl bg-ink text-xl text-white group-hover:bg-brand-600'><FiShoppingBag /></span>
              <span>
                <span className='block font-semibold'>My cart</span>
                <span className='text-sm text-ink/50 group-hover:text-white/60'>Pick up where you left off</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
