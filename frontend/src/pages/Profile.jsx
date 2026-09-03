import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, token, login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/auth/profile', { name, email }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profile updated successfully');
      // Update context
      login(token, { ...user, name, email });
    } catch (err) {
      setMessage('Failed to update profile');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-prime-dark pt-12 px-8">
      <div className="max-w-2xl mx-auto bg-prime-nav p-8 rounded shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-white">Your Profile</h2>
        {message && <div className="mb-4 p-3 bg-blue-900/50 text-blue-200 border border-blue-500 rounded">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-prime-blue outline-none" 
              value={name} onChange={e => setName(e.target.value)} required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 font-bold mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:border-prime-blue outline-none" 
              value={email} onChange={e => setEmail(e.target.value)} required 
            />
          </div>
          <button className="bg-prime-blue text-white px-6 py-2 rounded font-bold hover:bg-prime-hover">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
