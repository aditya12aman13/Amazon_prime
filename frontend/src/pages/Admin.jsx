import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit } from 'lucide-react';

export default function Admin() {
  const { user, token } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', thumbnailUrl: '', category: '', rating: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isSuperuser) {
      navigate('/');
    }
    fetchMovies();
  }, [user, navigate]);

  const fetchMovies = async () => {
    const res = await axios.get('http://localhost:5000/api/movies');
    setMovies(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/movies', formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setFormData({ title: '', description: '', thumbnailUrl: '', category: '', rating: '' });
    fetchMovies();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchMovies();
  };

  if (!user || !user.isSuperuser) return null;

  return (
    <div className="min-h-screen bg-prime-dark pt-12 px-8 pb-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white border-b border-gray-700 pb-4">Admin Dashboard</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-prime-nav p-6 rounded shadow-lg lg:col-span-1 h-fit">
            <h3 className="text-xl font-bold mb-4 text-prime-blue">Add New Movie</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder="Title" className="p-2 bg-gray-800 rounded border border-gray-700" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              <textarea placeholder="Description" className="p-2 bg-gray-800 rounded border border-gray-700 h-24" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required></textarea>
              <input type="text" placeholder="Thumbnail URL" className="p-2 bg-gray-800 rounded border border-gray-700" value={formData.thumbnailUrl} onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})} required />
              <input type="text" placeholder="Category (e.g., Top 10 with Prime)" className="p-2 bg-gray-800 rounded border border-gray-700" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
              <input type="text" placeholder="Rating (e.g., U/A 16+)" className="p-2 bg-gray-800 rounded border border-gray-700" value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})} required />
              <button className="bg-prime-blue text-white font-bold py-2 rounded hover:bg-prime-hover mt-2">Add Movie</button>
            </form>
          </div>
          
          <div className="bg-prime-nav p-6 rounded shadow-lg lg:col-span-2 overflow-x-auto">
            <h3 className="text-xl font-bold mb-4 text-prime-blue">Manage Movies</h3>
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-800 text-gray-400">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map(movie => (
                  <tr key={movie.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                    <td className="p-3 font-medium">{movie.title}</td>
                    <td className="p-3">{movie.category}</td>
                    <td className="p-3">
                      <span className="bg-yellow-600 text-black px-2 py-1 rounded text-xs font-bold">{movie.rating}</span>
                    </td>
                    <td className="p-3 flex gap-3">
                      <button className="text-gray-400 hover:text-white"><Edit size={18} /></button>
                      <button className="text-red-400 hover:text-red-500" onClick={() => handleDelete(movie.id)}><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
