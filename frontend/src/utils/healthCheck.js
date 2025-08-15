import api from '../api';

export const checkBackendHealth = async () => {
  try {
    console.log('🔍 Checking backend health...');
    
    const response = await fetch('http://localhost:5000/api/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      console.log('✅ Backend is healthy');
      return true;
    } else {
      console.error('❌ Backend health check failed:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    return false;
  }
};

export const testApiEndpoints = async () => {
  const endpoints = [
    { name: 'Health Check', url: '/api/health', method: 'GET' },
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`🧪 Testing ${endpoint.name}...`);
      await api.request({
        method: endpoint.method,
        url: endpoint.url,
      });
      console.log(`✅ ${endpoint.name} - OK`);
    } catch (error) {
      console.error(`❌ ${endpoint.name} - Failed:`, error.response?.status || error.message);
    }
  }
};