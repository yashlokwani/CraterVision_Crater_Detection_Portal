import { useState, createContext, useContext, useEffect } from 'react';
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

function Dashboard() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictedImage, setPredictedImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [historyError, setHistoryError] = useState('');
  const { loggedIn, setLoggedIn } = useAuth();
  const navigate = useNavigate();

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
      setPredictedImage(res.data.image.predictedImage);
      setHistory([res.data.image, ...history]);
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      setUploadError(err.response?.data?.message || 'Upload failed.');
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
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-2xl flex flex-col items-center justify-center">
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
        {predictedImage && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-purple-700 mb-2">Predicted Image</h3>
            <img src={`http://localhost:5000/uploads/${predictedImage}`} alt="Predicted" className="max-h-48 rounded shadow-md mx-auto" />
          </div>
        )}
        <div className="mt-8 w-full">
          <h3 className="text-lg font-bold text-purple-700 mb-2">History</h3>
          {historyError && <div className="text-red-600">{historyError}</div>}
          {history.length === 0 ? (
            <p className="text-gray-500">No uploads yet.</p>
          ) : (
            <ul className="space-y-4">
              {history.map((item, idx) => (
                <li key={idx} className="flex flex-col md:flex-row items-center justify-between bg-purple-50 rounded p-3 shadow">
                  <div className="flex items-center gap-4">
                    <img src={`http://localhost:5000/uploads/${item.originalImage}`} alt="Original" className="h-12 w-12 object-cover rounded" />
                    <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</span>
                  </div>
                  <img src={`http://localhost:5000/uploads/${item.predictedImage}`} alt="Predicted" className="h-12 w-12 object-cover rounded mt-2 md:mt-0" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
