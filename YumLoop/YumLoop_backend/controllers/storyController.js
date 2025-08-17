import { Story } from '../Models/Story.js';
import { jwtAuth } from '../middleware/auth.js';
import cloudinary from '../utils/cloudinary.js';

// Add story
export const addStory = async (req, res) => {
  try {
    console.log('Add story request received');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('User ID:', req.user.id);
    
    let mediaUrl = '';
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    
    // Handle file upload
    if (req.file) {
      console.log('Media file uploaded:', req.file);
      
      try {
        // Determine resource type based on file mimetype
        const resourceType = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
        
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'yumloop/stories',
          resource_type: resourceType,
          quality: 'auto',
          format: 'auto'
        });
        
        console.log('Cloudinary upload result:', result);
        mediaUrl = result.secure_url;
        console.log('Media URL:', mediaUrl);
        
        // Delete local file after upload
        const fs = await import('fs');
        fs.unlinkSync(req.file.path);
        console.log('Local file deleted');
        
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({ error: 'Failed to upload media to cloud storage' });
      }
    } else {
      console.log('No media file uploaded');
      return res.status(400).json({ error: 'Media file is required' });
    }
    
    const storyData = { 
      user: req.user.id, 
      media: mediaUrl, 
      expiresAt 
    };
    
    console.log('Creating story with data:', storyData);
    
    const story = await Story.create(storyData);
    console.log('Story created successfully:', story);
    
    res.status(201).json(story);
  } catch (err) {
    console.error('Add story error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all stories (not expired)
export const getStories = async (req, res) => {
  try {
    const now = new Date();
    const stories = await Story.find({ expiresAt: { $gt: now } }).populate('user', 'name avatar');
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get stories by user
export const getStoriesByUser = async (req, res) => {
  try {
    const now = new Date();
    const stories = await Story.find({ user: req.params.id, expiresAt: { $gt: now } });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete story
export const deleteStory = async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: 'Story deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 