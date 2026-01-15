import React, { useState } from 'react';
import { useNavigate, Link,useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/login', {
        email,
        password,
        device_name: 'student_web',
      });

      if (response.data.user.role !== 'student') {
        setError('Access denied. This portal is for students only.');
        setLoading(false);
        return;
      }

      login(response.data.user, response.data.token);
        navigate(from, { replace: true });  
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-50 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-6 shadow-lg shadow-indigo-200">
            <span className="text-white text-3xl font-bold italic">L</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-2 font-medium">Continue your learning journey</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium rounded-r-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border-slate-200 border rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-800"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot?</a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border-slate-200 border rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-800"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-200 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In to Portal
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Don't have an account? 
            <Link to="/register" className="ml-1 text-indigo-600 font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}