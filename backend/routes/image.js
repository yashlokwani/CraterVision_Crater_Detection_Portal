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
    // Simulate prediction: just use the same image as predicted
    const newImage = await Image.create({
      user: req.userId,
      originalImage: req.file.filename,
      predictedImage: req.file.filename
    });
    res.status(201).json({
      message: 'Image uploaded and predicted (simulated).',
      image: newImage
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
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