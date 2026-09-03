import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-prime-dark pt-12 pb-24">
      <div className="bg-white text-black p-8 rounded-lg shadow-xl w-96 border border-gray-300">
        <h2 className="text-3xl font-normal mb-6 text-center text-gray-900">Sign in</h2>
        {error && <div className="text-red-600 mb-4 text-sm font-bold bg-red-100 p-2 border border-red-400">{error}</div>}
        <form onSubmit={handleSubmit}>
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
              className="w-full px-3 py-2 border border-gray-400 rounded focus:border-prime-blue focus:shadow-[0_0_5px_rgba(0,113,186,0.5)] outline-none" 
              value={password} onChange={e => setPassword(e.target.value)} required 
            />
          </div>
          <button className="w-full bg-[#f0c14b] border border-[#a88734] text-gray-900 font-normal py-2 rounded shadow-sm hover:bg-[#ddb347]">
            Sign in
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-600">
          <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
        </div>
        <div className="mt-6 border-t border-gray-300 pt-4 text-center">
          <p className="text-sm text-gray-600 mb-2">New to Amazon?</p>
          <Link to="/register" className="block w-full bg-gray-200 border border-gray-400 text-gray-900 font-normal py-2 rounded shadow-sm hover:bg-gray-300">
            Create your Amazon account
          </Link>
        </div>
      </div>
    </div>
  );
}
