@echo off
echo 🚀 Render Backend Deployment Fix
echo ================================
echo.
echo ❌ Problem: "nodemon: not found" error
echo ✅ Solution: Use "npm start" instead of "npm run dev"
echo.
echo 📋 Steps to fix in Render dashboard:
echo 1. Go to your backend service
echo 2. Click "Settings" tab
echo 3. Scroll to "Build & Deploy"
echo 4. Set Start Command to: npm start
echo 5. Set Build Command to: npm install
echo 6. Click "Save Changes"
echo 7. Click "Manual Deploy" → "Deploy latest commit"
echo.
echo 💡 Pro tip: "npm start" uses "node index.js" which works in production
echo 💡 "npm run dev" uses "nodemon" which is only for development
echo.
echo 🔧 Alternative: Create render.yaml in your root directory:
echo services:
echo   - type: web
echo     name: cratervision-backend
echo     env: node
echo     plan: free
echo     buildCommand: npm install
echo     startCommand: npm start
echo     rootDir: backend
echo.
pause
