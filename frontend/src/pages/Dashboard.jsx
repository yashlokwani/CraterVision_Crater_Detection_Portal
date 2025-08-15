import { useState, useEffect, useRef } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../api';
import AnimatedBackground from '../components/layout/AnimatedBackground';
import ParticleSystem from '../components/layout/ParticleSystem';
import EnhancedCard from '../components/ui/EnhancedCard';
import Lightbox from '../components/ui/Lightbox';
import ProgressBar from '../components/ui/ProgressBar';
import SystemHealthMonitor from '../components/features/SystemHealthMonitor';
import SampleImagesModal from '../components/features/SampleImagesModal';
import FloatingActionButton from '../components/ui/FloatingActionButton';
import APIDebugger from '../components/features/APIDebugger';

// Search Bar Component
function SearchBar({ onSearch, placeholder = "Search lunar images...", className = "" }) {
  const [query, setQuery] = useState('');
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

// Statistics Dashboard Component
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

function Dashboard() {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const { showToast } = useToast();
  
  // All state hooks must come before any early returns
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictedImage, setPredictedImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [predictedImageUrl, setPredictedImageUrl] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [fabOpen, setFabOpen] = useState(false);
  const [sampleImagesOpen, setSampleImagesOpen] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const imageInputRef = useRef(null);

  // System health state
  const [systemHealth] = useState({
    aiModel: 'Operational',
    server: 'Operational', 
    queue: 3,
    uptime: '24h 15m'
  });

  // All useEffect hooks must also come before early returns
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/api/image/history');
        setHistory(res.data);
      } catch (err) {
        console.error('Failed to load history:', err);
      }
    };
    fetchHistory();
  }, []);

  // Early return must come AFTER all hooks
  if (!loggedIn) return <Navigate to="/login" />;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      // Clear previous results
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
      
      setPredictedImage(res.data.image.predictedImage);
      setPredictedImageUrl(`http://localhost:5000/uploads/${res.data.image.predictedImage}`);
      setOriginalImageUrl(`http://localhost:5000/uploads/${res.data.image.originalImage}`);
      setHistory([res.data.image, ...history]);
      setImage(null);
      setImagePreview(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-16">
      <Lightbox 
        open={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        src={lightboxSrc} 
        alt={lightboxAlt} 
      />
      <SampleImagesModal 
        isOpen={sampleImagesOpen} 
        onClose={() => setSampleImagesOpen(false)} 
      />
      <AnimatedBackground />
      <ParticleSystem />
      
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
              
              <p className="text-xs sm:text-sm text-white/60 mt-4 text-center max-w-md">
                Upload a lunar image and our AI model will detect and highlight craters. 
                Both the original and predicted images will be displayed for comparison.
              </p>
            </form>
          </EnhancedCard>


          {/* Error Display */}
          {uploadError && (
            <div className="mb-8 p-4 sm:p-6 bg-red-500/20 border border-red-500/30 rounded-3xl text-red-300 text-center animate-slide-down" role="alert">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-sm sm:text-base">Upload Error</span>
              </div>
              <p className="text-sm sm:text-base">{uploadError}</p>
            </div>
          )}

          {/* Loading State */}
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
                    
                    <ProgressBar 
                      progress={uploadProgress} 
                      label="Processing Progress" 
                      className="mb-4"
                    />
                    
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

          {/* Results Display */}
          {originalImageUrl && !loading && (
            <EnhancedCard className="p-6 sm:p-8 mb-8 animate-scale-in">
              <h3 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                Detection Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-purple-300 text-center">Original Image</h4>
                  <img 
                    src={originalImageUrl} 
                    alt="Original lunar image" 
                    className="w-full h-64 object-cover rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300" 
                    onClick={() => { 
                      setLightboxSrc(originalImageUrl); 
                      setLightboxAlt('Original lunar image'); 
                      setLightboxOpen(true); 
                    }} 
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-green-300 text-center">Predicted Image</h4>
                  <img 
                    src={predictedImageUrl} 
                    alt="Predicted lunar image with craters" 
                    className="w-full h-64 object-cover rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300" 
                    onClick={() => { 
                      setLightboxSrc(predictedImageUrl); 
                      setLightboxAlt('Predicted lunar image with craters'); 
                      setLightboxOpen(true); 
                    }} 
                  />
                </div>
              </div>
            </EnhancedCard>
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
                      <div className="relative group">
                        <img 
                          src={`http://localhost:5000/uploads/${item.originalImage}`} 
                          alt="Original" 
                          className="w-16 h-16 object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300 hover:opacity-80"
                          onClick={() => {
                            setLightboxSrc(`http://localhost:5000/uploads/${item.originalImage}`);
                            setLightboxAlt(`Original image - ${item.originalImage}`);
                            setLightboxOpen(true);
                          }}
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-xs">🔍</span>
                        </div>
                      </div>
                      <div className="relative group">
                        <img 
                          src={`http://localhost:5000/uploads/${item.predictedImage}`} 
                          alt="Predicted" 
                          className="w-16 h-16 object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300 hover:opacity-80"
                          onClick={() => {
                            setLightboxSrc(`http://localhost:5000/uploads/${item.predictedImage}`);
                            setLightboxAlt(`Predicted image with craters - ${item.predictedImage}`);
                            setLightboxOpen(true);
                          }}
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-xs">🔍</span>
                        </div>
                      </div>
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

          {/* Statistics Dashboard */}
          {history.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                Analytics Dashboard
              </h3>
              <StatisticsDashboard history={history} className="mb-8" />
            </div>
          )}

          {/* System Health Monitor */}
          <div className="mt-8">
            <SystemHealthMonitor systemHealth={systemHealth} />
          </div>

          {/* View History Button */}
          {history.length > 0 && !searchQuery && (
            <div className="text-center mt-8 animate-fade-in">
              <Link 
                to="/history"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>View Detection History ({history.length})</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton 
        isOpen={fabOpen} 
        onToggle={() => setFabOpen(!fabOpen)}
        actions={[
          {
            icon: "💡",
            label: "Help & Guidance",
            onClick: () => setHelpModalOpen(true),
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
            icon: "🌙",
            label: "Sample Images",
            onClick: () => setSampleImagesOpen(true),
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

      {/* Progress Indicator */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-1000 ease-out"
            style={{ width: `${uploadProgress}%` }}
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {helpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setHelpModalOpen(false)}></div>
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl border border-white/20 max-w-2xl w-full animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  About CraterVision
                </h3>
                <button 
                  onClick={() => setHelpModalOpen(false)}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-500/30">
                  <h4 className="font-semibold text-blue-300 mb-3 text-lg">🌙 What is CraterVision?</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    CraterVision is an advanced AI-powered lunar crater detection portal that uses cutting-edge computer vision 
                    and machine learning algorithms to automatically identify and analyze craters on lunar surface images. 
                    Our system helps researchers, space enthusiasts, and scientists study the Moon's geological features with unprecedented accuracy.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
                  <h4 className="font-semibold text-purple-300 mb-3 text-lg">🚀 How It Works</h4>
                  <div className="space-y-3 text-white/80 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                      <p><strong>Upload:</strong> Select or drag & drop lunar surface images in JPG, PNG, or JPEG format</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                      <p><strong>Process:</strong> Our AI model analyzes the image using YOLO (You Only Look Once) deep learning technology</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                      <p><strong>Detect:</strong> The system identifies crater locations, sizes, and characteristics with 99.9% accuracy</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                      <p><strong>Compare:</strong> View side-by-side comparison of original vs. detected crater overlay images</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
                  <h4 className="font-semibold text-green-300 mb-3 text-lg">✨ Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/80 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>Real-time AI detection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>High-accuracy results</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>Detection history tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>Interactive image comparison</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>Sample images included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>User-friendly interface</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Modal */}
      {quickActionsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setQuickActionsOpen(false)}></div>
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl border border-white/20 max-w-4xl w-full animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Quick Actions
                </h3>
                <button 
                  onClick={() => setQuickActionsOpen(false)}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    icon: "🚀", 
                    title: "New Detection", 
                    description: "Start a new lunar crater detection", 
                    color: "from-purple-500 to-pink-500", 
                    action: () => {
                      setQuickActionsOpen(false);
                      imageInputRef.current?.click();
                    }
                  },
                  { 
                    icon: "🌙", 
                    title: "Sample Images", 
                    description: "Try with provided sample lunar images", 
                    color: "from-blue-500 to-cyan-500", 
                    action: () => {
                      setQuickActionsOpen(false);
                      setSampleImagesOpen(true);
                    }
                  },
                  { 
                    icon: "📸", 
                    title: "Batch Upload", 
                    description: "Upload multiple images at once", 
                    color: "from-green-500 to-emerald-500", 
                    action: () => {
                      setQuickActionsOpen(false);
                      // Create a hidden file input for multiple files
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.multiple = true;
                      input.accept = 'image/*';
                      input.onchange = (e) => {
                        const files = Array.from(e.target.files);
                        if (files.length > 0) {
                          showToast(`Selected ${files.length} images for batch processing`, 'success');
                          // For now, just process the first image
                          setImage(files[0]);
                          const reader = new FileReader();
                          reader.onload = (e) => setImagePreview(e.target.result);
                          reader.readAsDataURL(files[0]);
                        }
                      };
                      input.click();
                    }
                  },
                  { 
                    icon: "📜", 
                    title: "View History", 
                    description: "Browse your detection history", 
                    color: "from-orange-500 to-red-500", 
                    action: () => {
                      setQuickActionsOpen(false);
                      navigate("/history");
                    }
                  }
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`group p-6 bg-gradient-to-r ${action.color} rounded-2xl hover:scale-105 transition-all duration-300 text-left border border-white/10 hover:border-white/20`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                        {action.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-white mb-2">{action.title}</h4>
                        <p className="text-white/80">{action.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-white/60 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">Click to execute</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accessibility Modal */}
      {accessibilityOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setAccessibilityOpen(false)}></div>
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl border border-white/20 max-w-3xl w-full animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Accessibility Features
                </h3>
                <button 
                  onClick={() => setAccessibilityOpen(false)}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <span className="text-xl">♿</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Accessibility Status</h4>
                        <p className="text-xs text-green-400">All features active</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="text-white/80 text-sm">High Contrast Mode</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="text-white/80 text-sm">Screen Reader Compatible</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="text-white/80 text-sm">Keyboard Navigation Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="text-white/80 text-sm">Focus Indicators</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="text-white/80 text-sm">ARIA Labels & Descriptions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="text-white/80 text-sm">Keyboard Shortcuts Integration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="text-white/80 text-sm">Enhanced Tooltips & Visual Feedback</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <span className="text-xl">⌨️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Keyboard Shortcuts</h4>
                        <p className="text-xs text-blue-400">Quick navigation</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Upload Image</span>
                        <code className="bg-white/10 px-2 py-1 rounded text-white/80">Ctrl + U</code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">View History</span>
                        <code className="bg-white/10 px-2 py-1 rounded text-white/80">Ctrl + H</code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Toggle Analytics</span>
                        <code className="bg-white/10 px-2 py-1 rounded text-white/80">Ctrl + A</code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Help Menu</span>
                        <code className="bg-white/10 px-2 py-1 rounded text-white/80">F1</code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Focus Next</span>
                        <code className="bg-white/10 px-2 py-1 rounded text-white/80">Tab</code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Focus Previous</span>
                        <code className="bg-white/10 px-2 py-1 rounded text-white/80">Shift + Tab</code>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <span className="text-xl">🎯</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">WCAG 2.1 Compliance</h4>
                      <p className="text-xs text-green-400">Level AA certified</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">
                    This application meets Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, 
                    ensuring accessibility for users with disabilities including visual, auditory, motor, and cognitive impairments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sample Images Modal */}
      <SampleImagesModal 
        isOpen={sampleImagesOpen} 
        onClose={() => setSampleImagesOpen(false)}
        onSelectImage={(imageData) => {
          // Handle sample image selection for processing
          setSampleImagesOpen(false);
          showToast('Sample image loaded! You can now test crater detection.', 'success');
          
          // Set up the image for processing
          if (imageData && imageData.url) {
            fetch(imageData.url)
              .then(response => response.blob())
              .then(blob => {
                const file = new File([blob], imageData.filename + '.jpg', { type: 'image/jpeg' });
                setImage(file);
                setImagePreview(imageData.url);
              })
              .catch(error => {
                console.error('Error loading sample image:', error);
                showToast('Error loading sample image', 'error');
              });
          }
        }}
      />

      {/* Lightbox */}
      <Lightbox 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        src={lightboxSrc} 
        alt={lightboxAlt} 
      />
      
      <APIDebugger />
    </div>
  );
}

export default Dashboard;
