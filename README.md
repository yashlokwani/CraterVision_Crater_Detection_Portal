# Crater Detection Application

A full-stack application for detecting craters in satellite images using YOLO (You Only Look Once) object detection.

## 🏗️ Architecture

- **Frontend**: React.js with Vite
- **Backend**: Node.js/Express.js with MongoDB
- **AI Model**: YOLO v8 with custom training (`best.pt`)
- **Python API**: Flask server for YOLO inference

## 📁 Project Structure

```
crate/
├── frontend/          # React frontend
├── backend/           # Node.js backend
├── yolo_api.py        # Python YOLO API
├── best.pt           # YOLO model file
├── requirements.txt   # Python dependencies
└── start_services.py  # Service startup script
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- MongoDB (local or Atlas)
- Your `best.pt` model file

### Setup

1. **Place your model file**:
   ```
   # Copy your best.pt file to the project root
   cp /path/to/your/best.pt ./best.pt
   ```

2. **Start all services**:
   ```bash
   python start_services.py
   ```

   This will:
   - Install Python dependencies
   - Install Node.js dependencies
   - Start Python YOLO API (port 5001)
   - Start Node.js backend (port 5000)
   - Start React frontend (port 5173)

### Manual Setup (Alternative)

If you prefer to start services manually:

1. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Start Python YOLO API**:
   ```bash
   python yolo_api.py
   ```

3. **Install Node.js dependencies**:
   ```bash
   cd backend
   npm install
   ```

4. **Start Node.js backend**:
   ```bash
   cd backend
   npm run dev
   ```

5. **Start React frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Model Configuration

The YOLO model expects:
- Input size: 1024x1024 pixels
- Format: RGB images
- Output: Bounding boxes with confidence scores

## 📱 Usage

1. **Access the application**: http://localhost:5173
2. **Register/Login**: Create an account or sign in
3. **Upload images**: Upload satellite images for crater detection
4. **View results**: See detected craters with confidence scores

## 🔍 API Endpoints

### Node.js Backend (Port 5000)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/image/upload` - Upload and process images
- `GET /api/image/history` - Get user's image history

### Python YOLO API (Port 5001)
- `POST /predict` - Process image and return predictions

## 🛠️ Development

### Adding New Features

1. **Frontend**: Edit files in `frontend/src/`
2. **Backend**: Edit files in `backend/`
3. **YOLO API**: Edit `yolo_api.py`

### Model Updates

To use a different YOLO model:
1. Replace `best.pt` with your new model
2. Update the model loading code in `yolo_api.py` if needed
3. Adjust post-processing if the output format changes

## 🐛 Troubleshooting

### Common Issues

1. **Model not found**: Ensure `best.pt` is in the project root
2. **Port conflicts**: Check if ports 5000, 5001, or 5173 are in use
3. **Dependencies**: Run `pip install -r requirements.txt` and `npm install` in backend
4. **MongoDB**: Ensure your MongoDB connection string is correct

### Logs

- **Python API**: Check console output for YOLO inference logs
- **Node.js**: Check console output for backend logs
- **Frontend**: Check browser console for frontend logs

## 📊 Performance

- **Inference time**: ~1-3 seconds per image (depending on hardware)
- **Memory usage**: ~2-4GB RAM (with GPU acceleration)
- **Supported formats**: JPEG, PNG, BMP

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 