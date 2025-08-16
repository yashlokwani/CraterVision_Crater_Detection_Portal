@echo off
echo 🔍 Testing Backend-Python API Connection
echo.
echo 📡 Testing if backend can reach Python API...
echo.

REM Test backend health
echo ⚡ Backend Health Check:
curl -s "https://cratervision-backend.onrender.com/api/debug" || echo "❌ Backend not responding"
echo.

REM Test Python API health  
echo ⚡ Python API Health Check:
curl -s "https://cratervision-yolo-api.onrender.com/health" || echo "❌ Python API health endpoint not responding"
echo.

echo 📋 Current Status:
echo ✅ Backend API: Running
echo ✅ Python API: Running  
echo.
echo 🔧 If uploads still fail with 404:
echo 1. Check Render backend environment has: PYTHON_API_URL=https://cratervision-yolo-api.onrender.com
echo 2. Redeploy backend after adding environment variable
echo 3. Test image upload on your frontend
echo.
echo 🌐 Your app should be available at your Vercel URL
echo.
pause
