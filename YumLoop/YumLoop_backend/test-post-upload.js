import cloudinary from './utils/cloudinary.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

console.log('Testing Post Upload functionality...');
console.log('Cloudinary Config:');
console.log('- Cloud Name:', process.env.CLOUD_NAME);
console.log('- API Key:', process.env.API_KEY);
console.log('- API Secret:', process.env.API_SECRET ? '***' + process.env.API_SECRET.slice(-4) : 'NOT SET');

// Test if uploads directory exists
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  console.log('❌ Uploads directory does not exist');
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
} else {
  console.log('✅ Uploads directory exists');
}

// Create a test file
const testFilePath = path.join(uploadsDir, 'test-image.txt');
fs.writeFileSync(testFilePath, 'This is a test file for upload');

console.log('✅ Created test file:', testFilePath);

try {
  // Test Cloudinary connection
  console.log('\nTesting Cloudinary connection...');
  const pingResult = await cloudinary.api.ping();
  console.log('✅ Cloudinary ping successful:', pingResult);
  
  // Test file upload to Cloudinary
  console.log('\nTesting file upload to Cloudinary...');
  const uploadResult = await cloudinary.uploader.upload(testFilePath, {
    folder: 'yumloop/posts',
    quality: 'auto',
    format: 'auto'
  });
  
  console.log('✅ File upload successful:');
  console.log('- Public ID:', uploadResult.public_id);
  console.log('- URL:', uploadResult.secure_url);
  
  // Clean up test file from Cloudinary
  await cloudinary.uploader.destroy(uploadResult.public_id);
  console.log('✅ Test file cleaned up from Cloudinary');
  
  // Clean up local test file
  fs.unlinkSync(testFilePath);
  console.log('✅ Local test file cleaned up');
  
} catch (error) {
  console.error('❌ Test failed:', error.message);
  console.error('Full error:', error);
  
  // Clean up local test file if it exists
  if (fs.existsSync(testFilePath)) {
    fs.unlinkSync(testFilePath);
    console.log('✅ Local test file cleaned up');
  }
} 