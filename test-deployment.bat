@echo off
echo 🧪 Testing CraterVision Deployment
echo.
echo 📡 Testing Python API...
curl -s https://cratervision-yolo-api.onrender.com/ || echo "Python API test failed"
echo.
echo 📡 Testing Backend API...
curl -s https://cratervision-backend.onrender.com/api/debug || echo "Backend API test failed"
echo.
echo 📡 Testing Frontend...
echo Frontend should be available at: https://your-vercel-app.vercel.app
echo.
echo ✅ If all tests pass, your deployment is ready!
echo 🔧 If Python API works but uploads fail, you need to add PYTHON_API_URL to backend environment
echo.
pause
