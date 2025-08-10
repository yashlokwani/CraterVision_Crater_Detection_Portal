import { useState, createContext, useContext, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import api from './api';

// Auth context for simulated login state
const AuthContext = createContext();
function useAuth() { return useContext(AuthContext); }

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// Toast Context and Provider
const ToastContext = createContext();
export function useToast() { return useContext(ToastContext); }
function ToastProvider({ children }) {
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
        <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg text-white font-semibold transition-all ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{toast.message}</div>
      )}
    </ToastContext.Provider>
  );
}

// Lightbox Component
function Lightbox({ open, onClose, src, alt }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={onClose}>
      <div className="relative" onClick={e => e.stopPropagation()}>
        <img src={src} alt={alt} style={{ width: 1024, height: 1024, maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 12 }} />
        <button onClick={onClose} className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full px-3 py-1 text-black font-bold text-lg shadow hover:bg-opacity-100">&times;</button>
      </div>
    </div>
  );
}

function Landing() {
  const { loggedIn } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-center">
      <nav className="w-full flex justify-center items-center p-6 gap-4">
        <span className="text-2xl font-bold text-white text-center">CraterVision</span>
        {loggedIn && <Link to="/dashboard" className="ml-4 text-white underline">Dashboard</Link>}
      </nav>
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg text-center">Detect Lunar Craters with AI</h1>
        <p className="text-xl text-white mb-8 max-w-xl text-center">Upload your lunar images and let our deep learning model highlight craters instantly. Fast, accurate, and easy to use!</p>
        {!loggedIn && (
          <div className="flex flex-col items-center gap-4 w-full">
            <Link to="/login" className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 hover:text-white transition text-lg w-60 text-center">Login</Link>
            <Link to="/signup" className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 hover:text-white transition text-lg w-60 text-center">Sign Up</Link>
          </div>
        )}
      </div>
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
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">Login</h2>
        <form className="flex flex-col gap-4 w-full items-center justify-center" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-center" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-center" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition w-full font-semibold" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}
        <p className="mt-4 text-sm text-gray-600 text-center">Don't have an account? <Link to="/signup" className="text-purple-700 hover:underline">Sign Up</Link></p>
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
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">Sign Up</h2>
        <form className="flex flex-col gap-4 w-full items-center justify-center" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-center" value={name} onChange={e => setName(e.target.value)} />
          <input type="email" placeholder="Email" className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-center" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-center" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition w-full font-semibold" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
        </form>
        {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}
        <p className="mt-4 text-sm text-gray-600 text-center">Already have an account? <Link to="/login" className="text-purple-700 hover:underline">Login</Link></p>
      </div>
    </div>
  );
}

