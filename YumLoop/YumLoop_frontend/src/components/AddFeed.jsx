import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const AddFeed = () => {
  const [feedType, setFeedType] = useState('post');
  const [caption, setCaption] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const validVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'];
    
    if (feedType === 'post' && !validImageTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, WebP)');
      return;
    }
    
    if (feedType === 'reel' && !validVideoTypes.includes(file.type)) {
      toast.error('Please select a valid video file (MP4, AVI, MOV, WMV)');
      return;
    }

    const maxSize = feedType === 'post' ? 10 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`File size too large. Maximum ${feedType === 'post' ? '10MB' : '50MB'} allowed.`);
      return;
    }

    setMediaFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setMediaPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!mediaFile) {
      toast.error('Please select a file to upload');
      return;
    }

    if (!caption.trim()) {
      toast.error('Please add a caption');
      return;
    }

    setIsUploading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('images', mediaFile);

      console.log('Uploading file:', mediaFile.name);
      console.log('Caption:', caption);

      // Upload to backend
      const response = await api.post('/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response);

      if (response.data) {
        toast.success(`${feedType === 'post' ? 'Post' : 'Reel'} uploaded successfully!`);
        
        setCaption('');
        setMediaFile(null);
        setMediaPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Upload error details:', error.response?.data || error.message);
      toast.error(`Upload failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleTypeChange = (type) => {
    setFeedType(type);
    setMediaFile(null);
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-pink-500/40">
      <div className="max-w-2xl mx-auto backdrop-blur-sm min-h-screen border-l border-r border-white/10 px-4 md:px-6 lg:px-8">
        <div className="pt-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Add Feed</h1>
            <p className="text-gray-300">Share your food moments with the YumLoop community</p>
          </div>

          <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 mb-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Choose Feed Type</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => handleTypeChange('post')}
                className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
                  feedType === 'post'
                    ? 'border-violet-500 bg-violet-500/20 text-violet-400'
                    : 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Post</span>
              </button>
              <button
                onClick={() => handleTypeChange('reel')}
                className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
                  feedType === 'reel'
                    ? 'border-violet-500 bg-violet-500/20 text-violet-400'
                    : 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Reel</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">
                Upload {feedType === 'post' ? 'Image' : 'Video'}
              </h3>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-violet-500 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={feedType === 'post' ? 'image/*' : 'video/*'}
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-4 text-gray-300 hover:text-white transition-colors"
                  >
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div>
                      <p className="text-lg font-medium">
                        Click to upload {feedType === 'post' ? 'image' : 'video'}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {feedType === 'post' 
                          ? 'JPEG, PNG, WebP up to 10MB' 
                          : 'MP4, AVI, MOV, WMV up to 50MB'
                        }
                      </p>
                    </div>
                  </button>
                </div>

                {mediaPreview && (
                  <div className="relative">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Preview:</h4>
                    <div className="relative rounded-lg overflow-hidden bg-gray-900">
                      {feedType === 'post' ? (
                        <img 
                          src={mediaPreview} 
                          alt="Preview" 
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <video 
                          src={mediaPreview} 
                          controls 
                          className="w-full h-64 object-cover"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setMediaFile(null);
                          setMediaPreview(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Caption</h3>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder={`Share your ${feedType === 'post' ? 'food moment' : 'food story'}...`}
                className="w-full h-32 bg-gray-900 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none resize-none"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-400">
                  {feedType === 'post' ? 'Add hashtags, location, or mention friends' : 'Describe your food experience'}
                </p>
                <span className="text-sm text-gray-400">
                  {caption.length}/500
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!mediaFile || !caption.trim() || isUploading}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                !mediaFile || !caption.trim() || isUploading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
              }`}
            >
              {isUploading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </div>
              ) : (
                `Upload ${feedType === 'post' ? 'Post' : 'Reel'}`
              )}
            </button>

            {/* Test button for simple post */}
            <button
              type="button"
              onClick={async () => {
                try {
                  const response = await api.post('/post', {
                    caption: 'Test post without image'
                  });
                  console.log('Test post response:', response);
                  toast.success('Test post created!');
                } catch (error) {
                  console.error('Test post error:', error);
                  toast.error('Test post failed');
                }
              }}
              className="w-full py-2 px-6 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 mt-2"
            >
              Test Post (No Image)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFeed; 