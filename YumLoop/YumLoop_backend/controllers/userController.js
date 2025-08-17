import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../Models/User.js';
import { jwtAuth, authorizeRoles } from '../middleware/auth.js';
import { sendPasswordResetEmail } from '../utils/emailService.js';
import cloudinary from '../utils/cloudinary.js';

// Registration
export const register = async (req, res) => {
  // TODO: Add input validation
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already in use' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: 'User registered', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  // TODO: Add input validation
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    // No need to convert avatar path since Cloudinary URLs are already complete
    // The avatar field will already contain the full Cloudinary URL
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    console.log('Update profile request received');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('Request files:', req.files);
    
    const updates = { ...req.body };
    
    // Remove sensitive fields that shouldn't be updated directly
    delete updates.password;
    delete updates.googleId;
    delete updates.resetPasswordToken;
    delete updates.resetPasswordExpires;
    
    // Handle file upload for avatar
    if (req.file) {
      console.log('File uploaded:', req.file);
      
      try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'yumloop/avatars',
          width: 400,
          height: 400,
          crop: 'fill',
          quality: 'auto'
        });
        
        console.log('Cloudinary upload result:', result);
        updates.avatar = result.secure_url;
        console.log('Avatar URL set to:', updates.avatar);
        
        // Delete local file after upload
        const fs = await import('fs');
        fs.unlinkSync(req.file.path);
        console.log('Local file deleted');
        
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({ error: 'Failed to upload image to cloud storage' });
      }
    } else {
      console.log('No file uploaded');
    }
    
    console.log('Final updates object:', updates);
    
    // Check if username is being updated and ensure uniqueness
    if (updates.username) {
      const existingUser = await User.findOne({ username: updates.username, _id: { $ne: req.user.id } });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }
    
    // Check if email is being updated and ensure uniqueness
    if (updates.email) {
      const existingUser = await User.findOne({ email: updates.email, _id: { $ne: req.user.id } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
    }
    
    const user = await User.findByIdAndUpdate(
      req.user.id, 
      updates, 
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('Updated user:', user);
    
    // No need to convert avatar path since Cloudinary URLs are already complete
    // The avatar field will already contain the full Cloudinary URL
    
    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      user 
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Change password
export const changePassword = async (req, res) => {
  // TODO: Add input validation
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ error: 'Old password incorrect' });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password changed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Follow/unfollow
export const followUser = async (req, res) => {
  try {
    const targetId = req.params.id;
    const user = await User.findById(req.user.id);
    if (user.following.includes(targetId)) {
      user.following.pull(targetId);
      await User.findByIdAndUpdate(targetId, { $pull: { followers: user._id } });
      res.json({ message: 'Unfollowed' });
    } else {
      user.following.push(targetId);
      await User.findByIdAndUpdate(targetId, { $push: { followers: user._id } });
      res.json({ message: 'Followed' });
    }
    await user.save();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get followers
export const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('followers', 'name avatar');
    res.json(user.followers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get following
export const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('following', 'name avatar');
    res.json(user.following);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search users
export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    const users = await User.find({ name: { $regex: q, $options: 'i' } }).select('name avatar');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin block/unblock user
export const blockUser = async (req, res) => {
  // Only admin can block
  try {
    await User.findByIdAndUpdate(req.params.id, { blocked: true });
    res.json({ message: 'User blocked' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const unblockUser = async (req, res) => {
  // Only admin can unblock
  try {
    await User.findByIdAndUpdate(req.params.id, { blocked: false });
    res.json({ message: 'User unblocked' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found with this email' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save token to user
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
    
    // Send email
    const emailSent = await sendPasswordResetEmail(email, resetUrl);
    
    if (emailSent) {
      res.json({ message: 'Password reset email sent successfully' });
    } else {
      // If email fails, still return success to prevent email enumeration
      res.json({ message: 'Password reset email sent successfully' });
    }
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    if (!token || !password) {
      return res.status(400).json({ error: 'Token and password are required' });
    }

    // Hash the token to compare with stored token
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Update password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Google OAuth
export const googleAuth = async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Check if Google client is properly configured
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return res.status(500).json({ error: 'Google OAuth not configured' });
    }

    // Create OAuth2Client inside the function
    const redirectUri = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/google/callback`;
    const googleClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    );

    // Exchange authorization code for tokens
    const { tokens } = await googleClient.getToken(code);
    googleClient.setCredentials(tokens);

    // Get user info from Google
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      const hashedPassword = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10);
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        avatar: picture,
        googleId
      });
    } else {
      // Update existing user with Google ID if not set
      if (!user.googleId) {
        user.googleId = googleId;
        if (!user.avatar) {
          user.avatar = picture;
        }
        await user.save();
      }
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });

  } catch (err) {
    console.error('Google OAuth error:', err);
    
    if (err.message.includes('invalid_grant')) {
      return res.status(400).json({ error: 'Invalid or expired authorization code' });
    }
    
    if (err.message.includes('invalid_client')) {
      return res.status(400).json({ error: 'Invalid Google OAuth client configuration' });
    }
    
    res.status(500).json({ error: 'Google authentication failed' });
  }
}; 