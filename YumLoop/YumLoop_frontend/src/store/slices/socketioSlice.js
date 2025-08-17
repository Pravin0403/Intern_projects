import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  socket: null,
  onlineUsers: [],
  notifications: []
}

const socketioSlice = createSlice({
  name: 'socketio',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload
    },
    setLikeNotification: (state, action) => {
      state.notifications.unshift(action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    }
  }
})

export const {
  setSocket,
  setOnlineUsers,
  setLikeNotification,
  clearNotifications,
  removeNotification
} = socketioSlice.actions

export default socketioSlice.reducer 