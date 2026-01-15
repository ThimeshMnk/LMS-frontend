// src/components/layout/Navbar.tsx
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export default function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
              <span className="text-white font-bold text-xl italic">L</span>
            </div>
            <span className="text-xl font-bold tracking-tighter text-slate-800">
              LMS ACADEMY
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-gray-600">
          <button className="hover:text-indigo-600 transition-colors">
            <Heart className="w-6 h-6" />
          </button>
          <button className="hover:text-indigo-600 transition-colors">
            <ShoppingCart className="w-6 h-6" />
          </button>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout} // Use the new handleLogout function
                className="text-xs font-bold text-red-500 hover:text-red-600 uppercase transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:text-indigo-600 flex items-center gap-2 transition-colors"
            >
              <User className="w-6 h-6" />
              <span className="text-sm font-bold hidden lg:block uppercase tracking-wide">
                Sign In
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
