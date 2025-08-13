import { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import AnimatedBackground from '../components/layout/AnimatedBackground';
import ParticleSystem from '../components/layout/ParticleSystem';
import EnhancedCard from '../components/ui/EnhancedCard';
import Lightbox from '../components/ui/Lightbox';

function History() {
  const { loggedIn } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setHistoryError] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');
  const [compareMode, setCompareMode] = useState(null);
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
      <Lightbox 
        open={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        src={lightboxSrc} 
        alt={lightboxAlt} 
      />
      <AnimatedBackground />
      <ParticleSystem />
      
      {/* Enhanced Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <div className="mb-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </button>
            </div>
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
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              {history.map((item, idx) => (
                <div key={idx} className="w-full">
                  <EnhancedCard 
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
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm text-white/60">
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
                      
                      {/* Action Buttons */}
                      <div className="flex justify-center mt-4 gap-3">
                        <button
                          onClick={() => setCompareMode(compareMode === idx ? null : idx)}
                          className={`px-4 py-2 ${compareMode === idx ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'} text-white text-sm rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                        >
                          {compareMode === idx ? '✓ Comparing' : '🔍 Compare View'}
                        </button>
                        
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = `http://localhost:5000/uploads/${item.predictedImage}`;
                            link.download = item.predictedImage;
                            link.click();
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          💾 Download
                        </button>
                      </div>
                    </div>
                    
                    {/* Compare Mode */}
                    {compareMode === idx && (
                      <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10 animate-slide-down">
                        <h5 className="text-center text-white font-medium mb-4">Side-by-Side Comparison</h5>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-purple-300 text-sm font-medium text-center">Original Image</p>
                            <img 
                              src={`http://localhost:5000/uploads/${item.originalImage}`} 
                              alt="Original lunar image" 
                              className="w-full h-40 object-cover rounded-xl border-2 border-purple-400/50" 
                            />
                          </div>
                          <div className="space-y-2">
                            <p className="text-green-300 text-sm font-medium text-center">Predicted Image</p>
                            <img 
                              src={`http://localhost:5000/uploads/${item.predictedImage}`} 
                              alt="Predicted lunar image with craters" 
                              className="w-full h-40 object-cover rounded-xl border-2 border-green-400/50" 
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                          <p className="text-blue-300 text-sm">
                            <strong>Analysis:</strong> The AI model has successfully detected and highlighted crater formations in the lunar surface image. 
                            Red boxes indicate identified crater regions with high confidence scores.
                          </p>
                        </div>
                      </div>
                    )}
                  </EnhancedCard>
                </div>
              ))}
              
              {/* Pagination or Load More could go here */}
              {history.length > 10 && (
                <div className="text-center mt-8">
                  <p className="text-white/60 text-sm">
                    Showing {Math.min(10, history.length)} of {history.length} detections
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;
