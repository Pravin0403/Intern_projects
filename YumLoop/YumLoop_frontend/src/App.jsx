import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { io } from 'socket.io-client'
import { setSocket, setOnlineUsers, setLikeNotification } from './store/slices/socketioSlice'
import { loginSuccess, loginFailure, checkAuthStart, checkAuthSuccess, checkAuthFailure } from './store/slices/authSlice'
import { authAPI } from './services/api'
import ProtectedRoutes from './components/ProtectedRoutes'
import MainLayout from './components/MainLayout'
import Home from './components/Home'
import Reels from './components/Reels'
import Login from './components/Login'
import Signup from './components/Signup'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import GoogleAuthCallback from './components/GoogleAuthCallback'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import ChatPage from './components/ChatPage'
import Restaurants from './components/Restaurants'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Orders from './components/Orders'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import Wishlist from './components/Wishlist'
import AddFeed from './components/AddFeed'
import Messages from './components/Messages'
import NotFound from './components/NotFound'
import TermsOfService from './components/TermsOfService'
import PrivacyPolicy from './components/PrivacyPolicy'

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: '/',
        element: <ProtectedRoutes><Home /></ProtectedRoutes>
      },
      {
        path: '/reels',
        element: <ProtectedRoutes><Reels /></ProtectedRoutes>
      },
      {
        path: '/profile/:id',
        element: <ProtectedRoutes><Profile /></ProtectedRoutes>
      },
      {
        path: '/profile',
        element: <ProtectedRoutes><Profile /></ProtectedRoutes>
      },
      {
        path: '/edit-profile',
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
      },
      {
        path: '/chat',
        element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>
      },
      {
        path: '/restaurants',
        element: <ProtectedRoutes><Restaurants /></ProtectedRoutes>
      },
      {
        path: '/restaurants/:id',
        element: <ProtectedRoutes><RestaurantDetails /></ProtectedRoutes>
      },
      {
        path: '/cart',
        element: <ProtectedRoutes><Cart /></ProtectedRoutes>
      },
      {
        path: '/checkout',
        element: <ProtectedRoutes><Checkout /></ProtectedRoutes>
      },
      {
        path: '/orders',
        element: <ProtectedRoutes><Orders /></ProtectedRoutes>
      },
      {
        path: '/products',
        element: <ProtectedRoutes><Products /></ProtectedRoutes>
      },
      {
        path: '/products/:id',
        element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes>
      },
      {
        path: '/wishlist',
        element: <ProtectedRoutes><Wishlist /></ProtectedRoutes>
      },
      {
        path: '/social',
        element: <ProtectedRoutes><AddFeed /></ProtectedRoutes>
      },
      {
        path: '/messages',
        element: <ProtectedRoutes><Messages /></ProtectedRoutes>
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/auth/google/callback',
    element: <GoogleAuthCallback />
  },
  {
    path: '/terms',
    element: <TermsOfService />
  },
  {
    path: '/privacy',
    element: <PrivacyPolicy />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

function App() {
  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  // Check for existing token and fetch user data on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      console.log('Checking auth status:', { token: !!token, user: !!user });
      if (token && !user) {
        dispatch(checkAuthStart());
        try {
          const response = await authAPI.getProfile();
          console.log('Profile response:', response.data);
          if (response.data) {
            dispatch(checkAuthSuccess(response.data));
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          dispatch(checkAuthFailure());
        }
      }
    };

    checkAuthStatus();
  }, [dispatch]); // Remove user dependency to prevent infinite loop

  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:8000', {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App