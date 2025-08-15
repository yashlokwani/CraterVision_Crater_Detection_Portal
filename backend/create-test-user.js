const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import User model
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI;

async function createTestUser() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('⚠️ Test user already exists');
      console.log('📧 Email: test@example.com');
      console.log('🔑 Password: testpassword');
      process.exit(0);
    }

    // Create test user
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword
    });

    console.log('✅ Test user created successfully!');
    console.log('📧 Email: test@example.com');
    console.log('🔑 Password: testpassword');
    console.log('🆔 User ID:', testUser._id);

  } catch (err) {
    console.error('❌ Error creating test user:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

createTestUser();
