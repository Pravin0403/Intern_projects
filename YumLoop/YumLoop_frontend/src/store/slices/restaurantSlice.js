import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  restaurants: [],
  currentRestaurant: null,
  menuItems: [],
  loading: false,
  error: null
}

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurants: (state, action) => {
      state.restaurants = action.payload
    },
    setCurrentRestaurant: (state, action) => {
      state.currentRestaurant = action.payload
    },
    setMenuItems: (state, action) => {
      state.menuItems = action.payload
    },
    addRestaurant: (state, action) => {
      state.restaurants.push(action.payload)
    },
    updateRestaurant: (state, action) => {
      const index = state.restaurants.findIndex(restaurant => restaurant._id === action.payload._id)
      if (index !== -1) {
        state.restaurants[index] = action.payload
      }
    },
    removeRestaurant: (state, action) => {
      state.restaurants = state.restaurants.filter(restaurant => restaurant._id !== action.payload)
    },
    setRestaurantLoading: (state, action) => {
      state.loading = action.payload
    },
    setRestaurantError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  setRestaurants,
  setCurrentRestaurant,
  setMenuItems,
  addRestaurant,
  updateRestaurant,
  removeRestaurant,
  setRestaurantLoading,
  setRestaurantError
} = restaurantSlice.actions

export default restaurantSlice.reducer 