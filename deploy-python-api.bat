@echo off
echo 🚀 CraterVision Python API Deployment Helper
echo.
echo 📋 Follow these steps to deploy your Python API:
echo.
echo 1. Go to: https://dashboard.render.com/
echo 2. Click "New +" → "Web Service"
echo 3. Connect GitHub repository: yashlokwani/CraterVision_Crater_Detection_Portal
echo.
echo 📝 Service Configuration:
echo    Name: cratervision-yolo-api
echo    Environment: Python 3
echo    Root Directory: (leave blank - uses root)
echo    Build Command: pip install -r requirements.txt
echo    Start Command: python yolo_api.py
echo    Plan: Free
echo.
echo 🔧 Environment Variables to set:
echo    PORT = 10001
echo    FLASK_ENV = production
echo.
echo ⚡ After Python API is deployed:
echo    1. Go to your backend service (cratervision-backend)
echo    2. Environment tab → Add Variable
echo    3. PYTHON_API_URL = https://cratervision-yolo-api.onrender.com
echo    4. Redeploy backend
echo.
echo 🎯 Your Python API will be available at:
echo    https://cratervision-yolo-api.onrender.com
echo.
echo ✅ Test URL after deployment:
echo    https://cratervision-yolo-api.onrender.com/
echo.
pause
