import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  currentProduct: null,
  categories: [],
  loading: false,
  error: null
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(product => product._id === action.payload._id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product._id !== action.payload)
    },
    setProductLoading: (state, action) => {
      state.loading = action.payload
    },
    setProductError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  setProducts,
  setCurrentProduct,
  setCategories,
  addProduct,
  updateProduct,
  removeProduct,
  setProductLoading,
  setProductError
} = productSlice.actions

export default productSlice.reducer 