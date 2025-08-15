// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const PYTHON_API_URL = import.meta.env.VITE_PYTHON_API_URL || 'http://localhost:5001';

// Helper function to get full upload URL
export const getUploadUrl = (filename) => {
  return `${API_URL}/uploads/${filename}`;
};

// Helper function to get API endpoint URL
export const getApiUrl = (endpoint) => {
  return `${API_URL}${endpoint}`;
};
