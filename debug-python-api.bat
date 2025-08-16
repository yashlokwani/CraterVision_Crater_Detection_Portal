@echo off
echo � TROUBLESHOOTING 404 ERROR - Python API Not Found
echo ===================================================
echo.
echo � Step 1: Check if Python API service exists
echo ---------------------------------------------
echo Go to your Render dashboard and verify:
echo 1. Python API service is deployed
echo 2. Service status shows "Live" (green)
echo 3. Copy the exact service URL
echo.
echo 📍 Step 2: Test the root endpoint
echo --------------------------------
echo Try this URL in your browser first:
echo https://your-python-api-name.onrender.com
echo.
echo Expected: Should show some response (not 404)
echo If 404: Service not deployed correctly
echo.
echo 📍 Step 3: Test the health endpoint
echo ----------------------------------
echo Try this URL in your browser:
echo https://your-python-api-name.onrender.com/health
echo.
echo Expected: {"status":"healthy","service":"YOLO API","model_loaded":true}
echo If 404: Python API routes not working
echo.
echo 📍 Step 4: Check Python API deployment
echo --------------------------------------
echo In Render Python service dashboard:
echo 1. Go to "Logs" tab
echo 2. Look for startup messages
echo 3. Should see: "Running on http://0.0.0.0:XXXX"
echo 4. Should NOT see: Import errors, module not found, etc.
echo.
echo 🔧 COMMON FIXES for 404:
echo.
echo Fix 1: Redeploy Python Service
echo - Go to Render Python service
echo - Click "Manual Deploy" → "Deploy latest commit"
echo - Wait for deployment to complete
echo.
echo Fix 2: Check Procfile
echo - Ensure you have Procfile in root directory
echo - Content should be: web: python yolo_api.py
echo.
echo Fix 3: Check Python Service Configuration
echo - Build Command: pip install -r requirements.txt
echo - Start Command: python yolo_api.py
echo - Environment: Python 3
echo.
echo Fix 4: Check requirements.txt
echo - Must include: flask, flask-cors, ultralytics, etc.
echo - Should be in root directory with yolo_api.py
echo.
echo 📋 Debug Checklist:
echo □ Python service shows "Live" status in Render
echo □ Root URL responds (not 404)
echo □ /health endpoint responds with JSON
echo □ No import errors in service logs
echo □ PYTHON_API_URL set correctly in backend
echo □ Backend service redeployed after setting env var
echo.
echo 💡 Most likely issue: Python service failed to deploy
echo    Solution: Check Render Python service logs for errors
echo.
pause
