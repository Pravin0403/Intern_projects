import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  loading: false,
  error: null
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlistItems: (state, action) => {
      state.items = action.payload
    },
    addToWishlist: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id)
      if (!existingItem) {
        state.items.push(action.payload)
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload)
    },
    clearWishlist: (state) => {
      state.items = []
    },
    setWishlistLoading: (state, action) => {
      state.loading = action.payload
    },
    setWishlistError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  setWishlistItems,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  setWishlistLoading,
  setWishlistError
} = wishlistSlice.actions

export default wishlistSlice.reducer 