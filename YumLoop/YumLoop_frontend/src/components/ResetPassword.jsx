import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { authAPI } from '../services/api'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const token = searchParams.get('token')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!token) {
      toast.error('Invalid reset link')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    try {
      setLoading(true)
      await authAPI.resetPassword({ token, password: formData.password })
      setSuccess(true)
      toast.success('Password reset successful!')
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to reset password'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="flex justify-center items-center h-full w-full min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 backdrop-blur-sm">
        <div className="grid gap-8">
          <section className="bg-gradient-to-r from-violet-600 to-violet-700 rounded-3xl p-1">
            <div className="border-8 border-violet-500 rounded-xl bg-white dark:bg-gray-900 shadow-xl p-8 m-2">
              <h1 className="text-5xl font-bold text-center cursor-default dark:text-gray-300 text-gray-900">
                Invalid Link
              </h1>
              <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
                This password reset link is invalid or has expired.
              </p>
              <button
                onClick={() => navigate('/forgot-password')}
                className="w-full p-3 mt-6 text-white bg-gradient-to-r from-violet-600 to-violet-700 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg"
              >
                Request New Reset Link
              </button>
            </div>
          </section>
        </div>
      </div>
    )
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
              Reset Password
            </h1>
            
            {!success ? (
              <>
                <p className="text-center text-gray-600 dark:text-gray-300 mt-4 mb-6">
                  Enter your new password below.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="password" className="block mb-2 text-lg dark:text-gray-300">
                      New Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-violet-600 transition transform hover:scale-105 duration-300"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block mb-2 text-lg dark:text-gray-300">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-violet-600 transition transform hover:scale-105 duration-300"
                      placeholder="Confirm new password"
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
                        Resetting password...
                      </div>
                    ) : (
                      'Reset Password'
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
                  Password Reset Successful!
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Your password has been successfully reset.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full p-3 mt-4 text-white bg-gradient-to-r from-violet-600 to-violet-700 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg"
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ResetPassword 