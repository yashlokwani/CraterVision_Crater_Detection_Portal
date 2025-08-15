#!/bin/bash

echo "🚀 CraterVision Deployment Checklist"
echo "===================================="

echo "📋 Pre-deployment checklist:"
echo "  1. MongoDB Atlas cluster created? [Y/N]"
echo "  2. Gmail app password generated? [Y/N]"
echo "  3. Code pushed to GitHub? [Y/N]"
echo "  4. Environment variables ready? [Y/N]"

echo ""
echo "🔧 Files created for deployment:"
echo "  ✅ Procfile (Python API)"
echo "  ✅ backend/Procfile (Node.js backend)"
echo "  ✅ vercel.json (Frontend config)"
echo "  ✅ requirements.txt (Updated with CORS)"
echo "  ✅ .env.example (Environment template)"
echo "  ✅ DEPLOYMENT_GUIDE.md (Step-by-step guide)"

echo ""
echo "🌐 Deployment order:"
echo "  1. Deploy Python API to Render"
echo "  2. Deploy Backend to Render" 
echo "  3. Deploy Frontend to Vercel"

echo ""
echo "📖 Next steps:"
echo "  1. Read DEPLOYMENT_GUIDE.md"
echo "  2. Set up MongoDB Atlas"
echo "  3. Follow the deployment steps"

echo ""
echo "🎉 Your project is ready for deployment!"
