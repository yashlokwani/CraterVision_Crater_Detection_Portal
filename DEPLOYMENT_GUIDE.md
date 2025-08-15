# 🚀 CraterVision Deployment Guide - Vercel + Render (FREE)

## 📋 Architecture Overview
- **Frontend**: React + Vite → Vercel (FREE)
- **Backend**: Node.js + Express → Render (FREE)
- **Python API**: Flask + YOLO → Render (FREE)
- **Database**: MongoDB Atlas (FREE)

---

## 💰 Cost Breakdown
- **Vercel**: $0/month (generous free tier)
- **Render**: $0/month (with sleep after 15min inactivity)
- **MongoDB Atlas**: $0/month (512MB storage)
- **Total**: **COMPLETELY FREE** 🎉

---

## 🔧 Pre-Deployment Setup

### 1. MongoDB Atlas (Database)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create free account → Create cluster
3. **Database Access**: Create user with password
4. **Network Access**: Add IP `0.0.0.0/0` (allow all)
5. **Connect**: Copy connection string
6. Replace `<username>` and `<password>` in connection string

### 2. Gmail App Password (Email Service)
1. Enable 2-factor authentication on Gmail
2. Google Account → Security → 2-Step Verification
3. App passwords → Generate for "Mail"
4. Copy 16-character password

---

## 🚀 Deployment Steps

### Step 1: Deploy Python YOLO API (Render)
1. **Create Render Account**: [render.com](https://render.com)
2. **New Web Service** → Connect GitHub repo
3. **Configuration**:
   - **Name**: `cratervision-yolo-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python yolo_api.py`
   - **Plan**: Free
4. **Environment Variables**:
   ```
   PORT=10000
   FLASK_ENV=production
   ```
5. **Deploy** → Copy the generated URL

### Step 2: Deploy Node.js Backend (Render)
1. **New Web Service** → Connect GitHub repo
2. **Configuration**:
   - **Name**: `cratervision-backend`
   - **Environment**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
3. **Environment Variables**:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
   EMAIL_USER=cratervisionportal@gmail.com
   EMAIL_PASS=your_16_character_gmail_app_password
   NODE_ENV=production
   PORT=10000
   PYTHON_API_URL=https://cratervision-yolo-api.onrender.com
   ```
4. **Deploy** → Copy the generated URL

### Step 3: Deploy Frontend (Vercel)
1. **Create Vercel Account**: [vercel.com](https://vercel.com)
2. **New Project** → Import from GitHub
3. **Configuration**:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Environment Variables**:
   ```
   VITE_API_URL=https://cratervision-backend.onrender.com
   VITE_PYTHON_API_URL=https://cratervision-yolo-api.onrender.com
   ```
5. **Deploy** → Your app is live!

---

## 🔧 Important Configuration Updates

### Update CORS in Backend
Make sure your backend accepts requests from Vercel:

```javascript
// In backend/index.js - Update CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-vercel-app.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

### Update Frontend API URLs
Ensure your frontend uses environment variables:

```javascript
// In your frontend API calls
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const PYTHON_API_URL = import.meta.env.VITE_PYTHON_API_URL || 'http://localhost:5001';
```

---

## 🧪 Testing Your Deployment

### Health Check URLs
- **Python API**: `https://your-python-api.onrender.com/health`
- **Backend**: `https://your-backend.onrender.com/api/health` (if you have one)
- **Frontend**: `https://your-app.vercel.app`

### Full Flow Test
1. ✅ Register new user
2. ✅ Receive OTP email
3. ✅ Verify OTP and login
4. ✅ Upload crater image
5. ✅ See detection results
6. ✅ Check history page
7. ✅ Logout functionality

---

## ⚠️ Free Tier Limitations

### Render Free Tier
- **Sleep after 15 minutes** of inactivity
- **30-60 second cold start** on first request after sleep
- **750 hours/month** of runtime (more than enough)

### Solutions
- Use for **portfolio/demo purposes** (perfect!)
- Add "waking up" message in frontend
- For production: Upgrade to Render paid plan ($7/month)

---

## 🔍 Troubleshooting

### Common Issues
1. **CORS errors**: Check backend CORS configuration
2. **API timeouts**: Render services are waking up (wait 60 seconds)
3. **Database connection**: Verify MongoDB Atlas IP allowlist
4. **Email not sending**: Check Gmail app password
5. **Build failures**: Check logs in Render/Vercel dashboards

### Debug Commands
```bash
# Test locally before deploying
cd backend && npm start          # Test backend
cd frontend && npm run dev       # Test frontend
python yolo_api.py              # Test Python API
```

---

## 🎯 Success Checklist

### Before Deploying
- [ ] MongoDB Atlas cluster created
- [ ] Gmail app password generated
- [ ] All environment variables prepared
- [ ] Code pushed to GitHub

### After Deploying
- [ ] All 3 services deployed successfully
- [ ] Environment variables set correctly
- [ ] Health check URLs working
- [ ] Full user flow tested
- [ ] CORS configured properly

---

## 🔄 Automatic Deployments

Once set up, any push to your GitHub main branch will automatically:
- **Redeploy backend** on Render
- **Redeploy Python API** on Render  
- **Redeploy frontend** on Vercel

---

## 📈 Scaling Options

### When you need production performance:
- **Render**: Upgrade to $7/month (no sleep)
- **Vercel**: Upgrade to Pro $20/month (better performance)
- **MongoDB**: Upgrade to $9/month (more storage)

Your free setup can handle hundreds of users for demos and portfolios!

---

## 🎉 You're All Set!

Your CraterVision project will be live at:
- **Frontend**: `https://your-app.vercel.app`
- **Share your crater detection portfolio** with anyone!
- **Perfect for job applications** and project showcases

Need help with any step? Each platform has excellent documentation and support!
