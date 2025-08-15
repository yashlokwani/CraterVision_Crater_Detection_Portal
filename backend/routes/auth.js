const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Signup without OTP (simplified)
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      console.log('Missing fields:', { name: !!name, email: !!email, password: !!password });
      return res.status(400).json({ message: 'All fields are required.' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already exists:', email);
      return res.status(400).json({ message: 'Email already in use.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    console.log('User created successfully:', user._id);

    // Generate JWT token immediately without OTP
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });
    
    res.status(201).json({ 
      message: 'Signup successful.',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Login without OTP (simplified)
router.post('/login', async (req, res) => {
  try {
    console.log('🔑 Login request received:', { email: req.body.email, hasPassword: !!req.body.password });
    const { email, password } = req.body;
    
    if (!email || !password) {
      console.log('❌ Missing fields:', { email: !!email, password: !!password });
      return res.status(400).json({ message: 'All fields are required.' });
    }
    
    console.log('🔍 Looking for user with email:', email);
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ User not found in database');
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    
    console.log('✅ User found:', { id: user._id, name: user.name, email: user.email });
    console.log('🔐 Comparing passwords...');
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔍 Password match result:', isMatch);
    
    if (!isMatch) {
      console.log('❌ Password does not match');
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    
    console.log('✅ Login successful, generating token...');
    
    // Generate JWT token immediately without OTP
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });
    
    console.log('🎉 Login completed successfully');
    res.json({ 
      message: 'Login successful.',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('💥 Login error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Get current user profile (for token validation)
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Debug endpoint to check users (remove in production)
router.get('/debug/users', async (req, res) => {
  try {
    const users = await User.find({}, 'name email createdAt');
    res.json({ 
      message: 'Users in database',
      count: users.length,
      users: users
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users: ' + err.message });
  }
});

module.exports = router; 