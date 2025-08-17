import { Post } from '../Models/Post.js';
import { jwtAuth } from '../middleware/auth.js';
import cloudinary from '../utils/cloudinary.js';

// Create post
export const createPost = async (req, res) => {
  try {
    console.log('Create post request received');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('User ID:', req.user.id);
    
    const { caption } = req.body;
    let images = [];
    
    // Handle file upload
    if (req.file) {
      console.log('File uploaded:', req.file);
      
      try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'yumloop/posts',
          quality: 'auto'
        });
        
        console.log('Cloudinary upload result:', result);
        images.push({
          public_id: result.public_id,
          url: result.secure_url
        });
        console.log('Image added to post:', result.secure_url);
        
        // Delete local file after upload
        const fs = await import('fs');
        fs.unlinkSync(req.file.path);
        console.log('Local file deleted');
        
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        if (uploadError && uploadError.message) {
          return res.status(500).json({ error: 'Failed to upload image to cloud storage: ' + uploadError.message });
        }
        return res.status(500).json({ error: 'Failed to upload image to cloud storage' });
      }
    } else {
      console.log('No file uploaded');
    }
    
    const postData = { 
      user: req.user.id, 
      caption, 
      images 
    };
    
    console.log('Creating post with data:', postData);
    
    const post = await Post.create(postData);
    console.log('Post created successfully:', post);
    
    res.status(201).json(post);
  } catch (err) {
    console.error('Create post error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all posts (feed)
export const getFeed = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name avatar').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get posts by user
export const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get current user's posts
export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like/unlike post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const idx = post.likes.indexOf(req.user.id);
    if (idx > -1) {
      post.likes.splice(idx, 1);
      await post.save();
      res.json({ message: 'Unliked' });
    } else {
      post.likes.push(req.user.id);
      await post.save();
      res.json({ message: 'Liked' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Comment on post
export const commentPost = async (req, res) => {
  // TODO: Add input validation
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.comments.push({ user: req.user.id, text });
    await post.save();
    res.json({ message: 'Comment added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit post
export const editPost = async (req, res) => {
  // TODO: Add input validation and file upload logic
  try {
    const updates = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Report post
export const reportPost = async (req, res) => {
  // TODO: Add input validation
  try {
    // You can implement a Report model or flag on Post
    res.json({ message: 'Post reported' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 