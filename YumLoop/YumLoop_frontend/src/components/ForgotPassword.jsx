import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { authAPI } from '../services/api'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    try {
      setLoading(true)
      await authAPI.forgotPassword({ email })
      setEmailSent(true)
      toast.success('Password reset email sent! Check your inbox.')
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to send reset email'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-full w-full min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 backdrop-blur-sm">
      <div className="grid gap-8">
        <section
          id="back-div"
          className="bg-gradient-to-r from-violet-600 to-violet-700 rounded-3xl p-1"
        >
          <div
            className="border-8 border-violet-500 rounded-xl bg-white dark:bg-gray-900 shadow-xl p-8 m-2"
          >
            <h1
              className="text-5xl font-bold text-center cursor-default dark:text-gray-300 text-gray-900"
            >
              Forgot Password
            </h1>
            
            {!emailSent ? (
              <>
                <p className="text-center text-gray-600 dark:text-gray-300 mt-4 mb-6">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-lg dark:text-gray-300">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-violet-600 transition transform hover:scale-105 duration-300"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  
                  <button
                    disabled={loading}
                    className="w-full p-3 mt-4 text-white bg-gradient-to-r from-violet-600 to-violet-700 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending email...
                      </div>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-6">
                <div className="text-green-500 text-6xl mb-4">
                  ✓
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                  Email Sent!
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  Please check your email and click the link to reset your password.
                </p>
              </div>
            )}
            
            <div className="flex flex-col mt-6 text-sm text-center dark:text-gray-300">
              <p>
                Remember your password?
                <Link to="/login" className="text-violet-600 transition hover:underline ml-1">
                  Back to Login
                </Link>
              </p>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>
                Don't have an account?
                <Link to="/signup" className="text-violet-600 transition hover:underline ml-1">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ForgotPassword 