@echo off
echo 🔍 Checking CraterVision Backend Status...
echo.

echo 📡 Testing if backend server is running...
curl -s http://localhost:5000/api/health 2>nul
if %errorlevel%==0 (
    echo ✅ Backend server is running
) else (
    echo ❌ Backend server is NOT running
    echo 💡 Please start the backend server first
    goto :end
)

echo.
echo 🗄️ Testing database connection...
curl -s http://localhost:5000/api/db-test 2>nul
if %errorlevel%==0 (
    echo ✅ Database connection test passed
) else (
    echo ❌ Database connection test failed
)

echo.
echo 👥 Checking users in database...
curl -s http://localhost:5000/api/auth/debug/users 2>nul
if %errorlevel%==0 (
    echo ✅ User check completed - see response above
) else (
    echo ❌ Could not check users
)

echo.
echo 🧪 Creating test user if needed...
cd /d "C:\Users\Yash\Desktop\crate\backend"
node create-test-user.js

:end
echo.
echo 🎯 Status check complete!
echo 💡 If backend is not running, use: npm run dev
pause
