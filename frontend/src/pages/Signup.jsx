import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../api';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  // Request OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

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
      await api.post('/api/auth/signup/request-otp', { 
        name: name.trim(), 
        email: email.trim(), 
        password 
      });

      setOtpSent(true);
      setCountdown(300); // 5 minutes
      showToast('OTP sent to your email!', 'success');

      // Countdown timer
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to send OTP.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/api/auth/signup/verify-otp', { email, otp });
      
      // Use AuthContext login function to update auth state
      login(res.data.token, res.data.user);
      
      showToast('Signup successful!', 'success');
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (err) {
      const msg = err.response?.data?.message || 'OTP verification failed.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen w-full flex items-start justify-center pt-8 sm:pt-12 p-4 sm:p-6">
      {/* Home Button */}
      <Link 
        to="/" 
        className="absolute top-4 right-4 z-10 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        title="Go to Home"
      >
        <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </Link>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="p-6 sm:p-8 bg-white/10 rounded-2xl backdrop-blur-lg border border-white/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              🌙
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {otpSent ? 'Verify Email' : 'Join CraterVision'}
            </h2>
            <p className="text-white/70 mt-2">
              {otpSent ? 'Enter the verification code sent to your email' : 'Create your crater detection account'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-center">
              {error}
            </div>
          )}

          {!otpSent ? (
            // Step 1: Request OTP Form
            <form onSubmit={handleRequestOTP} className="space-y-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50"
                  placeholder="Create a password (min. 6 characters)"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Sending OTP...' : 'Send Verification Code'}
              </button>
            </form>
          ) : (
            // Step 2: Verify OTP Form
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="text-center">
                <p className="text-white/70">Verification code sent to <strong>{email}</strong></p>
                {countdown > 0 && (
                  <p className="text-green-400 text-xs mt-1">
                    Code expires in {formatTime(countdown)}
                  </p>
                )}
              </div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-center text-white text-2xl tracking-widest placeholder:text-white/50"
                placeholder="000000"
                maxLength="6"
                required
              />
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Creating Account...' : 'Verify & Create Account'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp('');
                  setError('');
                  setCountdown(0);
                }}
                className="w-full py-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                ← Back to Registration
              </button>
            </form>
          )}

          <div className="text-center mt-6">
            <p className="text-white/60">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Signup };
