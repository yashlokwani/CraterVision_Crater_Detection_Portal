# 🐍 Python API Deployment Troubleshooting Guide

## 🔍 Step 1: Check Current Deployment Status

### In Render Dashboard:
1. Go to [render.com](https://render.com) → Dashboard
2. Find your Python API service
3. Check the status indicator:
   - 🟢 **Live** = Service is running
   - 🔴 **Failed** = Deployment failed
   - 🟡 **Building** = Currently deploying
   - ⚪ **Sleeping** = Service is inactive (free tier)

### If Status is Failed/Red:
- Click on the service → Go to "Logs" tab
- Look for error messages in the build/deploy logs
- Common errors: Module not found, file not found, syntax errors

## 🔧 Step 2: Verify Deployment Configuration

### Service Settings Should Be:
- **Environment**: Python 3
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `python yolo_api.py`
- **Plan**: Free (or paid)

### Required Files in Repository Root:
- ✅ `yolo_api.py` (Python Flask app)
- ✅ `requirements.txt` (Python dependencies)
- ✅ `Procfile` (Render configuration)
- ✅ `best.pt` (YOLO model file)

## 📦 Step 3: Check Required Files Content

### Procfile Content:
```
web: python yolo_api.py
```

### requirements.txt Content:
```
flask==2.3.3
flask-cors==4.0.0
torch>=2.0.0
torchvision>=0.15.0
ultralytics>=8.0.0
opencv-python>=4.8.0
pillow>=9.5.0
numpy>=1.24.0
gunicorn==21.2.0
```

## 🚨 Common Issues & Solutions

### Issue 1: "Module not found" errors
**Cause**: Missing dependencies in requirements.txt
**Solution**: 
- Add missing modules to requirements.txt
- Redeploy service

### Issue 2: "best.pt not found"
**Cause**: YOLO model file not uploaded
**Solution**: 
- Ensure best.pt is in repository root
- Check file size (GitHub/Render limits)
- Consider using Git LFS for large files

### Issue 3: "Port binding failed"
**Cause**: App not listening on correct port
**Solution**: 
- Ensure: `port = int(os.environ.get('PORT', 5001))`
- Ensure: `app.run(host='0.0.0.0', port=port)`

### Issue 4: Import errors with cv2/torch
**Cause**: System dependencies missing
**Solution**: 
- Add system packages if needed
- Use opencv-python-headless instead of opencv-python

## 🔄 Step 4: Redeploy with Fixes

1. Make necessary changes to files
2. Commit and push to GitHub
3. In Render: Manual Deploy → Deploy latest commit
4. Watch build logs for errors
5. Test endpoints once deployed

## 🧪 Step 5: Test Deployment

### Test URLs (replace with your actual service URL):
1. **Root**: `https://your-service.onrender.com/`
2. **Health**: `https://your-service.onrender.com/health`
3. **Predict**: Use curl or Postman to POST an image

### Expected Responses:
1. **Root**: Service info JSON
2. **Health**: `{"status":"healthy","service":"YOLO API","model_loaded":true}`
3. **Predict**: Processed image with crater detections
