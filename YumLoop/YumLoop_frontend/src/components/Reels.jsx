import React, { useState } from 'react';

const Reels = () => {
  const [likedReels, setLikedReels] = useState(new Set());
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  // Mock data for food reels
  const foodReels = [
    {
      id: 1,
      user: {
        name: "Spice Garden",
        avatar: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150&h=150&fit=crop&crop=face",
        location: "Madurai, Tamil Nadu"
      },
      video: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=800&fit=crop",
      caption: "🍕 Fresh Margherita Pizza straight from our wood-fired oven! #Pizza #Italian #Foodie",
      likes: 1247,
      comments: 89,
      shares: 45,
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
      video: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=600&h=800&fit=crop",
      caption: "🔥 Authentic Hyderabadi Biryani with tender meat and aromatic spices! #Biryani #Hyderabadi #Spicy",
      likes: 2156,
      comments: 156,
      shares: 78,
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
      video: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=800&fit=crop",
      caption: "🍰 Red Velvet Cake with cream cheese frosting - perfect for celebrations! #Cake #Dessert #Sweet",
      likes: 892,
      comments: 67,
      shares: 23,
      timeAgo: "6 hours ago",
      rating: 4.6,
      price: "₹180"
    },
    {
      id: 4,
      user: {
        name: "Taco Bell",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        location: "Bangalore, Karnataka"
      },
      video: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=800&fit=crop",
      caption: "🌮 Crispy tacos with fresh salsa and guacamole! #Tacos #Mexican #StreetFood",
      likes: 1567,
      comments: 98,
      shares: 34,
      timeAgo: "8 hours ago",
      rating: 4.3,
      price: "₹120"
    },
    {
      id: 5,
      user: {
        name: "Coffee Corner",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        location: "Mumbai, Maharashtra"
      },
      video: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=800&fit=crop",
      caption: "☕️ Perfect latte art with our signature blend! #Coffee #LatteArt #Barista",
      likes: 2341,
      comments: 134,
      shares: 67,
      timeAgo: "10 hours ago",
      rating: 4.7,
      price: "₹85"
    }
  ];

  const handleLike = (reelId) => {
    setLikedReels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) {
        newSet.delete(reelId);
      } else {
        newSet.add(reelId);
      }
      return newSet;
    });
  };

  const handleScroll = (e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const itemHeight = container.clientHeight;
    const newIndex = Math.round(scrollTop / itemHeight);
    setCurrentReelIndex(newIndex);
  };

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500">
      <div className="relative">
        {foodReels.map((reel, index) => (
          <div
            key={reel.id}
            className="h-screen flex items-center justify-center relative"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Video/Image Container */}
            <div className="relative w-full h-full max-w-md mx-auto">
              <img
                src={reel.video}
                alt={reel.caption}
                className="w-full h-full object-cover rounded-lg"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={reel.user.avatar}
                    alt={reel.user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-lg">
                        {reel.user.name}
                      </span>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm">{reel.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{reel.user.location}</span>
                      <span>•</span>
                      <span>{reel.timeAgo}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-green-400">
                      {reel.price}
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <p className="text-white text-lg mb-4 leading-relaxed">
                  {reel.caption}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(reel.id)}
                      className={`flex flex-col items-center space-y-1 transition-colors ${
                        likedReels.has(reel.id)
                          ? 'text-red-400'
                          : 'text-white hover:text-red-400'
                      }`}
                    >
                      <svg className="w-8 h-8" fill={likedReels.has(reel.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-sm font-medium">
                        {likedReels.has(reel.id) ? reel.likes + 1 : reel.likes}
                      </span>
                    </button>
                    
                    <button className="flex flex-col items-center space-y-1 text-white hover:text-blue-400 transition-colors">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-sm font-medium">{reel.comments}</span>
                    </button>
                    
                    <button className="flex flex-col items-center space-y-1 text-white hover:text-green-400 transition-colors">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      <span className="text-sm font-medium">{reel.shares}</span>
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2">
                    <button className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                      </svg>
                    </button>
                    <span className="text-xs text-white/80">Order Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels; 