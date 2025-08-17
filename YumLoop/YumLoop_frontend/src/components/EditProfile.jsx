import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateProfile } from '../store/slices/authSlice';
import { authAPI } from '../services/api';

const EditProfile = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    bio: '',
    website: ''
  });
  
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPicture, setCurrentPicture] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || user.name || '',
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        website: user.website || ''
      });
      setCurrentPicture(user.avatar || user.profilePicture || '');
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const updateData = new FormData();
      updateData.append('fullName', formData.fullName);
      updateData.append('username', formData.username);
      updateData.append('email', formData.email);
      updateData.append('bio', formData.bio);
      updateData.append('website', formData.website);
      
      if (profilePicture) {
        updateData.append('profilePicture', profilePicture);
        console.log('Profile picture added to FormData:', profilePicture);
        console.log('Profile picture name:', profilePicture.name);
        console.log('Profile picture size:', profilePicture.size);
        console.log('Profile picture type:', profilePicture.type);
      }
      
      console.log('FormData contents:');
      for (let [key, value] of updateData.entries()) {
        console.log(key, value);
      }
      
      console.log('Sending request to backend...');
      const response = await authAPI.updateProfile(updateData);
      
      console.log('Response from backend:', response);
      console.log('Response data:', response.data);
      
      if (response.data.success) {
        console.log('Profile updated successfully');
        console.log('Updated user data:', response.data.user);
        console.log('User avatar in response:', response.data.user.avatar);
        dispatch(updateProfile(response.data.user));
        console.log('Redux store updated');
        toast.success('Profile updated successfully!');
        navigate(`/profile/${user._id}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to update profile';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-pink-500/40">
      <div className="max-w-2xl mx-auto backdrop-blur-sm min-h-screen border-l border-r border-white/10 p-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
            <button
              onClick={handleCancel}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-violet-500"
                  />
                ) : currentPicture ? (
                  <img
                    src={currentPicture}
                    alt="Current profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-violet-500"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-violet-500 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-violet-500 text-white p-3 rounded-full cursor-pointer hover:bg-violet-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-300 text-center">
                {profilePicture ? 'New profile picture selected' : 'Click to change profile picture'}
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-300">
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
                Username *
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                placeholder="Choose a unique username"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-300">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors resize-none"
                placeholder="Tell us about yourself..."
              />
              <p className="mt-1 text-xs text-gray-400">
                {formData.bio.length}/150 characters
              </p>
            </div>

            {/* Website */}
            <div>
              <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-300">
                Website
              </label>
              <input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                placeholder="https://your-website.com"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile; 