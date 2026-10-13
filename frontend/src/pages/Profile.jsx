import { useContext, useEffect, useState } from 'react';
import { ShopContext, errorMessage } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const FIELDS = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: '_id', label: 'User ID', className: 'font-mono text-sm' },
];

const Profile = () => {
  const { backendUrl, token, navigate } = useContext(ShopContext);
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

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-8">
        <Title text1={'MY'} text2={'PROFILE'} />
      </div>

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
        <div className="space-y-6">
          {FIELDS.map(({ key, label, className = '' }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <p className={`mt-1 p-3 bg-gray-50 rounded-md ${className}`}>{profile[key] || 'Not available'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