function History() {
  const { loggedIn } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) return;
    const fetchHistory = async () => {
      setError('');
      setLoading(true);
      try {
        const res = await api.get('/api/image/history');
        setHistory(res.data);
      } catch (err) {
        setError('Failed to load history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [loggedIn]);

  if (!loggedIn) return <Navigate to="/login" />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-center">
      <nav className="w-full flex justify-between items-center p-6 gap-4">
        <span className="text-2xl font-bold text-purple-700 text-center cursor-pointer" onClick={() => navigate('/dashboard')}>CraterVision</span>
        <Link to="/dashboard" className="text-purple-700 underline">Dashboard</Link>
      </nav>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">Image History</h2>
        {loading ? (
          <div className="text-purple-700 font-semibold">Loading history...</div>
        ) : error ? (
          <div className="text-red-600 font-semibold">{error}</div>
        ) : history.length === 0 ? (
          <p className="text-gray-500">No uploads yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {history.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center bg-purple-50 rounded p-4 shadow w-full">
                <span className="text-xs text-gray-500 mb-2">{new Date(item.createdAt).toLocaleString()}</span>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  <div>
                    <div className="font-semibold text-purple-700 mb-1">Original</div>
                    <img src={`http://localhost:5000/uploads/${item.originalImage}`} alt="Original" style={{ width: 1024, height: 1024, objectFit: 'cover', maxWidth: '100%', maxHeight: 400, borderRadius: 8, cursor: 'pointer' }} onClick={() => { setLightboxSrc(`http://localhost:5000/uploads/${item.originalImage}`); setLightboxAlt('Original'); setLightboxOpen(true); }} />
                  </div>
                  <div>
                    <div className="font-semibold text-purple-700 mb-1">Predicted</div>
                    <img src={`http://localhost:5000/uploads/${item.predictedImage}`} alt="Predicted" style={{ width: 1024, height: 1024, objectFit: 'cover', maxWidth: '100%', maxHeight: 400, borderRadius: 8, cursor: 'pointer' }} onClick={() => { setLightboxSrc(`http://localhost:5000/uploads/${item.predictedImage}`); setLightboxAlt('Predicted'); setLightboxOpen(true); }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Lightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} src={lightboxSrc} alt={lightboxAlt} />
      </div>
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');
    setLoading(true);
    setPredictedImage(null);
    try {
      const formData = new FormData();
      formData.append('image', image);
      const res = await api.post('/api/image/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Frontend received response:', res.data);
      setPredictedImage(res.data.image.predictedImage);
      setPredictedImageUrl(res.data.predictedImageUrl ? `http://localhost:5000${res.data.predictedImageUrl}` : null);
      setOriginalImageUrl(`http://localhost:5000/uploads/${res.data.image.originalImage}`);
      console.log('Set predicted image URL:', res.data.predictedImageUrl ? `http://localhost:5000${res.data.predictedImageUrl}` : null);
      console.log('Set original image URL:', `http://localhost:5000/uploads/${res.data.image.originalImage}`);
      setHistory([res.data.image, ...history]);
      setImage(null);
      showToast('Image uploaded successfully!', 'success');
    } catch (err) {
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
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-center">
      <button
        onClick={handleLogout}
        className="fixed top-6 right-8 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition font-semibold z-50"
      >
        Logout
      </button>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">Crater Detection Dashboard</h2>
        <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
          <label className="w-full flex flex-col items-center px-4 py-6 bg-purple-50 text-purple-700 rounded-lg shadow-md tracking-wide uppercase border border-purple-300 cursor-pointer hover:bg-purple-100 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" /></svg>
            <span className="mt-2 text-base leading-normal">Select a crater image</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
          {imagePreview && (
            <div className="mb-4">
              <img src={imagePreview} alt="Preview" className="max-h-48 rounded shadow-md mx-auto" />
            </div>
          )}
          <button type="submit" className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition font-semibold disabled:opacity-50" disabled={!image || loading}>
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>
        {uploadError && <div className="mt-4 text-red-600 font-semibold">{uploadError}</div>}
        {loading && <div className="mt-4 text-purple-700 font-semibold">Running model, please wait...</div>}
        
        {/* Show results after prediction */}
        {console.log('Render condition check:', { predictedImage, predictedImageUrl, originalImageUrl })}
        {originalImageUrl && (
          <div className="mt-8 w-full">
            <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">Detection Results</h3>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
              {/* Original Image */}
              <div className="flex flex-col items-center bg-purple-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-600 mb-3">Original Image</h4>
                <img 
                  src={originalImageUrl} 
                  alt="Original" 
                  className="max-h-64 rounded shadow-md border-2 border-purple-200" 
                  onError={(e) => {
                    console.error('Failed to load original image:', e.target.src);
                    e.target.style.display = 'none';
                  }}
                  onLoad={(e) => {
                    console.log('Successfully loaded original image:', e.target.src);
                  }}
                />
              </div>
              
              {/* Predicted Image */}
              <div className="flex flex-col items-center bg-green-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-green-600 mb-3">Predicted Image</h4>
                {(predictedImage || predictedImageUrl) ? (
                  <img 
                    src={(() => {
                      const src = predictedImageUrl ? `http://localhost:5000${predictedImageUrl}` : (predictedImage ? `http://localhost:5000/uploads/${predictedImage}` : '');
                      console.log('Predicted image src:', src);
                      return src;
                    })()}
                    alt="Predicted" 
                    className="max-h-64 rounded shadow-md border-2 border-green-200" 
                    onError={(e) => {
                      console.error('Failed to load predicted image:', e.target.src);
                      e.target.style.display = 'none';
                    }}
                    onLoad={(e) => {
                      console.log('Successfully loaded predicted image:', e.target.src);
                    }}
                  />
                ) : (
                  <div className="max-h-64 w-64 bg-gray-200 rounded shadow-md border-2 border-green-200 flex items-center justify-center">
                    <p className="text-gray-500">Processing...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="mt-8 w-full flex justify-center">
          <Link to="/history" className="text-purple-700 underline font-semibold">View History</Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
