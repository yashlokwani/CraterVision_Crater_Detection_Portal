const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Gmail configuration for OTP - with error handling
let transporter = null;
try {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.CRATER_GMAIL || 'cratervision.auth@gmail.com',
      pass: process.env.CRATER_GMAIL_PASSWORD || 'your-app-password'
    }
  });
  console.log('✅ Email transporter configured');
} catch (error) {
  console.warn('⚠️ Email transporter setup failed:', error.message);
  console.warn('OTP functionality will be disabled');
}

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map();

// Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP email
async function sendOTPEmail(email, otp, type = 'login') {
  if (!transporter) {
    throw new Error('Email service not configured');
  }

  const mailOptions = {
    from: process.env.CRATER_GMAIL || 'cratervision.auth@gmail.com',
    to: email,
    subject: `CraterVision - Your ${type === 'login' ? 'Login' : 'Signup'} OTP`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">🌙 CraterVision</h1>
          <p style="color: #6b7280; margin: 5px 0;">Crater Detection Portal</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; text-align: center;">
          <h2 style="color: #374151; margin-bottom: 20px;">
            ${type === 'login' ? 'Login' : 'Account'} Verification
          </h2>
          
          <p style="color: #6b7280; margin-bottom: 30px;">
            ${type === 'login' 
              ? 'Enter this code to complete your login:' 
              : 'Enter this code to verify your account:'}
          </p>
          
          <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px dashed #2563eb;">
            <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          
          <p style="color: #ef4444; font-size: 14px; margin-top: 20px;">
            ⏰ This code expires in 5 minutes
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #9ca3af; font-size: 12px;">
          <p>If you didn't request this code, please ignore this email.</p>
          <p>© 2025 CraterVision. Secure crater detection technology.</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working with OTP support' });
});

// Request OTP for login
router.post('/login/request-otp', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Verify user credentials first
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate and store OTP
    const otp = generateOTP();
    const otpKey = `login_${email}`;
    otpStore.set(otpKey, {
      otp,
      userId: user._id,
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, 'login');
      res.json({ 
        message: 'OTP sent to your email. Please verify to complete login.',
        otpSent: true 
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Fallback: allow direct login if email fails
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({
        message: 'Email service unavailable. Login completed.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        otpSent: false
      });
    }
  } catch (err) {
    console.error('Login request OTP error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Verify OTP for login
router.post('/login/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    const otpKey = `login_${email}`;
    const storedOTPData = otpStore.get(otpKey);

    if (!storedOTPData) {
      return res.status(400).json({ message: 'No OTP request found. Please request a new OTP.' });
    }

    if (Date.now() > storedOTPData.expires) {
      otpStore.delete(otpKey);
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }

    if (storedOTPData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // OTP verified, generate token
    otpStore.delete(otpKey);
    const user = await User.findById(storedOTPData.userId);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login verify OTP error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Request OTP for signup
router.post('/signup/request-otp', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Generate and store OTP with user data
    const otp = generateOTP();
    const otpKey = `signup_${email}`;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    otpStore.set(otpKey, {
      otp,
      userData: { name, email, password: hashedPassword },
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, 'signup');
      res.json({ 
        message: 'OTP sent to your email. Please verify to complete registration.',
        otpSent: true 
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Fallback: create account directly if email fails
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.status(201).json({
        message: 'Email service unavailable. Account created successfully.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        otpSent: false
      });
    }
  } catch (err) {
    console.error('Signup request OTP error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Verify OTP for signup
router.post('/signup/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    const otpKey = `signup_${email}`;
    const storedOTPData = otpStore.get(otpKey);

    if (!storedOTPData) {
      return res.status(400).json({ message: 'No OTP request found. Please request a new OTP.' });
    }

    if (Date.now() > storedOTPData.expires) {
      otpStore.delete(otpKey);
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }

    if (storedOTPData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // OTP verified, create user
    otpStore.delete(otpKey);
    const { userData } = storedOTPData;
    const user = new User(userData);
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Account created successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Signup verify OTP error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ user });
  } catch (err) {
    console.error('Get user profile error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;