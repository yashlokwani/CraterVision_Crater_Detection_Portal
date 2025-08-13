import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AnimatedBackground from '../components/layout/AnimatedBackground';
import ParticleSystem from '../components/layout/ParticleSystem';

function Landing() {
  const { loggedIn } = useAuth();
  
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <AnimatedBackground />
      <ParticleSystem />
      
      {/* Enhanced Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-4 lg:px-6">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent leading-tight animate-gradient">
              Discover Lunar
              <br />
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl animate-float bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent font-black">Crater Mysteries</span>
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

export default Landing;
