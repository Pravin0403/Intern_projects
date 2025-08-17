import axios from 'axios'

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API calls
export const authAPI = {
  // Register user
  register: (userData) => api.post('/user/register', userData),
  
  // Login user
  login: (credentials) => api.post('/user/login', credentials),
  
  // Google OAuth
  googleAuth: (authData) => api.post('/user/google-auth', authData),
  
  // Forgot password
  forgotPassword: (emailData) => api.post('/user/forgot-password', emailData),
  
  // Reset password
  resetPassword: (resetData) => api.post('/user/reset-password', resetData),
  
  // Get user profile
  getProfile: () => api.get('/user/profile'),
  
  // Update profile
  updateProfile: (userData) => {
    // For file uploads, don't set Content-Type header
    const config = {};
    if (userData instanceof FormData) {
      config.headers = {
        'Content-Type': undefined // Let browser set the correct Content-Type with boundary
      };
    }
    return api.put('/user/profile', userData, config);
  },
  
  // Change password
  changePassword: (passwordData) => api.put('/user/change-password', passwordData),
  
  // Post methods
  createPost: (postData) => api.post('/post', postData),
  getUserPosts: () => api.get('/post/user-posts'),
  getFeed: () => api.get('/post/feed'),
  
  // Generic methods for direct API calls
  get: (url, config) => api.get(url, config),
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  delete: (url, config) => api.delete(url, config),
}

// Restaurant API calls
export const restaurantAPI = {
  // Get all restaurants
  getRestaurants: () => api.get('/restaurant'),
  
  // Get single restaurant
  getRestaurant: (id) => api.get(`/restaurant/${id}`),
  
  // Create restaurant (for owners)
  createRestaurant: (restaurantData) => api.post('/restaurant', restaurantData),
}

// Product API calls
export const productAPI = {
  // Get all products
  getProducts: () => api.get('/product'),
  
  // Get single product
  getProduct: (id) => api.get(`/product/${id}`),
  
  // Create product (for admins)
  createProduct: (productData) => api.post('/product', productData),
}

// Cart API calls
export const cartAPI = {
  // Get user cart
  getCart: () => api.get('/cart'),
  
  // Add item to cart
  addToCart: (itemData) => api.post('/cart', itemData),
  
  // Update cart item
  updateCartItem: (itemId, quantity) => api.put(`/cart/${itemId}`, { quantity }),
  
  // Remove item from cart
  removeFromCart: (itemId) => api.delete(`/cart/${itemId}`),
}

// Order API calls
export const orderAPI = {
  // Get user orders
  getOrders: () => api.get('/food-order'),
  
  // Create food order
  createFoodOrder: (orderData) => api.post('/food-order', orderData),
  
  // Get e-commerce orders
  getEcomOrders: () => api.get('/ecom-order'),
  
  // Create e-commerce order
  createEcomOrder: (orderData) => api.post('/ecom-order', orderData),
}

// Wishlist API calls
export const wishlistAPI = {
  // Get user wishlist
  getWishlist: () => api.get('/wishlist'),
  
  // Add item to wishlist
  addToWishlist: (itemData) => api.post('/wishlist', itemData),
  
  // Remove item from wishlist
  removeFromWishlist: (itemId) => api.delete(`/wishlist/${itemId}`),
}

export default api 