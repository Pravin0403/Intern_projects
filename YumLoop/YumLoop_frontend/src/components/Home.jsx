import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useGetAllPost from '../hooks/useGetAllPost';

const Home = () => {
  const { user } = useSelector(store => store.auth);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [seenStories, setSeenStories] = useState(new Set());

  useGetAllPost();
  const posts = useSelector(state => state.post.posts);

  // Mock data for food posts
  const foodPosts = [
    {
      id: 1,
      user: {
        name: "Spice Garden",
        avatar: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150&h=150&fit=crop&crop=face",
        location: "Madurai, Tamil Nadu"
      },
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=600&fit=crop",
      caption: "🍕 Fresh Margherita Pizza straight from our wood-fired oven! #Pizza #Italian #Foodie",
      likes: 1247,
      comments: 89,
      timeAgo: "2 hours ago",
      rating: 4.5,
      price: "₹299"
    },
    {
      id: 2,
      user: {
        name: "Biryani House",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        location: "Chennai, Tamil Nadu"
      },
      image: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=600&h=600&fit=crop",
      caption: "🔥 Authentic Hyderabadi Biryani with tender meat and aromatic spices! #Biryani #Hyderabadi #Spicy",
      likes: 2156,
      comments: 156,
      timeAgo: "4 hours ago",
      rating: 4.8,
      price: "₹450"
    },
    {
      id: 3,
      user: {
        name: "Sweet Dreams",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        location: "Coimbatore, Tamil Nadu"
      },
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop",
      caption: "🍰 Red Velvet Cake with cream cheese frosting - perfect for celebrations! #Cake #Dessert #Sweet",
      likes: 892,
      comments: 67,
      timeAgo: "6 hours ago",
      rating: 4.6,
      price: "₹180"
    }
  ];

  // Mock stories data - added more stories for better scrolling
  const stories = [
    { id: 1, user: "Spice Garden", avatar: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150&h=150&fit=crop&crop=face" },
    { id: 2, user: "Biryani House", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    { id: 3, user: "Sweet Dreams", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
    { id: 4, user: "Taco Bell", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    { id: 5, user: "Coffee Corner", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
    { id: 6, user: "Pizza Palace", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    { id: 7, user: "Burger Joint", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    { id: 8, user: "Ice Cream Shop", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" }
  ];

  // Sort stories: unseen first, seen last
  const sortedStories = [...stories].sort((a, b) => {
    const aSeen = seenStories.has(a.id);
    const bSeen = seenStories.has(b.id);
    if (aSeen && !bSeen) return 1;
    if (!aSeen && bSeen) return -1;
    return 0;
  });

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleSave = (postId) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleStoryClick = (storyId) => {
    setSeenStories(prev => new Set([...prev, storyId]));
  };

  const handleAddStory = () => {
    // TODO: Implement story creation functionality
    console.log('Add story clicked');
    // This would typically open a modal or navigate to story creation page
  };

  // Current user data from Redux store
  const currentUser = {
    name: user?.username || user?.name || "Your Story",
    avatar: user?.avatar || user?.profilePicture,
    id: user?._id || "current-user"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-pink-500/40">
      {/* ===== STORIES SECTION ===== */}
      <div className="bg-black backdrop-blur-md border-b border-white/20 shadow-2xl w-full">
        <div className="p-3">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-1 pl-6 md:pl-8 lg:pl-12">
            {/* User's own story circle - always first and fixed */}
            <div className="flex flex-col items-center space-y-1 min-w-[60px] flex-shrink-0">
              <div 
                className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-r from-violet-500 to-pink-500 cursor-pointer hover:scale-105 transition-transform duration-200 shadow-lg relative"
                onClick={handleAddStory}
              >
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full rounded-full object-cover border-2 border-white/20"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-700 border-2 border-white/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                {/* + sign at bottom right quarter */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <span className="text-xs text-white truncate w-full text-center font-medium drop-shadow-lg">
                {currentUser.name}
              </span>
            </div>

            {sortedStories.map((story) => {
              const isSeen = seenStories.has(story.id);
              return (
                <div key={story.id} className="flex flex-col items-center space-y-1 min-w-[60px] flex-shrink-0">
                  <div 
                    className={`w-14 h-14 rounded-full p-0.5 cursor-pointer hover:scale-105 transition-transform duration-200 shadow-lg ${
                      isSeen 
                        ? 'bg-gradient-to-r from-violet-500 to-pink-500' 
                        : 'bg-gradient-to-r from-orange-400 to-orange-600'
                    }`}
                    onClick={() => handleStoryClick(story.id)}
                  >
                    <img
                      src={story.avatar}
                      alt={story.user}
                      className={`w-full h-full rounded-full object-cover border-2 ${
                        isSeen ? 'border-white/20' : 'border-orange-300'
                      }`}
                    />
                  </div>
                  <span className="text-xs text-white truncate w-full text-center font-medium drop-shadow-lg">
                    {story.user}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== POSTS SECTION ===== */}
      <div className="max-w-2xl mx-auto backdrop-blur-sm min-h-screen border-l border-r border-white/10 px-4 md:px-6 lg:px-8">
        {/* Posts Content */}
        <div className="space-y-6 pt-4">
          {posts && posts.length > 0 ? posts.map((post) => (
            <div key={post._id || post.id} className="border-b border-white/20 pb-6">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <img alt={post.user?.name || 'User'} className="w-10 h-10 rounded-full object-cover border-2 border-white/20" src={post.user?.avatar || ''} />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{post.user?.name || 'User'}</span>
                      {/* Add rating, etc. if available */}
                    </div>
                  </div>
                </div>
                {/* Add price, etc. if available */}
              </div>
              <div className="relative">
                <img alt={post.caption || 'Post'} className="w-full h-96 object-cover" src={post.images?.[0]?.url || ''} />
              </div>
              <div className="p-4">
                <p className="text-white mb-2">{post.caption}</p>
                {/* Add likes, comments, etc. if available */}
              </div>
            </div>
          )) : (
            <div className="text-center text-white py-12">No posts found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 