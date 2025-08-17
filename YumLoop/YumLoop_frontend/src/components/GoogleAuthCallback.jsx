import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const GoogleAuthCallback = () => {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (code) {
      // Send success message to parent window
      window.opener.postMessage({
        type: 'GOOGLE_AUTH_SUCCESS',
        code: code
      }, window.location.origin)
    } else if (error) {
      // Send error message to parent window
      window.opener.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        error: error
      }, window.location.origin)
    } else {
      // No code or error, send cancelled message
      window.opener.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        error: 'Authentication cancelled'
      }, window.location.origin)
    }

    // Close the popup
    window.close()
  }, [searchParams])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing authentication...</p>
      </div>
    </div>
  )
}

export default GoogleAuthCallback 