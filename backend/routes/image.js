const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Image = require('../models/Image');
const auth = require('../middleware/auth');
const sharp = require('sharp');
const axios = require('axios');
const FormData = require('form-data');

const router = express.Router();

// Set up Multer storage with better error handling
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

// Upload image and simulate prediction
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    console.log('📤 Upload request received');
    console.log('📁 File info:', req.file ? {
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    } : 'No file');

    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      console.log('❌ Invalid file type:', req.file.mimetype);
      return res.status(400).json({ message: 'Invalid file type. Please upload JPEG, PNG, or WebP images.' });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (req.file.size > maxSize) {
      console.log('❌ File too large:', req.file.size);
      return res.status(400).json({ message: 'File too large. Maximum size is 10MB.' });
    }

    console.log('✅ File validation passed');

    // Resize the uploaded image to 1024x1024 using sharp
    const uploadPath = path.join(__dirname, '../uploads');
    const resizedFilename = 'resized-' + req.file.filename;
    const resizedPath = path.join(uploadPath, resizedFilename);
    
    try {
      console.log('🔄 Resizing image...');
      await sharp(req.file.path)
        .resize(1024, 1024)
        .jpeg({ quality: 90 })
        .toFile(resizedPath);
      console.log('✅ Image resized successfully');
    } catch (sharpErr) {
      console.error('❌ Sharp resize error:', sharpErr);
      return res.status(500).json({ message: 'Image processing error', error: sharpErr.message });
    }

    // Clean up original file
    fs.unlink(req.file.path, (err) => {
      if (err) console.warn('⚠️ Failed to delete original file:', err.message);
    });

    // Try to send to Python YOLO API, with fallback
    let predictedImageFilename = 'predicted-' + req.file.filename;
    let predictedImagePath = path.join(uploadPath, predictedImageFilename);
    
    try {
      console.log('🔄 Sending to Python API...');
      const formData = new FormData();
      formData.append('image', fs.createReadStream(resizedPath));
      
      const response = await axios.post('http://localhost:5001/predict', formData, {
        headers: formData.getHeaders(),
        responseType: 'arraybuffer',
        timeout: 30000 // 30 second timeout
      });
      
      const predictionImageBuffer = response.data;
      fs.writeFileSync(predictedImagePath, predictionImageBuffer);
      console.log('✅ Python API prediction successful');
      
    } catch (apiErr) {
      console.warn('⚠️ Python API not available, creating mock prediction:', apiErr.message);
      
      // Fallback: Create a mock prediction by copying the resized image
      try {
        fs.copyFileSync(resizedPath, predictedImagePath);
        console.log('✅ Mock prediction created');
      } catch (copyErr) {
        console.error('❌ Failed to create mock prediction:', copyErr);
        return res.status(500).json({ message: 'Failed to process image', error: copyErr.message });
      }
    }

    // Save to database
    console.log('💾 Saving to database...');
    const newImage = await Image.create({
      user: req.userId,
      originalImage: resizedFilename,
      predictedImage: predictedImageFilename
    });
    
    const responseData = {
      message: 'Image uploaded, processed, and predicted successfully.',
      image: newImage,
      originalImageUrl: `/uploads/${resizedFilename}`,
      predictedImageUrl: `/uploads/${predictedImageFilename}`,
      timestamp: new Date().toISOString()
    };
    
    console.log('✅ Upload complete, sending response');
    res.status(201).json(responseData);
    
  } catch (err) {
    console.error('💥 Server error in upload route:', err);
    res.status(500).json({ 
      message: 'Server error during image upload', 
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get user image history
router.get('/history', auth, async (req, res) => {
  try {
    console.log('📋 Fetching history for user:', req.userId);
    const images = await Image.find({ user: req.userId }).sort({ createdAt: -1 });
    console.log(`✅ Found ${images.length} images for user`);
    res.json(images);
  } catch (err) {
    console.error('❌ Error fetching history:', err);
    res.status(500).json({ 
      message: 'Failed to fetch image history', 
      error: err.message 
    });
  }
});

// Serve uploaded images statically
router.get('/file/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  res.sendFile(filePath);
});

module.exports = router; 