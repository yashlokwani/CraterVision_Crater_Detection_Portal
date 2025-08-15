@echo off
echo 🔧 Fixing backend dependencies...

cd /d "C:\Users\Yash\Desktop\crate\backend"

echo 📦 Removing node_modules...
if exist node_modules rmdir /s /q node_modules

echo 🗑️ Removing package-lock.json...
if exist package-lock.json del package-lock.json

echo 📥 Installing dependencies...
npm install

echo ✅ Dependencies fixed! 
echo 🚀 Starting the backend...
npm run dev

pause
