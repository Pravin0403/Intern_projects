import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload
      state.unreadCount = action.payload.filter(notification => !notification.read).length
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload)
      if (!action.payload.read) {
        state.unreadCount += 1
      }
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n._id === action.payload)
      if (notification && !notification.read) {
        notification.read = true
        state.unreadCount -= 1
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true
      })
      state.unreadCount = 0
    },
    removeNotification: (state, action) => {
      const notification = state.notifications.find(n => n._id === action.payload)
      if (notification && !notification.read) {
        state.unreadCount -= 1
      }
      state.notifications = state.notifications.filter(n => n._id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
      state.unreadCount = 0
    },
    setNotificationLoading: (state, action) => {
      state.loading = action.payload
    },
    setNotificationError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  setNotifications,
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearNotifications,
  setNotificationLoading,
  setNotificationError
} = notificationSlice.actions

export default notificationSlice.reducer 