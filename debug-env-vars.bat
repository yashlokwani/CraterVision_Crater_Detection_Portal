@echo off
echo 🔧 Debug Backend Environment Variables
echo.
echo 📋 Checking current backend configuration...
echo.

REM Test what the backend is actually trying to connect to
echo 📡 Testing backend status:
curl -s "https://cratervision-backend.onrender.com/api/debug" | findstr "status\|error" || echo "Backend not responding"
echo.

echo 🐍 Testing Python API directly:
curl -s "https://cratervision-yolo-api.onrender.com/" | findstr "status\|message" || echo "Python API not responding"
echo.

echo 🔍 Common Issues:
echo 1. Environment variable name: Must be exactly "PYTHON_API_URL"
echo 2. Environment variable value: Must be "https://cratervision-yolo-api.onrender.com" 
echo 3. Backend must be redeployed after adding environment variable
echo 4. Both services must be in "Live" status on Render
echo.

echo 💡 To verify environment variable is working:
echo Check Render backend logs for: "Python API URL: https://cratervision-yolo-api.onrender.com"
echo.
pause
