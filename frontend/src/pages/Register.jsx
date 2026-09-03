import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-prime-dark pt-12 pb-24">
      <div className="bg-white text-black p-8 rounded-lg shadow-xl w-96 border border-gray-300">
        <h2 className="text-3xl font-normal mb-6 text-gray-900">Create account</h2>
        {error && <div className="text-red-600 mb-4 text-sm font-bold bg-red-100 p-2 border border-red-400">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1 text-gray-800">Your name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-400 rounded focus:border-prime-blue focus:shadow-[0_0_5px_rgba(0,113,186,0.5)] outline-none" 
              value={name} onChange={e => setName(e.target.value)} required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1 text-gray-800">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-400 rounded focus:border-prime-blue focus:shadow-[0_0_5px_rgba(0,113,186,0.5)] outline-none" 
              value={email} onChange={e => setEmail(e.target.value)} required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-1 text-gray-800">Password</label>
            <input 
              type="password" 
              placeholder="At least 6 characters"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:border-prime-blue focus:shadow-[0_0_5px_rgba(0,113,186,0.5)] outline-none" 
              value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
            />
          </div>
          <button className="w-full bg-[#f0c14b] border border-[#a88734] text-gray-900 font-normal py-2 rounded shadow-sm hover:bg-[#ddb347]">
            Create your Amazon account
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-600">
          <p>By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
        </div>
        <div className="mt-6 border-t border-gray-300 pt-4">
          <p className="text-sm text-gray-800">
            Already have an account? <Link to="/login" className="text-blue-600 hover:text-red-700 hover:underline">Sign in ⯈</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
