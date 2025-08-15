import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import AnimatedBackground from '../components/layout/AnimatedBackground';
import ParticleSystem from '../components/layout/ParticleSystem';
import EnhancedCard from '../components/ui/EnhancedCard';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loggedIn, login } = useAuth();
  const navigate = useNavigate();

  if (loggedIn) return <Navigate to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Frontend validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }
    
    try {
      console.log('Sending signup request:', { name: name.trim(), email: email.trim(), password: password.length + ' chars' });
      const res = await api.post('/api/auth/signup', { 
        name: name.trim(), 
        email: email.trim(), 
        password: password 
      });
      console.log('Signup response:', res.data);
      login(res.data.token, res.data.user);
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Home Button - Fixed at top-right of viewport */}
      <Link 
        to="/" 
        className="fixed top-4 right-4 z-50 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
      >
        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="hidden sm:inline">Home</span>
      </Link>

      {/* Brand Name/Logo - Top Left */}
      <div className="fixed top-4 left-4 lg:top-8 lg:left-8 z-50 flex items-center space-x-3 group cursor-pointer">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-glow group-hover:animate-bounce-gentle transition-all duration-300">
          <span className="text-xl lg:text-2xl animate-rotate-slow">🌙</span>
        </div>
        <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
          CraterVision
        </span>
      </div>
      
      <div className="min-h-screen w-full flex items-start justify-center pt-16 sm:pt-20 p-4 sm:p-6 relative overflow-hidden">
        <AnimatedBackground />
        <ParticleSystem />
      
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <EnhancedCard className="p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl animate-pulse-glow">
              <span className="text-2xl sm:text-3xl animate-bounce-gentle">✨</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
              Join the Adventure
            </h2>
            <p className="text-white/70 mt-2 text-sm sm:text-base">Start your lunar crater detection journey</p>
          </div>
          
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-white/80 ml-1" htmlFor="signup-name">Full Name</label>
              <input 
                id="signup-name"
                type="text" 
                placeholder="Enter your full name" 
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-yellow-400/50 text-sm sm:text-base" 
                value={name} 
                onChange={e => setName(e.target.value)}
                required
                aria-describedby="name-error"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-white/80 ml-1" htmlFor="signup-email">Email Address</label>
              <input 
                id="signup-email"
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-yellow-400/50 text-sm sm:text-base" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                required
                aria-describedby="email-error"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-white/80 ml-1" htmlFor="signup-password">Password</label>
              <input 
                id="signup-password"
                type="password" 
                placeholder="Create a password" 
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-yellow-400/50 text-sm sm:text-base" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                required
                aria-describedby="password-error"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none text-sm sm:text-base" 
              disabled={loading}
              aria-describedby="submit-status"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create Account
                </span>
              )}
            </button>
            
            <div id="submit-status" className="sr-only" aria-live="polite">
              {loading ? 'Creating account...' : 'Ready to create account'}
            </div>
          </form>
          
          {error && (
            <div className="mt-4 p-3 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-300 text-center animate-slide-down" role="alert" aria-live="assertive">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-sm sm:text-base">Signup Error</span>
              </div>
              <p className="text-sm sm:text-base">{error}</p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm sm:text-base">
              Already have an account?{' '}
              <Link to="/login" className="text-yellow-400 hover:text-orange-400 font-semibold transition-colors duration-300 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </EnhancedCard>
      </div>
    </div>
    </>
  );
}

export default Signup;
