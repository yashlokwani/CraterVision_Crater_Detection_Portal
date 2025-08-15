import React, { useState } from 'react';
import { getApiUrl } from '../../config/api';

export default function APIDebugger() {
  const [isOpen, setIsOpen] = useState(false);
  const [healthStatus, setHealthStatus] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }]);
  };

  const runHealthCheck = async () => {
    try {
      addLog('Starting health check...', 'info');
      
      const response = await fetch(getApiUrl('/api/health'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setHealthStatus(true);
        addLog('Health check passed', 'success');
      } else {
        setHealthStatus(false);
        addLog('Health check failed', 'error');
      }
    } catch (error) {
      setHealthStatus(false);
      addLog(`Health check error: ${error.message}`, 'error');
    }
  };

  const testBackendConnection = async () => {
    try {
      addLog('Testing backend connection...', 'info');
      const response = await fetch(getApiUrl(''));
      addLog(`Backend responded with status: ${response.status}`, response.ok ? 'success' : 'error');
    } catch (error) {
      addLog(`Backend connection failed: ${error.message}`, 'error');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-red-500 text-white p-2 rounded-full shadow-lg z-50 hover:bg-red-600 transition-colors"
        title="Open API Debugger"
      >
        🔧
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-xl p-4 w-96 max-h-96 overflow-hidden z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">API Debugger</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <button
          onClick={runHealthCheck}
          className="w-full bg-blue-500 text-white p-2 rounded text-sm hover:bg-blue-600 transition-colors"
        >
          Health Check
        </button>
        <button
          onClick={testBackendConnection}
          className="w-full bg-green-500 text-white p-2 rounded text-sm hover:bg-green-600 transition-colors"
        >
          Test Backend
        </button>
      </div>

      {healthStatus !== null && (
        <div className={`p-2 rounded mb-2 ${healthStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          Backend: {healthStatus ? 'Healthy ✅' : 'Unhealthy ❌'}
        </div>
      )}

      <div className="max-h-32 overflow-y-auto border rounded p-2 text-xs bg-gray-50">
        {logs.length === 0 ? (
          <p className="text-gray-500">No logs yet. Click a test button above.</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className={`mb-1 ${
              log.type === 'error' ? 'text-red-600' : 
              log.type === 'success' ? 'text-green-600' : 'text-gray-600'
            }`}>
              <span className="font-mono">{log.timestamp}</span> - {log.message}
            </div>
          ))
        )}
      </div>
      
      <button
        onClick={() => setLogs([])}
        className="w-full mt-2 bg-gray-500 text-white p-1 rounded text-xs hover:bg-gray-600 transition-colors"
      >
        Clear Logs
      </button>
    </div>
  );
};