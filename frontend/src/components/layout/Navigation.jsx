import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MobileMenu from './MobileMenu';

// Enhanced Navigation Component with mobile support
function Navigation() {
  const { loggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleMobileLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const handleDropdownLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };
  
  return (
    <>
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={handleMobileLogout}
      />
      
      <nav className="relative z-10 w-full flex justify-between items-center p-4 lg:p-8">
        {/* Logo */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-glow group-hover:animate-bounce-gentle transition-all duration-300">
            <span className="text-xl lg:text-2xl animate-rotate-slow">🌙</span>
          </div>
          <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            CraterVision
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          {loggedIn ? (
            <div className="flex items-center gap-4">
              {location.pathname !== '/dashboard' && (
                <Link 
                  to="/dashboard" 
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  Dashboard
                </Link>
              )}
              {location.pathname !== '/history' && (
                <Link 
                  to="/history" 
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  History
                </Link>
              )}
              
              {/* Profile Dropdown - Hybrid Positioning */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                  title="Profile"
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
                </button>
              </div>
              
              {/* Dropdown with fixed positioning but calculated position */}
              {profileOpen && (
                <div 
                  className="fixed w-64 bg-white rounded-xl shadow-xl p-4 border"
                  style={{ 
                    zIndex: 99999,
                    position: 'fixed',
                    top: '80px',
                    right: '32px'
                  }}
                >
                  <div className="text-center mb-3">
                    <p className="text-gray-900 font-semibold">{user?.name || 'User'}</p>
                    <p className="text-gray-600 text-sm">{user?.email || 'No email'}</p>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDropdownLogout();
                    }}
                    className="w-full text-center py-3 bg-red-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-red-600 transition-colors"
                    style={{ 
                      pointerEvents: 'auto',
                      border: 'none',
                      outline: 'none'
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            location.pathname !== '/login' && (
              <Link 
                to="/login" 
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                Login / Sign Up
              </Link>
            )
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </>
  );
}

export default Navigation;
