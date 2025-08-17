import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import socketioReducer from './slices/socketioSlice'
import cartReducer from './slices/cartSlice'
import restaurantReducer from './slices/restaurantSlice'
import productReducer from './slices/productSlice'
import orderReducer from './slices/orderSlice'
import wishlistReducer from './slices/wishlistSlice'
import notificationReducer from './slices/notificationSlice'
import postReducer from './slices/postSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socketio: socketioReducer,
    cart: cartReducer,
    restaurant: restaurantReducer,
    product: productReducer,
    order: orderReducer,
    wishlist: wishlistReducer,
    notification: notificationReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['socketio/setSocket'],
        ignoredPaths: ['socketio.socket'],
      },
    }),
})

export default store 