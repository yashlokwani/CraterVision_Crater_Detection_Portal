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

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Upload image and simulate prediction
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

    // Resize the uploaded image to 1024x1024 using sharp
    const uploadPath = path.join(__dirname, '../uploads');
    const resizedFilename = 'resized-' + req.file.filename;
    const resizedPath = path.join(uploadPath, resizedFilename);
    try {
      await sharp(req.file.path)
        .resize(1024, 1024)
        .toFile(resizedPath);
    } catch (sharpErr) {
      console.error('Sharp resize error:', sharpErr);
      return res.status(500).json({ message: 'Image processing error', error: sharpErr.message });
    }

    // Optionally, remove the original uploaded file to save space
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Failed to delete original file:', err);
        // Not crashing, just logging
      }
    });

    // Send the resized image to the Python YOLO API
    const formData = new FormData();
    formData.append('image', fs.createReadStream(resizedPath));
    let predictionImageBuffer;
    let predictedImageFilename = 'predicted-' + req.file.filename;
    let predictedImagePath = path.join(uploadPath, predictedImageFilename);
    try {
      console.log('Sending image to Python API:', resizedPath);
      const response = await axios.post('http://localhost:5001/predict', formData, {
        headers: formData.getHeaders(),
        responseType: 'arraybuffer',
      });
      predictionImageBuffer = response.data;
      console.log('Received prediction response, buffer size:', predictionImageBuffer.length);
      fs.writeFileSync(predictedImagePath, predictionImageBuffer);
      console.log('Saved predicted image to:', predictedImagePath);
    } catch (err) {
      console.error('Error calling Python API:', err);
      return res.status(500).json({ message: 'Prediction error', error: err.message });
    }

    // Save the predicted image filename in DB
    const newImage = await Image.create({
      user: req.userId,
      originalImage: resizedFilename,
      predictedImage: predictedImageFilename
    });
    
    const responseData = {
      message: 'Image uploaded, processed, and predicted.',
      image: newImage,
      predictedImageUrl: `/uploads/${predictedImageFilename}`
    };
    
    console.log('Sending response to frontend:', responseData);
    res.status(201).json(responseData);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// Get user image history
router.get('/history', auth, async (req, res) => {
  try {
    const images = await Image.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Serve uploaded images statically
router.get('/file/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  res.sendFile(filePath);
});

module.exports = router; 