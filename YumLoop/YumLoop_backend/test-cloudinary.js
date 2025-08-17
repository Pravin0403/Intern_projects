import cloudinary from './utils/cloudinary.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing Cloudinary configuration...');
console.log('Cloud Name:', process.env.CLOUD_NAME);
console.log('API Key:', process.env.API_KEY);
console.log('API Secret:', process.env.API_SECRET ? '***' + process.env.API_SECRET.slice(-4) : 'NOT SET');

try {
  // Test Cloudinary configuration
  const result = await cloudinary.api.ping();
  console.log('✅ Cloudinary connection successful:', result);
  
  // Test upload with a simple text file
  const testResult = await cloudinary.uploader.upload('data:text/plain;base64,SGVsbG8gV29ybGQ=', {
    folder: 'yumloop/test',
    public_id: 'test-upload-' + Date.now()
  });
  
  console.log('✅ Test upload successful:', testResult.secure_url);
  
  // Clean up test file
  await cloudinary.uploader.destroy(testResult.public_id);
  console.log('✅ Test file cleaned up');
  
} catch (error) {
  console.error('❌ Cloudinary test failed:', error.message);
  console.error('Full error:', error);
} 