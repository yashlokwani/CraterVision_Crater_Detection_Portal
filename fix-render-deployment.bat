@echo off
echo 🛠️ RENDER PYTHON API DEPLOYMENT FIX
echo ===================================
echo.
echo 🎯 Let's fix your Python API deployment step by step:
echo.
echo STEP 1: Check if best.pt model file exists
echo ------------------------------------------
if exist "best.pt" (
    echo ✅ best.pt found in project root
    for %%A in (best.pt) do echo    File size: %%~zA bytes
) else (
    echo ❌ best.pt NOT found in project root
    echo 💡 This is likely the main issue!
    echo    Solution: Copy your YOLO model file to project root
    goto :missing_model
)
echo.

echo STEP 2: Verify all required files exist
echo ----------------------------------------
if exist "yolo_api.py" (echo ✅ yolo_api.py found) else (echo ❌ yolo_api.py missing)
if exist "requirements.txt" (echo ✅ requirements.txt found) else (echo ❌ requirements.txt missing)
if exist "Procfile" (echo ✅ Procfile found) else (echo ❌ Procfile missing)
echo.

echo STEP 3: Check Python API syntax
echo --------------------------------
echo Checking Python syntax...
python -m py_compile yolo_api.py
if %errorlevel%==0 (
    echo ✅ Python syntax is valid
) else (
    echo ❌ Python syntax errors found
    echo    Fix syntax errors before deploying
    goto :syntax_error
)
echo.

echo STEP 4: Test local imports
echo ---------------------------
echo Testing if all imports work...
python -c "import flask; import torch; import cv2; import numpy; from ultralytics import YOLO; print('✅ All imports successful')" 2>nul
if %errorlevel%==0 (
    echo ✅ All dependencies available locally
) else (
    echo ⚠️ Some imports failed locally
    echo    This might also fail on Render
)
echo.

echo 📋 DEPLOYMENT CHECKLIST - Verify these in Render:
echo.
echo Service Configuration:
echo □ Environment: Python 3
echo □ Build Command: pip install -r requirements.txt
echo □ Start Command: python yolo_api.py
echo □ Auto-Deploy: Enabled (optional)
echo.
echo Repository Files:
echo □ All files committed and pushed to GitHub
echo □ best.pt file included (check Git LFS if too large)
echo □ No syntax errors in Python files
echo.
echo Environment Variables (if needed):
echo □ PORT=10001 (optional, auto-set by Render)
echo □ Any custom environment variables
echo.
echo 🚀 NEXT ACTIONS:
echo 1. Go to Render Dashboard
echo 2. Find your Python service
echo 3. Click "Manual Deploy" → "Deploy latest commit"
echo 4. Watch the build logs for any errors
echo 5. Once deployed, test: https://your-service.onrender.com/health
echo.
echo If deployment still fails, check the logs in Render for specific error messages.
echo.
goto :end

:missing_model
echo.
echo 🚨 CRITICAL: best.pt model file missing!
echo.
echo This is likely why your deployment is failing.
echo The YOLO model needs this file to load.
echo.
echo Solutions:
echo 1. Copy your trained model file to this directory as "best.pt"
echo 2. If file is too large for GitHub (^>100MB):
echo    - Use Git LFS: git lfs track "*.pt"
echo    - Or upload to cloud storage and modify code to download it
echo 3. Make sure the filename is exactly "best.pt"
echo.
goto :end

:syntax_error
echo.
echo 🚨 SYNTAX ERRORS in Python code!
echo.
echo Fix these errors before deploying:
echo 1. Check yolo_api.py for syntax issues
echo 2. Ensure proper indentation
echo 3. Check for missing imports or typos
echo.

:end
pause
