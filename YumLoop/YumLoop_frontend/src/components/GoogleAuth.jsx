import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { loginSuccess, loginFailure } from '../store/slices/authSlice'
import { authAPI } from '../services/api'

const GoogleAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      // Check if Google Client ID is configured (support both Vite and CRA)
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || process.env.REACT_APP_GOOGLE_CLIENT_ID;
      
      if (!clientId) {
        toast.error('Google OAuth not configured. Please contact support.')
        return
      }

      // Open Google OAuth popup
      const redirectUri = window.location.origin + '/auth/google/callback';
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email profile&access_type=offline`;
      
      const popup = window.open(googleAuthUrl, 'googleAuth', 'width=500,height=600,scrollbars=yes,resizable=yes')
      
      if (!popup) {
        toast.error('Popup blocked! Please allow popups for this site.')
        return
      }

      // Listen for the callback
      const handleMessage = async (event) => {
        if (event.origin !== window.location.origin) return
        
        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          const { code } = event.data
          
          try {
            toast.loading('Authenticating with Google...', { id: 'google-auth' })
            
            // Send the authorization code to your backend
            const response = await authAPI.googleAuth({ code })
            
            if (response.data.token) {
              dispatch(loginSuccess({
                user: response.data.user,
                token: response.data.token
              }))
              toast.success('Google login successful!', { id: 'google-auth' })
              popup.close()
              window.removeEventListener('message', handleMessage)
              navigate('/')
            }
          } catch (error) {
            const errorMessage = error.response?.data?.error || 'Google authentication failed'
            dispatch(loginFailure(errorMessage))
            toast.error(errorMessage, { id: 'google-auth' })
            popup.close()
            window.removeEventListener('message', handleMessage)
          }
        }
        
        if (event.data.type === 'GOOGLE_AUTH_ERROR') {
          const errorMessage = event.data.error || 'Google authentication cancelled'
          dispatch(loginFailure(errorMessage))
          toast.error(errorMessage, { id: 'google-auth' })
          popup.close()
          window.removeEventListener('message', handleMessage)
        }
      }
      
      window.addEventListener('message', handleMessage)
      
      // Handle popup close
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed)
          window.removeEventListener('message', handleMessage)
        }
      }, 1000)
      
    } catch (error) {
      toast.error('Google authentication failed')
    }
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg bg-white hover:bg-gray-50"
      type="button"
      title="Sign in with Google"
    >
      <img
        className="w-6 h-6"
        loading="lazy"
        src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
        alt="Google"
      />
    </button>
  )
}

export default GoogleAuth 