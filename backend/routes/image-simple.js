const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Image = require('../models/Image');
const auth = require('../middleware/auth');

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'), false);
    }
  }
});

// Simple upload route for testing
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    console.log('Upload request received');
    console.log('User ID:', req.userId);
    console.log('File info:', req.file ? req.file.filename : 'No file');

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Save to database without complex processing
    const newImage = await Image.create({
      user: req.userId,
      originalImage: req.file.filename,
      predictedImage: req.file.filename
    });
    
    console.log('Image saved to database');
    
    res.status(201).json({
      message: 'Image uploaded successfully.',
      image: newImage,
      originalImageUrl: `/uploads/${req.file.filename}`,
      predictedImageUrl: `/uploads/${req.file.filename}`
    });
    
  } catch (err) {
    console.error('Upload error:', err);
    console.error('Error details:', err.message);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
      message: 'Server error during image upload', 
      error: err.message
    });
  }
});

// Get user image history
router.get('/history', auth, async (req, res) => {
  try {
    console.log('Fetching history for user:', req.userId);
    const images = await Image.find({ user: req.userId }).sort({ createdAt: -1 });
    console.log(`Found ${images.length} images for user`);
    res.json(images);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ 
      message: 'Failed to fetch image history', 
      error: err.message 
    });
  }
});

// Serve uploaded images statically
router.get('/file/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

module.exports = router;
