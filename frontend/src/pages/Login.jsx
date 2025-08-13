import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import AnimatedBackground from '../components/layout/AnimatedBackground';
import ParticleSystem from '../components/layout/ParticleSystem';
import EnhancedCard from '../components/ui/EnhancedCard';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loggedIn, setLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (loggedIn) return <Navigate to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setLoggedIn(true);
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <AnimatedBackground />
      <ParticleSystem />
      
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <EnhancedCard className="p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl animate-pulse-glow">
              <span className="text-2xl sm:text-3xl animate-bounce-gentle">🔐</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Welcome Back
            </h2>
            <p className="text-white/70 mt-2 text-sm sm:text-base">Sign in to continue your lunar exploration</p>
          </div>
          
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-white/80 ml-1" htmlFor="email">Email Address</label>
              <input 
                id="email"
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-purple-400/50 text-sm sm:text-base" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                required
                aria-describedby="email-error"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-white/80 ml-1" htmlFor="password">Password</label>
              <input 
                id="password"
                type="password" 
                placeholder="Enter your password" 
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-purple-400/50 text-sm sm:text-base" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                required
                aria-describedby="password-error"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none text-sm sm:text-base" 
              disabled={loading}
              aria-describedby="submit-status"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </span>
              )}
            </button>
            
            <div id="submit-status" className="sr-only" aria-live="polite">
              {loading ? 'Signing in...' : 'Ready to sign in'}
            </div>
          </form>
          
          {error && (
            <div className="mt-4 p-3 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-300 text-center animate-slide-down" role="alert" aria-live="assertive">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-sm sm:text-base">Login Error</span>
              </div>
              <p className="text-sm sm:text-base">{error}</p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm sm:text-base">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-400 hover:text-pink-400 font-semibold transition-colors duration-300 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </EnhancedCard>
      </div>
    </div>
  );
}

export default Login;
