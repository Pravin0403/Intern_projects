import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice'
import { authAPI } from '../services/api'
import GoogleAuth from './GoogleAuth'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      dispatch(loginStart());
      
      const res = await authAPI.login(input);
      
      if (res.data.token) {
        dispatch(loginSuccess({
          user: res.data.user,
          token: res.data.token
        }));
        navigate("/");
        toast.success('Login successful!');
        setInput({
          email: "",
          password: ""
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate])

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
              Log in
            </h1>
            <form onSubmit={loginHandler} className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-lg dark:text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-violet-600 transition transform hover:scale-105 duration-300"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-lg dark:text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-violet-600 transition transform hover:scale-105 duration-300"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="text-right">
                <Link to="/forgot-password" className="text-violet-600 text-sm transition hover:underline">
                  Forget your password?
                </Link>
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
                    Logging in...
                  </div>
                ) : (
                  'LOG IN'
                )}
              </button>
            </form>
            <div className="flex flex-col mt-4 text-sm text-center dark:text-gray-300">
              <p>
                Don't have an account?
                <Link to="/signup" className="text-violet-600 transition hover:underline ml-1">
                  Sign Up
                </Link>
              </p>
            </div>
            <div id="third-party-auth" className="flex justify-center gap-4 mt-5">
              <GoogleAuth />
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>
                By signing in, you agree to our
                <Link to="/terms" className="text-violet-600 transition hover:underline ml-1">
                  Terms
                </Link>{" "}
                and
                <Link to="/privacy" className="text-violet-600 transition hover:underline ml-1">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Login 