import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { logout } from '../store/slices/authSlice';
import yumloopIcon from '../assets/yumloopicon.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(store => store.auth);
  const { cart } = useSelector(store => store.cart);
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);

  // Debug: Log user data to see what's available
  console.log('Sidebar user data:', user);
  console.log('Sidebar avatar:', user?.avatar);
  console.log('Sidebar profilePicture:', user?.profilePicture);
  console.log('Sidebar user ID:', user?._id);
  console.log('Sidebar username:', user?.username);
  console.log('Sidebar full user object:', JSON.stringify(user, null, 2));

  const logoutHandler = async () => {
    try {
      dispatch(logout());
      navigate('/login');
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  const sidebarHandler = (route) => {
    switch (route) {
      case 'home':
        navigate('/');
        break;
      case 'reels':
        navigate('/reels');
        break;
      case 'restaurants':
        navigate('/restaurants');
        break;
      case 'products':
        navigate('/products');
        break;
      case 'cart':
        navigate('/cart');
        break;
      case 'orders':
        navigate('/orders');
        break;
      case 'social':
        navigate('/social');
        break;
      case 'messages':
        navigate('/messages');
        break;
      case 'profile':
        navigate(`/profile/${user?._id}`);
        break;
      case 'logout':
        logoutHandler();
        break;
      default:
        break;
    }
  };

  const isActiveRoute = (route) => {
    if (route === 'home') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(`/${route}`);
  };

  const sidebarItems = [
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ), 
      text: "Home", 
      route: "home",
      description: "Discover food & products"
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ), 
      text: "Reels", 
      route: "reels",
      description: "Food videos & stories"
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ), 
      text: "Search", 
      route: "search",
      description: "Find restaurants & items"
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ), 
      text: "Restaurants", 
      route: "restaurants",
      description: "Food delivery & dining"
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ), 
      text: "Products", 
      route: "products",
      description: "Shop groceries & more"
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
        </svg>
      ), 
      text: "Cart", 
      route: "cart",
      description: "Your shopping cart",
      badge: cart?.items?.length || 0
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), 
      text: "Orders", 
      route: "orders",
      description: "Track your orders"
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ), 
      text: "Add Feed", 
      route: "social",
      description: "Food stories & posts"
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ), 
      text: "Messages", 
      route: "messages",
      description: "Chat with friends"
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 004 6v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-1.81 1.19z" />
        </svg>
      ), 
      text: "Notifications", 
      route: "notifications",
      description: "Stay updated"
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ), 
      text: "Profile", 
      route: "profile",
      description: "Your account"
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ), 
      text: "Logout", 
      route: "logout",
      description: "Sign out"
    },
  ];

  return (
    <div className="h-screen bg-black border-r border-gray-800 shadow-2xl">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <img 
              src={yumloopIcon} 
              alt="YumLoop Icon" 
              className="w-8 h-8 rounded-lg shadow-lg" 
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              YumLoop
            </h1>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Food • Shop • Social
          </p>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-2 px-4">
            {sidebarItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => sidebarHandler(item.route)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                    isActiveRoute(item.route)
                      ? 'bg-gradient-to-r from-violet-600/20 to-pink-600/20 text-white border border-violet-500/30 shadow-lg shadow-violet-500/20'
                      : 'text-gray-300 hover:bg-gray-900 hover:text-white hover:shadow-lg'
                  }`}
                >
                  <div className={`transition-colors duration-200 ${
                    isActiveRoute(item.route)
                      ? 'text-violet-400'
                      : 'text-gray-400 group-hover:text-violet-400'
                  }`}>
                    {item.icon}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.text}</span>
                      {item.badge > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-semibold shadow-lg">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.description}
                    </p>
                  </div>

                  {/* Active indicator */}
                  {isActiveRoute(item.route) && (
                    <div className="absolute right-2 w-2 h-2 bg-violet-400 rounded-full shadow-lg shadow-violet-400/50"></div>
                  )}
                </button>
              </div>
            ))}
          </nav>
        </div>

        {/* User Profile Section */}
        {user && (
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 transition-colors cursor-pointer" onClick={() => sidebarHandler('profile')}>
              {/* User Avatar */}
              <div className="relative">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username || user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-violet-500/30 shadow-lg"
                    onLoad={() => {
                      console.log('Avatar image loaded successfully:', user.avatar);
                    }}
                    onError={(e) => {
                      console.error('Failed to load avatar:', user.avatar);
                      console.error('Error details:', e);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                {!user?.avatar && (
                  <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-violet-500/30 shadow-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black shadow-lg"></div>
              </div>
              
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">
                  {user.username || user.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
              
              {/* Settings icon */}
              <div className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar; 