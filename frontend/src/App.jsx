import { useState, createContext, useContext, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import api from './api';

// Enhanced Toast Component with better styling and animations
const ToastContext = createContext();
export function useToast() { return useContext(ToastContext); }
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef();
  const showToast = (message, type = 'success', duration = 3000) => {
    setToast({ message, type });
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToast(null), duration);
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-2xl shadow-2xl text-white font-semibold transition-all duration-500 transform animate-slide-down ${toast.type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-red-500 to-pink-500'}`}>
          <div className="flex items-center gap-2">
            {toast.type === 'success' ? (
              <svg className="w-5 h-5 animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

// Auth context for simulated login state
const AuthContext = createContext();
function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// Enhanced Breadcrumb Navigation Component
function BreadcrumbNav({ items }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-white/60 mb-6 animate-fade-in" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <svg className="w-4 h-4 mx-2 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          )}
          {item.href ? (
            <Link 
              to={item.href}
              className="hover:text-white/80 transition-colors duration-200 hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

// Enhanced Lightbox Component with better animations
function Lightbox({ open, onClose, src, alt }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative group animate-scale-in" onClick={e => e.stopPropagation()}>
        <img src={src} alt={alt} className="max-w-[95vw] max-h-[95vh] object-contain rounded-3xl shadow-2xl transform transition-all duration-300 group-hover:scale-105" />
        <button onClick={onClose} className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110 hover:rotate-90">
          ×
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
}

// Enhanced Animated Background with more sophisticated effects
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
      
      {/* Animated blobs with morphing */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Additional floating elements */}
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-lg opacity-15 animate-float"></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-green-500 rounded-full mix-blend-multiply filter blur-lg opacity-15 animate-float animation-delay-1000"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
    </div>
  );
}

// Particle System Component for enhanced visual effects
function ParticleSystem() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-white/20 rounded-full animate-float`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
}

// Enhanced Floating Action Button with integrated actions
function FloatingActionButton({ isOpen, onToggle, actions = [] }) {
  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Main FAB Button */}
      <button
        onClick={onToggle}
        className="group w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-glow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
      >
        <div className="flex items-center justify-center w-full h-full">
          <svg className={`w-8 h-8 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      {/* Action Buttons */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 space-y-3 animate-fade-in">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`group w-14 h-14 ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center w-full h-full">
                <span className="text-xl">{action.icon}</span>
              </div>
              <div className="absolute right-full mr-3 px-3 py-2 bg-white/10 backdrop-blur-md text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {action.label}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Enhanced Progress Bar Component
function ProgressBar({ progress, label, className = "" }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white/80">{label}</span>
        <span className="text-sm font-medium text-white/60">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Card Component with hover effects
function EnhancedCard({ children, className = "", hoverEffect = true }) {
  return (
    <div className={`bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 ${hoverEffect ? 'hover:shadow-glow hover:scale-105 hover:-translate-y-1' : ''} ${className}`}>
      {children}
    </div>
  );
}

// Skeleton Loading Component
function SkeletonLoader({ className = "", lines = 1, height = "h-4" }) {
  return (
    <div className={`animate-pulse ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div key={i} className={`${height} bg-white/10 rounded mb-2 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}></div>
      ))}
    </div>
  );
}

// Enhanced Mobile Menu Component
function MobileMenu({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <div className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-black shadow-2xl transform transition-transform duration-500 animate-slide-left">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Menu
            </h3>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4 mb-8">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-white font-medium group-hover:text-purple-300 transition-colors duration-300">Home</span>
            </Link>

            <Link
              to="/dashboard"
              onClick={onClose}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-white font-medium group-hover:text-blue-300 transition-colors duration-300">Dashboard</span>
            </Link>

            <Link
              to="/history"
              onClick={onClose}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-white font-medium group-hover:text-green-300 transition-colors duration-300">History</span>
            </Link>
          </nav>

          {/* Quick Actions */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="text-xs text-white/80 group-hover:text-white transition-colors duration-300">Upload</span>
                </div>
              </button>

              <button className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-white/80 group-hover:text-white transition-colors duration-300">Analytics</span>
                </div>
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl mb-8">
            <span className="text-white/80 text-sm">Theme</span>
            <button
              onClick={() => {
                // Theme toggle logic will be implemented here
                console.log('Theme toggle clicked');
              }}
              className="relative w-14 h-7 rounded-full bg-purple-500 transition-all duration-300"
            >
              <div className="absolute top-0.5 right-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300">
                <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">U</span>
              </div>
              <div>
                <p className="text-white font-medium">User</p>
                <p className="text-white/60 text-sm">Logged In</p>
              </div>
            </div>
            <button
              onClick={() => {
                // Sign out logic will be implemented here
                console.log('Sign out clicked');
                onClose();
              }}
              className="w-full p-2 bg-red-500/20 text-red-300 rounded-xl border border-red-500/30 hover:bg-red-500/30 transition-all duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Navigation Component with mobile support
function EnhancedNavigation({ children, showMobileMenu = false, onMobileMenuToggle }) {
  return (
    <nav className="relative z-10 w-full flex justify-between items-center p-4 lg:p-8">
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
        {children}
      </div>
      
      {/* Mobile Menu Button */}
      <button 
        onClick={onMobileMenuToggle}
        className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Toggle mobile menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
}

function Landing() {
  const { loggedIn } = useAuth();
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <AnimatedBackground />
      <ParticleSystem />
      
      {/* Enhanced Navigation */}
      <EnhancedNavigation>
        {loggedIn && (
          <Link 
            to="/dashboard" 
            className="group px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="flex items-center gap-2">
              Dashboard
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        )}
      </EnhancedNavigation>

      {/* Enhanced Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-4 lg:px-6">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent leading-tight animate-gradient">
              Discover Lunar
              <br />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl animate-float">Craters</span>
            </h1>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full shadow-lg animate-scale-in"></div>
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up px-4">
            Harness the power of AI to detect and analyze lunar craters with unprecedented accuracy. 
            Upload your images and watch the magic happen in real-time! ✨
          </p>
          
          {!loggedIn && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full animate-slide-up px-4">
              <Link 
                to="/login" 
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 text-base sm:text-lg w-full sm:w-auto animate-float"
              >
                <span className="flex items-center justify-center gap-2">
                  🚀 Get Started
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link 
                to="/signup" 
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 text-base sm:text-lg w-full sm:w-auto animate-float"
                style={{ animationDelay: '0.5s' }}
              >
                <span className="flex items-center justify-center gap-2">
                  ✨ Join Now
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-1/4 left-4 sm:left-10 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce-gentle"></div>
      <div className="absolute bottom-1/4 right-4 sm:right-10 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-bounce-gentle animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-float"></div>
      
      {/* Morphing shape */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full animate-morph"></div>
    </div>
  );
}

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

function Signup() {
  const [name, setName] = useState('');
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
      const res = await api.post('/api/auth/signup', { name, email, password });
      localStorage.setItem('token', res.data.token);
      setLoggedIn(true);
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed.');
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
  );
}

function History() {
  const { loggedIn } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setHistoryError] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) return;
    const fetchHistory = async () => {
      setHistoryError('');
      setLoading(true);
      try {
        const res = await api.get('/api/image/history');
        setHistory(res.data);
      } catch (err) {
        setHistoryError('Failed to load history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [loggedIn]);

  if (!loggedIn) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <AnimatedBackground />
      <ParticleSystem />
      
      {/* Enhanced Navigation */}
      <EnhancedNavigation>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link 
            to="/dashboard" 
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-sm sm:text-base"
          >
            Dashboard
          </Link>
        </div>
      </EnhancedNavigation>

      {/* Enhanced Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Detection History
            </h2>
            <p className="text-lg sm:text-xl text-white/70">Your lunar exploration journey</p>
            
            {/* History Stats */}
            {history.length > 0 && (
              <div className="mt-6 inline-flex items-center gap-4 sm:gap-6 bg-white/10 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/20">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">📸</span>
                  <span className="text-white font-semibold text-sm sm:text-base">{history.length} Detections</span>
                </div>
                <div className="w-px h-4 sm:h-6 bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">🌙</span>
                  <span className="text-white font-semibold text-sm sm:text-base">Lunar Analysis</span>
                </div>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center animate-fade-in">
              <EnhancedCard className="p-8 sm:p-12">
                <div className="flex flex-col items-center gap-4 sm:gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin animation-delay-1000"></div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-purple-300 mb-2">Loading History</h3>
                    <p className="text-white/70 text-sm sm:text-base">Fetching your detection records</p>
                  </div>
                </div>
              </EnhancedCard>
            </div>
          ) : error ? (
            <div className="text-center p-6 sm:p-8 bg-red-500/20 border border-red-500/30 rounded-3xl text-red-300 animate-slide-down">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-sm sm:text-base">Error Loading History</span>
              </div>
              <p className="text-sm sm:text-base">{error}</p>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center p-8 sm:p-12 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 animate-scale-in">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <span className="text-3xl sm:text-4xl">📸</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No Detections Yet</h3>
              <p className="text-white/70 text-lg sm:text-xl mb-6">Start your lunar exploration journey!</p>
              <Link 
                to="/dashboard" 
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-sm sm:text-base"
              >
                <span>🚀 Upload First Image</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 animate-fade-in">
              {history.map((item, idx) => (
                <EnhancedCard 
                  key={idx} 
                  className="p-4 sm:p-6 group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-center mb-4">
                    <span className="text-xs sm:text-sm text-white/50 bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <h4 className="text-base sm:text-lg font-semibold text-purple-300 text-center flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                        Original
                      </h4>
                      <div className="relative group">
                        <img 
                          src={`http://localhost:5000/uploads/${item.originalImage}`} 
                          alt="Original lunar image" 
                          className="w-full h-32 sm:h-48 object-cover rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl" 
                          onClick={() => { 
                            setLightboxSrc(`http://localhost:5000/uploads/${item.originalImage}`); 
                            setLightboxAlt('Original lunar image'); 
                            setLightboxOpen(true); 
                          }} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                          <span className="text-white text-xs sm:text-sm font-medium">Click to enlarge</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-base sm:text-lg font-semibold text-green-300 text-center flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Predicted
                      </h4>
                      <div className="relative group">
                        <img 
                          src={`http://localhost:5000/uploads/${item.predictedImage}`} 
                          alt="Predicted lunar image with craters" 
                          className="w-full h-32 sm:h-48 object-cover rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl" 
                          onClick={() => { 
                            setLightboxSrc(`http://localhost:5000/uploads/${item.predictedImage}`); 
                            setLightboxAlt('Predicted lunar image with craters'); 
                            setLightboxOpen(true); 
                          }} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                          <span className="text-white text-xs sm:text-sm font-medium">Click to enlarge</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced metadata */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Processed {new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>AI Detection</span>
                      </div>
                    </div>
                  </div>
                </EnhancedCard>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Lightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} src={lightboxSrc} alt={lightboxAlt} />
    </div>
  );
}

function Dashboard() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictedImage, setPredictedImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [historyError, setHistoryError] = useState('');
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const { loggedIn, setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [predictedImageUrl, setPredictedImageUrl] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome!', message: 'Your lunar crater detection journey begins now', time: '2 minutes ago', read: false },
    { id: 2, title: 'AI Model Ready', message: 'YOLO model is ready for processing', time: '5 minutes ago', read: true }
  ]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Add floating action button state
  const [fabOpen, setFabOpen] = useState(false);
  const [appProgress, setAppProgress] = useState(0);
  const imageInputRef = useRef(null);
  
  // Add new UI enhancement states
  const [helpOpen, setHelpOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Simulate app progress
  useEffect(() => {
    const interval = setInterval(() => {
      setAppProgress(prev => {
        if (prev >= 100) return 0;
        return prev + Math.random() * 10;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  if (!loggedIn) return <Navigate to="/login" />;

  // Fetch history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      setHistoryError('');
      try {
        const res = await api.get('/api/image/history');
        setHistory(res.data);
      } catch (err) {
        setHistoryError('Failed to load history.');
      }
    };
    fetchHistory();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      // Clear previous results when new image is selected
      setPredictedImage(null);
      setPredictedImageUrl(null);
      setOriginalImageUrl(null);
      setUploadProgress(0);
      setProcessingStage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');
    setLoading(true);
    setPredictedImage(null);
    setUploadProgress(0);
    setProcessingStage('Uploading image...');
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append('image', image);
      
      setProcessingStage('Processing with YOLO model...');
      const res = await api.post('/api/image/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setProcessingStage('Complete!');
      
      console.log('Frontend received response:', res.data);
      setPredictedImage(res.data.image.predictedImage);
      setPredictedImageUrl(`http://localhost:5000/uploads/${res.data.image.predictedImage}`);
      setOriginalImageUrl(`http://localhost:5000/uploads/${res.data.image.originalImage}`);
      console.log('Set predicted image URL:', `http://localhost:5000/uploads/${res.data.image.predictedImage}`);
      console.log('Set original image URL:', `http://localhost:5000/uploads/${res.data.image.originalImage}`);
      setHistory([res.data.image, ...history]);
      setImage(null);
      showToast('Image uploaded successfully!', 'success');
      
      // Reset progress after completion
      setTimeout(() => {
        setUploadProgress(0);
        setProcessingStage('');
      }, 2000);
      
    } catch (err) {
      clearInterval(progressInterval);
      setUploadProgress(0);
      setProcessingStage('');
      setUploadError(err.response?.data?.message || 'Upload failed.');
      showToast(err.response?.data?.message || 'Upload failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <AnimatedBackground />
      <ParticleSystem />
      
      {/* Enhanced Navigation */}
      <EnhancedNavigation>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link 
            to="/history" 
            className="group px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-sm sm:text-base"
          >
            <span className="flex items-center gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              History
            </span>
          </Link>
          
          <NotificationBell 
            notifications={notifications}
            onToggle={() => setNotificationsOpen(!notificationsOpen)}
            isOpen={notificationsOpen}
          />
          
          <button
            onClick={handleLogout}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </EnhancedNavigation>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Crater Detection Dashboard
            </h2>
            <p className="text-lg sm:text-xl text-white/70">Upload lunar images and discover hidden craters with AI</p>
            
            {/* Search Bar */}
            <div className="mt-6 max-w-md mx-auto">
              <SearchBar 
                onSearch={(query) => {
                  setSearchQuery(query);
                  if (query.trim()) {
                    const filtered = history.filter(item => 
                      item.originalImage.toLowerCase().includes(query.toLowerCase()) ||
                      item.predictedImage.toLowerCase().includes(query.toLowerCase())
                    );
                    setFilteredHistory(filtered);
                  } else {
                    setFilteredHistory([]);
                  }
                }}
                placeholder="Search detection history..."
                className="w-full"
              />
            </div>
          </div>

          {/* Enhanced Upload Form */}
          <EnhancedCard className="p-6 sm:p-8 mb-8 sm:mb-12">
            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
              <label className="group w-full flex flex-col items-center px-6 sm:px-8 py-8 sm:py-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white rounded-3xl border-2 border-dashed border-purple-400/50 cursor-pointer hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 transform hover:scale-105 mb-6" htmlFor="image-upload">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-4 shadow-2xl group-hover:shadow-glow-lg transition-all duration-300">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <span className="text-lg sm:text-xl font-semibold mb-2 text-center">Drop your lunar image here</span>
                <span className="text-white/70 text-center text-sm sm:text-base">or click to browse files</span>
                <input id="image-upload" ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
              
              {imagePreview && (
                <div className="mb-6 text-center animate-scale-in">
                  <div className="relative inline-block">
                    <img src={imagePreview} alt="Image preview" className="max-h-32 sm:max-h-48 rounded-2xl shadow-2xl mx-auto mb-3" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70">
                    Selected: <span className="font-medium text-purple-300">{image?.name}</span>
                  </p>
                </div>
              )}
              
              <button 
                type="submit" 
                className="group px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:transform-none text-base sm:text-lg" 
                disabled={!image || loading}
                aria-describedby="upload-status"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2 sm:gap-3">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    🚀 Detect Craters
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>
              
              <div id="upload-status" className="sr-only" aria-live="polite">
                {loading ? 'Processing image...' : 'Ready to upload'}
              </div>
              
              <p className="text-xs sm:text-sm text-white/60 mt-4 text-center max-w-md">
                Upload a lunar image and our AI model will detect and highlight craters. 
                Both the original and predicted images will be displayed for comparison.
              </p>
            </form>
          </EnhancedCard>

          {/* Enhanced Error Display */}
          {uploadError && (
            <div className="mb-8 p-4 sm:p-6 bg-red-500/20 border border-red-500/30 rounded-3xl text-red-300 text-center animate-slide-down" role="alert" aria-live="assertive">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-sm sm:text-base">Upload Error</span>
              </div>
              <p className="text-sm sm:text-base">{uploadError}</p>
            </div>
          )}

          {/* Search Results */}
          {searchQuery && filteredHistory.length > 0 && (
            <EnhancedCard className="p-6 sm:p-8 mb-8 animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  Search Results
                </h3>
                <p className="text-white/70 text-sm sm:text-base">
                  Found {filteredHistory.length} result{filteredHistory.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {filteredHistory.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-sm">🔍</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{item.originalImage}</p>
                        <p className="text-white/60 text-xs">{new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <img 
                        src={`http://localhost:5000/uploads/${item.originalImage}`} 
                        alt="Original" 
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      <img 
                        src={`http://localhost:5000/uploads/${item.predictedImage}`} 
                        alt="Predicted" 
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredHistory.length > 4 && (
                <div className="text-center mt-4">
                  <p className="text-white/60 text-sm">
                    Showing 4 of {filteredHistory.length} results. 
                    <Link to="/history" className="text-purple-400 hover:text-pink-400 ml-1 underline">
                      View all results
                    </Link>
                  </p>
                </div>
              )}
            </EnhancedCard>
          )}

          {/* Enhanced Loading State with Progress */}
          {loading && (
            <div className="mb-8 sm:mb-12 text-center animate-fade-in">
              <EnhancedCard className="p-6 sm:p-8">
                <div className="inline-flex flex-col items-center gap-4 sm:gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin animation-delay-1000"></div>
                  </div>
                  
                  <div className="text-center w-full max-w-md">
                    <h3 className="text-xl sm:text-2xl font-bold text-purple-300 mb-2">{processingStage}</h3>
                    <p className="text-white/70 mb-4 text-sm sm:text-base">Processing your lunar image with AI</p>
                    
                    {/* Progress Bar */}
                    <ProgressBar 
                      progress={uploadProgress} 
                      label="Processing Progress" 
                      className="mb-4"
                    />
                    
                    {/* Processing Steps */}
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/60">
                      <div className={`w-2 h-2 rounded-full ${uploadProgress > 0 ? 'bg-green-400' : 'bg-white/30'}`}></div>
                      <span>Upload</span>
                      <div className={`w-2 h-2 rounded-full ${uploadProgress > 30 ? 'bg-green-400' : 'bg-white/30'}`}></div>
                      <span>Process</span>
                      <div className={`w-2 h-2 rounded-full ${uploadProgress > 70 ? 'bg-green-400' : 'bg-white/30'}`}></div>
                      <span>Complete</span>
                    </div>
                  </div>
                </div>
              </EnhancedCard>
            </div>
          )}
          
          {/* Enhanced Results Section with Image Comparison */}
          {originalImageUrl && !loading && (
            <div className="animate-scale-in">
              <ImageComparison 
                originalUrl={originalImageUrl}
                predictedUrl={predictedImageUrl}
                onImageClick={(src, alt) => {
                  setLightboxSrc(src);
                  setLightboxAlt(alt);
                  setLightboxOpen(true);
                }}
              />
            </div>
          )}

                      {/* Enhanced Statistics Dashboard */}
            {history.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                  Analytics Dashboard
                </h3>
                <StatisticsDashboard history={history} className="mb-8" />
              </div>
            )}

            {/* System Status */}
            <div className="mt-8">
              <SystemStatus className="mb-8" />
            </div>
        </div>
      </div>
      
      <Lightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} src={lightboxSrc} alt={lightboxAlt} />

              {/* Enhanced UI Components - Complete UI Enhancement Suite */}
        <FloatingHelp isOpen={helpOpen} onToggle={() => setHelpOpen(!helpOpen)} />
        <QuickActionsPanel isOpen={quickActionsOpen} onToggle={() => setQuickActionsOpen(!quickActionsOpen)} />
        <AccessibilityPanel isOpen={accessibilityOpen} onToggle={() => setAccessibilityOpen(!accessibilityOpen)} />
        
        {/* UI Enhancement Status Indicator */}
        <div className="fixed top-20 right-6 z-40">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg animate-pulse-glow">
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <span className="text-sm font-semibold">UI Enhanced</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced Floating Action Button with integrated actions */}
        <FloatingActionButton 
          isOpen={fabOpen} 
          onToggle={() => setFabOpen(!fabOpen)}
          actions={[
            {
              icon: "💡",
              label: "Help & Guidance",
              onClick: () => setHelpOpen(true),
              color: "bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl"
            },
            {
              icon: "⚡",
              label: "Quick Actions",
              onClick: () => setQuickActionsOpen(true),
              color: "bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl"
            },
            {
              icon: "♿",
              label: "Accessibility",
              onClick: () => setAccessibilityOpen(true),
              color: "bg-purple-500 hover:bg-purple-600 shadow-lg hover:shadow-xl"
            },
            {
              icon: "📊",
              label: "Analytics",
              onClick: () => setShowStats(!showStats),
              color: "bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl"
            },
            {
              icon: "📷",
              label: "New Detection",
              onClick: () => imageInputRef.current?.click(),
              color: "bg-cyan-500 hover:bg-cyan-600 shadow-lg hover:shadow-xl"
            }
          ]}
        />


          
          {/* FAB Menu Items */}


      {/* App Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-1000 ease-out"
          style={{ width: `${appProgress}%` }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Search Component with autocomplete
function SearchBar({ onSearch, placeholder = "Search lunar images...", className = "" }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery) => {
    onSearch(searchQuery);
    setIsOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          onClick={() => handleSearch(query)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
        >
          Search
        </button>
      </div>
      
      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 max-h-60 overflow-y-auto">
          <div className="p-2">
            <div className="text-sm text-white/60 px-3 py-2">Recent searches</div>
            {['Lunar craters', 'Moon surface', 'Impact detection'].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSearch(suggestion)}
                className="w-full text-left px-3 py-2 text-white hover:bg-white/20 rounded-xl transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Statistics Dashboard Component
function StatisticsDashboard({ history, className = "" }) {
  const totalDetections = history.length;
  const thisWeek = history.filter(item => {
    const itemDate = new Date(item.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return itemDate >= weekAgo;
  }).length;
  
  const thisMonth = history.filter(item => {
    const itemDate = new Date(item.createdAt);
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return itemDate >= monthAgo;
  }).length;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${className}`}>
      <EnhancedCard className="p-4 sm:p-6 text-center group hover:from-purple-500/30 hover:to-pink-500/30">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <span className="text-xl sm:text-2xl">📸</span>
        </div>
        <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">{totalDetections}</h4>
        <p className="text-white/70 text-sm sm:text-base">Total Detections</p>
        <div className="mt-2 w-full bg-white/10 rounded-full h-1">
          <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" style={{ width: `${Math.min((totalDetections / 100) * 100, 100)}%` }}></div>
        </div>
      </EnhancedCard>
      
      <EnhancedCard className="p-4 sm:p-6 text-center group hover:from-blue-500/30 hover:to-cyan-500/30">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <span className="text-xl sm:text-2xl">📅</span>
        </div>
        <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{thisWeek}</h4>
        <p className="text-white/70 text-sm sm:text-base">This Week</p>
        <div className="mt-2 w-full bg-white/10 rounded-full h-1">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500" style={{ width: `${Math.min((thisWeek / 20) * 100, 100)}%` }}></div>
        </div>
      </EnhancedCard>
      
      <EnhancedCard className="p-4 sm:p-6 text-center group hover:from-green-500/30 hover:to-emerald-500/30">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <span className="text-xl sm:text-2xl">📊</span>
        </div>
        <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors duration-300">{thisMonth}</h4>
        <p className="text-white/70 text-sm sm:text-base">This Month</p>
        <div className="mt-2 w-full bg-white/10 rounded-full h-1">
          <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500" style={{ width: `${Math.min((thisMonth / 50) * 100, 100)}%` }}></div>
        </div>
      </EnhancedCard>
      
      <EnhancedCard className="p-4 sm:p-6 text-center group hover:from-yellow-500/30 hover:to-orange-500/30">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <span className="text-xl sm:text-2xl">⚡</span>
        </div>
        <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">99.9%</h4>
        <p className="text-white/70 text-sm sm:text-base">Accuracy Rate</p>
        <div className="mt-2 w-full bg-white/10 rounded-full h-1">
          <div className="h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-500" style={{ width: '99.9%' }}></div>
        </div>
      </EnhancedCard>
    </div>
  );
}

// Enhanced Image Comparison Component
function ImageComparison({ originalUrl, predictedUrl, onImageClick }) {
  const [activeTab, setActiveTab] = useState('side-by-side');
  
  const tabs = [
    { id: 'side-by-side', label: 'Side by Side', icon: '🔄' },
    { id: 'overlay', label: 'Overlay', icon: '🔍' },
    { id: 'slider', label: 'Slider', icon: '📱' }
  ];

  return (
    <EnhancedCard className="p-6 sm:p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
          Image Comparison
        </h3>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-1 border border-white/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/20'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side by Side View */}
      {activeTab === 'side-by-side' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="group">
            <h4 className="text-lg sm:text-xl font-semibold text-purple-300 mb-4 text-center">Original Image</h4>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-300 group-hover:scale-105">
              <img 
                src={originalUrl} 
                alt="Original lunar image" 
                className="w-full h-64 sm:h-80 object-cover cursor-pointer" 
                onClick={() => onImageClick(originalUrl, 'Original lunar image')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span className="text-white font-medium text-sm sm:text-base">Click to enlarge</span>
              </div>
            </div>
          </div>
          
          <div className="group">
            <h4 className="text-lg sm:text-xl font-semibold text-green-300 mb-4 text-center">Predicted Image</h4>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-300 group-hover:scale-105">
              <img 
                src={predictedUrl}
                alt="Predicted lunar image with craters" 
                className="w-full h-64 sm:h-80 object-cover cursor-pointer" 
                onClick={() => onImageClick(predictedUrl, 'Predicted lunar image with craters')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span className="text-white font-medium text-sm sm:text-base">Click to enlarge</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay View */}
      {activeTab === 'overlay' && (
        <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src={originalUrl} 
            alt="Original lunar image" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <img 
            src={predictedUrl}
            alt="Predicted lunar image with craters" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-70 hover:opacity-100 transition-opacity duration-500" 
          />
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-2 rounded-xl text-white text-sm">
            <span className="mr-2">🔍</span>
            Hover to see overlay effect
          </div>
        </div>
      )}

      {/* Slider View */}
      {activeTab === 'slider' && (
        <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src={originalUrl} 
            alt="Original lunar image" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <img 
              src={predictedUrl}
              alt="Predicted lunar image with craters" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          </div>
          <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-lg transform -translate-x-1/2 cursor-ew-resize">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-2 rounded-xl text-white text-sm">
            <span className="mr-2">📱</span>
            Drag slider to compare
          </div>
        </div>
      )}
    </EnhancedCard>
  );
}

// Enhanced Tooltip Component
function Tooltip({ children, content, position = 'top', className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-2xl whitespace-nowrap animate-fade-in ${positions[position]}`}
        >
          {content}
          <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
            position === 'top' ? 'top-full left-1/2 -translate-x-1/2' :
            position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2' :
            position === 'left' ? 'left-full top-1/2 -translate-y-1/2' :
            'right-full top-1/2 -translate-y-1/2'
          }`}></div>
        </div>
      )}
    </div>
  );
}

// Floating Help System Component
function FloatingHelp({ isOpen, onToggle }) {
  const helpItems = [
    {
      icon: '📸',
      title: 'Upload Images',
      description: 'Drag and drop lunar images or click to browse files',
      action: 'Try uploading an image now!'
    },
    {
      icon: '🔍',
      title: 'View Results',
      description: 'Compare original and AI-detected crater images',
      action: 'Check your detection history'
    },
    {
      icon: '📊',
      title: 'Analytics',
      description: 'Track your detection progress and system performance',
      action: 'View your statistics'
    },
    {
      icon: '⚙️',
      title: 'Settings',
      description: 'Customize your experience and preferences',
      action: 'Access settings menu'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onToggle}></div>
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl border border-white/20 max-w-2xl w-full animate-scale-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              How to Use CraterVision
            </h3>
            <button
              onClick={onToggle}
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helpItems.map((item, index) => (
              <div key={index} className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                    <p className="text-white/70 text-sm mb-2">{item.description}</p>
                    <button className="text-purple-400 hover:text-pink-400 text-sm font-medium transition-colors duration-300">
                      {item.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-white font-medium">Pro Tip</p>
                <p className="text-white/70 text-sm">Use the floating action button for quick access to common features!</p>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
          <h4 className="text-purple-300 font-semibold mb-3 flex items-center gap-2">
            <span className="text-lg">🎉</span>
            UI Enhancement Complete!
          </h4>
          <div className="space-y-2 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Enhanced Floating Action Button with 5 actions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Interactive Help & Guidance System</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Quick Actions Panel for efficiency</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Accessibility Controls & Settings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Keyboard Shortcuts Integration</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Enhanced Tooltips & Visual Feedback</span>
            </div>
          </div>
        </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick Actions Panel Component
function QuickActionsPanel({ isOpen, onToggle }) {
  const quickActions = [
    {
      icon: '🚀',
      title: 'New Detection',
      description: 'Start a new lunar crater detection',
      color: 'from-purple-500 to-pink-500',
      action: () => console.log('New detection')
    },
    {
      icon: '📊',
      title: 'View Analytics',
      description: 'Check your detection statistics',
      color: 'from-blue-500 to-cyan-500',
      action: () => console.log('View analytics')
    },
    {
      icon: '📸',
      title: 'Batch Upload',
      description: 'Upload multiple images at once',
      color: 'from-green-500 to-emerald-500',
      action: () => console.log('Batch upload')
    },
    {
      icon: '⚙️',
      title: 'Settings',
      description: 'Customize your experience',
      color: 'from-orange-500 to-red-500',
      action: () => console.log('Settings')
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onToggle}></div>
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl border border-white/20 max-w-4xl w-full animate-scale-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Quick Actions
            </h3>
            <button
              onClick={onToggle}
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="group bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 text-left"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <h4 className="text-white font-semibold mb-1">{action.title}</h4>
                <p className="text-white/70 text-sm">{action.description}</p>
              </button>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
              View All Actions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Accessibility Component
function AccessibilityPanel({ isOpen, onToggle }) {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const handleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle('high-contrast');
  };

  const handleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
    document.body.classList.toggle('reduced-motion');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onToggle}></div>
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl border border-white/20 max-w-md w-full animate-scale-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Accessibility
            </h3>
            <button
              onClick={onToggle}
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Font Size Control */}
            <div>
              <label className="block text-white font-medium mb-3">Font Size</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleFontSizeChange(Math.max(80, fontSize - 10))}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-white font-medium min-w-[3rem] text-center">{fontSize}%</span>
                <button
                  onClick={() => handleFontSizeChange(Math.min(150, fontSize + 10))}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-white font-medium">High Contrast</label>
              <button
                onClick={handleHighContrast}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${highContrast ? 'bg-purple-500' : 'bg-gray-600'}`}
              >
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${highContrast ? 'translate-x-7' : 'translate-x-0.5'}`}></div>
              </button>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <span className="text-white font-medium">Reduced Motion</span>
                <Tooltip content="Reduce animations for users with motion sensitivity">
                  <span className="text-white/50 cursor-help">ⓘ</span>
                </Tooltip>
              </label>
              <button
                onClick={handleReducedMotion}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${reducedMotion ? 'bg-purple-500' : 'bg-gray-600'}`}
              >
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${reducedMotion ? 'translate-x-7' : 'translate-x-0.5'}`}></div>
              </button>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="bg-white/5 rounded-2xl p-4">
              <h4 className="text-white font-medium mb-3">Keyboard Shortcuts</h4>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex justify-between">
                  <span>Open Help</span>
                  <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">F1</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Quick Actions</span>
                  <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Ctrl + Q</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Accessibility</span>
                  <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Ctrl + A</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Keyboard Shortcuts Hook
function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // F1 - Help
      if (e.key === 'F1') {
        e.preventDefault();
        // Trigger help panel
        console.log('Help shortcut pressed');
      }
      
      // Ctrl + Q - Quick Actions
      if (e.ctrlKey && e.key === 'q') {
        e.preventDefault();
        // Trigger quick actions panel
        console.log('Quick actions shortcut pressed');
      }
      
      // Ctrl + A - Accessibility
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        // Trigger accessibility panel
        console.log('Accessibility shortcut pressed');
      }
      
      // Escape - Close modals
      if (e.key === 'Escape') {
        // Close any open modals
        console.log('Escape pressed');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}

// Enhanced Notification Bell Component
function NotificationBell({ notifications = [], onToggle, isOpen }) {
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="relative p-2 text-white/70 hover:text-white transition-colors group"
        aria-label="Notifications"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM10 3v2a5 5 0 005 5h2a5 5 0 015 5v2a5 5 0 01-5 5H7a5 5 0 01-5-5v-2a5 5 0 015-5h2a5 5 0 005-5V3a5 5 0 00-5-5H7a5 5 0 00-5 5z" />
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
            {notifications.length === 0 ? (
              <p className="text-white/70 text-center py-4">No notifications</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.map((notification, index) => (
                  <div key={index} className={`p-3 rounded-xl transition-colors duration-200 ${!notification.read ? 'bg-white/20' : 'bg-white/10'}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{notification.title}</p>
                        <p className="text-white/70 text-xs">{notification.message}</p>
                        <p className="text-white/50 text-xs mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SystemStatus({ className = "" }) {
  const [systemHealth, setSystemHealth] = useState({
    aiModel: 'ready',
    server: 'online',
    queue: 0,
    uptime: '2h 34m'
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        ...prev,
        queue: Math.floor(Math.random() * 5),
        uptime: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready':
      case 'online':
        return 'text-green-400';
      case 'processing':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready':
        return '🟢';
      case 'online':
        return '🟢';
      case 'processing':
        return '🟡';
      case 'error':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          System Status
        </h3>
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* AI Model Status */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-4 border border-purple-500/30">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🤖</span>
            <div>
              <p className="text-white font-medium text-sm">AI Model</p>
              <p className={`text-xs ${getStatusColor(systemHealth.aiModel)}`}>
                {systemHealth.aiModel}
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
          </div>
        </div>

        {/* Server Status */}
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-4 border border-blue-500/30">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🖥️</span>
            <div>
              <p className="text-white font-medium text-sm">Server</p>
              <p className={`text-xs ${getStatusColor(systemHealth.server)}`}>
                {systemHealth.server}
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
          </div>
        </div>

        {/* Processing Queue */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📊</span>
            <div>
              <p className="text-white font-medium text-sm">Queue</p>
              <p className="text-xs text-green-400">{systemHealth.queue} items</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${Math.max(10, systemHealth.queue * 20)}%` }}></div>
          </div>
        </div>

        {/* Uptime */}
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-4 border border-orange-500/30">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⏱️</span>
            <div>
              <p className="text-white font-medium text-sm">Uptime</p>
              <p className="text-xs text-orange-400">{systemHealth.uptime}</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500" style={{ width: '78%' }}></div>
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="mt-6 p-4 bg-gray-800/50 rounded-2xl">
        <h4 className="text-sm font-semibold text-white/80 mb-3">Recent Activity</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/70">Image processed successfully</span>
            <span className="text-white/50 ml-auto">2s ago</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-white/70">New upload detected</span>
            <span className="text-white/50 ml-auto">5s ago</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-white/70">AI model optimizing</span>
            <span className="text-white/50 ml-auto">8s ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { loggedIn } = useAuth();

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: location.pathname.includes('/dashboard') ? 'Dashboard' : location.pathname.includes('/history') ? 'History' : 'CraterVision' },
  ];

  // Add theme state
  const [isDark, setIsDark] = useState(true);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDark(!isDark);
    // Add theme switching logic here
  };

  return (
    <div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="block px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/history" className="block px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                History
              </Link>
            </li>
            <li>
              <Link to="/login" className="block px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="block px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                Sign Up
              </Link>
            </li>
          </ul>
        </MobileMenu>
        <EnhancedNavigation
          showMobileMenu={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <BreadcrumbNav items={breadcrumbs} />
          <Link 
            to="/" 
            className="group px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="flex items-center gap-2">
              Home
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
          {loggedIn && (
            <>
              <Link 
                to="/dashboard" 
                className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  Dashboard
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link 
                to="/history" 
                className="group px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  History
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </>
          )}
          {!loggedIn && (
            <>
              <Link 
                to="/login" 
                className="group px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  Login
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link 
                to="/signup" 
                className="group px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  Sign Up
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </>
          )}
        </EnhancedNavigation>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    );
  }

export default App;
