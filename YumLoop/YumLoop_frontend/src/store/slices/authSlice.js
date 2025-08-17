import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  loading: false,
  error: null,
  userProfile: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
      state.user = null
      state.token = null
    },
    signupStart: (state) => {
      state.loading = true
      state.error = null
    },
    signupSuccess: (state) => {
      state.loading = false
      state.error = null
    },
    signupFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
      localStorage.removeItem('token')
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    },
    checkAuthStart: (state) => {
      state.loading = true
      state.error = null
    },
    checkAuthSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    checkAuthFailure: (state) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    }
  }
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
  updateProfile,
  clearError,
  checkAuthStart,
  checkAuthSuccess,
  checkAuthFailure,
  setUserProfile
} = authSlice.actions

export default authSlice.reducer 