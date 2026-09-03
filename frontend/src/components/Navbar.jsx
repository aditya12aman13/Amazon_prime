import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Search, UserCircle, LayoutGrid } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-prime-nav text-white px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold text-white tracking-tight hover:text-prime-hover">prime video</Link>
        <div className="hidden md:flex gap-4 text-sm font-medium">
          <Link to="/" className="hover:text-prime-hover">Home</Link>
          <Link to="/" className="hover:text-prime-hover">Free to me</Link>
          <Link to="/" className="hover:text-prime-hover">Movies</Link>
          <Link to="/" className="hover:text-prime-hover">TV shows</Link>
          <Link to="/" className="hover:text-prime-hover">Live TV</Link>
          <span className="border-l border-gray-600 pl-4 flex items-center gap-1 hover:text-prime-hover cursor-pointer">
            <LayoutGrid size={16} /> Subscriptions
          </span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Search className="w-5 h-5 cursor-pointer hover:text-prime-hover" />
        <div className="flex items-center gap-1 text-sm cursor-pointer hover:text-prime-hover">
          EN <span>▼</span>
        </div>
        <div className="group relative">
          <UserCircle className="w-8 h-8 cursor-pointer text-gray-300 hover:text-white" />
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg hidden group-hover:block z-50">
            {user ? (
              <div className="py-2">
                <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">Hi, {user.name}</div>
                <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-700">Profile</Link>
                {user.isAdmin && <Link to="/admin" className="block px-4 py-2 text-sm text-prime-blue hover:bg-gray-700">Admin Dashboard</Link>}
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700">Sign Out</button>
              </div>
            ) : (
              <div className="py-2">
                <Link to="/login" className="block px-4 py-2 text-sm hover:bg-gray-700">Sign In</Link>
              </div>
            )}
          </div>
        </div>
        {!user && (
          <Link to="/register" className="bg-prime-blue text-white px-4 py-2 rounded font-medium hover:bg-prime-hover text-sm">
            Join Prime
          </Link>
        )}
      </div>
    </nav>
  );
}
