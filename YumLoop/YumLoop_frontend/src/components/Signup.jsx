import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { signupStart, signupSuccess, signupFailure } from '../store/slices/authSlice'
import { authAPI } from '../services/api'
import GoogleAuth from './GoogleAuth'

const Signup = () => {
    const [input, setInput] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        bio: "",
        website: ""
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const signupHandler = async (e) => {
      e.preventDefault();
      try {
          setLoading(true);
          dispatch(signupStart());
          
          // Create FormData for file upload
          const formData = new FormData();
          formData.append('name', input.name);
          formData.append('username', input.username);
          formData.append('email', input.email);
          formData.append('password', input.password);
          formData.append('bio', input.bio);
          formData.append('website', input.website);
          
          if (profilePicture) {
              formData.append('profilePicture', profilePicture);
          }
          
          const res = await authAPI.register(formData);
          
          if (res.data.message) {
              dispatch(signupSuccess());
              navigate("/login");
              toast.success(res.data.message);
              setInput({
                  name: "",
                  username: "",
                  email: "",
                  password: "",
                  bio: "",
                  website: ""
              });
              setProfilePicture(null);
              setPreviewUrl(null);
          }
      } catch (error) {
          const errorMessage = error.response?.data?.error || error.message || 'Signup failed';
          dispatch(signupFailure(errorMessage));
          toast.error(errorMessage);
      } finally {
          setLoading(false);
      }
  }

  useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])

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
              Sign Up
            </h1>
            
            <form onSubmit={signupHandler} className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-violet-500"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-violet-500 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-violet-500 text-white p-2 rounded-full cursor-pointer hover:bg-violet-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {profilePicture ? 'Profile picture selected' : 'Click to add profile picture (optional)'}
                </p>
              </div>

              <div>
                <label htmlFor="name" className="block mb-2 text-lg dark:text-gray-300">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-violet-600 transition transform hover:scale-105 duration-300"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="username" className="block mb-2 text-lg dark:text-gray-300">
                  Username *
                </label>
                <input
                  id="username"
                  name="username"
                  value={input.username}
                  onChange={changeEventHandler}
                  className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-violet-600 transition transform hover:scale-105 duration-300"
                  type="text"
                  placeholder="Choose a unique username"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-lg dark:text-gray-300">
                  Email *
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
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-violet-600 transition transform hover:scale-105 duration-300"
                  type="password"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div>
                <label htmlFor="bio" className="block mb-2 text-lg dark:text-gray-300">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-violet-600 transition transform hover:scale-105 duration-300 resize-none"
                  rows="3"
                  placeholder="Tell us about yourself (optional)"
                />
              </div>

              <div>
                <label htmlFor="website" className="block mb-2 text-lg dark:text-gray-300">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-violet-600 transition transform hover:scale-105 duration-300"
                  type="url"
                  placeholder="https://your-website.com (optional)"
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
                    Creating account...
                  </div>
                ) : (
                  'SIGN UP'
                )}
              </button>
            </form>
            <div className="flex flex-col mt-4 text-sm text-center dark:text-gray-300">
              <p>
                Already have an account?
                <Link to="/login" className="text-violet-600 transition hover:underline ml-1">
                  Log In
                </Link>
              </p>
            </div>
            <div id="third-party-auth" className="flex justify-center gap-4 mt-5">
              <GoogleAuth />
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>
                By signing up, you agree to our
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

export default Signup 