@echo off
echo 🚀 Vercel Frontend Deployment Fix
echo =================================
echo.
echo ❌ Problem: "Command 'cd frontend && npm install' exited with 1"
echo ✅ Solution: Set correct Root Directory in Vercel
echo.
echo 📋 Steps to fix in Vercel dashboard:
echo 1. Go to your project in Vercel
echo 2. Click "Settings" tab
echo 3. Go to "General" section
echo 4. Set Root Directory to: frontend
echo 5. Set Framework Preset to: Vite
echo 6. Build settings should auto-detect:
echo    - Build Command: npm run build
echo    - Output Directory: dist
echo    - Install Command: npm install
echo 7. Click "Save"
echo 8. Go to "Deployments" tab
echo 9. Click "Redeploy" on latest deployment
echo.
echo 💡 Key point: Root Directory MUST be set to "frontend"
echo 💡 This tells Vercel to run commands inside the frontend folder
echo.
echo 🔧 Alternative: Use Vercel CLI
echo 1. npm i -g vercel
echo 2. cd frontend
echo 3. vercel --prod
echo.
pause
