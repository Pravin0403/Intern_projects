import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  foodOrders: [],
  ecomOrders: [],
  currentOrder: null,
  loading: false,
  error: null
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setFoodOrders: (state, action) => {
      state.foodOrders = action.payload
    },
    setEcomOrders: (state, action) => {
      state.ecomOrders = action.payload
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload
    },
    addFoodOrder: (state, action) => {
      state.foodOrders.unshift(action.payload)
    },
    addEcomOrder: (state, action) => {
      state.ecomOrders.unshift(action.payload)
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status, orderType } = action.payload
      if (orderType === 'food') {
        const order = state.foodOrders.find(order => order._id === orderId)
        if (order) order.status = status
      } else {
        const order = state.ecomOrders.find(order => order._id === orderId)
        if (order) order.status = status
      }
    },
    setOrderLoading: (state, action) => {
      state.loading = action.payload
    },
    setOrderError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  setFoodOrders,
  setEcomOrders,
  setCurrentOrder,
  addFoodOrder,
  addEcomOrder,
  updateOrderStatus,
  setOrderLoading,
  setOrderError
} = orderSlice.actions

export default orderSlice.reducer 