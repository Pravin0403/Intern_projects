import { Reel } from '../Models/Reel.js';
import { jwtAuth } from '../middleware/auth.js';
import cloudinary from '../utils/cloudinary.js';

// Add reel
export const addReel = async (req, res) => {
  try {
    console.log('Add reel request received');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('User ID:', req.user.id);
    
    const { caption } = req.body;
    let videoUrl = '';
    
    // Handle file upload
    if (req.file) {
      console.log('Video file uploaded:', req.file);
      
      try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'yumloop/reels',
          resource_type: 'video',
          quality: 'auto',
          format: 'auto'
        });
        
        console.log('Cloudinary upload result:', result);
        videoUrl = result.secure_url;
        console.log('Video URL:', videoUrl);
        
        // Delete local file after upload
        const fs = await import('fs');
        fs.unlinkSync(req.file.path);
        console.log('Local file deleted');
        
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({ error: 'Failed to upload video to cloud storage' });
      }
    } else {
      console.log('No video file uploaded');
      return res.status(400).json({ error: 'Video file is required' });
    }
    
    const reelData = { 
      user: req.user.id, 
      video: videoUrl, 
      caption 
    };
    
    console.log('Creating reel with data:', reelData);
    
    const reel = await Reel.create(reelData);
    console.log('Reel created successfully:', reel);
    
    res.status(201).json(reel);
  } catch (err) {
    console.error('Add reel error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all reels
export const getReels = async (req, res) => {
  try {
    const reels = await Reel.find().populate('user', 'name avatar').sort({ createdAt: -1 });
    res.json(reels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get reels by user
export const getReelsByUser = async (req, res) => {
  try {
    const reels = await Reel.find({ user: req.params.id });
    res.json(reels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like/unlike reel
export const likeReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) return res.status(404).json({ error: 'Reel not found' });
    const idx = reel.likes.indexOf(req.user.id);
    if (idx > -1) {
      reel.likes.splice(idx, 1);
      await reel.save();
      res.json({ message: 'Unliked' });
    } else {
      reel.likes.push(req.user.id);
      await reel.save();
      res.json({ message: 'Liked' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Comment on reel
export const commentReel = async (req, res) => {
  // TODO: Add input validation
  try {
    // Implement comment logic
    res.json({ message: 'Comment added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete reel
export const deleteReel = async (req, res) => {
  try {
    await Reel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reel deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Report reel
export const reportReel = async (req, res) => {
  // TODO: Add input validation
  try {
    // You can implement a Report model or flag on Reel
    res.json({ message: 'Reel reported' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 